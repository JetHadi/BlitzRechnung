// frontend/src/routes/(A4Page)/read/+page.server.ts
import { superValidate, fail, message } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import type { PageServerLoad } from "./$types";
import { headerContainerSchema } from "$lib/schema/0_headerContainer";
import { HeaderContainerDefaults } from "$lib/types/headerContainerDefaults";
import { firstSectionContainerSchema } from "$lib/schema/1_firstSectionContainer";

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

  // console.log(A4Data)
  const headerForm = await superValidate(A4Data.headerForm, zod(headerContainerSchema));
  const firstSectionForm = await superValidate(A4Data.firstSectionForm, zod(firstSectionContainerSchema));

  console.log('Read Page - headerForm', headerForm)
  console.log('Read Page - firstSectionForm', firstSectionForm)

  return { headerForm: headerForm, firstSectionForm: firstSectionForm }
}
