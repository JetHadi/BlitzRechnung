import type { ADDITIONALSUPPORTINGDOCUMENTS, BUYER, BuyerCountryCode, BuyerElectronicAddressIdentificationSchemeIdentifier, BuyerIdentifierIdentificationSchemeIdentifier, BuyerLegalRegistrationIdentifierIdentificationSchemeIdentifier, CONTRACTREFERENCE, DeliverToCountryCode, DeliverToLocationIdentifierIdentificationSchemeIdentifier, DELIVERYINFORMATION, DELIVERYORINVOICEPERIOD, DESPATCHADVICEREFERENCE, DocumentLevelAllowanceOrChargeReasonCode, DocumentLevelAllowanceOrChargeVATCategoryCode, DOCUMENTLEVELALLOWANCESANDCHARGES, DOCUMENTTOTALS, Invoice, InvoiceCurrencyCode, InvoicedItemVATCategoryCode, InvoicedQuantityUnitOfMeasure, INVOICELINE, InvoiceLineObjectIdentifierIdentificationSchemeIdentifier, InvoiceTypeCode, ItemCountryOfOrigin, ItemPriceBaseQuantityUnitOfMeasureCode, ItemStandardIdentifierIdentificationSchemeIdentifier, LineLevelAllowanceOrChargeReason, LineLevelAllowanceOrChargeReasonCode, ORDERANDSALESORDERREFERENCE, PAYEE, PayeeLegalRegistrationIdentifierIdentificationSchemeIdentifier, PayeeOrBankAssignedCreditorIdentifierIdentificationSchemeIdentifier, PAYMENTINSTRUCTIONS, PaymentMeansTypeCode, PAYMENTTERMS, PRECEDINGINVOICEREFERENCE, PROJECTREFERENCE, RECEIPTADVICEREFERENCE, SELLER, SellerCountryCode, SellerElectronicAddressIdentificationSchemeIdentifier, SellerOrBankAssignedCreditorIdentifierIdentificationSchemeIdentifier, SELLERTAXREPRESENTATIVEPARTY, TaxRepresentativeCountryCode, TAXTOTAL, TENDERORLOTREFERENCE, ValueAddedTaxPointDateCode, VATAccountingCurrencyCode, VATCategoryCode, VATExemptionReasonCode } from "../invoice.interface";

export interface BusinessTerms {
    BT_1: string,
    BT_2: string,
    BT_3: InvoiceTypeCode,
    BT_5: InvoiceCurrencyCode,
    BT_6?: VATAccountingCurrencyCode,
    BT_7?: string,
    BT_8?: ValueAddedTaxPointDateCode,
    BT_9: string,
    BT_10?: string,
    BT_11?: string,
    BT_12?: string,
    BT_13?: string,
    BT_14?: string,
    BT_15?: string,
    BT_16?: string,
    BT_17?: string,
    BT_18?: string,
    BT_19?: string,
    BT_20?: string,
    BT_22?: string,
    BT_23?: string,
    BT_24?: string,
    BT_25?: string,
    BT_26?: string,
    BT_27: string,
    BT_28?: string,
    BT_29?: { value: string, schemeID?: SellerOrBankAssignedCreditorIdentifierIdentificationSchemeIdentifier },
    BT_30?: string,
    BT_31?: string,
    BT_32?: string,
    BT_33?: string,
    BT_34?: { value: string, schemeID?: SellerElectronicAddressIdentificationSchemeIdentifier },
    BT_35?: string,
    BT_36?: string,
    BT_37?: string,
    BT_38?: string,
    BT_39?: string,
    BT_40: SellerCountryCode,
    BT_41?: string,
    BT_42?: string,
    BT_43?: string,
    BT_44: string,
    BT_45?: string,
    BT_46?: {
        value: string;
        schemeID?: BuyerIdentifierIdentificationSchemeIdentifier;
    },
    BT_47?: {
        value: string;
        schemeID?: BuyerLegalRegistrationIdentifierIdentificationSchemeIdentifier;
    },
    BT_48?: string,
    // Umsatzsteuer des Käufers ist in Deutschland nicht notwendig.
    // Nur in innergemeinschaftlichen (europäischen)
    BT_49?: {
        value: string;
        schemeID?: BuyerElectronicAddressIdentificationSchemeIdentifier;
    },
    BT_50?: string,
    BT_51?: string,
    BT_52?: string,
    BT_53?: string,
    BT_54?: string,
    BT_55: BuyerCountryCode,
    BT_56?: string,
    BT_57?: string,
    BT_58?: string,
    BT_59?: string,
    BT_60?: {
        value: string;
        schemeID?: PayeeOrBankAssignedCreditorIdentifierIdentificationSchemeIdentifier;
    },
    BT_61?: {
        value: string;
        schemeID?: PayeeLegalRegistrationIdentifierIdentificationSchemeIdentifier;
    },
    BT_62?: string,
    BT_63?: string,
    BT_64?: string,
    BT_65?: string,
    BT_66?: string,
    BT_67?: string,
    BT_68?: string,
    BT_69?: TaxRepresentativeCountryCode,
    BT_70?: string,
    BT_71?: {
        value?: string;
        schemeID?: DeliverToLocationIdentifierIdentificationSchemeIdentifier;
    },
    BT_72?: string,
    BT_73?: string,
    BT_74?: string,
    BT_75?: string,
    BT_76?: string,
    BT_77?: string,
    BT_78?: string,
    BT_79?: string,
    BT_80?: DeliverToCountryCode,
    BT_81?: PaymentMeansTypeCode,
    BT_82?: string,
    BT_83?: string,
    BT_84?: string,
    BT_85?: string,
    BT_86?: string,
    BT_87?: string,
    BT_88?: string,
    BT_89?: string,
    BT_91?: string,
    BT_92?: string,
    BT_93?: string,
    BT_94?: string,
    BT_95?: DocumentLevelAllowanceOrChargeVATCategoryCode,
    BT_96?: string,
    BT_97?: string,
    BT_98?: DocumentLevelAllowanceOrChargeReasonCode,
    BT_99?: string,
    BT_100?: string,
    BT_101?: string,
    BT_102?: DocumentLevelAllowanceOrChargeVATCategoryCode,
    BT_103?: string,
    BT_104?: string,
    BT_105?: DocumentLevelAllowanceOrChargeReasonCode,
    BT_106: string,
    BT_107?: string,
    BT_108?: string,
    BT_109: string,
    BT_110: string,
    BT_112: string,
    BT_113?: string,
    BT_114?: string,
    BT_115: string,
    BT_116?: string[],
    BT_117?: string[],
    BT_118?: VATCategoryCode[],
    BT_119?: string[],
    BT_120?: string[],
    BT_121?: string[],
    BT_122?: string,
    BT_123?: string,
    BT_124?: string,
    BT_125?: string,
    BT_126: string[],
    BT_127?: string,
    BT_128?: { value: string, schemeID: InvoiceLineObjectIdentifierIdentificationSchemeIdentifier },
    BT_129: string[],
    BT_130: InvoicedQuantityUnitOfMeasure[],
    BT_131: string[],
    BT_132?: string,
    BT_133?: string,
    BT_134?: string,
    BT_135?: string,
    BT_136?: string;
    BT_137?: string;
    BT_138?: string;
    BT_139?: string;
    BT_140?: LineLevelAllowanceOrChargeReasonCode;
    BT_141?: string;
    BT_142?: string;
    BT_143?: string;
    BT_144?: string;
    BT_145?: LineLevelAllowanceOrChargeReasonCode;
    BT_146: string[],
    BT_147?: string;
    BT_148?: string;
    BT_149?: string,
    BT_150?: ItemPriceBaseQuantityUnitOfMeasureCode,
    BT_151: InvoicedItemVATCategoryCode[],
    BT_152?: string[],
    BT_153: string[],
    BT_154?: string,
    BT_155?: string,
    BT_156?: string,
    BT_157?: {
        value: string;
        schemeID?: ItemStandardIdentifierIdentificationSchemeIdentifier;
    },
    BT_158?: string,
    BT_159?: ItemCountryOfOrigin,
    BT_160?: string,
    BT_161?: string,
    BT_162?: string,
    BT_163?: string,
    BT_164?: string,
    BT_165?: string,
    ChargeIndicator?: 'true' | 'false'
}

