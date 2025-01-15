The repo e-invoice-eu comes already with a NextJs endpoint to create e-invoices in the specified format /api/invoice/create/[format]

	async create(
		@Res() response: Response,
		@Param('format') format: string,
		@UploadedFiles()
		files: {
			invoice: Express.Multer.File[];
			data?: Express.Multer.File[];
			pdf?: Express.Multer.File[];
			attachment?: Express.Multer.File[];
		})

It is also possible with it to create PDF/A (ZUGFeRD) compliant invoices by applying the pdf parameter.


the only constraint is that the given json has to be in UBL format, for a sample invoice see sample/default-invoice.json