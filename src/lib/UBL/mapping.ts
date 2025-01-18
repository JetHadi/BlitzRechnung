// I used _ so it looks better, "BT-X" would also be possible but then we would have to use " "

export const Mapping_BT_UBL: {[key: string]: string} = {
    BT_24: "ubl:Invoice.cbc:CustomizationID",
    BT_23: "ubl:Invoice.cbc:ProfileID",
    BT_1: "ubl:Invoice.cbc:ID",
    BT_2: "ubl:Invoice.cbc:IssueDate",
    BT_9: "ubl:Invoice.cbc:DueDate",
    BT_3: "ubl:Invoice.cbc:InvoiceTypeCode",
    BT_22: "ubl:Invoice.cbc:Note",
    BT_7: "ubl:Invoice.cbc:TaxPointDate",
    BT_5: "ubl:Invoice.cbc:DocumentCurrencyCode",
    BT_6: "ubl:Invoice.cbc:TaxCurrencyCode",
    BT_19: "ubl:Invoice.cbc:AccountingCost",
    BT_10: "ubl:Invoice.cbc:BuyerReference",
    BG_14: "ubl:Invoice.cac:InvoicePeriod",
    BT_73: "ubl:Invoice.cac:InvoicePeriod.cbc:StartDate",
    BT_74: "ubl:Invoice.cac:InvoicePeriod.cbc:EndDate",
    BT_8: "ubl:Invoice.cac:InvoicePeriod.cbc:DescriptionCode",
    BT_13: "ubl:Invoice.cac:OrderReference.cbc:ID",
    BT_14: "ubl:Invoice.cac:OrderReference.cbc:SalesOrderID",
    BG_3: "ubl:Invoice.cac:BillingReference",
    BT_25: "ubl:Invoice.cac:BillingReference.cac:InvoiceDocumentReference.cbc:ID",
    BT_26: "ubl:Invoice.cac:BillingReference.cac:InvoiceDocumentReference.cbc:IssueDate",
    BT_16: "ubl:Invoice.cac:DespatchDocumentReference.cbc:ID",
    BT_15: "ubl:Invoice.cac:ReceiptDocumentReference.cbc:ID",
    BT_17: "ubl:Invoice.cac:OriginatorDocumentReference.cbc:ID",
    BT_12: "ubl:Invoice.cac:ContractDocumentReference.cbc:ID",
    BG_24: "ubl:Invoice.cac:AdditionalDocumentReference",
    BT_18: "ubl:Invoice.cac:AdditionalDocumentReference.cbc:DocumentTypeCode",
    BT_122: "ubl:Invoice.cac:AdditionalDocumentReference.cbc:ID",
    BT_123: "ubl:Invoice.cac:AdditionalDocumentReference.cbc:DocumentDescription",
    BT_125: "ubl:Invoice.cac:AdditionalDocumentReference.cac:Attachment.cbc:EmbeddedDocumentBinaryObject",
    BT_124: "ubl:Invoice.cac:AdditionalDocumentReference.cac:Attachment.cac:ExternalReference.cbc:URI",
    BT_11: "ubl:Invoice.cac:ProjectReference.cbc:ID",
    BG_4: "ubl:Invoice.cac:AccountingSupplierParty",
    BT_34: "ubl:Invoice.cac:AccountingSupplierParty.cac:Party.cbc:EndpointID",
    BT_29: "ubl:Invoice.cac:AccountingSupplierParty.cac:Party.cac:PartyIdentification.cbc:ID",
    BT_90: "ubl:Invoice.cac:PayeeParty.cac:PartyIdentification.cbc:ID",
    BT_28: "ubl:Invoice.cac:AccountingSupplierParty.cac:Party.cac:PartyName.cbc:Name",
    BG_5: "ubl:Invoice.cac:AccountingSupplierParty.cac:Party.cac:PostalAddress",
    BT_35: "ubl:Invoice.cac:AccountingSupplierParty.cac:Party.cac:PostalAddress.cbc:StreetName",
    BT_36: "ubl:Invoice.cac:AccountingSupplierParty.cac:Party.cac:PostalAddress.cbc:AdditionalStreetName",
    BT_37: "ubl:Invoice.cac:AccountingSupplierParty.cac:Party.cac:PostalAddress.cbc:CityName",
    BT_38: "ubl:Invoice.cac:AccountingSupplierParty.cac:Party.cac:PostalAddress.cbc:PostalZone",
    BT_39: "ubl:Invoice.cac:AccountingSupplierParty.cac:Party.cac:PostalAddress.cbc:CountrySubentity",
    BT_162: "ubl:Invoice.cac:AccountingSupplierParty.cac:Party.cac:PostalAddress.cac:AddressLine.cbc:Line",
    BT_40: "ubl:Invoice.cac:AccountingSupplierParty.cac:Party.cac:PostalAddress.cac:Country.cbc:IdentificationCode",
    BT_31: "ubl:Invoice.cac:AccountingSupplierParty.cac:Party.cac:PartyTaxScheme.cbc:CompanyID",
    BT_32: "ubl:Invoice.cac:AccountingSupplierParty.cac:Party.cac:PartyTaxScheme.cbc:CompanyID",
    BT_27: "ubl:Invoice.cac:AccountingSupplierParty.cac:Party.cac:PartyLegalEntity.cbc:RegistrationName",
    BT_30: "ubl:Invoice.cac:AccountingSupplierParty.cac:Party.cac:PartyLegalEntity.cbc:CompanyID",
    BT_33: "ubl:Invoice.cac:AccountingSupplierParty.cac:Party.cac:PartyLegalEntity.cbc:CompanyLegalForm",
    BG_6: "ubl:Invoice.cac:AccountingSupplierParty.cac:Party.cac:Contact",
    BT_41: "ubl:Invoice.cac:AccountingSupplierParty.cac:Party.cac:Contact.cbc:Name",
    BT_42: "ubl:Invoice.cac:AccountingSupplierParty.cac:Party.cac:Contact.cbc:Telephone",
    BT_43: "ubl:Invoice.cac:AccountingSupplierParty.cac:Party.cac:Contact.cbc:ElectronicMail",
    BG_7: "ubl:Invoice.cac:AccountingCustomerParty",
    BT_49: "ubl:Invoice.cac:AccountingCustomerParty.cac:Party.cbc:EndpointID",
    BT_46: "ubl:Invoice.cac:AccountingCustomerParty.cac:Party.cac:PartyIdentification.cbc:ID",
    BT_45: "ubl:Invoice.cac:AccountingCustomerParty.cac:Party.cac:PartyName.cbc:Name",
    BG_8: "ubl:Invoice.cac:AccountingCustomerParty.cac:Party.cac:PostalAddress",
    BT_50: "ubl:Invoice.cac:AccountingCustomerParty.cac:Party.cac:PostalAddress.cbc:StreetName",
    BT_51: "ubl:Invoice.cac:AccountingCustomerParty.cac:Party.cac:PostalAddress.cbc:AdditionalStreetName",
    BT_52: "ubl:Invoice.cac:AccountingCustomerParty.cac:Party.cac:PostalAddress.cbc:CityName",
    BT_53: "ubl:Invoice.cac:AccountingCustomerParty.cac:Party.cac:PostalAddress.cbc:PostalZone",
    BT_54: "ubl:Invoice.cac:AccountingCustomerParty.cac:Party.cac:PostalAddress.cbc:CountrySubentity",
    BT_163: "ubl:Invoice.cac:AccountingCustomerParty.cac:Party.cac:PostalAddress.cac:AddressLine.cbc:Line",
    BT_55: "ubl:Invoice.cac:AccountingCustomerParty.cac:Party.cac:PostalAddress.cac:Country.cbc:IdentificationCode",
    BT_48: "ubl:Invoice.cac:AccountingCustomerParty.cac:Party.cac:PartyTaxScheme.cbc:CompanyID",
    BT_44: "ubl:Invoice.cac:AccountingCustomerParty.cac:Party.cac:PartyLegalEntity.cbc:RegistrationName",
    BT_47: "ubl:Invoice.cac:AccountingCustomerParty.cac:Party.cac:PartyLegalEntity.cbc:CompanyID",
    BG_9: "ubl:Invoice.cac:AccountingCustomerParty.cac:Party.cac:Contact",
    BT_56: "ubl:Invoice.cac:AccountingCustomerParty.cac:Party.cac:Contact.cbc:Name",
    BT_57: "ubl:Invoice.cac:AccountingCustomerParty.cac:Party.cac:Contact.cbc:Telephone",
    BT_58: "ubl:Invoice.cac:AccountingCustomerParty.cac:Party.cac:Contact.cbc:ElectronicMail",
    BG_10: "ubl:Invoice.cac:PayeeParty",
    BT_60: "ubl:Invoice.cac:PayeeParty.cac:PartyIdentification.cbc:ID",
    BT_59: "ubl:Invoice.cac:PayeeParty.cac:PartyName.cbc:Name",
    BT_61: "ubl:Invoice.cac:PayeeParty.cac:PartyLegalEntity.cbc:CompanyID",
    BG_11: "ubl:Invoice.cac:TaxRepresentativeParty",
    BT_62: "ubl:Invoice.cac:TaxRepresentativeParty.cac:PartyName.cbc:Name",
    BG_12: "ubl:Invoice.cac:TaxRepresentativeParty.cac:PostalAddress",
    BT_64: "ubl:Invoice.cac:TaxRepresentativeParty.cac:PostalAddress.cbc:StreetName",
    BT_65: "ubl:Invoice.cac:TaxRepresentativeParty.cac:PostalAddress.cbc:AdditionalStreetName",
    BT_66: "ubl:Invoice.cac:TaxRepresentativeParty.cac:PostalAddress.cbc:CityName",
    BT_67: "ubl:Invoice.cac:TaxRepresentativeParty.cac:PostalAddress.cbc:PostalZone",
    BT_68: "ubl:Invoice.cac:TaxRepresentativeParty.cac:PostalAddress.cbc:CountrySubentity",
    BT_164: "ubl:Invoice.cac:TaxRepresentativeParty.cac:PostalAddress.cac:AddressLine.cbc:Line",
    BT_69: "ubl:Invoice.cac:TaxRepresentativeParty.cac:PostalAddress.cac:Country.cbc:IdentificationCode",
    BT_63: "ubl:Invoice.cac:TaxRepresentativeParty.cac:PartyTaxScheme.cbc:CompanyID",
    BG_13: "ubl:Invoice.cac:Delivery",
    BT_72: "ubl:Invoice.cac:Delivery.cbc:ActualDeliveryDate",
    BT_71: "ubl:Invoice.cac:Delivery.cac:DeliveryLocation.cbc:ID",
    BG_15: "ubl:Invoice.cac:Delivery.cac:DeliveryLocation.cac:Address",
    BT_75: "ubl:Invoice.cac:Delivery.cac:DeliveryLocation.cac:Address.cbc:StreetName",
    BT_76: "ubl:Invoice.cac:Delivery.cac:DeliveryLocation.cac:Address.cbc:AdditionalStreetName",
    BT_77: "ubl:Invoice.cac:Delivery.cac:DeliveryLocation.cac:Address.cbc:CityName",
    BT_78: "ubl:Invoice.cac:Delivery.cac:DeliveryLocation.cac:Address.cbc:PostalZone",
    BT_79: "ubl:Invoice.cac:Delivery.cac:DeliveryLocation.cac:Address.cbc:CountrySubentity",
    BT_165: "ubl:Invoice.cac:Delivery.cac:DeliveryLocation.cac:Address.cac:AddressLine.cbc:Line",
    BT_80: "ubl:Invoice.cac:Delivery.cac:DeliveryLocation.cac:Address.cac:Country.cbc:IdentificationCode",
    BT_70: "ubl:Invoice.cac:Delivery.cac:DeliveryParty.cac:PartyName.cbc:Name",
    BG_16: "ubl:Invoice.cac:PaymentMeans",
    BT_81: "ubl:Invoice.cac:PaymentMeans.cbc:PaymentMeansCode",
    BT_82: "ubl:Invoice.cac:PaymentMeans.cbc:PaymentMeansCode@name",
    BT_83: "ubl:Invoice.cac:PaymentMeans.cbc:PaymentID",
    BG_18: "ubl:Invoice.cac:PaymentMeans.cac:CardAccount",
    BT_87: "ubl:Invoice.cac:PaymentMeans.cac:CardAccount.cbc:PrimaryAccountNumberID",
    BT_88: "ubl:Invoice.cac:PaymentMeans.cac:CardAccount.cbc:HolderName",
    BG_17: "ubl:Invoice.cac:PaymentMeans.cac:PayeeFinancialAccount",
    BT_84: "ubl:Invoice.cac:PaymentMeans.cac:PayeeFinancialAccount.cbc:ID",
    BT_85: "ubl:Invoice.cac:PaymentMeans.cac:PayeeFinancialAccount.cbc:Name",
    BT_86: "ubl:Invoice.cac:PaymentMeans.cac:PayeeFinancialAccount.cac:FinancialInstitutionBranch.cbc:ID",
    BG_19: "ubl:Invoice.cac:PaymentMeans.cac:PaymentMandate",
    BT_89: "ubl:Invoice.cac:PaymentMeans.cac:PaymentMandate.cbc:ID",
    BT_91: "ubl:Invoice.cac:PaymentMeans.cac:PaymentMandate.cac:PayerFinancialAccount.cbc:ID",
    BT_20: "ubl:Invoice.cac:PaymentTerms.cbc:Note",
    BG_20: "ubl:Invoice.cac:AllowanceCharge",
    BG_21: "ubl:Invoice.cac:AllowanceCharge",
    BT_98: "ubl:Invoice.cac:AllowanceCharge.cbc:AllowanceChargeReasonCode",
    BT_105: "ubl:Invoice.cac:AllowanceCharge.cbc:AllowanceChargeReasonCode",
    BT_97: "ubl:Invoice.cac:AllowanceCharge.cbc:AllowanceChargeReason",
    BT_104: "ubl:Invoice.cac:AllowanceCharge.cbc:AllowanceChargeReason",
    BT_94: "ubl:Invoice.cac:AllowanceCharge.cbc:MultiplierFactorNumeric",
    BT_101: "ubl:Invoice.cac:AllowanceCharge.cbc:MultiplierFactorNumeric",
    BT_92: "ubl:Invoice.cac:AllowanceCharge.cbc:Amount",
    BT_99: "ubl:Invoice.cac:AllowanceCharge.cbc:Amount",
    BT_93: "ubl:Invoice.cac:AllowanceCharge.cbc:BaseAmount",
    BT_100: "ubl:Invoice.cac:AllowanceCharge.cbc:BaseAmount",
    BT_95: "ubl:Invoice.cac:AllowanceCharge.cac:TaxCategory.cbc:ID",
    BT_102: "ubl:Invoice.cac:AllowanceCharge.cac:TaxCategory.cbc:ID",
    BT_96: "ubl:Invoice.cac:AllowanceCharge.cac:TaxCategory.cbc:Percent",
    BT_103: "ubl:Invoice.cac:AllowanceCharge.cac:TaxCategory.cbc:Percent",
    BT_110: "ubl:Invoice.cac:TaxTotal.cbc:TaxAmount",
    BT_111: "ubl:Invoice.cac:TaxTotal.cbc:TaxAmount",
    BG_23: "ubl:Invoice.cac:TaxTotal.cac:TaxSubtotal",
    BT_116: "ubl:Invoice.cac:TaxTotal.cac:TaxSubtotal.cbc:TaxableAmount",
    BT_117: "ubl:Invoice.cac:TaxTotal.cac:TaxSubtotal.cbc:TaxAmount",
    BT_118: "ubl:Invoice.cac:TaxTotal.cac:TaxSubtotal.cac:TaxCategory.cbc:ID",
    BT_119: "ubl:Invoice.cac:TaxTotal.cac:TaxSubtotal.cac:TaxCategory.cbc:Percent",
    BT_121: "ubl:Invoice.cac:TaxTotal.cac:TaxSubtotal.cac:TaxCategory.cbc:TaxExemptionReasonCode",
    BT_120: "ubl:Invoice.cac:TaxTotal.cac:TaxSubtotal.cac:TaxCategory.cbc:TaxExemptionReason",
    BG_22: "ubl:Invoice.cac:LegalMonetaryTotal",
    BT_106: "ubl:Invoice.cac:LegalMonetaryTotal.cbc:LineExtensionAmount",
    BT_109: "ubl:Invoice.cac:LegalMonetaryTotal.cbc:TaxExclusiveAmount",
    BT_112: "ubl:Invoice.cac:LegalMonetaryTotal.cbc:TaxInclusiveAmount",
    BT_107: "ubl:Invoice.cac:LegalMonetaryTotal.cbc:AllowanceTotalAmount",
    BT_108: "ubl:Invoice.cac:LegalMonetaryTotal.cbc:ChargeTotalAmount",
    BT_113: "ubl:Invoice.cac:LegalMonetaryTotal.cbc:PrepaidAmount",
    BT_114: "ubl:Invoice.cac:LegalMonetaryTotal.cbc:PayableRoundingAmount",
    BT_115: "ubl:Invoice.cac:LegalMonetaryTotal.cbc:PayableAmount",
    BG_25: "ubl:Invoice.cac:InvoiceLine",
    BT_126: "ubl:Invoice.cac:InvoiceLine.cbc:ID",
    BT_127: "ubl:Invoice.cac:InvoiceLine.cbc:Note",
    BT_129: "ubl:Invoice.cac:InvoiceLine.cbc:InvoicedQuantity",
    BT_130: "ubl:Invoice.cac:InvoiceLine.cbc:InvoicedQuantity@unitCode",
    BT_131: "ubl:Invoice.cac:InvoiceLine.cbc:LineExtensionAmount",
    BT_133: "ubl:Invoice.cac:InvoiceLine.cbc:AccountingCost",
    BG_26: "ubl:Invoice.cac:InvoiceLine.cac:InvoicePeriod",
    BT_134: "ubl:Invoice.cac:InvoiceLine.cac:InvoicePeriod.cbc:StartDate",
    BT_135: "ubl:Invoice.cac:InvoiceLine.cac:InvoicePeriod.cbc:EndDate",
    BT_132: "ubl:Invoice.cac:InvoiceLine.cac:OrderLineReference.cbc:LineID",
    BT_128: "ubl:Invoice.cac:InvoiceLine.cac:DocumentReference.cbc:DocumentTypeCode",
    BG_27: "ubl:Invoice.cac:InvoiceLine.cac:AllowanceCharge",
    BG_28: "ubl:Invoice.cac:InvoiceLine.cac:AllowanceCharge",
    BT_140: "ubl:Invoice.cac:InvoiceLine.cac:AllowanceCharge.cbc:AllowanceChargeReasonCode",
    BT_145: "ubl:Invoice.cac:InvoiceLine.cac:AllowanceCharge.cbc:AllowanceChargeReasonCode",
    BT_139: "ubl:Invoice.cac:InvoiceLine.cac:AllowanceCharge.cbc:AllowanceChargeReason",
    BT_144: "ubl:Invoice.cac:InvoiceLine.cac:AllowanceCharge.cbc:AllowanceChargeReason",
    BT_138: "ubl:Invoice.cac:InvoiceLine.cac:AllowanceCharge.cbc:MultiplierFactorNumeric",
    BT_143: "ubl:Invoice.cac:InvoiceLine.cac:AllowanceCharge.cbc:MultiplierFactorNumeric",
    BT_136: "ubl:Invoice.cac:InvoiceLine.cac:AllowanceCharge.cbc:Amount",
    BT_141: "ubl:Invoice.cac:InvoiceLine.cac:AllowanceCharge.cbc:Amount",
    BT_137: "ubl:Invoice.cac:InvoiceLine.cac:AllowanceCharge.cbc:BaseAmount",
    BT_142: "ubl:Invoice.cac:InvoiceLine.cac:AllowanceCharge.cbc:BaseAmount",
    BG_31: "ubl:Invoice.cac:InvoiceLine.cac:Item",
    BT_154: "ubl:Invoice.cac:InvoiceLine.cac:Item.cbc:Description",
    BT_153: "ubl:Invoice.cac:InvoiceLine.cac:Item.cbc:Name",
    BT_156: "ubl:Invoice.cac:InvoiceLine.cac:Item.cac:BuyersItemIdentification.cbc:ID",
    BT_155: "ubl:Invoice.cac:InvoiceLine.cac:Item.cac:SellersItemIdentification.cbc:ID",
    BT_157: "ubl:Invoice.cac:InvoiceLine.cac:Item.cac:StandardItemIdentification.cbc:ID",
    BT_159: "ubl:Invoice.cac:InvoiceLine.cac:Item.cac:OriginCountry.cbc:IdentificationCode",
    BT_158: "ubl:Invoice.cac:InvoiceLine.cac:Item.cac:CommodityClassification.cbc:ItemClassificationCode",
    BG_30: "ubl:Invoice.cac:InvoiceLine.cac:Item.cac:ClassifiedTaxCategory",
    BT_151: "ubl:Invoice.cac:InvoiceLine.cac:Item.cac:ClassifiedTaxCategory.cbc:ID",
    BT_152: "ubl:Invoice.cac:InvoiceLine.cac:Item.cac:ClassifiedTaxCategory.cbc:Percent",
    BG_32: "ubl:Invoice.cac:InvoiceLine.cac:Item.cac:AdditionalItemProperty",
    BT_160: "ubl:Invoice.cac:InvoiceLine.cac:Item.cac:AdditionalItemProperty.cbc:Name",
    BT_161: "ubl:Invoice.cac:InvoiceLine.cac:Item.cac:AdditionalItemProperty.cbc:Value",
    BG_29: "ubl:Invoice.cac:InvoiceLine.cac:Price",
    BT_146: "ubl:Invoice.cac:InvoiceLine.cac:Price.cbc:PriceAmount",
    BT_149: "ubl:Invoice.cac:InvoiceLine.cac:Price.cbc:BaseQuantity",
    BT_147: "ubl:Invoice.cac:InvoiceLine.cac:Price.cac:AllowanceCharge.cbc:Amount",
    BT_148: "ubl:Invoice.cac:InvoiceLine.cac:Price.cac:AllowanceCharge.cbc:BaseAmount"
};