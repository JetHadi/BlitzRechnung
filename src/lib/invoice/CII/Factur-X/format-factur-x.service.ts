// für weitere Infos https://github.com/Hopding/pdf-lib/issues/1183#issuecomment-2593629148
import type { EInvoiceFormat, InvoiceServiceOptions } from "$lib/invoice/types";
import type { Invoice } from "$lib/invoice/UBL/invoice.interface";
import { AFRelationship, PDFArray, PDFDict, PDFDocument, PDFHexString, PDFName, PDFNumber, PDFString } from "pdf-lib";
import { FormatCIIService, FULL_CII, type FXProfile } from "../format-cii.service";
import { colourProfile } from "./constants";
import { create } from "xmlbuilder2";
import type { XMLBuilder } from "xmlbuilder2/lib/interfaces";

type FacturXConformanceLevel =
	| 'MINIMUM'
	| 'BASIC WL'
	| 'BASIC'
	| 'EN 16931'
	| 'EXTENDED'
	| 'XRECHNUNG';

type FacturXFilename = 'factur-x.xml' | 'xrechnung.xml';

type InvoiceMeta = {
	conformanceLevel: FacturXConformanceLevel;
	version: string;
	filename: FacturXFilename;
	now: string;
	creator: string;
	producer: string;
	subject: string;
};



