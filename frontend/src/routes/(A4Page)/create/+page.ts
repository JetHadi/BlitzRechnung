import { RechnungsAbsenderSchema, type RechnungsAbsender } from '$lib/schema/rechnungsAbsender';
import type { PageLoad } from './$types';
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

export const load: PageLoad = ({ }) => {
    return {
        localRechnungsAbsender
    };
};