export class DefaultUBLInvoice {

    getInvoice(params: BusinessTerms): Invoice {
        const invoice = {
            'ubl:Invoice': {
                'cbc:CustomizationID': params.BT_24,
                'cbc:ProfileID': params.BT_23,
                'cbc:ID': params.BT_1,
                'cbc:IssueDate': params.BT_2,
                'cbc:DueDate': params.BT_9,
                'cbc:InvoiceTypeCode': params.BT_3,
                //FIXME: in rsm sind hier mehrere Values erlaubt welche dann einfach aufgeteilt werden. (BT-21)
                'cbc:Note': params.BT_22,
                'cbc:TaxPointDate': params.BT_7,
                'cbc:DocumentCurrencyCode': params.BT_5,
                //FIXME: if BT-6 is different than BT-5 then BT-111 has to be also set
                'cbc:TaxCurrencyCode': params.BT_6,
                'cbc:AccountingCost': params.BT_19,
                'cbc:BuyerReference': params.BT_10,
                'cac:InvoicePeriod': (params.BT_73 || params.BT_74 || params.BT_8) ? this.createInvoicePeriod({ BT_73: params.BT_73, BT_74: params.BT_74, BT_8: params.BT_8 }) : undefined,
                'cac:OrderReference': params.BT_13 ? this.createOrderReference({ BT_13: params.BT_13, BT_14: params.BT_14 }) : undefined,
                'cac:BillingReference': params.BT_25 ? this.createBillingReference({ BT_25: params.BT_25, BT_26: params.BT_26 }) : undefined,
                'cac:DespatchDocumentReference': params.BT_16 ? this.createDespatchDocumentReference({ BT_16: params.BT_16 }) : undefined,
                'cac:ReceiptDocumentReference': params.BT_15 ? this.createReceiptDocumentReference({ BT_15: params.BT_15 }) : undefined,
                'cac:OriginatorDocumentReference': params.BT_17 ? this.createOriginatorDocumentReference({ BT_17: params.BT_17 }) : undefined,
                'cac:ContractDocumentReference': params.BT_12 ? this.createContractDocumentReference({ BT_12: params.BT_12 }) : undefined,
                'cac:AdditionalDocumentReference': params.BT_122 ? this.createAdditionalDocumentReference({ BT_18: params.BT_18, BT_122: params.BT_122, BT_123: params.BT_123, BT_125: params.BT_125, BT_124: params.BT_124 }) : undefined,
                'cac:ProjectReference': params.BT_11 ? this.createProjectReference({ BT_11: params.BT_11 }) : undefined,
                'cac:AccountingSupplierParty': this.createAccountingSupplierParty({ BT_34: params.BT_34, BT_29: params.BT_29, BT_28: params.BT_28, BT_35: params.BT_35, BT_36: params.BT_36, BT_37: params.BT_37, BT_38: params.BT_38, BT_39: params.BT_39, BT_162: params.BT_162, BT_40: params.BT_40, BT_31: params.BT_31, BT_32: params.BT_32, BT_27: params.BT_27, BT_30: params.BT_30, BT_33: params.BT_33, BT_41: params.BT_41, BT_42: params.BT_42, BT_43: params.BT_43 }),

                'cac:AccountingCustomerParty': this.createAccountingCustomerParty({ BT_49: params.BT_49, BT_46: params.BT_46, BT_45: params.BT_45, BT_50: params.BT_50, BT_51: params.BT_51, BT_52: params.BT_52, BT_53: params.BT_53, BT_54: params.BT_54, BT_163: params.BT_163, BT_55: params.BT_55, BT_48: params.BT_48, BT_44: params.BT_44, BT_47: params.BT_47, BT_56: params.BT_56, BT_57: params.BT_57, BT_58: params.BT_58 }),

                'cac:PayeeParty': params.BT_59 ? this.createPayeeParty({ BT_60: params.BT_60, BT_59: params.BT_59, BT_61: params.BT_61 }) : undefined,

                'cac:TaxRepresentativeParty': (params.BT_62 && params.BT_63 && params.BT_69) ? this.createTaxRepresentativeParty({ BT_62: params.BT_62, BT_64: params.BT_64, BT_65: params.BT_65, BT_66: params.BT_66, BT_67: params.BT_67, BT_68: params.BT_68, BT_164: params.BT_164, BT_69: params.BT_69, BT_63: params.BT_63 }) : undefined,

                'cac:Delivery': this.createDelivery({ BT_72: params.BT_72, BT_71: params.BT_71, BT_75: params.BT_75, BT_76: params.BT_76, BT_77: params.BT_77, BT_78: params.BT_78, BT_79: params.BT_79, BT_165: params.BT_165, BT_80: params.BT_80, BT_70: params.BT_70 }),

                'cac:PaymentMeans': params.BT_81 ? this.createPaymentMeans({ BT_81: params.BT_81, BT_82: params.BT_82, BT_83: params.BT_83, BT_87: params.BT_87, BT_88: params.BT_88, BT_84: params.BT_84, BT_85: params.BT_85, BT_86: params.BT_86, BT_89: params.BT_89, BT_91: params.BT_91 }) : undefined,

                'cac:PaymentTerms': params.BT_20 ? this.createPaymentTerms({ BT_20: params.BT_20 }) : undefined,
                // TODO: Implement correct Allowance or Charge 
                'cac:AllowanceCharge': (params.ChargeIndicator) && ((params.BT_92 && params.BT_95) || (params.BT_99 && params.BT_102)) ? this.createAllowanceCharge({
                    BT_98: params.BT_98, BT_105: params.BT_105, BT_97: params.BT_97, BT_104: params.BT_104, BT_94: params.BT_94, BT_101: params.BT_101, BT_92: params.BT_92, BT_99: params.BT_99, BT_93: params.BT_93, BT_100: params.BT_100, BT_95: params.BT_95, BT_102: params.BT_102, BT_96: params.BT_96, BT_103: params.BT_103,
                    ChargeIndicator: params.ChargeIndicator,
                    BT_5: params.BT_5
                }) : undefined,

                'cac:TaxTotal': this.createTaxTotal({
                    BT_110: params.BT_110, BT_116: params.BT_116, BT_117: params.BT_117, BT_118: params.BT_118, BT_119: params.BT_119, BT_121: params.BT_121, BT_120: params.BT_120,
                    BT_5: params.BT_5
                }),

                'cac:LegalMonetaryTotal': this.createLegalMonetaryTotal({
                    BT_106: params.BT_106, BT_109: params.BT_109, BT_112: params.BT_112, BT_107: params.BT_107, BT_108: params.BT_108, BT_113: params.BT_113, BT_114: params.BT_114, BT_115: params.BT_115,
                    BT_5: params.BT_5
                }),

                // FIXME: Can be array -- How do I create that with different values for the BT ??????????
                'cac:InvoiceLine': this.createInvoiceLine({
                    BT_5: params.BT_5,
                    BT_126: params.BT_126,
                    BT_127: params.BT_127,
                    BT_128: params.BT_128,
                    BT_129: params.BT_129,
                    BT_130: params.BT_130,
                    BT_131: params.BT_131,
                    BT_132: params.BT_132,
                    BT_133: params.BT_133,
                    BT_134: params.BT_134,
                    BT_135: params.BT_135,
                    BT_136: params.BT_136,
                    BT_137: params.BT_137,
                    BT_138: params.BT_138,
                    BT_139: params.BT_139,
                    BT_140: params.BT_140,
                    BT_141: params.BT_141,
                    BT_142: params.BT_142,
                    BT_143: params.BT_143,
                    BT_144: params.BT_144,
                    BT_145: params.BT_145,
                    BT_146: params.BT_146,
                    BT_147: params.BT_147,
                    BT_148: params.BT_148,
                    BT_149: params.BT_149,
                    BT_150: params.BT_150,
                    BT_151: params.BT_151,
                    BT_152: params.BT_152,
                    BT_153: params.BT_153,
                    BT_154: params.BT_154,
                    BT_155: params.BT_155,
                    BT_156: params.BT_156,
                    BT_157: params.BT_157,
                    BT_158: params.BT_158,
                    BT_159: params.BT_159,
                    BT_160: params.BT_160,
                    BT_161: params.BT_161,
                    ChargeIndicator: params.ChargeIndicator,
                })
            }
        };

        return invoice;
    }

