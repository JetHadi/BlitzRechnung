import type { RechnungsAbsenderPaymentType, RechnungsAbsenderType } from "$lib/schema/rechnungsAbsender";

export const defaultRechnungsSender: RechnungsAbsenderType = {
    firma: 'Your Company Name',
    strasse: 'Street Address',
    ort: 'City',
    plz: '12345',
    telefon: '+49 (0)123 456789',
    email: 'contact@example.com',
    name: ""
};

export const defaultRechnungsSenderPayment: RechnungsAbsenderPaymentType = {
    iban: "DE12 1234 1234 1234 1234 77",
    bic: 'BLITZEXXX',
    bankname: 'GewitterBank',
    ustId: 'DE123456789',
    steuernummer:'1234567891012'
}