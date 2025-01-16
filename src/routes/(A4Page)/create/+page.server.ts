// frontend/src/routes/(A4Page)/create/+page.server.ts
import type { Actions } from "@sveltejs/kit";
import { superValidate, fail, message } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import type { PageServerLoad } from "./$types";
import { headerContainerSchema } from "$lib/schema/0_headerContainer";
import { HeaderContainerDefaults } from "$lib/types/0_headerContainerDefaults";
import { FirstSectionContainerDefaults } from "$lib/types/1_firstSectionContainerDefaults";
import { firstSectionContainerSchema } from "$lib/schema/1_firstSectionContainer";
import { A4RechnungSchema } from "$lib/schema/rechnung";
import { SecondSectionContainerDefaults } from "$lib/types/2_secondSectionContainerDefaults";
import { secondSectionContainerSchema } from "$lib/schema/2_secondSectionContainer";
import { mainSectionContainerSchema } from "$lib/schema/3_mainSectionContainer";
import { MainSectionContainerDefaults } from "$lib/types/3_mainSectionContainerDefaults";
import { FourthSectionContainerDefaults } from "$lib/types/4_fourthSectionContainerDefaults";
import { fourthSectionContainerSchema } from "$lib/schema/4_fourthSectionContainer";
import { FooterContainerDefaults } from "$lib/types/5_footerContainerDefaults";
import { footerContainerSchema } from "$lib/schema/5_footerContainer";
import { getUnitCode } from "$lib/utils";
import { randomUUID } from "crypto";

export const load: PageServerLoad = async () => {
  const startTime = performance.now();
  console.log("🚀 Starting page load at:", new Date().toISOString());

  const headerForm = await superValidate(HeaderContainerDefaults, zod(headerContainerSchema));
  const firstSectionForm = await superValidate(FirstSectionContainerDefaults, zod(firstSectionContainerSchema));
  const secondSectionForm = await superValidate(SecondSectionContainerDefaults, zod(secondSectionContainerSchema));
  const mainSectionForm = await superValidate(MainSectionContainerDefaults, zod(mainSectionContainerSchema));
  const fourthSectionForm = await superValidate(FourthSectionContainerDefaults, zod(fourthSectionContainerSchema));
  const footerForm = await superValidate(FooterContainerDefaults, zod(footerContainerSchema));

  console.log('UST: ', MainSectionContainerDefaults.RechnungsPositionen[0].ust)

  const loadTime = performance.now() - startTime;
  console.log(`✨ Page load completed in ${loadTime.toFixed(2)}ms`);

  return { headerForm: headerForm, firstSectionForm: firstSectionForm, secondSectionForm: secondSectionForm, mainSectionForm: mainSectionForm, fourthSectionForm: fourthSectionForm, footerForm: footerForm }
}

const calculateAmounts = (data) => {
  const positions = data.mainSectionForm.RechnungsPositionen.map(pos => ({
    ...pos,
    einheit: getUnitCode(pos.einheit) // Convert German label to code
  }));

  // Update the positions with converted units
  data.mainSectionForm.RechnungsPositionen = positions;
  let lineTotalAmount = 0;
  let taxTotalAmount = 0;

  // Calculate line totals and tax
  positions.forEach(pos => {
    const lineNet = pos.anzahl * pos.einheitspreis;
    const lineTax = lineNet * (pos.ustProzent / 100);
    lineTotalAmount += lineNet;
    taxTotalAmount += lineTax;
  });

  // Calculate grand total
  const grandTotalAmount = lineTotalAmount + taxTotalAmount;

  // Add calculated amounts and currency to the data
  data.calculatedAmounts = {
    currency: "EUR",
    lineTotalAmount: lineTotalAmount.toFixed(2),
    taxBasisTotalAmount: lineTotalAmount.toFixed(2),
    taxTotalAmount: taxTotalAmount.toFixed(2),
    grandTotalAmount: grandTotalAmount.toFixed(2),
    duePayableAmount: grandTotalAmount.toFixed(2)
  };

  return data;
};

export const actions: Actions = {
  default: async (event) => {
    const actionStart = performance.now();
    const requestId = randomUUID();
    console.log(`⚡ Action started at: ${new Date().toISOString()}`);
    // const formData = await event.request.formData();
    // console.log('Printing: ',jsonData)
    try {
      // Form Validation
      const validationStart = performance.now();

      const A4Form = await superValidate(event, zod(A4RechnungSchema));
      console.log('objectForm: ', A4Form)


      console.log(`📝 Form validation took: ${(performance.now() - validationStart).toFixed(2)}ms`);

      if (!A4Form.valid) {
        console.log('❌ Form validation failed');
        return fail(400, { objectForm: A4Form });
      }

      // Data Preparation
      const A4Data = JSON.stringify(A4Form.data) // passing down the whole header form to the url
      // console.log(A4Data)

      const printUrl = `${event.url.origin}/read?data=${encodeURIComponent(A4Data)}`;
      console.log('PrintURL', printUrl)

      // const RechnungsDaten = { Absenderdaten: form.data };

      // PDF Generation
      const pdfStart = performance.now();
      console.log('📄 Starting PDF generation request');

      const response = await event.fetch('/api/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ printUrl, requestId })
      });

      const result = await response.json();
      console.log(`📄 PDF generation took: ${(performance.now() - pdfStart).toFixed(2)}ms`);

      if (!result.success) {
        console.log('❌ PDF generation failed');
        return fail(500, {
          A4Form,
          message: 'PDF generation failed'
        });
      }



      // generate json for factur-x xml generation in FastAPI
      const PythonA4Data = calculateAmounts(A4Form.data);
      // console.log(PythonA4Data)
      const xmlResponse = await event.fetch('http://blitzrechnung-api:8000/generate-facturx', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Request-ID': requestId
        },
        body: JSON.stringify({
          ...PythonA4Data,
          requestId
        })
      });

      if (!xmlResponse.ok) {
        console.log('❌ XML generation failed');
        return fail(500, {
          A4Form,
          message: 'XML generation failed'
        });
      }

      const xmlContent = await xmlResponse.text();

      const totalTime = performance.now() - actionStart;
      console.log(`✅ Action completed successfully in ${totalTime.toFixed(2)}ms`);

      return {
        A4Form,
        success: true,
        pdfPath: result.pdfPath,
        xmlContent: xmlContent,
        message: `Form posted, PDF and XML generated successfully in ${totalTime.toFixed(2)}ms!`
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
