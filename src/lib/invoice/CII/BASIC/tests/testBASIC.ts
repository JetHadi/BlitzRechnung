import { BASICInvoiceSchema } from '../invoice.schema'
import { XMLParser } from 'fast-xml-parser';
import Ajv2019 from "ajv/dist/2019"
import { readFileSync } from 'fs';

// Read the XML file
const xmlData = readFileSync('src/lib/invoice/CII/BASIC/tests/factur-x.xml', 'utf8');


const ajv = new Ajv2019({
  strict: true,
  allErrors: true,
  useDefaults: true,
  allowUnionTypes: true,
});
// Compile the schema
const validate = ajv.compile(BASICInvoiceSchema)

const alwaysArrayTags = [
  'rsm:CrossIndustryInvoice.rsm:SupplyChainTradeTransaction.ram:IncludedSupplyChainTradeLineItem',
  'rsm:CrossIndustryInvoice.rsm:SupplyChainTradeTransaction.ram:ApplicableHeaderTradeSettlement.ram:ApplicableTradeTax',
  'rsm:CrossIndustryInvoice.rsm:SupplyChainTradeTransaction.ram:ApplicableHeaderTradeSettlement.ram:SpecifiedTradeSettlementHeaderMonetarySummation.ram:TaxTotalAmount',
];

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '',
  alwaysCreateTextNode: true,
  textNodeName: "Value",
  isArray: (name, jpath) => {
    return alwaysArrayTags.includes(jpath);
  }
});

try {
  const jsonObj = parser.parse(xmlData);
  // console.log(jsonObj['rsm:CrossIndustryInvoice']['rsm:SupplyChainTradeTransaction'])
  // console.log(jsonObj['rsm:CrossIndustryInvoice']['rsm:SupplyChainTradeTransaction']['ram:IncludedSupplyChainTradeLineItem'])
  // Validate the data
  const valid = validate(jsonObj)
  if (!valid) {
    console.log(validate.errors)
  }else{
    console.log('Passed Validation Check!')
  }
  // Work with parsed JSON object
} catch (error) {
  console.error("Parsing failed:", error);
}