export class FormatFacturXService
	extends FormatCIIService
	implements EInvoiceFormat {
	get mimeType(): string {
		return 'application/pdf';
	}

	get fxProfile(): FXProfile {
		return FULL_CII;
	}

	async generate(
		invoice: Invoice,
		options: InvoiceServiceOptions,
	): Promise<string | Buffer> {

		const pdf = await this.getInvoicePdf(options);

		const pdfDoc = await PDFDocument.load(pdf, { updateMetadata: false });

		this.attachFiles(pdfDoc, options);

		const xml = (await super.generate(invoice, options)) as string;
		await this.attachFacturX(pdfDoc, options, xml);
		await this.createPDFA(pdfDoc, options, invoice);

		return Buffer.from(await pdfDoc.save({
			useObjectStreams: false,

		}));
	}


	private async attachFiles(pdfDoc: PDFDocument, options: InvoiceServiceOptions) {
		for (const attachment of options.attachments) {
			const arrayBuffer = await attachment.file.arrayBuffer();
			const uint8Array = new Uint8Array(arrayBuffer);

			pdfDoc.attach(uint8Array, attachment.file.name, {
				mimeType: attachment.file.type,
				description: attachment.description ?? 'Supplementary file',
				creationDate: new Date(),
				modificationDate: new Date(),
				afRelationship: AFRelationship.Supplement,
			});
		}
	}

	private async createPDFA(
		pdfDoc: PDFDocument,
		options: InvoiceServiceOptions,
		invoice: Invoice,
	): Promise<void> {
		let xmp = create();
		const bom = '\uFEFF';
		xmp = xmp.ins('xpacket', `begin="${bom}" id="W5M0MpCehiHzreSzNTczkc9d"`);

		let conformanceLevel: FacturXConformanceLevel;
		let version: string;
		let filename: FacturXFilename;

		switch (options.format.toLowerCase()) {
			case 'factur-x-minimum':
				filename = 'factur-x.xml';
				conformanceLevel = 'MINIMUM';
				version = '1.0';
				break;
			case 'factur-x-basicwl':
				filename = 'factur-x.xml';
				conformanceLevel = 'BASIC WL';
				version = '1.0';
				break;
			case 'factur-x-basic':
				filename = 'factur-x.xml';
				conformanceLevel = 'BASIC';
				version = '1.0';
				break;
			case 'factur-x-en16931':
				filename = 'factur-x.xml';
				conformanceLevel = 'EN 16931';
				version = '1.0';
				break;
			case 'factur-x-extended':
				filename = 'factur-x.xml';
				conformanceLevel = 'EXTENDED';
				version = '1.0';
				break;
			case 'factur-x-xrechnung':
				filename = 'xrechnung.xml';
				conformanceLevel = 'XRECHNUNG';
				version = '3.0';
				break;
			default:
				throw new Error(`unknown Factur-X format '${options.format}'`);
		}

		const now = new Date();
		const invoiceNumber = invoice['ubl:Invoice']['cbc:ID'];
		const invoiceCreator =
			invoice['ubl:Invoice']['cac:AccountingSupplierParty']['cac:Party'][
			'cac:PartyLegalEntity'
			]['cbc:RegistrationName'];
		const invoiceDate = invoice['ubl:Invoice']['cbc:IssueDate'];
		const invoiceSubject = `Rechnung ${invoiceNumber}, datiert vom ${invoiceDate}, ausgestellt von ${invoiceCreator}`;
		const invoiceMeta = {
			conformanceLevel,
			version,
			filename,
			creator: invoiceCreator,
			now: this.formatDateWithOffset(now),
			producer: 'Blitz-Rechnung - https://Blitz-Rechnung.de',
			subject: invoiceSubject,
		};

		this.addXmpMeta(xmp, invoiceMeta);
		xmp = xmp.ins('xpacket', 'end="w"');

		pdfDoc.setAuthor(invoiceMeta.creator);
		pdfDoc.setCreationDate(now);
		pdfDoc.setCreator(invoiceMeta.producer);
		pdfDoc.setKeywords(['Rechnung', 'Factur-X', 'ZUGFeRD']);
		pdfDoc.setLanguage(options.lang);
		pdfDoc.setModificationDate(now);
		pdfDoc.setProducer(invoiceMeta.producer);
		pdfDoc.setSubject(invoiceSubject);
		pdfDoc.setTitle(`${invoiceCreator}: Rechnung ${invoiceNumber}`);

		this.setTrailerInfoID(pdfDoc, invoiceMeta);
		this.setOutputIntent(pdfDoc);
		this.fixLinkAnnotations(pdfDoc);
		this.setMarkInfo(pdfDoc);
		this.setStructTreeRoot(pdfDoc);

		pdfDoc.context.enumerateIndirectObjects().forEach(([ref, obj]) => {
			if (obj instanceof PDFDict) {
				const fontEntry = Array.from(obj.entries()).find(([key, value]) => value.toString().includes("Font"))
				if (fontEntry) {
					obj.set(PDFName.of("CIDToGIDMap"), PDFName.of("Identity"))
				}
			}
		})

		this.addMetadata(
			pdfDoc,
			xmp.end({
				prettyPrint: true,
				indent: '\t',
				headless: true,
			}),
		);
	}

	private setStructTreeRoot(pdfDoc: PDFDocument) {
		const structTreedata = pdfDoc.context.obj({
			Type: PDFName.of('StructTreeRoot'),
		});
		const structTreeref = pdfDoc.context.register(structTreedata);
		pdfDoc.catalog.set(PDFName.of('StructTreeRoot'), structTreeref);
	}

	private setMarkInfo(pdfDoc: PDFDocument) {
		const rootref = pdfDoc.context.obj({ Marked: true });
		pdfDoc.catalog.set(PDFName.of('MarkInfo'), rootref);
	}

	private fixLinkAnnotations(pdfDoc: PDFDocument) {
		const pages = pdfDoc.getPages();
		for (const page of pages) {
			const annotations = page.node.get(PDFName.of('Annots'));

			if (annotations instanceof PDFArray) {
				for (let i = 0; i < annotations.size(); ++i) {
					const annotationRef = annotations.get(i);
					const annotation = page.node.context.lookup(annotationRef) as PDFDict;

					const subtype = annotation.get(PDFName.of('Subtype'));
					if (subtype === PDFName.of('Link')) {
						const flagsObj = annotation.get(PDFName.of('F'));
						const flags =
							flagsObj instanceof PDFNumber ? flagsObj.asNumber() : 0;

						annotation.set(PDFName.of('F'), PDFNumber.of(flags | 4));
					}
				}
			}
		}
	}

	private setOutputIntent(pdfDoc: PDFDocument) {
		const profile = this.base64ToUint8Array(colourProfile);
		const profileStream = pdfDoc.context.stream(profile, {
			Length: profile.length,
			N: 3 // WICHTIG für PDF/A-3B
		});

		const outputIntent = pdfDoc.context.obj({
			Type: 'OutputIntent',
			S: 'GTS_PDFA1',
			OutputConditionIdentifier: PDFString.of('sRGB IEC61966-2.1'),
			DestOutputProfile: pdfDoc.context.register(profileStream),
			Info: PDFString.of('sRGB IEC61966-2.1'),
			OutputCondition: PDFString.of('sRGB IEC61966-2.1')
		});

		pdfDoc.catalog.set(
			PDFName.of('OutputIntents'),
			pdfDoc.context.obj([pdfDoc.context.register(outputIntent)])
		);
	}


	private base64ToUint8Array(base64: string): Uint8Array {
		const binaryString = atob(base64);

		const len = binaryString.length;
		const uint8Array = new Uint8Array(len);

		for (let i = 0; i < len; i++) {
			uint8Array[i] = binaryString.charCodeAt(i);
		}

		return uint8Array;
	}

	private async setTrailerInfoID(
		pdfDoc: PDFDocument,
		invoiceMeta: InvoiceMeta,
	) {
		// Browser-kompatible Zufallsbytes-Generierung
		const randomBytes = new Uint8Array(16);
		globalThis.crypto.getRandomValues(randomBytes);

		const toHex = (bytes: Uint8Array) =>
			Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');

		const documentId = toHex(randomBytes);
		const id = PDFHexString.of(documentId);

		pdfDoc.context.trailerInfo.ID = pdfDoc.context.obj([id, id]);
	}




	private addXmpMeta(node: XMLBuilder, invoiceMeta: InvoiceMeta) {
		this.addRdf(
			node.ele('x:xmpmeta', { 'xmlns:x': 'adobe:ns:meta/' }),
			invoiceMeta,
		);
	}

	private addRdf(node: XMLBuilder, invoiceMeta: InvoiceMeta) {
		const rdf = node.ele('rdf:RDF', {
			'xmlns:rdf': 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
		});
		this.addPdfAidDescription(rdf);
		this.addPdfPurl(rdf, invoiceMeta);
		this.addProducer(rdf);
		this.addXap(rdf, invoiceMeta);
		this.addPdfAExtension(rdf);
		this.addFacturXStuff(rdf, invoiceMeta);
	}

	private addPdfAidDescription(node: XMLBuilder) {
		node
			.ele('rdf:Description', {
				'xmlns:pdfaid': 'http://www.aiim.org/pdfa/ns/id/',
				'rdf:about': '',
			})
			.ele('pdfaid:part')
			.txt('3')
			.up()
			.ele('pdfaid:conformance')
			.txt('B');
	}

	private addPdfPurl(node: XMLBuilder, invoiceMeta: InvoiceMeta) {
		node
			.ele('rdf:Description', {
				'xmlns:dc': 'http://purl.org/dc/elements/1.1/',
				'rdf:about': '',
			})
			.ele('dc:format')
			.txt('application/pdf')
			.up()
			.ele('dc:date')
			.ele('rdf:Seq')
			.ele('rdf:li')
			.txt(invoiceMeta.now)
			.up()
			.up()
			.up()
			.ele('dc:creator')
			.ele('rdf:Seq')
			.ele('rdf:li')
			.txt(invoiceMeta.creator);
	}

	private addProducer(node: XMLBuilder) {
		node
			.ele('rdf:Description', {
				'xmlns:pdf': 'http://ns.adobe.com/pdf/1.3/',
				'rdf:about': '',
			})
			.ele('pdf:Producer')
			.txt('https://Blitz-Rechnung.de')
			.up()
			.ele('pdf:PDFVersion')
			.txt('1.7');
	}

	private addXap(node: XMLBuilder, invoiceMeta: InvoiceMeta) {
		node
			.ele('rdf:Description', {
				'xmlns:xmp': 'http://ns.adobe.com/xap/1.0/',
				'rdf:about': '',
			})
			.ele('xmp:CreatorTool')
			.txt(invoiceMeta.creator)
			.up()
			.ele('xmp:CreateDate')
			.txt(invoiceMeta.now)
			.up()
			.ele('xmp:ModifyDate')
			.txt(invoiceMeta.now)
			.up()
			.ele('xmp:MetadataDate')
			.txt(invoiceMeta.now)
			.up();
	}

	private addPdfAExtension(node: XMLBuilder) {
		node
			.ele('rdf:Description', {
				'xmlns:pdfaExtension': 'http://www.aiim.org/pdfa/ns/extension/',
				'xmlns:pdfaSchema': 'http://www.aiim.org/pdfa/ns/schema#',
				'xmlns:pdfaProperty': 'http://www.aiim.org/pdfa/ns/property#',
				'rdf:about': '',
			})
			.ele('pdfaExtension:schemas')
			.ele('rdf:Bag')
			.ele('rdf:li', { 'rdf:parseType': 'Resource' })
			.ele('pdfaSchema:schema')
			.txt('Factur-X PDFA Extension Schema')
			.up()
			.ele('pdfaSchema:namespaceURI')
			.txt('urn:factur-x:pdfa:CrossIndustryDocument:invoice:1p0#')
			.up()
			.ele('pdfaSchema:prefix')
			.txt('fx')
			.up()
			.ele('pdfaSchema:property')
			.ele('rdf:Seq')
			.ele('rdf:li', { 'rdf:parseType': 'Resource' })
			.ele('pdfaProperty:name')
			.txt('DocumentFileName')
			.up()
			.ele('pdfaProperty:valueType')
			.txt('Text')
			.up()
			.ele('pdfaProperty:category')
			.txt('external')
			.up()
			.ele('pdfaProperty:description')
			.txt('Der Name des eingebetteten XML-Dokuments')
			.up()
			.up()
			.ele('rdf:li', { 'rdf:parseType': 'Resource' })
			.ele('pdfaProperty:name')
			.txt('DocumentType')
			.up()
			.ele('pdfaProperty:valueType')
			.txt('Text')
			.up()
			.ele('pdfaProperty:category')
			.txt('external')
			.up()
			.ele('pdfaProperty:description')
			.txt('Der englischsprachige Type des hybriden Dokuments in Großbuchstaben, z. B. INVOICE oder ORDER')
			.up()
			.up()
			.ele('rdf:li', { 'rdf:parseType': 'Resource' })
			.ele('pdfaProperty:name')
			.txt('Version')
			.up()
			.ele('pdfaProperty:valueType')
			.txt('Text')
			.up()
			.ele('pdfaProperty:category')
			.txt('external')
			.up()
			.ele('pdfaProperty:description')
			.txt('Die Version des Standards, dem das eingebettete XML-Dokument entspricht')
			.up()
			.up()
			.ele('rdf:li', { 'rdf:parseType': 'Resource' })
			.ele('pdfaProperty:name')
			.txt('ConformanceLevel')
			.up()
			.ele('pdfaProperty:valueType')
			.txt('Text')
			.up()
			.ele('pdfaProperty:category')
			.txt('external')
			.up()
			.ele('pdfaProperty:description')
			.txt('Der Konformitäts-Level des eingebetteten XML-Dokuments')
			.up()
			.up();
	}

	private addFacturXStuff(node: XMLBuilder, invoiceMeta: InvoiceMeta) {
		node
			.ele('rdf:Description', {
				'xmlns:fx': 'urn:factur-x:pdfa:CrossIndustryDocument:invoice:1p0#',
				'rdf:about': '',
			})
			.ele('fx:DocumentType')
			.txt('INVOICE')
			.up()
			.ele('fx:DocumentFileName')
			.txt(invoiceMeta.filename)
			.up()
			.ele('fx:Version')
			.txt(invoiceMeta.version)
			.up()
			.ele('fx:ConformanceLevel')
			.txt(invoiceMeta.conformanceLevel)
			.up();
	}

	private formatDateWithOffset(date: Date): string {
		const isoString = date.toISOString().split('.')[0]; // Remove milliseconds

		const offsetMinutes = date.getTimezoneOffset();

		const offsetHours = Math.floor(Math.abs(offsetMinutes) / 60);
		const offsetMin = Math.abs(offsetMinutes) % 60;

		const offsetSign = offsetMinutes <= 0 ? '+' : '-';
		const formattedOffset = `${offsetSign}${String(offsetHours).padStart(2, '0')}:${String(offsetMin).padStart(2, '0')}`;

		return `${isoString}${formattedOffset}`;
	}

	private addMetadata(pdfDoc: PDFDocument, xmp: string) {
		const xmpBytes = new TextEncoder().encode('\uFEFF' + xmp);
		const metadataStream = pdfDoc.context.stream(xmpBytes, {
			Type: 'Metadata',
			Subtype: 'XML',
			Length: xmpBytes.length,
		});

		pdfDoc.catalog.set(PDFName.of('Metadata'), pdfDoc.context.register(metadataStream));
	}


	private async attachFacturX(
		pdfDoc: PDFDocument,
		options: InvoiceServiceOptions,
		xml: string,
	): Promise<void> {
		try {
			const filename =
				options.format === 'factur-x-xrechnung'
					? 'xrechnung.xml'
					: 'factur-x.xml';

			pdfDoc.attach(Buffer.from(xml), filename, {
				mimeType: 'application/xml',
				description: 'Factur-X',
				creationDate: new Date(),
				modificationDate: new Date(),
				afRelationship: AFRelationship.Alternative,
			});
		} catch (error) {
			console.error('Error attaching string to PDF:', error);
			throw new Error('Error modifying PDF');
		}
	}
}
