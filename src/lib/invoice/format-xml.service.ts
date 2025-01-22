
import { create } from 'xmlbuilder2';
import type { InvoiceServiceOptions } from './types';
import { promises } from 'fs';


export class FormatXMLService {
	// TODO: replace with own logger for svelte
	//private readonly logger = new Logger(FormatXMLService.name);

	get mimeType(): string {
		return 'application/xml';
	}

	renderXML(data: object): string {
		this.cleanAttributes(data);

		return create({ encoding: 'utf-8' }, data).end({
			prettyPrint: true,
			indent: '\t',
		});
	}

	private cleanAttributes(data: { [key: string]: any }) {
		for (const property in data) {
			const [elem, attr] = property.split('@', 2);

			if (typeof attr !== 'undefined' && elem !== '') {
				if (typeof data[elem] === 'string') {
					data[elem] = {
						'#': data[elem],
					};
				}
				data[elem][`@${attr}`] = data[property];
				delete data[property];
			}

			if (typeof data[property] === 'object') {
				this.cleanAttributes(data[property]);
			}
		}
	}

	protected async getInvoicePdf(
		options: InvoiceServiceOptions,
	): Promise<Buffer> {
		if (!options.pdfPath) {
			throw new Error('Invoice PDF path is needed!');
		}
	
		try {
			// Read file directly from server filesystem as Buffer
			// This works for both PDFDocument.load() and base64 conversion
			return await promises.readFile(options.pdfPath);
		} catch (error: any) {
			throw new Error(`Failed to read PDF file: ${error.message}`);
		}
	}
}
