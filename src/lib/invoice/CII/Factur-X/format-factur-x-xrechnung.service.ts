import type { EInvoiceFormat } from "$lib/invoice/types";
import { type FXProfile, FULL_CII } from "../format-cii.service";
import { FormatFacturXService } from "./format-factur-x.service";

export class FormatFacturXXRechnungService
	extends FormatFacturXService
	implements EInvoiceFormat
{
	get customizationID(): string {
		return 'urn:cen.eu:en16931:2017#compliant#urn:xeinkauf.de:kosit:xrechnung_3.0';
	}

	get fxProfile(): FXProfile {
		return FULL_CII;
	}
}
