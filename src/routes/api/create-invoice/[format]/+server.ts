// src/routes/api/generate-invoice/[format]/+server.ts
import { InvoiceService } from '$lib/invoice/invoice.service';
import type { InvoiceAttachment } from '$lib/invoice/types';
import type { Invoice } from '$lib/invoice/UBL/invoice.interface';
import { error, json } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';




export async function POST({ request, params }: RequestEvent) {
    try {
        const format = params.format.toLowerCase();
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
        const invoiceService = new InvoiceService()
        
        // Generate document
        const document = await invoiceService.generate(invoiceData, {
            format,
            data,
            pdf,
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
        
    } catch (err) {
        if (err instanceof ValidationError) {
            throw error(400, {
                message: 'Transformation failed.',
                details: err
            });
        }
        
        console.error(`Unknown error: ${err.message}\n${err.stack}`);
        throw error(500, 'Internal server error');
    }
}
