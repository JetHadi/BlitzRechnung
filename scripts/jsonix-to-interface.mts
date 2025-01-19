import * as fs from 'fs/promises';

type JsonObject = { [key: string]: any };

function transformJson(obj: JsonObject, refMap: Map<string, string> = new Map()): JsonObject {
  const newObj: JsonObject = {};

  for (const [key, value] of Object.entries(obj)) {
    if (key == 'definitions') {
      newObj[key] = transformJson(value, refMap)
    }
    if (key == 'anyOf') {
      value[0].properties.value["$ref"] = "#/definitions/rsm:CrossIndustryInvoiceType";
      newObj[key] = [...value]
      continue
    }
    if (value && typeof value === 'object') {
      console.log(key)
      // Check if the object has elementName with namespaceURI
      let namespace;
      try {
        namespace = value.elementName ? value.elementName.namespaceURI : value.typeName.namespaceURI;
      } catch (error) {
        console.log('Error', key);
      }

      const newKey = namespace ? `${namespace}:${key}` : key;

      // Store the mapping of old to new reference
      if (namespace && key.endsWith('Type')) {
        const oldRef = `#/definitions/${key}`;
        const newRef = `#/definitions/${namespace}:${key}`;
        refMap.set(oldRef, newRef);
      }

      // Handle allOf arrays and update references
      if (Array.isArray(value) && key === 'allOf') {
        newObj[key] = value.map(item => {
          if (item.$ref && refMap.has(item.$ref)) {
            return { ...item, $ref: refMap.get(item.$ref) };
          } else if (item.items && item.items.$ref && refMap.has(item.items.$ref)) {
            return {
              ...item,
              items: {
                ...item.items,
                $ref: refMap.get(item.items.$ref)
              }
            };
          }
          return item;
        });
      } else {
        // Recursively transform nested objects
        newObj[newKey] = transformJson(value, refMap);
      }

    } else {
      newObj[key] = value;
    }
  }

  return newObj;
}


async function processJsonFile(filePath: string) {
  try {
    // Read the file
    const fileContent = await fs.readFile(filePath, 'utf-8');

    // Parse JSON content
    const jsonData = JSON.parse(fileContent);

    // Transform the JSON
    const transformed = transformJson(jsonData);

    // Write the transformed JSON back to a file
    await fs.writeFile(
      'transformed2.json',
      JSON.stringify(transformed, null, 2)
    );

    console.log('Transformation complete. Check transformed.json');
  } catch (error) {
    console.error('Error processing file:', error);
  }
}

processJsonFile('../documentation/ZF232_DE/Schema/4. Factur-X_1.07.2_EXTENDED/output/PO.json');