    private createInvoicePeriod(params: { BT_73?: string, BT_74?: string, BT_8?: ValueAddedTaxPointDateCode }): DELIVERYORINVOICEPERIOD {
        return {
            'cbc:StartDate': params.BT_73,
            'cbc:EndDate': params.BT_74,
            'cbc:DescriptionCode': params.BT_8
        };
    }

    private createOrderReference(params: { BT_13: string, BT_14?: string }): ORDERANDSALESORDERREFERENCE {
        return {
            'cbc:ID': params.BT_13,
            'cbc:SalesOrderID': params.BT_14
        };
    }

    private createBillingReference(params: { BT_25: string, BT_26?: string }): PRECEDINGINVOICEREFERENCE[] {
        return [{
            'cac:InvoiceDocumentReference': {
                'cbc:ID': params.BT_25,
                'cbc:IssueDate': params.BT_26
            }
        }];
    }

    private createDespatchDocumentReference(params: { BT_16: string }): DESPATCHADVICEREFERENCE {
        return {
            'cbc:ID': params.BT_16
        };
    }

    private createReceiptDocumentReference(params: { BT_15: string }): RECEIPTADVICEREFERENCE {
        return {
            'cbc:ID': params.BT_15
        };
    }

    private createOriginatorDocumentReference(params: { BT_17: string }): TENDERORLOTREFERENCE {
        return {
            'cbc:ID': params.BT_17
        };
    }

