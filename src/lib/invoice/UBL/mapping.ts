import type { BT_Mapping } from "$lib/types/businessTerms";

export const mappingBTUBL: BT_Mapping = {
    "BT-24": "Invoice/cbc:CustomizationID",
    "BT-23": "Invoice/cbc:ProfileID",
    "BT-1": "Invoice/cbc:ID",
    "BT-2": "Invoice/cbc:IssueDate",
    "BT-9": "Invoice/cbc:DueDate",
    "BT-3": "Invoice/cbc:InvoiceTypeCode",
    "BT-22": "Invoice/cbc:Note",
    "BT-7": "Invoice/cbc:TaxPointDate",
    "BT-5": "Invoice/cbc:DocumentCurrencyCode",
    "BT-6": "Invoice/cbc:TaxCurrencyCode",
    "BT-19": "Invoice/cbc:AccountingCost",
    "BT-10": "Invoice/cbc:BuyerReference",
    "BG-14": "Invoice/cac:InvoicePeriod",
    "BT-73": "Invoice/cac:InvoicePeriod/cbc:StartDate",
    "BT-74": "Invoice/cac:InvoicePeriod/cbc:EndDate",
    "BT-8": "Invoice/cac:InvoicePeriod/cbc:DescriptionCode",
    "BT-13": "Invoice/cac:OrderReference/cbc:ID",
    "BT-14": "Invoice/cac:OrderReference/cbc:SalesOrderID",
    "BG-3": "Invoice/cac:BillingReference",
    "BT-25": "Invoice/cac:BillingReference/cac:InvoiceDocumentReference/cbc:ID",
    "BT-26": "Invoice/cac:BillingReference/cac:InvoiceDocumentReference/cbc:IssueDate",
    "BT-16": "Invoice/cac:DespatchDocumentReference/cbc:ID",
    "BT-15": "Invoice/cac:ReceiptDocumentReference/cbc:ID",
    "BT-17": "Invoice/cac:OriginatorDocumentReference/cbc:ID",
    "BT-12": "Invoice/cac:ContractDocumentReference/cbc:ID",
    "BG-24": "Invoice/cac:AdditionalDocumentReference",
    "BT-18": "Invoice/cac:AdditionalDocumentReference/cbc:DocumentTypeCode",
    "BT-122": "Invoice/cac:AdditionalDocumentReference/cbc:ID",
    "BT-123": "Invoice/cac:AdditionalDocumentReference/cbc:DocumentDescription",
    "BT-125": "Invoice/cac:AdditionalDocumentReference/cac:Attachment/cbc:EmbeddedDocumentBinaryObject",
    "BT-124": "Invoice/cac:AdditionalDocumentReference/cac:Attachment/cac:ExternalReference/cbc:URI",
    "BT-11": "Invoice/cac:ProjectReference/cbc:ID",
    "BG-4": "Invoice/cac:AccountingSupplierParty",
    "BT-34": "Invoice/cac:AccountingSupplierParty/cac:Party/cbc:EndpointID",
    "BT-29": "Invoice/cac:AccountingSupplierParty/cac:Party/cac:PartyIdentification/cbc:ID",
    "BT-90": "Invoice/cac:PayeeParty/cac:PartyIdentification/cbc:ID",
    "BT-28": "Invoice/cac:AccountingSupplierParty/cac:Party/cac:PartyName/cbc:Name",
    "BG-5": "Invoice/cac:AccountingSupplierParty/cac:Party/cac:PostalAddress",
    "BT-35": "Invoice/cac:AccountingSupplierParty/cac:Party/cac:PostalAddress/cbc:StreetName",
    "BT-36": "Invoice/cac:AccountingSupplierParty/cac:Party/cac:PostalAddress/cbc:AdditionalStreetName",
    "BT-37": "Invoice/cac:AccountingSupplierParty/cac:Party/cac:PostalAddress/cbc:CityName",
    "BT-38": "Invoice/cac:AccountingSupplierParty/cac:Party/cac:PostalAddress/cbc:PostalZone",
    "BT-39": "Invoice/cac:AccountingSupplierParty/cac:Party/cac:PostalAddress/cbc:CountrySubentity",
    "BT-162": "Invoice/cac:AccountingSupplierParty/cac:Party/cac:PostalAddress/cac:AddressLine/cbc:Line",
    "BT-40": "Invoice/cac:AccountingSupplierParty/cac:Party/cac:PostalAddress/cac:Country/cbc:IdentificationCode",
    "BT-31": "Invoice/cac:AccountingSupplierParty/cac:Party/cac:PartyTaxScheme/cbc:CompanyID",
    "BT-32": "Invoice/cac:AccountingSupplierParty/cac:Party/cac:PartyTaxScheme/cbc:CompanyID",
    "BT-27": "Invoice/cac:AccountingSupplierParty/cac:Party/cac:PartyLegalEntity/cbc:RegistrationName",
    "BT-30": "Invoice/cac:AccountingSupplierParty/cac:Party/cac:PartyLegalEntity/cbc:CompanyID",
    "BT-33": "Invoice/cac:AccountingSupplierParty/cac:Party/cac:PartyLegalEntity/cbc:CompanyLegalForm",
    "BG-6": "Invoice/cac:AccountingSupplierParty/cac:Party/cac:Contact",
    "BT-41": "Invoice/cac:AccountingSupplierParty/cac:Party/cac:Contact/cbc:Name",
    "BT-42": "Invoice/cac:AccountingSupplierParty/cac:Party/cac:Contact/cbc:Telephone",
    "BT-43": "Invoice/cac:AccountingSupplierParty/cac:Party/cac:Contact/cbc:ElectronicMail",
    "BG-7": "Invoice/cac:AccountingCustomerParty",
    "BT-49": "Invoice/cac:AccountingCustomerParty/cac:Party/cbc:EndpointID",
    "BT-46": "Invoice/cac:AccountingCustomerParty/cac:Party/cac:PartyIdentification/cbc:ID",
    "BT-45": "Invoice/cac:AccountingCustomerParty/cac:Party/cac:PartyName/cbc:Name",
    "BG-8": "Invoice/cac:AccountingCustomerParty/cac:Party/cac:PostalAddress",
    "BT-50": "Invoice/cac:AccountingCustomerParty/cac:Party/cac:PostalAddress/cbc:StreetName",
    "BT-51": "Invoice/cac:AccountingCustomerParty/cac:Party/cac:PostalAddress/cbc:AdditionalStreetName",
    "BT-52": "Invoice/cac:AccountingCustomerParty/cac:Party/cac:PostalAddress/cbc:CityName",
    "BT-53": "Invoice/cac:AccountingCustomerParty/cac:Party/cac:PostalAddress/cbc:PostalZone",
    "BT-54": "Invoice/cac:AccountingCustomerParty/cac:Party/cac:PostalAddress/cbc:CountrySubentity",
    "BT-163": "Invoice/cac:AccountingCustomerParty/cac:Party/cac:PostalAddress/cac:AddressLine/cbc:Line",
    "BT-55": "Invoice/cac:AccountingCustomerParty/cac:Party/cac:PostalAddress/cac:Country/cbc:IdentificationCode",
    "BT-48": "Invoice/cac:AccountingCustomerParty/cac:Party/cac:PartyTaxScheme/cbc:CompanyID",
    "BT-44": "Invoice/cac:AccountingCustomerParty/cac:Party/cac:PartyLegalEntity/cbc:RegistrationName",
    "BT-47": "Invoice/cac:AccountingCustomerParty/cac:Party/cac:PartyLegalEntity/cbc:CompanyID",
    "BG-9": "Invoice/cac:AccountingCustomerParty/cac:Party/cac:Contact",
    "BT-56": "Invoice/cac:AccountingCustomerParty/cac:Party/cac:Contact/cbc:Name",
    "BT-57": "Invoice/cac:AccountingCustomerParty/cac:Party/cac:Contact/cbc:Telephone",
    "BT-58": "Invoice/cac:AccountingCustomerParty/cac:Party/cac:Contact/cbc:ElectronicMail",
    "BG-10": "Invoice/cac:PayeeParty",
    "BT-60": "Invoice/cac:PayeeParty/cac:PartyIdentification/cbc:ID",
    "BT-59": "Invoice/cac:PayeeParty/cac:PartyName/cbc:Name",
    "BT-61": "Invoice/cac:PayeeParty/cac:PartyLegalEntity/cbc:CompanyID",
    "BG-11": "Invoice/cac:TaxRepresentativeParty",
    "BT-62": "Invoice/cac:TaxRepresentativeParty/cac:PartyName/cbc:Name",
    "BG-12": "Invoice/cac:TaxRepresentativeParty/cac:PostalAddress",
    "BT-64": "Invoice/cac:TaxRepresentativeParty/cac:PostalAddress/cbc:StreetName",
    "BT-65": "Invoice/cac:TaxRepresentativeParty/cac:PostalAddress/cbc:AdditionalStreetName",
    "BT-66": "Invoice/cac:TaxRepresentativeParty/cac:PostalAddress/cbc:CityName",
    "BT-67": "Invoice/cac:TaxRepresentativeParty/cac:PostalAddress/cbc:PostalZone",
    "BT-68": "Invoice/cac:TaxRepresentativeParty/cac:PostalAddress/cbc:CountrySubentity",
    "BT-164": "Invoice/cac:TaxRepresentativeParty/cac:PostalAddress/cac:AddressLine/cbc:Line",
    "BT-69": "Invoice/cac:TaxRepresentativeParty/cac:PostalAddress/cac:Country/cbc:IdentificationCode",
    "BT-63": "Invoice/cac:TaxRepresentativeParty/cac:PartyTaxScheme/cbc:CompanyID",
    "BG-13": "Invoice/cac:Delivery",
    "BT-72": "Invoice/cac:Delivery/cbc:ActualDeliveryDate",
    "BT-71": "Invoice/cac:Delivery/cac:DeliveryLocation/cbc:ID",
    "BG-15": "Invoice/cac:Delivery/cac:DeliveryLocation/cac:Address",
    "BT-75": "Invoice/cac:Delivery/cac:DeliveryLocation/cac:Address/cbc:StreetName",
    "BT-76": "Invoice/cac:Delivery/cac:DeliveryLocation/cac:Address/cbc:AdditionalStreetName",
    "BT-77": "Invoice/cac:Delivery/cac:DeliveryLocation/cac:Address/cbc:CityName",
    "BT-78": "Invoice/cac:Delivery/cac:DeliveryLocation/cac:Address/cbc:PostalZone",
    "BT-79": "Invoice/cac:Delivery/cac:DeliveryLocation/cac:Address/cbc:CountrySubentity",
    "BT-165": "Invoice/cac:Delivery/cac:DeliveryLocation/cac:Address/cac:AddressLine/cbc:Line",
    "BT-80": "Invoice/cac:Delivery/cac:DeliveryLocation/cac:Address/cac:Country/cbc:IdentificationCode",
    "BT-70": "Invoice/cac:Delivery/cac:DeliveryParty/cac:PartyName/cbc:Name",
    "BG-16": "Invoice/cac:PaymentMeans",
    "BT-81": "Invoice/cac:PaymentMeans/cbc:PaymentMeansCode",
    "BT-82": "Invoice/cac:PaymentMeans/cbc:PaymentMeansCode@name",
    "BT-83": "Invoice/cac:PaymentMeans/cbc:PaymentID",
    "BG-18": "Invoice/cac:PaymentMeans/cac:CardAccount",
    "BT-87": "Invoice/cac:PaymentMeans/cac:CardAccount/cbc:PrimaryAccountNumberID",
    "BT-88": "Invoice/cac:PaymentMeans/cac:CardAccount/cbc:HolderName",
    "BG-17": "Invoice/cac:PaymentMeans/cac:PayeeFinancialAccount",
    "BT-84": "Invoice/cac:PaymentMeans/cac:PayeeFinancialAccount/cbc:ID",
    "BT-85": "Invoice/cac:PaymentMeans/cac:PayeeFinancialAccount/cbc:Name",
    "BT-86": "Invoice/cac:PaymentMeans/cac:PayeeFinancialAccount/cac:FinancialInstitutionBranch/cbc:ID",
    "BG-19": "Invoice/cac:PaymentMeans/cac:PaymentMandate",
    "BT-89": "Invoice/cac:PaymentMeans/cac:PaymentMandate/cbc:ID",
    "BT-91": "Invoice/cac:PaymentMeans/cac:PaymentMandate/cac:PayerFinancialAccount/cbc:ID",
    "BT-20": "Invoice/cac:PaymentTerms/cbc:Note",
    "BG-20": "Invoice/cac:AllowanceCharge",
    "BG-21": "Invoice/cac:AllowanceCharge",
    "BT-98": "Invoice/cac:AllowanceCharge/cbc:AllowanceChargeReasonCode",
    "BT-105": "Invoice/cac:AllowanceCharge/cbc:AllowanceChargeReasonCode",
    "BT-97": "Invoice/cac:AllowanceCharge/cbc:AllowanceChargeReason",
    "BT-104": "Invoice/cac:AllowanceCharge/cbc:AllowanceChargeReason",
    "BT-94": "Invoice/cac:AllowanceCharge/cbc:MultiplierFactorNumeric",
    "BT-101": "Invoice/cac:AllowanceCharge/cbc:MultiplierFactorNumeric",
    "BT-92": "Invoice/cac:AllowanceCharge/cbc:Amount",
    "BT-99": "Invoice/cac:AllowanceCharge/cbc:Amount",
    "BT-93": "Invoice/cac:AllowanceCharge/cbc:BaseAmount",
    "BT-100": "Invoice/cac:AllowanceCharge/cbc:BaseAmount",
    "BT-95": "Invoice/cac:AllowanceCharge/cac:TaxCategory/cbc:ID",
    "BT-102": "Invoice/cac:AllowanceCharge/cac:TaxCategory/cbc:ID",
    "BT-96": "Invoice/cac:AllowanceCharge/cac:TaxCategory/cbc:Percent",
    "BT-103": "Invoice/cac:AllowanceCharge/cac:TaxCategory/cbc:Percent",
    "BT-110": "Invoice/cac:TaxTotal/cbc:TaxAmount",
    "BT-111": "Invoice/cac:TaxTotal/cbc:TaxAmount",
    "BG-23": "Invoice/cac:TaxTotal/cac:TaxSubtotal",
    "BT-116": "Invoice/cac:TaxTotal/cac:TaxSubtotal/cbc:TaxableAmount",
    "BT-117": "Invoice/cac:TaxTotal/cac:TaxSubtotal/cbc:TaxAmount",
    "BT-118": "Invoice/cac:TaxTotal/cac:TaxSubtotal/cac:TaxCategory/cbc:ID",
    "BT-119": "Invoice/cac:TaxTotal/cac:TaxSubtotal/cac:TaxCategory/cbc:Percent",
    "BT-121": "Invoice/cac:TaxTotal/cac:TaxSubtotal/cac:TaxCategory/cbc:TaxExemptionReasonCode",
    "BT-120": "Invoice/cac:TaxTotal/cac:TaxSubtotal/cac:TaxCategory/cbc:TaxExemptionReason",
    "BG-22": "Invoice/cac:LegalMonetaryTotal",
    "BT-106": "Invoice/cac:LegalMonetaryTotal/cbc:LineExtensionAmount",
    "BT-109": "Invoice/cac:LegalMonetaryTotal/cbc:TaxExclusiveAmount",
    "BT-112": "Invoice/cac:LegalMonetaryTotal/cbc:TaxInclusiveAmount",
    "BT-107": "Invoice/cac:LegalMonetaryTotal/cbc:AllowanceTotalAmount",
    "BT-108": "Invoice/cac:LegalMonetaryTotal/cbc:ChargeTotalAmount",
    "BT-113": "Invoice/cac:LegalMonetaryTotal/cbc:PrepaidAmount",
    "BT-114": "Invoice/cac:LegalMonetaryTotal/cbc:PayableRoundingAmount",
    "BT-115": "Invoice/cac:LegalMonetaryTotal/cbc:PayableAmount",
    "BG-25": "Invoice/cac:InvoiceLine",
    "BT-126": "Invoice/cac:InvoiceLine/cbc:ID",
    "BT-127": "Invoice/cac:InvoiceLine/cbc:Note",
    "BT-129": "Invoice/cac:InvoiceLine/cbc:InvoicedQuantity",
    "BT-130": "Invoice/cac:InvoiceLine/cbc:InvoicedQuantity@unitCode",
    "BT-131": "Invoice/cac:InvoiceLine/cbc:LineExtensionAmount",
    "BT-133": "Invoice/cac:InvoiceLine/cbc:AccountingCost",
    "BG-26": "Invoice/cac:InvoiceLine/cac:InvoicePeriod",
    "BT-134": "Invoice/cac:InvoiceLine/cac:InvoicePeriod/cbc:StartDate",
    "BT-135": "Invoice/cac:InvoiceLine/cac:InvoicePeriod/cbc:EndDate",
    "BT-132": "Invoice/cac:InvoiceLine/cac:OrderLineReference/cbc:LineID",
    "BT-128": "Invoice/cac:InvoiceLine/cac:DocumentReference/cbc:DocumentTypeCode",
    "BG-27": "Invoice/cac:InvoiceLine/cac:AllowanceCharge",
    "BG-28": "Invoice/cac:InvoiceLine/cac:AllowanceCharge",
    "BT-140": "Invoice/cac:InvoiceLine/cac:AllowanceCharge/cbc:AllowanceChargeReasonCode",
    "BT-145": "Invoice/cac:InvoiceLine/cac:AllowanceCharge/cbc:AllowanceChargeReasonCode",
    "BT-139": "Invoice/cac:InvoiceLine/cac:AllowanceCharge/cbc:AllowanceChargeReason",
    "BT-144": "Invoice/cac:InvoiceLine/cac:AllowanceCharge/cbc:AllowanceChargeReason",
    "BT-138": "Invoice/cac:InvoiceLine/cac:AllowanceCharge/cbc:MultiplierFactorNumeric",
    "BT-143": "Invoice/cac:InvoiceLine/cac:AllowanceCharge/cbc:MultiplierFactorNumeric",
    "BT-136": "Invoice/cac:InvoiceLine/cac:AllowanceCharge/cbc:Amount",
    "BT-141": "Invoice/cac:InvoiceLine/cac:AllowanceCharge/cbc:Amount",
    "BT-137": "Invoice/cac:InvoiceLine/cac:AllowanceCharge/cbc:BaseAmount",
    "BT-142": "Invoice/cac:InvoiceLine/cac:AllowanceCharge/cbc:BaseAmount",
    "BG-31": "Invoice/cac:InvoiceLine/cac:Item",
    "BT-154": "Invoice/cac:InvoiceLine/cac:Item/cbc:Description",
    "BT-153": "Invoice/cac:InvoiceLine/cac:Item/cbc:Name",
    "BT-156": "Invoice/cac:InvoiceLine/cac:Item/cac:BuyersItemIdentification/cbc:ID",
    "BT-155": "Invoice/cac:InvoiceLine/cac:Item/cac:SellersItemIdentification/cbc:ID",
    "BT-157": "Invoice/cac:InvoiceLine/cac:Item/cac:StandardItemIdentification/cbc:ID",
    "BT-159": "Invoice/cac:InvoiceLine/cac:Item/cac:OriginCountry/cbc:IdentificationCode",
    "BT-158": "Invoice/cac:InvoiceLine/cac:Item/cac:CommodityClassification/cbc:ItemClassificationCode",
    "BG-30": "Invoice/cac:InvoiceLine/cac:Item/cac:ClassifiedTaxCategory",
    "BT-151": "Invoice/cac:InvoiceLine/cac:Item/cac:ClassifiedTaxCategory/cbc:ID",
    "BT-152": "Invoice/cac:InvoiceLine/cac:Item/cac:ClassifiedTaxCategory/cbc:Percent",
    "BG-32": "Invoice/cac:InvoiceLine/cac:Item/cac:AdditionalItemProperty",
    "BT-160": "Invoice/cac:InvoiceLine/cac:Item/cac:AdditionalItemProperty/cbc:Name",
    "BT-161": "Invoice/cac:InvoiceLine/cac:Item/cac:AdditionalItemProperty/cbc:Value",
    "BG-29": "Invoice/cac:InvoiceLine/cac:Price",
    "BT-146": "Invoice/cac:InvoiceLine/cac:Price/cbc:PriceAmount",
    "BT-149": "Invoice/cac:InvoiceLine/cac:Price/cbc:BaseQuantity",
    "BT-147": "Invoice/cac:InvoiceLine/cac:Price/cac:AllowanceCharge/cbc:Amount",
    "BT-148": "Invoice/cac:InvoiceLine/cac:Price/cac:AllowanceCharge/cbc:BaseAmount"
}