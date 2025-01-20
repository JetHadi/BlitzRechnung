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
});
// Compile the schema
const validate = ajv.compile(BASICInvoiceSchema)

const parser = new XMLParser({
	ignoreAttributes: false,
	preserveOrder: true,
	alwaysCreateTextNode: false,
});

try {
    const jsonObj = parser.parse(xmlData)[1]['rsm:CrossIndustryInvoice'];
    console.log(jsonObj)
    // Validate the data
    const valid = validate(jsonObj)
    if (!valid) {
        console.log(validate.errors)
      }      
    // Work with parsed JSON object
  } catch (error) {
    console.error("Parsing failed:", error);
  }


