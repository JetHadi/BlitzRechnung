import type { Invoice } from "./UBL/invoice.interface";

export type InvoiceServiceOptions = {
    /** The invoice format like `XRECHNUNG-UBL` or `Factur-X-Extended` */
    format: string;

    /** 
     * Path or ID to the PDF file on the server
     */
    pdfPath?: string;

    /** A language identifier like "fr-ca" */
    lang: string;

    /** An array of supplementary attachments */
    //TODO: is it necessary for attachment to be non-optional?
    attachments: InvoiceAttachment[];

    /** Set to invoice description if invoice should be embedded */
    embedPDF?: boolean;

    /** ID for an embedded PDF, defaults to the document id */
    pdfID?: string;

    /** Description for the embedded PDF */
    pdfDescription?: string;
};


export type InvoiceAttachment = {
	/**
	 * The uploaded file.
	 */
	file: File;

	/**
	 * An optional ID.
	 */
	id?: string;

	/**
	 * An optional description.
	 */
	description?: string;
};

export interface EInvoiceFormat {
	/**
	 * The default customization ID of that format.
	 */
	get customizationID(): string;

	/**
	 * The default profile ID of that format.
	 */
	get profileID(): string;

	/**
	 * The MIME type for that format.
	 */
	get mimeType(): string;

	/**
	 * One of 'UBL' or 'CII'.
	 */
	get syntax(): 'UBL' | 'CII';

	/**
	 * Fill default and computable values in mapping.
	 */
    // TODO: Check whether any kind of mapping is necessary
	// fillMappingDefaults(mapping: Mapping): void;

	/**
	 * Fill default and computable values in invoice.
	 */
	fillInvoiceDefaults(invoice: Invoice): void;

	/**
	 * Generate an invoice.
	 *
	 * @param data - the prepared data structure
	 *
	 * @returns the rendered invoice
	 */
	generate(
		invoice: Invoice,
		options: InvoiceServiceOptions,
	): Promise<string | Buffer>;
}