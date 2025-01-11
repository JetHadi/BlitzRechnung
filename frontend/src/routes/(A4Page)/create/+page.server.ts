// frontend/src/routes/(A4Page)/create/+page.server.ts
import { RechnungsAbsenderSchema } from "$lib/schema/rechnungsAbsender";
import type { Actions } from "@sveltejs/kit";
import { superValidate, fail, message } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { writeFile } from 'fs/promises';
import path from 'path';
import puppeteer from "puppeteer";
import type { PageServerLoad } from "./$types";
import { headerContainerSchema } from "$lib/schema/0_headerContainer";
import { HeaderContainerDefaults } from "$lib/types/headerContainerDefaults";
import { FirstSectionContainerDefaults } from "$lib/types/firstSectionContainerDefaults";
import { firstSectionContainerSchema } from "$lib/schema/1_firstSectionContainer";

export const load: PageServerLoad = async () => {
  const startTime = performance.now();
  console.log("🚀 Starting page load at:", new Date().toISOString());

  const headerForm = await superValidate(HeaderContainerDefaults, zod(headerContainerSchema));
  const firstSectionForm = await superValidate(FirstSectionContainerDefaults, zod(firstSectionContainerSchema));

  const loadTime = performance.now() - startTime;
  console.log(`✨ Page load completed in ${loadTime.toFixed(2)}ms`);

  return { headerForm: headerForm, firstSectionForm: firstSectionForm }
}

export const actions: Actions = {
  default: async (event) => {
    const actionStart = performance.now();
    console.log(`⚡ Action started at: ${new Date().toISOString()}`);

    try {
      // Form Validation
      const validationStart = performance.now();
      const form = await superValidate(event, zod(RechnungsAbsenderSchema));
      console.log(`📝 Form validation took: ${(performance.now() - validationStart).toFixed(2)}ms`);

      if (!form.valid) {
        console.log('❌ Form validation failed');
        return fail(400, { form });
      }

      // Data Preparation
      const headerContainer = form // passing down the whole header form to the url
      const printUrl = `${event.url.origin}/read?data=${encodeURIComponent(JSON.stringify(headerContainer))}`;

      const RechnungsDaten = { Absenderdaten: form.data };

      // PDF Generation
      const pdfStart = performance.now();
      console.log('📄 Starting PDF generation request');

      const response = await event.fetch('/api/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ printUrl })
      });

      const result = await response.json();
      console.log(`📄 PDF generation took: ${(performance.now() - pdfStart).toFixed(2)}ms`);

      if (!result.success) {
        console.log('❌ PDF generation failed');
        return fail(500, {
          form,
          message: 'PDF generation failed'
        });
      }

      const totalTime = performance.now() - actionStart;
      console.log(`✅ Action completed successfully in ${totalTime.toFixed(2)}ms`);

      return {
        form,
        success: true,
        pdfPath: result.pdfPath,
        message: `Form posted and PDF generated successfully in ${totalTime.toFixed(2)}ms!`
      };

    } catch (error: any) {
      const errorTime = performance.now() - actionStart;
      console.error(`❌ Error after ${errorTime.toFixed(2)}ms:`, error);

      return fail(500, {
        form: error.form,
        message: 'Failed to generate PDF',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    } finally {
      const finalTime = performance.now() - actionStart;
      console.log(`🏁 Total action time: ${finalTime.toFixed(2)}ms`);
    }
  }
};
