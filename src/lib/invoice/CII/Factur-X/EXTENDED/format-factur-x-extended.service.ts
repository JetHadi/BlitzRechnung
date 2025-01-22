import type { EInvoiceFormat } from "$lib/invoice/types";
import { type FXProfile, FX_EXTENDED } from "../../format-cii.service";
import { FormatFacturXService } from "../format-factur-x.service";

export class FormatFacturXExtendedService
	extends FormatFacturXService
	implements EInvoiceFormat
{
	get customizationID(): string {
		return 'urn:cen.eu:en16931:2017#conformant#urn:factur-x.eu:1p0:extended';
	}

	get fxProfile(): FXProfile {
		return FX_EXTENDED;
	}
}
