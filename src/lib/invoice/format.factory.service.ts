import { FormatFacturXBasicWLService } from "./CII/Factur-X/BASIC-WL/format-factur-x-basic-wl.service";
import { FormatFacturXBasicService } from "./CII/Factur-X/BASIC/format-factur-x-basic.service";
import { FormatFacturXEN16931Service } from "./CII/Factur-X/en16931/format-factur-x-en16931.service";
import { FormatFacturXExtendedService } from "./CII/Factur-X/EXTENDED/format-factur-x-extended.service";
import { FormatFacturXMinimumService } from "./CII/Factur-X/format-factur-x-minimum.service";
import { FormatFacturXXRechnungService } from "./CII/Factur-X/format-factur-x-xrechnung.service";
import { FormatXRECHNUNGCIIService } from "./CII/Factur-X/XRechnung/format-xrechnung-cii.service";
import { FormatCIIService } from "./CII/format-cii.service";
import type { EInvoiceFormat } from "./types";
import { FormatUBLService } from "./UBL/format-ubl.service";
import { FormatXRECHNUNGUBLService } from "./UBL/XRechnung/format-xrechnung-ubl.service";

export class FormatFactoryService {
	private readonly formatServices: {
		[key: string]: new (...args: any[]) => EInvoiceFormat;
	} = {
		CII: FormatCIIService,
		'Factur-X-Basic': FormatFacturXBasicService,
		'Factur-X-BasicWL': FormatFacturXBasicWLService,
		'Factur-X-EN16931': FormatFacturXEN16931Service,
		'Factur-X-Extended': FormatFacturXExtendedService,
		'Factur-X-Minimum': FormatFacturXMinimumService,
		'Factur-X-XRechnung': FormatFacturXXRechnungService,
		UBL: FormatUBLService,
		'XRECHNUNG-CII': FormatXRECHNUNGCIIService,
		'XRECHNUNG-UBL': FormatXRECHNUNGUBLService,
	};
	private readonly formatServicesLookup: {
		[key: string]: new (...args: any[]) => EInvoiceFormat;
	} = {};

	createFormatService(format: string): EInvoiceFormat {
		const normalizedFormat = this.normalizeFormat(format);
		const FormatService = this.formatServicesLookup[normalizedFormat];

		if (!FormatService) {
			throw Error(`Format '${format}' not supported.`);
		}

		return new FormatService();
	}

	normalizeFormat(format: string): string {
		format = format.toLowerCase();
		format = format.replace(/-comfort$/, '-en16931');
		format = format.replace(/-basic-wl$/, '-basic-wl');
		format = format.replace(/^zugferd-/, 'factur-x-');

		return format;
	}
}
