import type { PageLoad } from './$types';

let localRechnungsAbsender = {
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