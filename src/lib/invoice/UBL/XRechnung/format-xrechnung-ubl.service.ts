import type { EInvoiceFormat } from "$lib/invoice/types";
import { FormatUBLService } from "../format-ubl.service";

export class FormatXRECHNUNGUBLService
	extends FormatUBLService
	implements EInvoiceFormat
{
	get customizationID(): string {
		return 'urn:cen.eu:en16931:2017#compliant#urn:xeinkauf.de:kosit:xrechnung_3.0';
	}
}
