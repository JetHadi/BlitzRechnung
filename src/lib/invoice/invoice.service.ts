import { Ajv2019, type ValidateFunction } from "ajv/dist/2019";
import type { Invoice } from "./UBL/invoice.interface";
import type { FormatFactoryService } from "./format.factory.service";
import { invoiceSchema } from "./UBL/invoice.schema";
import type { InvoiceServiceOptions } from "./types";
import type { ValidationService } from "./validation/validation.service";

export class InvoiceService {
	private readonly validator: ValidateFunction<Invoice>;

	constructor(
		private readonly formatFactoryService: FormatFactoryService,
		private readonly validationService: ValidationService,
	) {
		const ajv = new Ajv2019({
			strict: true,
			allErrors: true,
			useDefaults: true,
		});
		this.validator = ajv.compile(invoiceSchema);
	}

	async generate(
		input: unknown,
		options: InvoiceServiceOptions,
	): Promise<string | Buffer> {
		const invoice = this.validationService.validate(
			'invoice data',
			this.validator,
			input,
		);

		const formatter = this.formatFactoryService.createFormatService(
			options.format,
		);

		return formatter.generate(invoice, options);
	}
}