    private createContractDocumentReference(params: { BT_12: string }): CONTRACTREFERENCE {
        return {
            'cbc:ID': params.BT_12
        };
    }

    private createAdditionalDocumentReference(params:
        {
            BT_122: string,
            BT_18?: string,
            BT_123?: string,
            BT_125?: string,
            BT_124?: string
        }
    ): ADDITIONALSUPPORTINGDOCUMENTS[] {
        return [{
            'cbc:DocumentTypeCode': params.BT_18,
            'cbc:ID': params.BT_122,
            'cbc:DocumentDescription': params.BT_123,
            'cac:Attachment': params.BT_124 ? {
                'cbc:EmbeddedDocumentBinaryObject': params.BT_125,
                'cac:ExternalReference': {
                    'cbc:URI': params.BT_124
                }
            } : undefined
        }];
    }

    private createProjectReference(params: { BT_11: string }): PROJECTREFERENCE {
        return {
            'cbc:ID': params.BT_11
        };
    }

    private createAccountingSupplierParty(params:
        {
            BT_40: SellerCountryCode,   // Country IdentificationCode
            BT_27: string,   // PartyLegalEntity RegistrationName
            BT_34?: { value: string, schemeID?: SellerElectronicAddressIdentificationSchemeIdentifier },  // EndpointID
            BT_29?: { value: string, schemeID?: SellerOrBankAssignedCreditorIdentifierIdentificationSchemeIdentifier },  // PartyIdentification ID
            BT_28?: string,  // PartyName Name
            BT_35?: string,  // StreetName
            BT_36?: string,  // AdditionalStreetName
            BT_37?: string,  // CityName
            BT_38?: string,  // PostalZone
            BT_39?: string,  // CountrySubentity
            BT_162?: string, // AddressLine Line
            BT_31?: string,  // PartyTaxScheme CompanyID ( params:VAT identifier)
            BT_32?: string,  // PartyTaxScheme TaxScheme ID
            BT_30?: string,  // PartyLegalEntity CompanyID
            BT_33?: string,  // PartyLegalEntity CompanyLegalForm
            BT_41?: string,  // Contact Name
            BT_42?: string,  // Contact Telephone
            BT_43?: string   // Contact ElectronicMail
        }
    ): SELLER {
        return {
            'cac:Party': {
                'cbc:EndpointID': params.BT_34?.value,
                'cbc:EndpointID@schemeID': params.BT_34?.schemeID, // Optional scheme identifier
                'cac:PartyIdentification': params.BT_29 ? [{
                    'cbc:ID': params.BT_29.value,
                    // TODO: Im falle von CII führt die Angabe einer schemeID zu einem Fehler, da keines der Formate hier bei selbstgewählten Kennungen passt
                    // 'cbc:ID@schemeID': params.BT_29?.schemeID
                }] : undefined,
                'cac:PartyName': params.BT_28 ? {
                    'cbc:Name': params.BT_28
                } : undefined,
                'cac:PostalAddress': {
                    'cbc:StreetName': params.BT_35,
                    'cbc:AdditionalStreetName': params.BT_36,
                    'cbc:CityName': params.BT_37,
                    'cbc:PostalZone': params.BT_38,
                    'cbc:CountrySubentity': params.BT_39,
                    'cac:AddressLine': params.BT_162 ? {
                        'cbc:Line': params.BT_162
                    } : undefined,
                    'cac:Country': {
                        'cbc:IdentificationCode': params.BT_40
                    }
                },
                // FIXME: Verkäufer kann maximal 2 angeben = Steuernummer und Umsatzsteueridentifikations-Nnummer -- hier ähnlich zu InvoiceLine auch ein Object mapping machen
                'cac:PartyTaxScheme': (params.BT_31 || params.BT_32) ? [{
                    'cbc:CompanyID': params.BT_31 || params.BT_32 || '' ,
                    'cac:TaxScheme': {
                        'cbc:ID':  params.BT_31 ? 'VA' : 'FC' // Default to 'VAT' if not specified
                    }
                }] : undefined,
                'cac:PartyLegalEntity': {
                    'cbc:RegistrationName': params.BT_27,
                    'cbc:CompanyID': params.BT_30,
                    'cbc:CompanyLegalForm': params.BT_33
                },
                'cac:Contact': params.BT_41 || params.BT_42 || params.BT_43 ? {
                    'cbc:Name': params.BT_41,
                    'cbc:Telephone': params.BT_42,
                    'cbc:ElectronicMail': params.BT_43
                } : undefined
            }
        };
    }

