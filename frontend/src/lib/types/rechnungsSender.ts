import type { RechnungsAbsender } from "$lib/schema/rechnungsAbsender";

export const defaultRechnungsSender: RechnungsAbsender = {
    firma: 'Your Company Name',
    strasse: 'Street Address',
    ort: 'City',
    plz: '12345',
    telefon: '+49 (0)123 456789',
    email: 'contact@example.com'
};