import { mapping_BT_UBL } from "./mapping";

interface XmlResponse {
    [key: string]: any;
}

const createAccessor = (key: string) => {
    return (xmlObj: XmlResponse): any => {
        const value = xmlObj[mapping_BT_UBL[key]];
        // const rules = xmlRules[key];
        return { value };
    };
};

const generateAccessors = (keys: string[], xmlObj: XmlResponse) => {
    return keys.reduce((acc, key) => {
      const value = xmlObj[mapping_BT_UBL[key]];
      // const rules = xmlRules[key];
      acc[key] = { value };
      return acc;
    }, {} as Record<string, { value: any;}>);
  };
  
/* Usage
const businessTerms = generateAccessors(Object.keys(mapping_BT_UBL), xmlObj);

const BT_21 = businessTerms['BT-21'];  // Returns { value, rules }
const { value, rules } = businessTerms['BT-21'];
*/