    // FIXME: implement correct schemdeID
    private createAccountingCustomerParty(params:
        {
            BT_55: BuyerCountryCode,  // Country IdentificationCode
            BT_44: string, // PartyLegalEntity RegistrationName
            BT_49?: { value: string, schemeID?: BuyerElectronicAddressIdentificationSchemeIdentifier },  // EndpointID
            BT_46?: { value: string, schemeID?: BuyerIdentifierIdentificationSchemeIdentifier }, // PartyIdentification ID
            BT_45?: string, // PartyName Name
            BT_50?: string, // StreetName
            BT_51?: string, // AdditionalStreetName
            BT_52?: string, // CityName
            BT_53?: string, // PostalZone
            BT_54?: string, // CountrySubentity
            BT_163?: string, // AddressLine Line
            BT_48?: string, // PartyTaxScheme CompanyID
            BT_47?: { value: string, schemeID?: BuyerLegalRegistrationIdentifierIdentificationSchemeIdentifier }, // PartyLegalEntity CompanyID
            BT_56?: string, // Contact Name
            BT_57?: string, // Contact Telephone
            BT_58?: string  // Contact ElectronicMail
        }): BUYER {
        return {
            'cac:Party': {
                //FIXME: EndpointID is only necessary in Peppol to be VAT Number
                'cbc:EndpointID':params.BT_49?.value,
                'cbc:EndpointID@schemeID': params.BT_49?.schemeID,
                'cac:PartyIdentification': params.BT_46 ? {
                    'cbc:ID': params.BT_46.value,
                    'cbc:ID@schemeID': params.BT_46.schemeID
                } : undefined,
                'cac:PartyName': params.BT_45 ? {
                    'cbc:Name': params.BT_45
                } : undefined,
                'cac:PostalAddress': {
                    'cbc:StreetName': params.BT_50,
                    'cbc:AdditionalStreetName': params.BT_51,
                    'cbc:CityName': params.BT_52,
                    'cbc:PostalZone': params.BT_53,
                    'cbc:CountrySubentity': params.BT_54,
                    'cac:AddressLine': params.BT_163 ? {
                        'cbc:Line': params.BT_163
                    } : undefined,
                    'cac:Country': {
                        'cbc:IdentificationCode': params.BT_55
                    }
                },
                'cac:PartyTaxScheme': params.BT_48 ? {
                    'cbc:CompanyID': params.BT_48,
                    'cac:TaxScheme': {
                        'cbc:ID': 'VAT'  // Default to VAT
                    }
                } : undefined,
                'cac:PartyLegalEntity': {
                    'cbc:RegistrationName': params.BT_44,
                    'cbc:CompanyID': params.BT_47?.value,
                    'cbc:CompanyID@schemeID': params.BT_47?.schemeID,
                },
                'cac:Contact': (params.BT_56 || params.BT_57 || params.BT_58) ? {
                    'cbc:Name': params.BT_56,
                    'cbc:Telephone': params.BT_57,
                    'cbc:ElectronicMail': params.BT_58
                } : undefined
            }
        };
    }


    private createPayeeParty(params:
        {
            // FIXME: Falls der Zahlungsempfänger anders als Verkäufer ist, dann muss BT_59 gesetzt werden bei CII
            BT_59: string,
            BT_60?: { value: string, schemeID?: PayeeOrBankAssignedCreditorIdentifierIdentificationSchemeIdentifier },
            BT_61?: { value: string, schemeID?: PayeeLegalRegistrationIdentifierIdentificationSchemeIdentifier },
            //FIXME: BT-90 is assigned via Bank and has a different Assignment in rsm 
            BT_90?: { value: string, schemeID: 'SEPA' },
        }): PAYEE {
        return {
            'cac:PartyIdentification': params.BT_60 ? {
                'cbc:ID': params.BT_60.value,
                'cbc:ID@schemeID': params.BT_60?.schemeID
            } : undefined,
            'cac:PartyName': {
                'cbc:Name': params.BT_59
            },
            'cac:PartyLegalEntity': params.BT_61 ? {
                'cbc:CompanyID': params.BT_61.value,
                'cbc:CompanyID@schemeID': params.BT_61.schemeID
            } : undefined
        };
    }

