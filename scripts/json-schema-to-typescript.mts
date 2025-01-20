import { promises as fs } from 'fs';
import * as path from 'path';

const inputSchemaFilename = process.argv[2];
const outputSchemaFilename = process.argv[3];

generateCode(inputSchemaFilename, outputSchemaFilename);

async function generateCode(inputSchemaFilename, outputSchemaFilename) {

	const json = (await fs.readFile(inputSchemaFilename, 'utf-8')).trim();

	const parentDir = path.basename(path.dirname(inputSchemaFilename));

	const code =
		'/*\n' +
		` * This file is generated from 'inputSchemaFilename'.\n` +
		' * Do not edit!\n' +
		' */\n' +
		'\n' +
		`import type { JSONSchemaType } from 'ajv';\n` +
		`import type { Invoice} from './invoice.interface';\n` +
		'\n' +
		`export const ${parentDir}InvoiceSchema: JSONSchemaType<Invoice> = ${json}` +
		` as unknown as JSONSchemaType<Invoice>;\n`;

	await fs.writeFile(outputSchemaFilename, code);
}
