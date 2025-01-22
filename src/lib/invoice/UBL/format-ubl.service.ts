import * as path from 'path';
import { FormatXMLService } from '../format-xml.service';
import type { EInvoiceFormat, InvoiceServiceOptions } from '../types';
import type { ADDITIONALSUPPORTINGDOCUMENTS, Invoice } from './invoice.interface';
import { invoiceSchema } from './invoice.schema';
import { sortBySchema } from '../utils/sort-by-schema';


export class FormatUBLService
	extends FormatXMLService
	implements EInvoiceFormat {
	get customizationID(): string {
		return 'urn:cen.eu:en16931:2017';
	}

	get profileID(): string {
		return 'urn:fdc:peppol.eu:2017:poacc:billing:01:1.0';
	}

	get syntax(): 'UBL' | 'CII' {
		return 'UBL';
	}

	fillInvoiceDefaults(invoice: Invoice) {
		if (!('cbc:customizationID' in invoice['ubl:Invoice'])) {
			invoice['ubl:Invoice']['cbc:CustomizationID'] = this.customizationID;
		}

		if (!('cbc:profileID' in invoice['ubl:Invoice'])) {
			invoice['ubl:Invoice']['cbc:ProfileID'] = this.profileID;
		}
	}

	async generate(
		invoice: Invoice,
		options: InvoiceServiceOptions,
	): Promise<string | Buffer> {
		await this.embedPDF(invoice, options);
		// this.embedAttachments(invoice, options);

		invoice = sortBySchema(invoice, invoiceSchema);

		const invoiceObject = {
			Invoice: {
				'@xmlns': 'urn:oasis:names:specification:ubl:schema:xsd:Invoice-2',
				'@xmlns:cac':
					'urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2',
				'@xmlns:cbc':
					'urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2',
				...invoice['ubl:Invoice'],
			},
		};

		return this.renderXML(invoiceObject);
	}

	/*
	embeds a PDF into the xml by converting it to base64-encoded binary object
	*/
	async embedPDF(invoice: Invoice, options: InvoiceServiceOptions) {
		if (typeof options.embedPDF === 'undefined') return;

		const pdfBuffer = await this.getInvoicePdf(options);
		const mimeType = 'application/pdf';

		// Generate filename from pdfPath or use a default
		const filename = options.pdfPath ?
			path.basename(options.pdfPath) :
			`${invoice['ubl:Invoice']['cbc:ID']}.pdf`;

		const ref: ADDITIONALSUPPORTINGDOCUMENTS = {
			'cbc:ID': options.pdfID ?? invoice['ubl:Invoice']['cbc:ID'],
			'cac:Attachment': {
				'cbc:EmbeddedDocumentBinaryObject': pdfBuffer.toString('base64'), // here the pdf get parsed into a base64-encoded binary object
				'cbc:EmbeddedDocumentBinaryObject@filename': filename,
				'cbc:EmbeddedDocumentBinaryObject@mimeCode': mimeType,
			},
		};

		if (options.pdfDescription) {
			ref['cbc:DocumentDescription'] = options.pdfDescription;
		}

		invoice['ubl:Invoice']['cac:AdditionalDocumentReference'] ??= [];
		invoice['ubl:Invoice']['cac:AdditionalDocumentReference'].push(ref);
	}

	/*
	TODO: Do I need embedded Attachments in my xml ?
	embedAttachments(invoice: Invoice, options: InvoiceServiceOptions) {
		const validMimeCodes: Set<AttachedDocumentMimeCode> = new Set([
			'text/csv',
			'application/pdf',
			'image/png',
			'image/jpeg',
			'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
			'application/vnd.oasis.opendocument.spreadsheet',
		]);

		for (const attachment of options.attachments) {
			const buffer = attachment.file.buffer;
			const mimeType: AttachedDocumentMimeCode = attachment.file
				.mimetype as AttachedDocumentMimeCode;
			if (!validMimeCodes.has(mimeType)) {
				throw new Error(
					`The attachment MIME type '${mimeType}' is not allowed!`,
				);
			}
			const filename = attachment.file.originalname;
			const id = attachment.id ?? filename;

			const ref: ADDITIONALSUPPORTINGDOCUMENTS = {
				'cbc:ID': id,
				'cac:Attachment': {
					'cbc:EmbeddedDocumentBinaryObject': buffer.toString('base64'),
					'cbc:EmbeddedDocumentBinaryObject@filename': filename,
					'cbc:EmbeddedDocumentBinaryObject@mimeCode': mimeType,
				},
			};

			if (typeof attachment.description !== 'undefined') {
				ref['cbc:DocumentDescription'] = attachment.description;
			}
			invoice['ubl:Invoice']['cac:AdditionalDocumentReference'] ??= [];
			invoice['ubl:Invoice']['cac:AdditionalDocumentReference'].push(ref);
		}
	}*/
}
