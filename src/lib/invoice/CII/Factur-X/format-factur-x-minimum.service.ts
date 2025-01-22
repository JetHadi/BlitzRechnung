import type { EInvoiceFormat } from "$lib/invoice/types";
import { type FXProfile, FX_MINIMUM } from "../format-cii.service";
import { FormatFacturXService } from "./format-factur-x.service";

export class FormatFacturXMinimumService
	extends FormatFacturXService
	implements EInvoiceFormat
{
	get customizationID(): string {
		return 'urn:factur-x.eu:1p0:minimum';
	}

	get fxProfile(): FXProfile {
		return FX_MINIMUM;
	}
}
