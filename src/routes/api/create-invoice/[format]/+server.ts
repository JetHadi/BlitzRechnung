// src/routes/api/generate-invoice/[format]/+server.ts
import { FormatFactoryService } from '$lib/invoice/format.factory.service';
import { InvoiceService } from '$lib/invoice/invoice.service';
import type { InvoiceAttachment } from '$lib/invoice/types';
import type { Invoice } from '$lib/invoice/UBL/invoice.interface';
import { ValidationService } from '$lib/invoice/validation/validation.service';
import { error, json } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';
import { ValidationError } from 'ajv/dist/2019';




export async function POST({ request, params }: RequestEvent) {
    try {
        const format = (params.format as string).toLowerCase();
        const formData = await request.formData();

        // Get invoice data
        const invoiceFile = formData.get('invoice');
        if (!invoiceFile) {
            throw error(400, 'No invoice file uploaded');
        }

        // Parse invoice data
        const invoiceText = await (invoiceFile as File).text();
        const invoiceData = JSON.parse(invoiceText) as Invoice;

        // Get optional files
        const data = formData.get('data') as File | null;
        const pdf = formData.get('pdf') as File | null;
        const pdfPath = formData.get('pdfPath')?.toString() ?? '';

        // Get attachments
        const attachments: InvoiceAttachment[] = [];
        const attachmentFiles = formData.getAll('attachment') as File[];
        const attachmentIDs = formData.getAll('attachmentID') as string[];
        const attachmentDescriptions = formData.getAll('attachmentDescription') as string[];

        attachmentFiles.forEach((file, i) => {
            attachments.push({
                file,
                id: attachmentIDs[i],
                description: attachmentDescriptions[i]
            });
        });

        // Get other form fields
        const lang = formData.get('lang')?.toString() ?? 'en';
        const embedPDF = formData.get('embedPDF') === 'true';
        const pdfID = formData.get('pdfID')?.toString();
        const pdfDescription = formData.get('pdfDescription')?.toString();

        // TODO: maybe add Dependency Injection via Composition Root pattern for testing and lesser memory usage
        const formatFactoryService = new FormatFactoryService();
        const validationService = new ValidationService();
        const invoiceService = new InvoiceService(formatFactoryService, validationService);

        // Generate document
        const document = await invoiceService.generate(invoiceData, {
            format,
            pdfPath,
            lang,
            attachments,
            embedPDF,
            pdfID,
            pdfDescription
        });

        // Set appropriate content type
        const headers = new Headers({
            'Content-Type': typeof document === 'string'
                ? 'application/xml'
                : 'application/pdf'
        });

        return new Response(document, {
            status: 201,
            headers
        });

    } catch (err : any) {
        if (err instanceof ValidationError) {
            throw error(400, {
                message: `Transformation failed: ${JSON.stringify(err)}`
            });
        }

        console.error(`Unknown error: ${err.message}\n${err.stack}`);
        throw error(500, 'Internal server error');
    }
}
