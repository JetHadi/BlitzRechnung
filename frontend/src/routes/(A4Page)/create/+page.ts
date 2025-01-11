//frontend/src/routes/(A4Page)/create/+page.ts
import { RechnungsAbsenderSchema, type RechnungsAbsender } from '$lib/schema/rechnungsAbsender';
import type { RechnungsDaten } from '$lib/schema/rechnungsDaten';
import type { RechnungsEmpfaenger } from '$lib/schema/rechnungsEmpfaenger';
import { defaultRechnungsDaten } from '$lib/types/rechnungsDaten';
import { defaultRechnungsEmfpaenger } from '$lib/types/rechnungsEmpfaenger';
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

let localRechnungsEmpfaenger: RechnungsEmpfaenger = {
    name: '',
    strasse: '',
    plz: '',
    ort: '',
    // Optional fields can be left empty or undefined
    firma: '',
};

let localRechnungsDaten: RechnungsDaten = {
    rechnungsnummer: '',
    rechnungsdatum: new Date()
};

let localFormObject = {
    localRechnungsAbsender,
    localRechnungsEmpfaenger,
    localRechnungsDaten
}



// // initialization of the form that we want to use
// export const load : PageLoad = async (event) => {
//     // Initial page load data if needed
//     // const createForm = await superValidate({ ...defaultRechnungsSender }, zod(RechnungsAbsenderSchema));
//     localRechnungsAbsender = { ...defaultRechnungsSender }
//     localRechnungsEmpfaenger = { ...defaultRechnungsEmfpaenger }
//     localRechnungsDaten = { ...defaultRechnungsDaten }
//     console.log("Is it really logging twice????")
//     const timestamp = new Date().toLocaleString();
//     console.log(timestamp, '', event);
//     return {
//         createForm,
//         localFormObject,
//         localRechnungsAbsender,
//         localRechnungsEmpfaenger,
//         localRechnungsDaten
//     };
// };