// frontend/src/routes/(A4Page)/read/+page.server.ts
import { superValidate, fail, message } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import type { PageServerLoad } from "./$types";
import { headerContainerSchema } from "$lib/schema/0_headerContainer";
import { HeaderContainerDefaults } from "$lib/types/0_headerContainerDefaults";
import { firstSectionContainerSchema } from "$lib/schema/1_firstSectionContainer";
import { secondSectionContainerSchema } from "$lib/schema/2_secondSectionContainer";
import { mainSectionContainerSchema } from "$lib/schema/3_mainSectionContainer";
import { fourthSectionContainerSchema } from "$lib/schema/4_fourthSectionContainer";
import { footerContainerSchema } from "$lib/schema/5_footerContainer";

export const load: PageServerLoad = async ({ url }) => {
  // Get the data parameter from URL
  const data = url.searchParams.get('data');
  let A4Data = {};

  if (data) {
    try {
      A4Data = JSON.parse(decodeURIComponent(data));
    } catch (error) {
      console.error('Failed to parse URL data:', error);
    }
  }



  console.log(A4Data)
  const headerForm = await superValidate(A4Data.headerForm, zod(headerContainerSchema));
  const firstSectionForm = await superValidate(A4Data.firstSectionForm, zod(firstSectionContainerSchema));
  const secondSectionForm = await superValidate(A4Data.secondSectionForm, zod(secondSectionContainerSchema));
  const mainSectionForm = await superValidate(A4Data.mainSectionForm, zod(mainSectionContainerSchema));
  const fourthSectionForm = await superValidate(A4Data.fourthSectionForm, zod(fourthSectionContainerSchema));
  const footerForm = await superValidate(A4Data.footerForm, zod(footerContainerSchema));


  console.log('Read Page - headerForm', headerForm)
  console.log('Read Page - firstSectionForm', firstSectionForm)
  console.log('Read Page - secondSectionForm', secondSectionForm)
  console.log('Read Page - mainSectionForm', mainSectionForm)

  return { headerForm: headerForm, firstSectionForm: firstSectionForm, secondSectionForm: secondSectionForm, mainSectionForm: mainSectionForm, fourthSectionForm: fourthSectionForm, footerForm: footerForm }
}
