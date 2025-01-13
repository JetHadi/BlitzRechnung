// frontend/src/routes/api/generate-pdf/+server.ts
import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import puppeteer from 'puppeteer';
import { writeFile } from 'fs/promises';
import path from 'path';
import { mkdir } from 'fs/promises';

export const POST: RequestHandler = async ({ url, request }) => {
    try {
        const { printUrl } = await request.json();

        if (!printUrl) {
            throw error(400, 'Print URL is required');
        }

        // Ensure the PDFs directory exists
        const pdfDir = path.join(process.cwd(), 'static', 'pdfs');
        await mkdir(pdfDir, { recursive: true });

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

            const filename = `invoice-${timestamp.getFullYear()}${String(timestamp.getMonth() + 1).padStart(2, '0')}${String(timestamp.getDate()).padStart(2, '0')}-${String(timestamp.getHours()).padStart(2, '0')}${String(timestamp.getMinutes()).padStart(2, '0')}${String(timestamp.getSeconds()).padStart(2, '0')}.pdf`;
            const savePath = path.join(pdfDir, filename);
            await writeFile(savePath, pdf);

            return json({
                success: true,
                pdfPath: `/pdfs/${filename}`
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
