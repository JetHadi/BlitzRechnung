// TODO: remove unecessary files and clean up directories
import { BASICInvoiceSchema } from '../invoice.schema'
import { XMLParser } from 'fast-xml-parser';
import Ajv2019 from "ajv/dist/2019"
import { readFileSync } from 'fs';
import { XmlParser, Xslt } from 'xslt-processor';

import fs from 'fs';
import path from 'path';

// Read the XML file

// const xmlData = readFileSync('src/lib/invoice/CII/BASIC/tests/factur-x.xml', 'utf8');
// const xslData = readFileSync('src/lib/invoice/CII/BASIC/tests/_XSLT_BASIC/FACTUR-X_BASIC.xslt', 'utf8');

// const xslt = new Xslt();
const xmlParser = new XmlParser();


// async function validateXML() {
//   try {
//     // Create absolute paths
//     const absoluteXmlPath = 'file:///' + path.resolve('src/lib/invoice/CII/BASIC/tests/factur-x.xml').replace(/\\/g, '/');
//     const absoluteXslPath = 'file:///' + path.resolve('src/lib/invoice/CII/BASIC/tests/_XSLT_BASIC/FACTUR-X_BASIC.xslt').replace(/\\/g, '/');

//     // Read the file contents
//     const xmlData = fs.readFileSync(absoluteXmlPath.replace('file:///', ''), 'utf8');
//     const xslData = fs.readFileSync(absoluteXslPath.replace('file:///', ''), 'utf8');

//     // Parse the file contents
//     const xmlDoc = xmlParser.xmlParse(xmlData);
//     const xsltDoc = xmlParser.xmlParse(xslData);

//     // Set base URIs
//     xmlDoc.baseURI = absoluteXmlPath;
//     xsltDoc.baseURI = absoluteXslPath;

//     // Process transformation
//     const svrlResult = await xslt.xsltProcess(xmlDoc, xsltDoc);

//     // Save results
//     fs.writeFileSync('validation-result.xml', svrlResult);

//     // Parse SVRL to check validation status
//     const svrlDoc = xmlParser.xmlParse(svrlResult);
//     const failedAsserts = svrlDoc.getElementsByTagName('svrl:failed-assert');

//     if (failedAsserts.length > 0) {
//       console.log('Validation failed with', failedAsserts.length, 'errors');
//     } else {
//       console.log('Validation passed successfully');
//     }

//   } catch (error) {
//     console.error('Validation process failed:', error);
//     if (error.code === 'ENOENT') {
//       console.error('File not found. Check paths:', {
//         xmlPath,
//         xslPath
//       });
//     }
//   }
// }

// Call the async function
// validateXML();

import { registerCustomXPathFunction, Schema } from 'node-schematron';
import { DOMParser } from '@xmldom/xmldom';

// Register document() function
registerCustomXPathFunction(
  {
    localName: 'document',
    namespaceURI: 'http://www.w3.org/2005/xpath-functions'
  },
  ['xs:string'],
  'node()',
  (domFacade, documentURI) => {
    try {
      const xml = readFileSync(documentURI, 'utf-8');
      const parser = new DOMParser();
      const doc = parser.parseFromString(xml, 'text/xml');
      // Return the document node
      return doc.documentElement;
    } catch (error) {
      console.error(`Error loading document ${documentURI}:`, error);
      return null;
    }
  }
);

// Load and validate schema
async function validateFacturX(schematronPath: string, xmlPath: string) {
  try {
    // Read schema file
    const schematronContent = readFileSync(schematronPath, 'utf-8');

    // Create schema instance
    const schema = await Schema.fromString(schematronContent, {
      fetchReference: (href) => readFileSync(href, 'utf-8')
    });

    // Read and validate XML
    const xmlContent = readFileSync(xmlPath, 'utf-8');
    const results = schema.validateString(xmlContent, { debug: true });

    return results;
  } catch (error) {
    console.error('Validation error:', error);
    throw error;
  }
}

// Usage
validateFacturX(
  './Factur-X_1.07.2_EN16931.sch',
  './factur-x-en16931.xml'
).then(results => {
  console.log('Validation results:', results);
}).catch(error => {
  console.error('Error:', error);
});






// const ajv = new Ajv2019({
//   strict: true,
//   allErrors: true,
//   useDefaults: true,
//   allowUnionTypes: true,
// });
// // Compile the schema
// const validate = ajv.compile(BASICInvoiceSchema)

// const alwaysArrayTags = [
//   'rsm:CrossIndustryInvoice.rsm:SupplyChainTradeTransaction.ram:IncludedSupplyChainTradeLineItem',
//   'rsm:CrossIndustryInvoice.rsm:SupplyChainTradeTransaction.ram:ApplicableHeaderTradeSettlement.ram:ApplicableTradeTax',
//   'rsm:CrossIndustryInvoice.rsm:SupplyChainTradeTransaction.ram:ApplicableHeaderTradeSettlement.ram:SpecifiedTradeSettlementHeaderMonetarySummation.ram:TaxTotalAmount',
// ];

// const parser = new XMLParser({
//   ignoreAttributes: false,
//   attributeNamePrefix: '',
//   alwaysCreateTextNode: true,
//   textNodeName: "Value",
//   isArray: (name, jpath) => {
//     return alwaysArrayTags.includes(jpath);
//   }
// });

// try {
//   const jsonObj = parser.parse(xmlData);
//   // console.log(jsonObj['rsm:CrossIndustryInvoice']['rsm:SupplyChainTradeTransaction'])
//   // console.log(jsonObj['rsm:CrossIndustryInvoice']['rsm:SupplyChainTradeTransaction']['ram:IncludedSupplyChainTradeLineItem'])
//   // Validate the data
//   const valid = validate(jsonObj)
//   if (!valid) {
//     console.log(validate.errors)
//   } else {
//     console.log('Passed Validation Check!')
//   }
//   // Work with parsed JSON object
// } catch (error) {
//   console.error("Parsing failed:", error);
//}

