import type { BT_Mapping } from "$lib/types/businessTerms";
import { XMLParser } from "fast-xml-parser";
import { mappingBTCII } from "./CII/Factur-X/en16931/mapping";
import { mappingBTUBL } from "./UBL/mapping";
import { readFileSync } from 'fs';

function extractAndMapXML(xmlString: string, mapping: BT_Mapping) {
    const options = {
        ignoreAttributes: false,
        textNodeName: "#text",
        attributeNamePrefix: "@_"
    };


    function getAttributeKey(obj: any): string | null {
        const attrKey = Object.keys(obj).find(key => key.startsWith('@_'));
        return attrKey ? attrKey : null;
    }


    const parser = new XMLParser(options);
    const result = parser.parse(xmlString);

    console.log(result)

    const reverseMappings: { [path: string]: string } = {};
    Object.entries(mapping).forEach(([bt, path]) => {
        reverseMappings[path] = bt;
    });

    const extractedValues: { [bt: string]: string | string[] } = {};

    // Initialize arrays for BTs that might contain multiple values
    Object.keys(mapping).forEach(bt => {
        extractedValues[bt] = [];
    });

    function traverseObject(obj: any, currentPath: string = '', isArray: boolean = false) {




        if (!obj || typeof obj !== 'object') {
            return;
        }

        if (Array.isArray(obj)) {
            obj.forEach((item) => {
                traverseObject(item, currentPath, true);
            });
            return;
        }

        for (const key in obj) {
            const newPath = currentPath ? `${currentPath}/${key}` : key;

            if (typeof obj[key] !== 'object') {

                if (key == '#text') {
                    // console.log(currentPath)
                    if (reverseMappings[currentPath]) {
                        const btKey = reverseMappings[currentPath];
                        const attributeKey = getAttributeKey(obj);
                        if (attributeKey) {
                            extractedValues[btKey] = obj[key] + '@' + obj[attributeKey];
                        } else {
                            extractedValues[btKey] = obj[key]
                        }
                    }
                } else if (reverseMappings[newPath]) {
                    const btKey = reverseMappings[newPath];
                    if (isArray) {
                        if (!Array.isArray(extractedValues[btKey])) {
                            extractedValues[btKey] = [];
                        }
                        (extractedValues[btKey] as string[]).push(obj[key]);
                    } else {
                        extractedValues[btKey] = obj[key];
                    }
                }
            } else {
                traverseObject(obj[key], newPath, isArray);
            }
        }
    }

    traverseObject(result);
    console.log(extractedValues)
    return extractedValues;
}


// Example usage
const xmlExample = 'src/lib/invoice/UBL/tests/base-example.xml'
const xmlData = readFileSync(xmlExample, 'utf8');

const mappedResults = extractAndMapXML(xmlData, mappingBTUBL);


// general accesors to get Business Term rules
interface XmlResponse {
    [key: string]: any;
}

const createAccessor = (key: string) => {
    return (xmlObj: XmlResponse): any => {
        const value = xmlObj[mappingBTUBL[key]];
        // const rules = xmlRules[key];
        return { value };
    };
};

const generateAccessors = (keys: string[], xmlObj: XmlResponse) => {
    return keys.reduce((acc, key) => {
        const value = xmlObj[mappingBTUBL[key]];
        // const rules = xmlRules[key];
        acc[key] = { value };
        return acc;
    }, {} as Record<string, { value: any; }>);
};

/* Usage
const businessTerms = generateAccessors(Object.keys(mapping_BT_UBL), xmlObj);

const BT_21 = businessTerms['BT-21'];  // Returns { value, rules }
const { value, rules } = businessTerms['BT-21'];
*/