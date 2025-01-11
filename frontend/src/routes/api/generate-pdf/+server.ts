// /src/routes/api/generate-pdf/+server.ts
import { json, type RequestHandler } from '@sveltejs/kit';
import puppeteer from 'puppeteer';
import { writeFile } from 'fs/promises';
import path from 'path';

export const POST: RequestHandler = async ({ url, request }) => {
    try {
        // Get the print URL from the request body
        const { printUrl } = await request.json();
        
        console.log('Launching browser...');
        const browser = await puppeteer.launch({
            headless: 'shell',
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-gpu',
                '--remote-debugging-port=9222'
            ],
            executablePath: process.env.PUPPETEER_EXECUTABLE_PATH
        });

        console.log('Browser launched successfully');
        const page = await browser.newPage();

        // Use the provided URL with parameters
        console.log(`Navigating to: ${printUrl}`);
        await page.goto(printUrl, {
            waitUntil: 'networkidle0',
            timeout: 30000
        });

        console.log('Generating PDF...');
        const pdf = await page.pdf({
            format: 'A4',
            preferCSSPageSize: true,
            printBackground: true
        });

        await browser.close();
        console.log('Browser closed');

        const filename = `invoice-${Date.now()}.pdf`;
        const savePath = path.join(process.cwd(), 'static', 'pdfs', filename);

        console.log('PDF Save Path:', savePath);
        await writeFile(savePath, pdf);
        console.log(`PDF saved successfully: /pdfs/${filename}`);

        return json({
            success: true,
            pdfPath: `/pdfs/${filename}`
        });

    } catch (error) {
        console.error('PDF Generation Error:', {
            message: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : 'No stack trace',
            fullError: error
        });

        return json({
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
};

// Optional: Add GET endpoint for status checks
export const GET: RequestHandler = async () => {
    return json({
        status: 'PDF generation service is running'
    });
};
