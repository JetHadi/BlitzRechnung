from datetime import datetime
from lxml import etree

# Define namespaces as constants
NAMESPACES = {
    "rsm": "urn:un:unece:uncefact:data:standard:CrossIndustryInvoice:100",
    "ram": "urn:un:unece:uncefact:data:standard:ReusableAggregateBusinessInformationEntity:100",
    "udt": "urn:un:unece:uncefact:data:standard:UnqualifiedDataType:100",
    "qdt": "urn:un:unece:uncefact:data:standard:QualifiedDataType:100",
}


def create_facturx_xml(json_data):
    try:
        # Create root element
        root = etree.Element(
            f"{{{NAMESPACES['rsm']}}}CrossIndustryInvoice", nsmap=NAMESPACES
        )

        # ExchangedDocumentContext
        context = etree.SubElement(
            root, f"{{{NAMESPACES['rsm']}}}ExchangedDocumentContext"
        )
        guideline = etree.SubElement(
            context,
            f"{{{NAMESPACES['ram']}}}GuidelineSpecifiedDocumentContextParameter",
        )
        etree.SubElement(guideline, f"{{{NAMESPACES['ram']}}}ID").text = (
            "urn:cen.eu:en16931:2017#compliant#urn:factur-x.eu:1p0:basic"
        )

        # ExchangedDocument
        document = etree.SubElement(root, f"{{{NAMESPACES['rsm']}}}ExchangedDocument")
        etree.SubElement(document, f"{{{NAMESPACES['ram']}}}ID").text = json_data[
            "firstSectionForm"
        ]["rechnungsnummer"]

        etree.SubElement(document, f"{{{NAMESPACES['ram']}}}TypeCode").text = "380"

        # IssueDateTime
        date = etree.SubElement(document, f"{{{NAMESPACES['ram']}}}IssueDateTime")
        issue_date = datetime.fromisoformat(
            json_data["firstSectionForm"]["rechnungsdatum"].replace("Z", "+00:00")
        )
        etree.SubElement(
            date, f"{{{NAMESPACES['udt']}}}DateTimeString", format="102"
        ).text = issue_date.strftime("%Y%m%d")

        # Add notes
        if json_data["secondSectionForm"].get("extraInvoiceInfoFirst"):
            note1 = etree.SubElement(document, f"{{{NAMESPACES['ram']}}}IncludedNote")
            etree.SubElement(note1, f"{{{NAMESPACES['ram']}}}Content").text = json_data[
                "secondSectionForm"
            ]["extraInvoiceInfoFirst"]

        if json_data["fourthSectionForm"].get("extraInvoiceInfoSecond"):
            note2 = etree.SubElement(document, f"{{{NAMESPACES['ram']}}}IncludedNote")
            etree.SubElement(note2, f"{{{NAMESPACES['ram']}}}Content").text = json_data[
                "fourthSectionForm"
            ]["extraInvoiceInfoSecond"]

        # SupplyChainTradeTransaction
        transaction = etree.SubElement(
            root, f"{{{NAMESPACES['rsm']}}}SupplyChainTradeTransaction"
        )

        # Add IncludedSupplyChainTradeLineItem first
        for idx, position in enumerate(
            json_data["mainSectionForm"]["RechnungsPositionen"], 1
        ):
            line_item = etree.SubElement(
                transaction, f"{{{NAMESPACES['ram']}}}IncludedSupplyChainTradeLineItem"
            )

            # Line Document (Number)
            line_doc = etree.SubElement(
                line_item, f"{{{NAMESPACES['ram']}}}AssociatedDocumentLineDocument"
            )
            etree.SubElement(line_doc, f"{{{NAMESPACES['ram']}}}LineID").text = str(idx)

            # Product Details
            trade_product = etree.SubElement(
                line_item, f"{{{NAMESPACES['ram']}}}SpecifiedTradeProduct"
            )
            etree.SubElement(trade_product, f"{{{NAMESPACES['ram']}}}Name").text = (
                position["bezeichnung"]
            )

            # Price and Quantity Details
            price_details = etree.SubElement(
                line_item, f"{{{NAMESPACES['ram']}}}SpecifiedLineTradeAgreement"
            )
            net_price = etree.SubElement(
                price_details, f"{{{NAMESPACES['ram']}}}NetPriceProductTradePrice"
            )
            etree.SubElement(net_price, f"{{{NAMESPACES['ram']}}}ChargeAmount").text = (
                str(position["einheitspreis"])
            )

            # Delivery/Quantity Details
            delivery = etree.SubElement(
                line_item, f"{{{NAMESPACES['ram']}}}SpecifiedLineTradeDelivery"
            )
            etree.SubElement(
                delivery,
                f"{{{NAMESPACES['ram']}}}BilledQuantity",
                unitCode=position["einheit"],
            ).text = str(position["anzahl"])

            # Tax and Monetary Details
            settlement = etree.SubElement(
                line_item, f"{{{NAMESPACES['ram']}}}SpecifiedLineTradeSettlement"
            )

            # Tax Details
            trade_tax = etree.SubElement(
                settlement, f"{{{NAMESPACES['ram']}}}ApplicableTradeTax"
            )
            etree.SubElement(trade_tax, f"{{{NAMESPACES['ram']}}}TypeCode").text = "VAT"
            etree.SubElement(trade_tax, f"{{{NAMESPACES['ram']}}}CategoryCode").text = (
                "S"
            )
            etree.SubElement(
                trade_tax, f"{{{NAMESPACES['ram']}}}RateApplicablePercent"
            ).text = str(position["ustProzent"])

            # Monetary Summation
            monetary_summation = etree.SubElement(
                settlement,
                f"{{{NAMESPACES['ram']}}}SpecifiedTradeSettlementLineMonetarySummation",
            )
            line_total = position["anzahl"] * position["einheitspreis"]
            etree.SubElement(
                monetary_summation, f"{{{NAMESPACES['ram']}}}LineTotalAmount"
            ).text = str(line_total)

        # Trade Agreement
        agreement = etree.SubElement(
            transaction, f"{{{NAMESPACES['ram']}}}ApplicableHeaderTradeAgreement"
        )

        # Add BuyerReference if available
        if json_data["firstSectionForm"].get("buyerReference"):
            etree.SubElement(
                agreement, f"{{{NAMESPACES['ram']}}}BuyerReference"
            ).text = json_data["firstSectionForm"]["buyerReference"]

        # Seller
        seller = etree.SubElement(agreement, f"{{{NAMESPACES['ram']}}}SellerTradeParty")

        # Add seller ID if available
        if json_data["headerForm"].get("absender_id"):
            etree.SubElement(seller, f"{{{NAMESPACES['ram']}}}ID").text = json_data[
                "headerForm"
            ]["absender_id"]

        etree.SubElement(seller, f"{{{NAMESPACES['ram']}}}Name").text = json_data[
            "headerForm"
        ]["absender_firma"]

        # Add seller contact information
        contact = etree.SubElement(
            seller, f"{{{NAMESPACES['ram']}}}DefinedTradeContact"
        )
        if json_data["headerForm"].get("absender_person"):
            etree.SubElement(contact, f"{{{NAMESPACES['ram']}}}PersonName").text = (
                json_data["headerForm"]["absender_person"]
            )
        if json_data["headerForm"].get("absender_telefon"):
            phone = etree.SubElement(
                contact, f"{{{NAMESPACES['ram']}}}TelephoneUniversalCommunication"
            )
            etree.SubElement(phone, f"{{{NAMESPACES['ram']}}}CompleteNumber").text = (
                json_data["headerForm"]["absender_telefon"]
            )
        if json_data["headerForm"].get("absender_email"):
            email = etree.SubElement(
                contact, f"{{{NAMESPACES['ram']}}}EmailURIUniversalCommunication"
            )
            etree.SubElement(email, f"{{{NAMESPACES['ram']}}}URIID").text = json_data[
                "headerForm"
            ]["absender_email"]

        # Add seller adress information
        seller_address = etree.SubElement(
            seller, f"{{{NAMESPACES['ram']}}}PostalTradeAddress"
        )
        etree.SubElement(
            seller_address, f"{{{NAMESPACES['ram']}}}PostcodeCode"
        ).text = json_data["headerForm"]["absender_plz"]
        etree.SubElement(seller_address, f"{{{NAMESPACES['ram']}}}LineOne").text = (
            json_data["headerForm"]["absender_strasse"]
        )
        etree.SubElement(seller_address, f"{{{NAMESPACES['ram']}}}CityName").text = (
            json_data["headerForm"]["absender_ort"]
        )
        etree.SubElement(seller_address, f"{{{NAMESPACES['ram']}}}CountryID").text = (
            "DE"
        )

        # Add seller tax information
        if json_data["footerForm"]["absender_ustId"]:
            tax_registration_vat = etree.SubElement(
                seller, f"{{{NAMESPACES['ram']}}}SpecifiedTaxRegistration"
            )
            etree.SubElement(
                tax_registration_vat, f"{{{NAMESPACES['ram']}}}ID", schemeID="VA"
            ).text = json_data["footerForm"]["absender_ustId"]

        if json_data["footerForm"]["absender_steuernummer"]:
            tax_registration_number = etree.SubElement(
                seller, f"{{{NAMESPACES['ram']}}}SpecifiedTaxRegistration"
            )
            etree.SubElement(
                tax_registration_number, f"{{{NAMESPACES['ram']}}}ID", schemeID="FC"
            ).text = json_data["footerForm"]["absender_steuernummer"]

        # Buyer
        buyer = etree.SubElement(agreement, f"{{{NAMESPACES['ram']}}}BuyerTradeParty")
        if json_data["firstSectionForm"].get("empfaenger_id"):
            etree.SubElement(buyer, f"{{{NAMESPACES['ram']}}}ID").text = json_data[
                "firstSectionForm"
            ]["empfaenger_id"]

        etree.SubElement(buyer, f"{{{NAMESPACES['ram']}}}Name").text = json_data[
            "firstSectionForm"
        ]["empfaenger_firma"]

        buyer_address = etree.SubElement(
            buyer, f"{{{NAMESPACES['ram']}}}PostalTradeAddress"
        )
        etree.SubElement(buyer_address, f"{{{NAMESPACES['ram']}}}PostcodeCode").text = (
            json_data["firstSectionForm"]["empfaenger_plz"]
        )
        etree.SubElement(buyer_address, f"{{{NAMESPACES['ram']}}}LineOne").text = (
            json_data["firstSectionForm"]["empfaenger_strasse"]
        )
        etree.SubElement(buyer_address, f"{{{NAMESPACES['ram']}}}CityName").text = (
            json_data["firstSectionForm"]["empfaenger_ort"]
        )
        etree.SubElement(buyer_address, f"{{{NAMESPACES['ram']}}}CountryID").text = "DE"

        # Trade Delivery
        delivery = etree.SubElement(
            transaction, f"{{{NAMESPACES['ram']}}}ApplicableHeaderTradeDelivery"
        )

        # Trade Settlement
        settlement = etree.SubElement(
            transaction, f"{{{NAMESPACES['ram']}}}ApplicableHeaderTradeSettlement"
        )
        etree.SubElement(
            settlement, f"{{{NAMESPACES['ram']}}}InvoiceCurrencyCode"
        ).text = json_data["calculatedAmounts"]["currency"]

        payment_means = etree.SubElement(
            settlement, f"{{{NAMESPACES['ram']}}}SpecifiedTradeSettlementPaymentMeans"
        )
        etree.SubElement(payment_means, f"{{{NAMESPACES['ram']}}}TypeCode").text = "30"

        # Add financial account details
        financial_account = etree.SubElement(
            payment_means, f"{{{NAMESPACES['ram']}}}PayeePartyCreditorFinancialAccount"
        )
        etree.SubElement(financial_account, f"{{{NAMESPACES['ram']}}}IBANID").text = (
            json_data["footerForm"]["absender_iban"]
        )
        etree.SubElement(
            financial_account, f"{{{NAMESPACES['ram']}}}AccountName"
        ).text = json_data["headerForm"]["absender_firma"]

        # Add financial institution details
        financial_institution = etree.SubElement(
            payment_means,
            f"{{{NAMESPACES['ram']}}}PayeeSpecifiedCreditorFinancialInstitution",
        )
        if json_data["footerForm"].get("absender_bic"):
            etree.SubElement(
                financial_institution, f"{{{NAMESPACES['ram']}}}BICID"
            ).text = json_data["footerForm"]["absender_bic"]
        else:
            etree.SubElement(financial_institution, f"{{{NAMESPACES['ram']}}}BICID")

        if json_data["firstSectionForm"].get("paymentTerms"):
            payment_terms = etree.SubElement(
                settlement, f"{{{NAMESPACES['ram']}}}SpecifiedTradePaymentTerms"
            )
            etree.SubElement(
                payment_terms, f"{{{NAMESPACES['ram']}}}Description"
            ).text = json_data["firstSectionForm"]["paymentTerms"]

        if json_data["firstSectionForm"].get("dueDate"):
            due_date = etree.SubElement(
                payment_terms, f"{{{NAMESPACES['ram']}}}DueDateDateTime"
            )
            due_date_obj = datetime.fromisoformat(
                json_data["firstSectionForm"]["dueDate"].replace("Z", "+00:00")
            )
            etree.SubElement(
                due_date, f"{{{NAMESPACES['udt']}}}DateTimeString", format="102"
            ).text = due_date_obj.strftime("%Y%m%d")

        # Tax details
        tax = etree.SubElement(settlement, f"{{{NAMESPACES['ram']}}}ApplicableTradeTax")
        etree.SubElement(tax, f"{{{NAMESPACES['ram']}}}CalculatedAmount").text = (
            json_data["calculatedAmounts"]["taxTotalAmount"]
        )
        etree.SubElement(tax, f"{{{NAMESPACES['ram']}}}TypeCode").text = "VAT"
        etree.SubElement(tax, f"{{{NAMESPACES['ram']}}}BasisAmount").text = json_data[
            "calculatedAmounts"
        ]["taxBasisTotalAmount"]
        etree.SubElement(tax, f"{{{NAMESPACES['ram']}}}CategoryCode").text = "S"
        etree.SubElement(tax, f"{{{NAMESPACES['ram']}}}RateApplicablePercent").text = (
            str(json_data["mainSectionForm"]["RechnungsPositionen"][0]["ustProzent"])
        )

        # Monetary Summary
        summary = etree.SubElement(
            settlement,
            f"{{{NAMESPACES['ram']}}}SpecifiedTradeSettlementHeaderMonetarySummation",
        )
        etree.SubElement(summary, f"{{{NAMESPACES['ram']}}}LineTotalAmount").text = (
            json_data["calculatedAmounts"]["lineTotalAmount"]
        )
        etree.SubElement(
            summary, f"{{{NAMESPACES['ram']}}}TaxBasisTotalAmount"
        ).text = json_data["calculatedAmounts"]["taxBasisTotalAmount"]
        etree.SubElement(summary, f"{{{NAMESPACES['ram']}}}TaxTotalAmount").text = (
            json_data["calculatedAmounts"]["taxTotalAmount"]
        )
        etree.SubElement(summary, f"{{{NAMESPACES['ram']}}}GrandTotalAmount").text = (
            json_data["calculatedAmounts"]["grandTotalAmount"]
        )
        etree.SubElement(summary, f"{{{NAMESPACES['ram']}}}DuePayableAmount").text = (
            json_data["calculatedAmounts"]["duePayableAmount"]
        )

        return etree.tostring(
            root, pretty_print=True, xml_declaration=True, encoding="UTF-8"
        )
    except Exception as e:
        print(f"Error creating XML: {str(e)}")
        raise ValueError(f"Failed to create XML: {str(e)}")
