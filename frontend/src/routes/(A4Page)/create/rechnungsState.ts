// frontend/src/lib/state/rechnungsState.ts
import { RechnungsAbsenderSchema } from '$lib/schema/rechnungsAbsender';
import type { z } from 'zod';

export const rechnungState = $state<z.infer<typeof RechnungsAbsenderSchema>>({
    name: '',
    strasse: '',
    plz: '',
    ort: '',
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
});
