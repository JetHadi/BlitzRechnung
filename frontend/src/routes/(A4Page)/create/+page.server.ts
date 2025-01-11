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

// initialization of the form that we want to use
export const load: PageServerLoad = async () => {
  console.log("This should log just once and before page.ts")
  const headerForm = await superValidate(HeaderContainerDefaults, zod(headerContainerSchema))
  return { headerForm: headerForm }
}

export const actions: Actions = {
  default: async (event) => {
    const timestamp = new Date().toLocaleString();
    const form = await superValidate(event, zod(RechnungsAbsenderSchema));

    if (!form.valid) {
      return fail(400, { form });
    }

    const RechnungsDaten = { Absenderdaten: form.data };

    // Generate the print URL - adjust this to your actual print page URL
    const printUrl = `${event.url.origin}/read?data=${encodeURIComponent(JSON.stringify(RechnungsDaten))}`;

    try {
      const response = await event.fetch('/api/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ printUrl })
      });

      const result = await response.json();

      if (!result.success) {
        return fail(500, {
          form,
          message: 'PDF generation failed'
        });
      }

      return {
        form,
        success: true,
        pdfPath: result.pdfPath,
        message: 'Form posted and PDF generated successfully!'
      };

    } catch (error) {
      console.error('Error generating PDF:', error);
      return fail(500, {
        form,
        message: 'Failed to generate PDF'
      });
    }
  }
};
