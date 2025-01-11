// frontend/src/routes/(A4Page)/read/+page.server.ts
import { superValidate, fail, message } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import type { PageServerLoad } from "./$types";
import { headerContainerSchema } from "$lib/schema/0_headerContainer";
import { HeaderContainerDefaults } from "$lib/types/headerContainerDefaults";

export const load: PageServerLoad = async ({ url }) => {
  // Get the data parameter from URL
  const data = url.searchParams.get('data');
  let headerContainer = {};

  if (data) {
    try {
      headerContainer = JSON.parse(decodeURIComponent(data));
    } catch (error) {
      console.error('Failed to parse URL data:', error);
    }
  }

  console.log(headerContainer)
  const headerForm = await superValidate(headerContainer.data, zod(headerContainerSchema));

  return {
    headerForm: headerForm,
  };
}
