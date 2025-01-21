import type { BT_Mapping } from "$lib/types/businessTerms";
import { XMLParser } from "fast-xml-parser";
import { mappingBTCII } from "./CII/en16931/mapping";

// Function to extract and map XML data
function extractAndMapXML(xmlString: string, mapping: BT_Mapping) {
    // Configure parser options to handle text nodes
    const options = {
        ignoreAttributes: false,
        textNodeName: "#text"
    };
    
    const parser = new XMLParser(options);
    const result = parser.parse(xmlString);
    console.log(result)
    
    // Store mapped values in reverse to map against value of BTMapping
    const reverseMappings: { [path: string]: string } = {};
    Object.entries(mapping).forEach(([bt, path]) => {
        reverseMappings[path] = bt;
    });

    const extractedValues: { [bt: string]: string } = {};

    // Function to traverse XML and find matching paths
    function traverseObject(obj: any, currentPath: string = '') {
        console.log(obj)
        if (typeof obj !== 'object') return;
        
        for (const key in obj) {
            console.log(key)
            const newPath = currentPath ? `${currentPath}/${key}` : key;
            
            if (key === '#text') {
                // Check if parent path exists in our mapping
                if (reverseMappings[currentPath]) {
                    const btKey = reverseMappings[currentPath];
                    extractedValues[btKey] = obj[key];
                }
            } else {
                traverseObject(obj[key], newPath);
            }
        }
    }

    traverseObject(result);
    console.log('Extracted BT values:', extractedValues);
    return extractedValues;
}

// Example usage
const xmlExample = 'CII/BASIC/tests/factur-x.xml'
const mappedResults = extractAndMapXML(xmlExample, mappingBTCII);