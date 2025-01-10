import { RechnungsAbsenderSchema } from "$lib/schema/rechnungsAbsender";
import type { Actions } from "@sveltejs/kit";
import { superValidate, fail } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { writeFile } from 'fs/promises';
import path from 'path';
import puppeteer from "puppeteer";

export const actions: Actions = {
  default: async (event) => {
    // Detailed Form Validation Logging
    const form = await superValidate(event, zod(RechnungsAbsenderSchema));

    // Enhanced Logging
    console.log('Form Validation Result:', {
      success: form.valid,
      data: form.data,
      errors: form.errors
    });

    // Early return if form is invalid
    if (!form.valid) {
      return fail(400, {
        form,
        message: 'Invalid form submission'
      });
    }

    try {
      // Verbose Browser Launch Logging
      console.log('Launching browser...');
      const browser = await puppeteer.launch({
        headless: 'shell',
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage', // Crucial for Docker
          '--disable-gpu',
          '--remote-debugging-port=9222'
        ],
        executablePath: process.env.PUPPETEER_EXECUTABLE_PATH
      });

      console.log('Browser launched successfully');
      const page = await browser.newPage();

      // Detailed Navigation Logging
      const fullUrl = `${event.url.origin}/create`;
      console.log(`Navigating to: ${fullUrl}`);

      await page.goto(fullUrl, {
        waitUntil: 'networkidle0',
        timeout: 30000 // Increased timeout for debugging
      });

      // PDF Generation Logging
      console.log('Generating PDF...');
      const pdf = await page.pdf({
        format: 'A4',
        preferCSSPageSize: true
      });

      // Close browser and log
      await browser.close();
      console.log('Browser closed');

      // Filename and Path Logging
      const filename = `route-${Date.now()}.pdf`;
      const savePath = path.join(process.cwd(), 'static', 'pdfs', filename);

      // Detailed File Saving Logging
      console.log('PDF Save Path:', savePath);
      await writeFile(savePath, pdf);
      console.log(`PDF saved successfully: /pdfs/${filename}`);

      return {
        success: true,
        pdfPath: `/pdfs/${filename}`
      };

    } catch (error) {
      // Comprehensive Error Logging
      console.error('PDF Generation Error:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : 'No stack trace',
        fullError: error
      });

      return {
        success: false,
        error: `PDF generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  }
};
