//frontend/src/routes/(A4Page)/create/+page.ts
import { RechnungsAbsenderSchema, type RechnungsAbsender } from '$lib/schema/rechnungsAbsender';
import { defaultRechnungsSender } from '$lib/types/rechnungsSender';
import type { PageLoad, PageServerLoad } from './$types';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

let localRechnungsAbsender: RechnungsAbsender = {
    name: '',
    strasse: '',
    plz: '',
    ort: '',
    // Optional fields can be left empty or undefined
    firma: '',
    email: '',
    telefon: '',
    steuernummer: '',
    ustid: '',
    logo: '',
    bankname: '',
    iban: '',
    bic: '',
    amtsgericht: '',
    hrb: ''
};

// initialization of the form that we want to use
export const load: PageServerLoad = async () => {
    // Initial page load data if needed
    const createForm = await superValidate({...defaultRechnungsSender},zod(RechnungsAbsenderSchema));
    localRechnungsAbsender = {...defaultRechnungsSender}
    return {
        createForm,
        localRechnungsAbsender
    };
  };