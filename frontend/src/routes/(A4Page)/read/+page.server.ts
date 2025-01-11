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
    // Detailed Form Validation Logging
    const form = await superValidate(event, zod(RechnungsAbsenderSchema));
    console.log(timestamp, 'Submit')
    const RechnungsDaten = { Absenderdaten: form.data }
    console.log('Rechnungsdaten: ', RechnungsDaten)

    // Enhanced Logging
    // console.log('Form Validation Result:', {
    //   success: form.valid,
    //   data: form.data,
    //   errors: form.errors
    // });

    // // Early return if form is invalid
    // if (!form.valid) {
    //   return fail(400, {
    //     form,
    //     message: 'Invalid form submission'
    //   });
    // }
    console.log(timestamp, form)
    return message(form, 'Form posted successfully!');

  }
}
