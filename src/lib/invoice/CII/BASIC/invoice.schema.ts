/*
 * This file is generated from 'inputSchemaFilename'.
 * Do not edit!
 */

import type { JSONSchemaType } from 'ajv';
import type { Invoice} from './invoice.interface';

export const BASICInvoiceSchema: JSONSchemaType<Invoice> = {
	"$schema": "https://json-schema.org/draft/2019-09/schema",
    "$id": "BlitzRechnung/ZUGFeRD_BASIC",
    "type": "object",
    "additionalProperties": false,
    "properties": {
        "rsm:CrossIndustryInvoice": {"$ref": "#/$defs/CrossIndustryInvoiceType"}
    },
    "$defs": {
        "IDType": {
            "type": "object",
            "additionalProperties": false,
            "properties": {
                "Value": {"type": "string"},
                "schemeID": {"type": "string"}
            }
        },
        "DocumentContextParameterType": {
            "type": "object",
            "required": ["ram:ID"],
            "additionalProperties": false,
            "properties": {
                "ram:ID": {"$ref": "#/$defs/IDType"}
            }
        },
        "ExchangedDocumentContextType": {
            "type": "object",
            "required": ["ram:GuidelineSpecifiedDocumentContextParameter"],
            "additionalProperties": false,
            "properties": {
                "ram:BusinessProcessSpecifiedDocumentContextParameter": {"$ref": "#/$defs/DocumentContextParameterType"},
                "ram:GuidelineSpecifiedDocumentContextParameter": {"$ref": "#/$defs/DocumentContextParameterType"}
            }
        },
        "DocumentCodeType": {
            "type": "object",
            "additionalProperties": false,
            "properties": {
                "Value": {"type": "string"}
            }
        },
        "DateTimeType.udt:DateTimeString": {
            "type": "object",
            "required": ["format"],
            "additionalProperties": false,
            "properties": {
                "Value": {"type": "string"},
                "format": {"type": "string"}
            }
        },
        "DateTimeType": {
            "type": "object",
            "required": ["udt:DateTimeString"],
            "additionalProperties": false,
            "properties": {
                "udt:DateTimeString": {"$ref": "#/$defs/DateTimeType.udt:DateTimeString"}
            }
        },
        "TextType": {
            "type": "object",
            "additionalProperties": false,
            "properties": {
                "Value": {"type": "string"}
            }
        },
        "CodeType": {
            "type": "object",
            "additionalProperties": false,
            "properties": {
                "Value": {"type": "string"}
            }
        },
        "NoteType": {
            "type": "object",
            "required": ["ram:Content"],
            "additionalProperties": false,
            "properties": {
                "ram:Content": {"$ref": "#/$defs/TextType"},
                "ram:SubjectCode": {"$ref": "#/$defs/CodeType"}
            }
        },
        "ExchangedDocumentType": {
            "type": "object",
            "required": [
                "ram:ID",
                "ram:TypeCode",
                "ram:IssueDateTime"
            ],
            "additionalProperties": false,
            "properties": {
                "ram:ID": {"$ref": "#/$defs/IDType"},
                "ram:TypeCode": {"$ref": "#/$defs/DocumentCodeType"},
                "ram:IssueDateTime": {"$ref": "#/$defs/DateTimeType"},
                "ram:IncludedNote": {
                    "type": "array",
                    "items": {"$ref": "#/$defs/NoteType"},
                    "minItems": 0
                }
            }
        },
        "DocumentLineDocumentType": {
            "type": "object",
            "required": ["ram:LineID"],
            "additionalProperties": false,
            "properties": {
                "ram:LineID": {"$ref": "#/$defs/IDType"},
                "ram:IncludedNote": {"$ref": "#/$defs/NoteType"}
            }
        },
        "TradeProductType": {
            "type": "object",
            "required": ["ram:Name"],
            "additionalProperties": false,
            "properties": {
                "ram:GlobalID": {"$ref": "#/$defs/IDType"},
                "ram:Name": {"$ref": "#/$defs/TextType"}
            }
        },
        "AmountType": {
            "type": "object",
            "additionalProperties": false,
            "properties": {
                "Value": {"type": "number"},
                "currencyID": {"type": "string"}
            }
        },
        "QuantityType": {
            "type": "object",
            "additionalProperties": false,
            "properties": {
                "Value": {"type": "number"},
                "unitCode": {"type": "string"}
            }
        },
        "IndicatorType": {
            "type": "object",
            "required": ["udt:Indicator"],
            "additionalProperties": false,
            "properties": {
                "udt:Indicator": {"type": "boolean"}
            }
        },
        "PercentType": {
            "type": "object",
            "additionalProperties": false,
            "properties": {
                "Value": {"type": "number"}
            }
        },
        "AllowanceChargeReasonCodeType": {
            "type": "object",
            "additionalProperties": false,
            "properties": {
                "Value": {"type": "string"}
            }
        },
        "TaxTypeCodeType": {
            "type": "object",
            "additionalProperties": false,
            "properties": {
                "Value": {"type": "string"}
            }
        },
        "TaxCategoryCodeType": {
            "type": "object",
            "additionalProperties": false,
            "properties": {
                "Value": {"type": "string"}
            }
        },
        "TimeReferenceCodeType": {
            "type": "object",
            "additionalProperties": false,
            "properties": {
                "Value": {"type": "string"}
            }
        },
        "TradeTaxType": {
            "type": "object",
            "required": [
                "ram:TypeCode",
                "ram:CategoryCode"
            ],
            "additionalProperties": false,
            "properties": {
                "ram:CalculatedAmount": {"$ref": "#/$defs/AmountType"},
                "ram:TypeCode": {"$ref": "#/$defs/TaxTypeCodeType"},
                "ram:ExemptionReason": {"$ref": "#/$defs/TextType"},
                "ram:BasisAmount": {"$ref": "#/$defs/AmountType"},
                "ram:CategoryCode": {"$ref": "#/$defs/TaxCategoryCodeType"},
                "ram:ExemptionReasonCode": {"$ref": "#/$defs/CodeType"},
                "ram:DueDateTypeCode": {"$ref": "#/$defs/TimeReferenceCodeType"},
                "ram:RateApplicablePercent": {"$ref": "#/$defs/PercentType"}
            }
        },
        "TradeAllowanceChargeType": {
            "type": "object",
            "required": [
                "ram:ChargeIndicator",
                "ram:ActualAmount"
            ],
            "additionalProperties": false,
            "properties": {
                "ram:ChargeIndicator": {"$ref": "#/$defs/IndicatorType"},
                "ram:CalculationPercent": {"$ref": "#/$defs/PercentType"},
                "ram:BasisAmount": {"$ref": "#/$defs/AmountType"},
                "ram:ActualAmount": {"$ref": "#/$defs/AmountType"},
                "ram:ReasonCode": {"$ref": "#/$defs/AllowanceChargeReasonCodeType"},
                "ram:Reason": {"$ref": "#/$defs/TextType"},
                "ram:CategoryTradeTax": {"$ref": "#/$defs/TradeTaxType"}
            }
        },
        "TradePriceType": {
            "type": "object",
            "required": ["ram:ChargeAmount"],
            "additionalProperties": false,
            "properties": {
                "ram:ChargeAmount": {"$ref": "#/$defs/AmountType"},
                "ram:BasisQuantity": {"$ref": "#/$defs/QuantityType"},
                "ram:AppliedTradeAllowanceCharge": {"$ref": "#/$defs/TradeAllowanceChargeType"}
            }
        },
        "LineTradeAgreementType": {
            "type": "object",
            "required": ["ram:NetPriceProductTradePrice"],
            "additionalProperties": false,
            "properties": {
                "ram:GrossPriceProductTradePrice": {"$ref": "#/$defs/TradePriceType"},
                "ram:NetPriceProductTradePrice": {"$ref": "#/$defs/TradePriceType"}
            }
        },
        "LineTradeDeliveryType": {
            "type": "object",
            "required": ["ram:BilledQuantity"],
            "additionalProperties": false,
            "properties": {
                "ram:BilledQuantity": {"$ref": "#/$defs/QuantityType"}
            }
        },
        "SpecifiedPeriodType": {
            "type": "object",
            "additionalProperties": false,
            "properties": {
                "ram:StartDateTime": {"$ref": "#/$defs/DateTimeType"},
                "ram:EndDateTime": {"$ref": "#/$defs/DateTimeType"}
            }
        },
        "TradeSettlementLineMonetarySummationType": {
            "type": "object",
            "required": ["ram:LineTotalAmount"],
            "additionalProperties": false,
            "properties": {
                "ram:LineTotalAmount": {"$ref": "#/$defs/AmountType"}
            }
        },
        "LineTradeSettlementType": {
            "type": "object",
            "required": [
                "ram:ApplicableTradeTax",
                "ram:SpecifiedTradeSettlementLineMonetarySummation"
            ],
            "additionalProperties": false,
            "properties": {
                "ram:ApplicableTradeTax": {"$ref": "#/$defs/TradeTaxType"},
                "ram:BillingSpecifiedPeriod": {"$ref": "#/$defs/SpecifiedPeriodType"},
                "ram:SpecifiedTradeAllowanceCharge": {
                    "type": "array",
                    "items": {"$ref": "#/$defs/TradeAllowanceChargeType"},
                    "minItems": 0
                },
                "ram:SpecifiedTradeSettlementLineMonetarySummation": {"$ref": "#/$defs/TradeSettlementLineMonetarySummationType"}
            }
        },
        "SupplyChainTradeLineItemType": {
            "type": "object",
            "required": [
                "ram:AssociatedDocumentLineDocument",
                "ram:SpecifiedTradeProduct",
                "ram:SpecifiedLineTradeAgreement",
                "ram:SpecifiedLineTradeDelivery",
                "ram:SpecifiedLineTradeSettlement"
            ],
            "additionalProperties": false,
            "properties": {
                "ram:AssociatedDocumentLineDocument": {"$ref": "#/$defs/DocumentLineDocumentType"},
                "ram:SpecifiedTradeProduct": {"$ref": "#/$defs/TradeProductType"},
                "ram:SpecifiedLineTradeAgreement": {"$ref": "#/$defs/LineTradeAgreementType"},
                "ram:SpecifiedLineTradeDelivery": {"$ref": "#/$defs/LineTradeDeliveryType"},
                "ram:SpecifiedLineTradeSettlement": {"$ref": "#/$defs/LineTradeSettlementType"}
            }
        },
        "LegalOrganizationType": {
            "type": "object",
            "additionalProperties": false,
            "properties": {
                "ram:ID": {"$ref": "#/$defs/IDType"},
                "ram:TradingBusinessName": {"$ref": "#/$defs/TextType"}
            }
        },
        "CountryIDType": {
            "type": "object",
            "additionalProperties": false,
            "properties": {
                "Value": {"type": "string"}
            }
        },
        "TradeAddressType": {
            "type": "object",
            "required": ["ram:CountryID"],
            "additionalProperties": false,
            "properties": {
                "ram:PostcodeCode": {"$ref": "#/$defs/CodeType"},
                "ram:LineOne": {"$ref": "#/$defs/TextType"},
                "ram:LineTwo": {"$ref": "#/$defs/TextType"},
                "ram:LineThree": {"$ref": "#/$defs/TextType"},
                "ram:CityName": {"$ref": "#/$defs/TextType"},
                "ram:CountryID": {"$ref": "#/$defs/CountryIDType"},
                "ram:CountrySubDivisionName": {"$ref": "#/$defs/TextType"}
            }
        },
        "UniversalCommunicationType": {
            "type": "object",
            "required": ["ram:URIID"],
            "additionalProperties": false,
            "properties": {
                "ram:URIID": {"$ref": "#/$defs/IDType"}
            }
        },
        "TaxRegistrationType": {
            "type": "object",
            "required": ["ram:ID"],
            "additionalProperties": false,
            "properties": {
                "ram:ID": {"$ref": "#/$defs/IDType"}
            }
        },
        "TradePartyType": {
            "type": "object",
            "additionalProperties": false,
            "properties": {
                "ram:ID": {
                    "type": "array",
                    "items": {"$ref": "#/$defs/IDType"},
                    "minItems": 0
                },
                "ram:GlobalID": {
                    "type": "array",
                    "items": {"$ref": "#/$defs/IDType"},
                    "minItems": 0
                },
                "ram:Name": {"$ref": "#/$defs/TextType"},
                "ram:SpecifiedLegalOrganization": {"$ref": "#/$defs/LegalOrganizationType"},
                "ram:PostalTradeAddress": {"$ref": "#/$defs/TradeAddressType"},
                "ram:URIUniversalCommunication": {"$ref": "#/$defs/UniversalCommunicationType"},
                "ram:SpecifiedTaxRegistration": {
                    "type": "array",
                    "items": {"$ref": "#/$defs/TaxRegistrationType"},
                    "maxItems": 2,
                    "minItems": 0
                }
            }
        },
        "FormattedDateTimeType.DateTimeString": {
            "type": "object",
            "required": ["format"],
            "additionalProperties": false,
            "properties": {
                "Value": {"type": "string"},
                "format": {"type": "string"}
            }
        },
        "FormattedDateTimeType": {
            "type": "object",
            "required": ["DateTimeString"],
            "additionalProperties": false,
            "properties": {
                "DateTimeString": {"$ref": "#/$defs/FormattedDateTimeType.DateTimeString"}
            }
        },
        "ReferencedDocumentType": {
            "type": "object",
            "required": ["ram:IssuerAssignedID"],
            "additionalProperties": false,
            "properties": {
                "ram:IssuerAssignedID": {"$ref": "#/$defs/IDType"},
                "ram:FormattedIssueDateTime": {"$ref": "#/$defs/FormattedDateTimeType"}
            }
        },
        "HeaderTradeAgreementType": {
            "type": "object",
            "required": [
                "ram:SellerTradeParty",
                "ram:BuyerTradeParty"
            ],
            "additionalProperties": false,
            "properties": {
                "ram:BuyerReference": {"$ref": "#/$defs/TextType"},
                "ram:SellerTradeParty": {"$ref": "#/$defs/TradePartyType"},
                "ram:BuyerTradeParty": {"$ref": "#/$defs/TradePartyType"},
                "ram:SellerTaxRepresentativeTradeParty": {"$ref": "#/$defs/TradePartyType"},
                "ram:BuyerOrderReferencedDocument": {"$ref": "#/$defs/ReferencedDocumentType"},
                "ram:ContractReferencedDocument": {"$ref": "#/$defs/ReferencedDocumentType"}
            }
        },
        "SupplyChainEventType": {
            "type": "object",
            "required": ["ram:OccurrenceDateTime"],
            "additionalProperties": false,
            "properties": {
                "ram:OccurrenceDateTime": {"$ref": "#/$defs/DateTimeType"}
            }
        },
        "HeaderTradeDeliveryType": {
            "type": "object",
            "additionalProperties": false,
            "properties": {
                "ram:ShipToTradeParty": {"$ref": "#/$defs/TradePartyType"},
                "ram:ActualDeliverySupplyChainEvent": {"$ref": "#/$defs/SupplyChainEventType"},
                "ram:DespatchAdviceReferencedDocument": {"$ref": "#/$defs/ReferencedDocumentType"}
            }
        },
        "CurrencyCodeType": {
            "type": "object",
            "additionalProperties": false,
            "properties": {
                "Value": {"type": "string"}
            }
        },
        "PaymentMeansCodeType": {
            "type": "object",
            "additionalProperties": false,
            "properties": {
                "Value": {"type": "string"}
            }
        },
        "DebtorFinancialAccountType": {
            "type": "object",
            "required": ["ram:IBANID"],
            "additionalProperties": false,
            "properties": {
                "ram:IBANID": {"$ref": "#/$defs/IDType"}
            }
        },
        "CreditorFinancialAccountType": {
            "type": "object",
            "additionalProperties": false,
            "properties": {
                "ram:IBANID": {"$ref": "#/$defs/IDType"},
                "ram:ProprietaryID": {"$ref": "#/$defs/IDType"}
            }
        },
        "TradeSettlementPaymentMeansType": {
            "type": "object",
            "required": ["ram:TypeCode"],
            "additionalProperties": false,
            "properties": {
                "ram:TypeCode": {"$ref": "#/$defs/PaymentMeansCodeType"},
                "ram:PayerPartyDebtorFinancialAccount": {"$ref": "#/$defs/DebtorFinancialAccountType"},
                "ram:PayeePartyCreditorFinancialAccount": {"$ref": "#/$defs/CreditorFinancialAccountType"}
            }
        },
        "TradePaymentTermsType": {
            "type": "object",
            "additionalProperties": false,
            "properties": {
                "ram:Description": {"$ref": "#/$defs/TextType"},
                "ram:DueDateDateTime": {"$ref": "#/$defs/DateTimeType"},
                "ram:DirectDebitMandateID": {"$ref": "#/$defs/IDType"}
            }
        },
        "TradeSettlementHeaderMonetarySummationType": {
            "type": "object",
            "required": [
                "ram:LineTotalAmount",
                "ram:TaxBasisTotalAmount",
                "ram:GrandTotalAmount",
                "ram:DuePayableAmount"
            ],
            "additionalProperties": false,
            "properties": {
                "ram:LineTotalAmount": {"$ref": "#/$defs/AmountType"},
                "ram:ChargeTotalAmount": {"$ref": "#/$defs/AmountType"},
                "ram:AllowanceTotalAmount": {"$ref": "#/$defs/AmountType"},
                "ram:TaxBasisTotalAmount": {"$ref": "#/$defs/AmountType"},
                "ram:TaxTotalAmount": {
                    "type": "array",
                    "items": {"$ref": "#/$defs/AmountType"},
                    "maxItems": 2,
                    "minItems": 0
                },
                "ram:GrandTotalAmount": {"$ref": "#/$defs/AmountType"},
                "ram:TotalPrepaidAmount": {"$ref": "#/$defs/AmountType"},
                "ram:DuePayableAmount": {"$ref": "#/$defs/AmountType"}
            }
        },
        "TradeAccountingAccountType": {
            "type": "object",
            "required": ["ram:ID"],
            "additionalProperties": false,
            "properties": {
                "ram:ID": {"$ref": "#/$defs/IDType"}
            }
        },
        "HeaderTradeSettlementType": {
            "type": "object",
            "required": [
                "ram:InvoiceCurrencyCode",
                "ram:ApplicableTradeTax",
                "ram:SpecifiedTradeSettlementHeaderMonetarySummation"
            ],
            "additionalProperties": false,
            "properties": {
                "ram:CreditorReferenceID": {"$ref": "#/$defs/IDType"},
                "ram:PaymentReference": {"$ref": "#/$defs/TextType"},
                "ram:TaxCurrencyCode": {"$ref": "#/$defs/CurrencyCodeType"},
                "ram:InvoiceCurrencyCode": {"$ref": "#/$defs/CurrencyCodeType"},
                "ram:PayeeTradeParty": {"$ref": "#/$defs/TradePartyType"},
                "ram:SpecifiedTradeSettlementPaymentMeans": {
                    "type": "array",
                    "items": {"$ref": "#/$defs/TradeSettlementPaymentMeansType"},
                    "minItems": 0
                },
                "ram:ApplicableTradeTax": {
                    "type": "array",
                    "items": {"$ref": "#/$defs/TradeTaxType"},
                    "minItems": 1
                },
                "ram:BillingSpecifiedPeriod": {"$ref": "#/$defs/SpecifiedPeriodType"},
                "ram:SpecifiedTradeAllowanceCharge": {
                    "type": "array",
                    "items": {"$ref": "#/$defs/TradeAllowanceChargeType"},
                    "minItems": 0
                },
                "ram:SpecifiedTradePaymentTerms": {"$ref": "#/$defs/TradePaymentTermsType"},
                "ram:SpecifiedTradeSettlementHeaderMonetarySummation": {"$ref": "#/$defs/TradeSettlementHeaderMonetarySummationType"},
                "ram:InvoiceReferencedDocument": {
                    "type": "array",
                    "items": {"$ref": "#/$defs/ReferencedDocumentType"},
                    "minItems": 0
                },
                "ram:ReceivableSpecifiedTradeAccountingAccount": {"$ref": "#/$defs/TradeAccountingAccountType"}
            }
        },
        "SupplyChainTradeTransactionType": {
            "type": "object",
            "required": [
                "ram:IncludedSupplyChainTradeLineItem",
                "ram:ApplicableHeaderTradeAgreement",
                "ram:ApplicableHeaderTradeDelivery",
                "ram:ApplicableHeaderTradeSettlement"
            ],
            "additionalProperties": false,
            "properties": {
                "ram:IncludedSupplyChainTradeLineItem": {
                    "type": "array",
                    "items": {"$ref": "#/$defs/SupplyChainTradeLineItemType"},
                    "minItems": 1
                },
                "ram:ApplicableHeaderTradeAgreement": {"$ref": "#/$defs/HeaderTradeAgreementType"},
                "ram:ApplicableHeaderTradeDelivery": {"$ref": "#/$defs/HeaderTradeDeliveryType"},
                "ram:ApplicableHeaderTradeSettlement": {"$ref": "#/$defs/HeaderTradeSettlementType"}
            }
        },
        "CrossIndustryInvoiceType": {
            "type": "object",
            "required": [
                "rsm:ExchangedDocumentContext",
                "rsm:ExchangedDocument",
                "rsm:SupplyChainTradeTransaction"
            ],
            "additionalProperties": false,
            "properties": {
                "rsm:ExchangedDocumentContext": {"$ref": "#/$defs/ExchangedDocumentContextType"},
                "rsm:ExchangedDocument": {"$ref": "#/$defs/ExchangedDocumentType"},
                "rsm:SupplyChainTradeTransaction": {"$ref": "#/$defs/SupplyChainTradeTransactionType"}
            }
        }
    }
} as unknown as JSONSchemaType<Invoice>;
