// frontend/src/routes/api/generate-pdf/+server.ts
import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import puppeteer from 'puppeteer';
import { writeFile } from 'fs/promises';
import path from 'path';
import { mkdir } from 'fs/promises';

export const POST: RequestHandler = async ({ url, request }) => {
    try {
        const { printUrl, requestId } = await request.json();

        if (!printUrl || !requestId) {
            throw error(400, 'Print URL and requestId are required');
        }

        const browser = await puppeteer.launch({
            headless: 'shell',
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-gpu'
            ]
        });

        try {
            const page = await browser.newPage();
            await page.goto(printUrl, {
                waitUntil: 'networkidle0',
                timeout: 30000
            });

            const pdf = await page.pdf({
                format: 'A4',
                preferCSSPageSize: true,
                margin: {
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0
                },
                printBackground: true
            });

            const timestamp = new Date();

            // Use requestId in filename
            const filename = `invoice-${requestId}.pdf`;
            const pdfDir = path.join(process.cwd(), 'shared', 'pdfs');
            await mkdir(pdfDir, { recursive: true });

            const savePath = path.join(pdfDir, filename);
            await writeFile(savePath, pdf);

            return json({
                success: true,
                pdfPath: `shared/pdfs/${filename}`
            });

        } finally {
            await browser.close();
        }

    } catch (err) {
        console.error('PDF Generation Error:', err);
        throw error(500, {
            message: err instanceof Error ? err.message : 'PDF generation failed'
        });
    }
};
