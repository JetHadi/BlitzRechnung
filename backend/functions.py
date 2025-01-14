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
            etree.SubElement(note1, f"{{{NAMESPACES['ram']}}}Content").text = json_data["secondSectionForm"]["extraInvoiceInfoFirst"]

        if json_data["fourthSectionForm"].get("extraInvoiceInfoSecond"):
            note2 = etree.SubElement(document, f"{{{NAMESPACES['ram']}}}IncludedNote")
            etree.SubElement(note2, f"{{{NAMESPACES['ram']}}}Content").text = json_data["fourthSectionForm"]["extraInvoiceInfoSecond"]

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

        # Seller
        seller = etree.SubElement(agreement, f"{{{NAMESPACES['ram']}}}SellerTradeParty")
        etree.SubElement(seller, f"{{{NAMESPACES['ram']}}}Name").text = json_data[
            "headerForm"
        ]["absender_firma"]

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

        # Buyer
        buyer = etree.SubElement(agreement, f"{{{NAMESPACES['ram']}}}BuyerTradeParty")
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