    private createTaxRepresentativeParty(params:
        {
            BT_69: TaxRepresentativeCountryCode,
            BT_63: string,
            BT_62: string,
            BT_64?: string,
            BT_65?: string,
            BT_66?: string,
            BT_67?: string,
            BT_68?: string,
            BT_164?: string,
        }): SELLERTAXREPRESENTATIVEPARTY {
        return {
            'cac:PartyName': {
                'cbc:Name': params.BT_62
            },
            'cac:PostalAddress': {
                'cbc:StreetName': params.BT_64,
                'cbc:AdditionalStreetName': params.BT_65,
                'cbc:CityName': params.BT_66,
                'cbc:PostalZone': params.BT_67,
                'cbc:CountrySubentity': params.BT_68,
                'cac:AddressLine': params.BT_164 ? {
                    'cbc:Line': params.BT_164
                } : undefined,
                'cac:Country': {
                    'cbc:IdentificationCode': params.BT_69
                }
            },
            'cac:PartyTaxScheme': {
                'cbc:CompanyID': params.BT_63,
                'cac:TaxScheme': {
                    "cbc:ID": 'VAT'
                }
            }
        };
    }

    private createDelivery(params:
        {
            BT_72?: string,
            BT_71?: { value?: string, schemeID?: DeliverToLocationIdentifierIdentificationSchemeIdentifier },
            BT_75?: string,
            BT_76?: string,
            BT_77?: string,
            BT_78?: string,
            BT_79?: string,
            BT_165?: string,
            BT_80?: DeliverToCountryCode,
            BT_70?: string
        }): DELIVERYINFORMATION {
        return {
            'cbc:ActualDeliveryDate': params.BT_72,
            'cac:DeliveryLocation': {
                'cbc:ID': params.BT_71?.value,
                'cbc:ID@schemeID': params.BT_71?.schemeID,
                'cac:Address': params.BT_80 ? {
                    'cbc:StreetName': params.BT_75,
                    'cbc:AdditionalStreetName': params.BT_76,
                    'cbc:CityName': params.BT_77,
                    'cbc:PostalZone': params.BT_78,
                    'cbc:CountrySubentity': params.BT_79,
                    'cac:AddressLine': params.BT_165 ? {
                        'cbc:Line': params.BT_165
                    } : undefined,
                    'cac:Country': {
                        'cbc:IdentificationCode': params.BT_80
                    }
                } : undefined
            },
            'cac:DeliveryParty': params.BT_70 ? {
                'cac:PartyName': {
                    'cbc:Name': params.BT_70
                }
            } : undefined
        };
    }

    /*
    cbc:NetworkID
    Card Network identifier, such as VISA, American Express, Master Card.
    <Value type="EXAMPLE">VISA</Value>
    */
    private createPaymentMeans(params: { BT_81: PaymentMeansTypeCode, BT_82?: string, BT_83?: string, BT_87?: string, NetworkID?: string, BT_88?: string, BT_84?: string, BT_85?: string, BT_86?: string, BT_89?: string, BT_91?: string }): PAYMENTINSTRUCTIONS[] {
        return [{
            'cbc:PaymentMeansCode': params.BT_81,
            'cbc:PaymentMeansCode@name': params.BT_82,
            'cbc:PaymentID': params.BT_83,
            'cac:CardAccount': (params.BT_87 && params.NetworkID) ? {
                'cbc:PrimaryAccountNumberID': params.BT_87,
                'cbc:NetworkID': params.NetworkID,
                'cbc:HolderName': params.BT_88
            } : undefined,
            'cac:PayeeFinancialAccount': params.BT_84 ? {
                'cbc:ID': params.BT_84,
                'cbc:Name': params.BT_85,
                'cac:FinancialInstitutionBranch': params.BT_86 ? {
                    'cbc:ID': params.BT_86
                } : undefined
            } : undefined,
            'cac:PaymentMandate': {
                'cbc:ID': params.BT_89,
                'cac:PayerFinancialAccount': params.BT_91 ? {
                    'cbc:ID': params.BT_91
                } : undefined
            }
        }];
    }

