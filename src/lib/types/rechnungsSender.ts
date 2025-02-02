import type { RechnungsAbsenderPaymentType, RechnungsAbsenderType } from "$lib/schema/rechnungsAbsender";

export const defaultRechnungsSender: RechnungsAbsenderType = {
    absender_firma: 'Your Company Name',
    absender_strasse: 'Street Address',
    absender_ort: 'City',
    absender_plz: '12345',
    absender_telefon: '+49 (0)123 456789',
    absender_email: 'contact@example.com',
    absender_name: "", //TODO: AbsenderName ggf hier hinzufügen
    absender_kleinunternehmer: false
};

export const defaultRechnungsSenderPayment: RechnungsAbsenderPaymentType = {
    absender_iban: "DE38 1002 0030 3588 9126 02",
    absender_bic: 'BLITZEXXX',
    absender_bankname: 'GewitterBank',
    absender_ustId: 'DE123456789',
    absender_steuernummer: '1234567891012',
    absender_amtsgericht: "",
    absender_hrb: ""
}