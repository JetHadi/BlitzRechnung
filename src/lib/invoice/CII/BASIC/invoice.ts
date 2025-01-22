import { XMLBuilder } from "fast-xml-parser";
import type { DocumentContextParameterType, ExchangedDocumentContextType, ExchangedDocumentType, Invoice } from "./invoice.interface";

const options = {
    ignoreAttributes: false
}

/*
BT-Definitions
*/
const BT1 = 'BT1'

const builder = new XMLBuilder(options)

const ramGuidelineSpecifiedDocumentContextParameter: DocumentContextParameterType = {
    "ram:ID": 'urn:cen.eu:en16931:2017#compliant#urn:factur-x.eu:1p0:basic'
}

const rsmExchangedDocumentContext: ExchangedDocumentContextType = {
    "ram:GuidelineSpecifiedDocumentContextParameter": ramGuidelineSpecifiedDocumentContextParameter
}

const rsmExchangedDocument: ExchangedDocumentType = {
    "ram:ID": BT1,
    "ram:TypeCode": undefined,
    "ram:IssueDateTime": undefined
}

const xmlInvoice: Invoice = {
    "rsm:CrossIndustryInvoice": {
        'rsm:ExchangedDocumentContext': rsmExchangedDocumentContext,
        'rsm:ExchangedDocument': 
        'rsm:SupplyChainTradeTransaction':
    }
}


