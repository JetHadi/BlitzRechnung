import { Mapping_BT_UBL } from "./mapping";

interface XmlResponse {
    [key: string]: any;
}

interface XmlRules {
    [key: string]: any;
}

interface MappingObject {
    [key: string]: string;
}

// Factory function to create accessor functions used to access the values inside the XML and map them to the corresponding BT term
// can be used like this
/* Generate multiple accessors
const BT_21 = createAccessor('BT', '21');
const BT_22 = createAccessor('BT', '22');
const BG_01 = createAccessor('BG', '01'); 

for later usage to validate BT values against rules and to save them to database
*/

const createAccessor = (key: string) => {
    return (xmlObj: XmlResponse): any => {
        const value = xmlObj[Mapping_BT_UBL[key]];
        //const rules = xmlRules[key];
        return { value };
    };
};

const generateAccessors = (keys: string[]) => {
    return keys.reduce((acc, key) => {
        acc[key] = createAccessor(key);
        return acc;
    }, {} as Record<string, (xmlObj: XmlResponse) => any>);
};

export const accessors = generateAccessors(Object.keys(Mapping_BT_UBL));
/* Usage -- would then be used on the server, after the server has converted the xml into a json. client sends the xml to the server so the server can save it directly for achive
Returns { value, rules }
const result1 = accessors.BT_21(xmlObj);  // Returns { value, rules }
const result2 = accessors.BG_01(xmlObj);  
const result3 = accessors['BT_21'](xmlObj);
 */