    // TODO: Add rule
    // n case the Amount due for payment ( params:BT-115) is positive, either the Payment due date ( params:BT-9) or the Payment terms ( params:BT-20) shall be present. Business terms: BT-20
    private createPaymentTerms(params: { BT_20: string }): PAYMENTTERMS {
        return {
            'cbc:Note': params.BT_20
        };
    }
    /**
     * Use “true” when informing about Charges and “false” when informing about Allowances.
     */
    private createAllowanceCharge(params:
        {
            ChargeIndicator: 'true' | 'false',
            BT_92?: string,  // Amount
            BT_99?: string,
            BT_5: InvoiceCurrencyCode,
            BT_95?: DocumentLevelAllowanceOrChargeVATCategoryCode,  // Tax Category ID
            BT_102?: DocumentLevelAllowanceOrChargeVATCategoryCode,
            BT_98?: DocumentLevelAllowanceOrChargeReasonCode,  // Allowance Reason Code
            BT_105?: DocumentLevelAllowanceOrChargeReasonCode, // Charge Reason Code
            BT_97?: string,  // Allowance Reason
            BT_104?: string, // Charge Reason
            BT_94?: string,  // Multiplier Factor Numeric
            BT_101?: string,
            BT_93?: string,  // Base Amount
            BT_100?: string,
            BT_96?: string,  // Tax Category Percent
            BT_103?: string
        }): DOCUMENTLEVELALLOWANCESANDCHARGES[] {
        return [{
            'cbc:ChargeIndicator': params.ChargeIndicator,
            'cbc:AllowanceChargeReasonCode': params.ChargeIndicator === 'true' ? params.BT_105 : params.BT_98,
            'cbc:AllowanceChargeReason': params.ChargeIndicator === 'true' ? params.BT_104 : params.BT_97,
            'cbc:MultiplierFactorNumeric': params.ChargeIndicator === 'true' ? params.BT_101 : params.BT_94,
            'cbc:Amount': params.ChargeIndicator === 'true' ? (params.BT_99 ? params.BT_99 : '') : (params.BT_92 ? params.BT_92 : ''),
            'cbc:Amount@currencyID': params.BT_5,
            'cbc:BaseAmount': params.ChargeIndicator === 'true' ? params.BT_100 : params.BT_93,
            'cbc:BaseAmount@currencyID': params.BT_5,
            'cac:TaxCategory': {
                'cbc:ID': params.ChargeIndicator === 'true' ? (params.BT_102 ? params.BT_102 : 'S') : (params.BT_95 ? params.BT_95 : 'S'),
                'cbc:Percent': params.ChargeIndicator === 'true' ? params.BT_103 : params.BT_96,
                'cac:TaxScheme': {
                    'cbc:ID': 'VAT'
                }
            }
        }];
    }


    private createTaxTotal(params: {
        BT_110: string,
        BT_5: InvoiceCurrencyCode,
        BT_116?: string[],
        BT_117?: string[],
        BT_118?: VATCategoryCode[],
        BT_119?: string[],
        BT_121?: VATExemptionReasonCode[],
        BT_120?: string[]
    }): [TAXTOTAL] {
        const taxSubtotals: any[] = [];

        if ((params.BT_116 && params.BT_116?.length > 0) &&
            (params.BT_117 && params.BT_117?.length > 0) &&
            (params.BT_118 && params.BT_118?.length > 0)) {

            params.BT_116.forEach((_, index) => {
                taxSubtotals.push({
                    'cbc:TaxableAmount': params.BT_116?.length ? params.BT_116[index] : undefined,
                    'cbc:TaxableAmount@currencyID': params.BT_5,
                    'cbc:TaxAmount': params.BT_117?.length ? params.BT_117[index] : undefined,
                    'cbc:TaxAmount@currencyID': params.BT_5,
                    'cac:TaxCategory': {
                        'cbc:ID': params.BT_118?.length ? params.BT_118[index] : undefined,
                        'cbc:Percent': params.BT_119?.length ? params.BT_119?.[index] : undefined,
                        'cbc:TaxExemptionReasonCode': params.BT_121?.length ? params.BT_121?.[index] : undefined,
                        'cbc:TaxExemptionReason': params.BT_120?.length ? params.BT_120?.[index] : undefined,
                        'cac:TaxScheme': {
                            'cbc:ID': 'VAT'
                        }
                    }
                });
            });
        }

        return [{
            'cbc:TaxAmount': params.BT_110,
            'cbc:TaxAmount@currencyID': params.BT_5,
            'cac:TaxSubtotal': taxSubtotals.length > 0 ? taxSubtotals : undefined
        }];
    }



    private createLegalMonetaryTotal(params: {
        BT_115: string,
        BT_106: string,
        BT_5: InvoiceCurrencyCode,
        BT_109: string,
        BT_112: string,
        BT_107?: string,
        BT_108?: string,
        BT_113?: string,
        BT_114?: string,
    }): DOCUMENTTOTALS {
        return {
            'cbc:LineExtensionAmount': params.BT_106,
            'cbc:LineExtensionAmount@currencyID': params.BT_5,
            'cbc:TaxExclusiveAmount': params.BT_109,
            'cbc:TaxExclusiveAmount@currencyID': params.BT_5,
            'cbc:TaxInclusiveAmount': params.BT_112,
            'cbc:TaxInclusiveAmount@currencyID': params.BT_5,
            'cbc:AllowanceTotalAmount': params.BT_107,
            'cbc:AllowanceTotalAmount@currencyID': params.BT_107 ? params.BT_5 : undefined,
            'cbc:ChargeTotalAmount': params.BT_108,
            'cbc:ChargeTotalAmount@currencyID': params.BT_108 ? params.BT_5 : undefined,
            'cbc:PrepaidAmount': params.BT_113,
            'cbc:PrepaidAmount@currencyID': params.BT_113 ? params.BT_5 : undefined,
            'cbc:PayableRoundingAmount': params.BT_114,
            'cbc:PayableRoundingAmount@currencyID': params.BT_114 ? params.BT_5 : undefined,
            'cbc:PayableAmount': params.BT_115,
            'cbc:PayableAmount@currencyID': params.BT_5
        };
    }

