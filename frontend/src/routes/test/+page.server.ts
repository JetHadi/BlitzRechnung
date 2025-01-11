import type { Actions } from "@sveltejs/kit";
import { z } from 'zod';

import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

import { message } from 'sveltekit-superforms';
import { fail } from '@sveltejs/kit';


const schema = z.object({
  name: z.string().default('Hello world!'),
  email: z.string().email().optional()
});


export const load = async () => {
  const form = await superValidate(zod(schema));

  // Always return { form } in load functions
  return { form };
};

export const actions = {
  default: async ({ request }) => {
    const form = await superValidate(request, zod(schema));
    const timestamp = new Date().toLocaleString();
    // console.log(form);

    if (!form.valid) {
      // Again, return { form } and things will just work.
      return fail(400, { form });
    }

    // TODO: Do something with the validated form.data

    // Display a success status message
    console.log(timestamp, 'form submitted')
    return message(form, 'Form posted successfully!');
  }
};