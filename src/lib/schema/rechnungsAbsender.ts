import { z } from 'zod';

export const RechnungsAbsenderSchema = z.object({
    absender_name: z.string().max(200),         // BT-27 (Name des Verkäufers)
    absender_strasse: z.string().min(2).max(200), // BT-35 (Zeile 1 der Verkäuferanschrift)
    absender_plz: z.string().length(5),         // BT-38 (Postleitzahl der Verkäuferanschrift)
    absender_ort: z.string().min(2).max(100),   // BT-37 (Stadt der Verkäuferanschrift)
    absender_firma: z.string().max(20),         // BT-28 (Handelsname des Verkäufers)
    absender_email: z.string().email(),         // BT-43 (E-Mail-Adresse der Kontaktstelle des Verkäufers)
    absender_telefon: z.string().max(20),       // BT-42 (Telefonnummer der Kontaktstelle des Verkäufers)
    absender_logo: z.string().url().optional(),            // No corresponding BT field
});


export const RechnungsAbsenderPaymenSchema = z.object({
    absender_steuernummer: z.string().max(20),  // BT-32 (Steuernummer des Verkäufers)
    absender_ustId: z.string().max(14),         // BT-31 (Umsatzsteuer-Identifikationsnummer des Verkäufers)
    absender_bankname: z.string().max(100),     // BT-85 (Name des Zahlungskontos)
    absender_iban: z.string().min(15).max(34),  // BT-84 (Kennung des Zahlungskontos)
    absender_bic: z.string().max(11),           // BT-86 (Kennung des Zahlungsdienstleisters)
    absender_amtsgericht: z.string().max(100),  // BT-33 (Sonstige rechtliche Informationen des Verkäufers)
    absender_hrb: z.string().max(50)            // BT-30 (Kennung der rechtlichen Registrierung des Verkäufers)
})


export type RechnungsAbsenderType = z.infer<typeof RechnungsAbsenderSchema>;
export type RechnungsAbsenderPaymentType = z.infer<typeof RechnungsAbsenderPaymenSchema>;