    private createInvoiceLine(params: {
        BT_5: InvoiceCurrencyCode,
        BT_126: string[],
        BT_127?: string,
        BT_128?: { value: string, schemeID: InvoiceLineObjectIdentifierIdentificationSchemeIdentifier },
        BT_129: string[],
        BT_130: InvoicedQuantityUnitOfMeasure[],
        BT_131: string[],
        BT_132?: string,
        BT_133?: string,
        BT_134?: string,
        BT_135?: string,
        BT_136?: string,
        BT_137?: string,
        BT_138?: string,
        BT_139?: LineLevelAllowanceOrChargeReason,
        BT_140?: LineLevelAllowanceOrChargeReasonCode,
        BT_141?: string,
        BT_142?: string,
        BT_143?: string,
        BT_144?: LineLevelAllowanceOrChargeReason,
        BT_145?: LineLevelAllowanceOrChargeReasonCode,
        BT_146: string[],
        BT_147?: string,
        BT_148?: string,
        BT_149?: string,
        BT_150?: ItemPriceBaseQuantityUnitOfMeasureCode,
        BT_151: InvoicedItemVATCategoryCode[],
        BT_152?: string[],
        BT_153: string[],
        BT_154?: string,
        BT_155?: string,
        BT_156?: string,
        BT_157?: { value: string, schemeID?: ItemStandardIdentifierIdentificationSchemeIdentifier },
        BT_158?: string,
        BT_159?: ItemCountryOfOrigin,
        BT_160?: string,
        BT_161?: string,
        ChargeIndicator?: 'true' | 'false'
    }): [INVOICELINE, ...INVOICELINE[]] {
        // Create an array of invoice lines based on the length of BT_126 (line IDs)
        return params.BT_126.map((_, index) => ({
            'cbc:ID': params.BT_126[index],
            'cbc:Note': params.BT_127,
            'cbc:InvoicedQuantity': params.BT_129[index],
            'cbc:InvoicedQuantity@unitCode': params.BT_130[index],
            'cbc:LineExtensionAmount': params.BT_131[index],
            'cbc:LineExtensionAmount@currencyID': params.BT_5,
            'cbc:AccountingCost': params.BT_133,
            'cac:InvoicePeriod': (params.BT_134 || params.BT_135) ? {
                'cbc:StartDate': params.BT_134,
                'cbc:EndDate': params.BT_135
            } : undefined,
            'cac:OrderLineReference': params.BT_132 ? {
                'cbc:LineID': params.BT_132
            } : undefined,
            'cac:DocumentReference': params.BT_128 ? {
                'cbc:ID': params.BT_128.value,
                'cbc:ID@schemeID': params.BT_128.schemeID,
                'cbc:DocumentTypeCode': '130'
            } : undefined,
            'cac:AllowanceCharge': params.ChargeIndicator && (params.BT_136 || params.BT_141) ? [{
                'cbc:ChargeIndicator': params.ChargeIndicator,
                'cbc:AllowanceChargeReasonCode': params.BT_140 || params.BT_145,
                'cbc:AllowanceChargeReason': params.BT_139 || params.BT_144,
                'cbc:MultiplierFactorNumeric': params.BT_138 || params.BT_143,
                'cbc:Amount': params.BT_136 || params.BT_141 || '0',
                'cbc:Amount@currencyID': params.BT_5,
                'cbc:BaseAmount': params.BT_137 || params.BT_142,
                'cbc:BaseAmount@currencyID': params.BT_5
            }] : undefined,
            'cac:Item': {
                'cbc:Description': params.BT_154,
                'cbc:Name': params.BT_153[index],
                'cac:BuyersItemIdentification': params.BT_156 ? {
                    'cbc:ID': params.BT_156
                } : undefined,
                'cac:SellersItemIdentification': params.BT_155 ? {
                    'cbc:ID': params.BT_155
                } : undefined,
                'cac:StandardItemIdentification': params.BT_157 ? {
                    'cbc:ID': params.BT_157.value,
                    'cbc:ID@schemeID': params.BT_157.schemeID,
                } : undefined,
                'cac:OriginCountry': params.BT_159 ? {
                    'cbc:IdentificationCode': params.BT_159
                } : undefined,
                'cac:CommodityClassification': params.BT_158 ? [{
                    'cbc:ItemClassificationCode': params.BT_158
                }] : undefined,
                'cac:ClassifiedTaxCategory': {
                    'cbc:ID': params.BT_151[index],
                    'cbc:Percent': params.BT_152?.[index],
                    'cac:TaxScheme': {
                        'cbc:ID': 'VAT'
                    }
                },
                'cac:AdditionalItemProperty': (params.BT_160 && params.BT_161) ? [{
                    'cbc:Name': params.BT_160,
                    'cbc:Value': params.BT_160
                }] : undefined
            },
            'cac:Price': {
                'cbc:PriceAmount': params.BT_146[index],
                'cbc:PriceAmount@currencyID': params.BT_5,
                'cbc:BaseQuantity': params.BT_149,
                'cbc:BaseQuantity@unitCode': params.BT_150,
                'cac:AllowanceCharge': params.BT_147 ? {
                    'cbc:ChargeIndicator': 'false',
                    'cbc:Amount': params.BT_147,
                    'cbc:Amount@currencyID': params.BT_147 ? params.BT_5 : undefined,
                    'cbc:BaseAmount': params.BT_148,
                    'cbc:BaseAmount@currencyID': params.BT_148 ? params.BT_5 : undefined
                } : undefined
            }
        })) as [INVOICELINE, ...INVOICELINE[]];
    }


}
