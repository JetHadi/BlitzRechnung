//frontend/src/routes/(A4Page)/create/+page.server.ts
import { RechnungsAbsenderSchema } from "$lib/schema/rechnungsAbsender";
import type { Actions } from "@sveltejs/kit";
import { superValidate, fail } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";

export const actions: Actions = {
    default: async (event) => {
      const form = await superValidate(event, zod(RechnungsAbsenderSchema));
      
      console.log(form)

      if (!form.valid) {
        return fail(400, {
          form,
        });
      }
      return {
        form
      };
    },
  };