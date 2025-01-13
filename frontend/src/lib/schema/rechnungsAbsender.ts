import { z } from 'zod';
import { AdresseSchema } from './adresse';

export const RechnungsAbsenderSchema = z.object({
    absender_name: z.string().max(200),
    absender_strasse: z.string().min(2).max(200),
    absender_plz: z.string().length(5),
    absender_ort: z.string().min(2).max(100),
    absender_firma: z.string().max(20).optional(),
    absender_email: z.string().email().optional(),
    absender_telefon: z.string().max(20).optional(),
    absender_logo: z.string().url().optional(),
});

export const RechnungsAbsenderPaymenSchema = z.object({

    absender_steuernummer: z.string().max(20).optional(),
    absender_ustId: z.string().max(14).optional(),
    absender_bankname: z.string().max(100).optional(),
    absender_iban: z.string().min(15).max(34),
    absender_bic: z.string().max(11).optional(),
    absender_amtsgericht: z.string().max(100).optional(),
    absender_hrb: z.string().max(50).optional()
})

export type RechnungsAbsenderType = z.infer<typeof RechnungsAbsenderSchema>;
export type RechnungsAbsenderPaymentType = z.infer<typeof RechnungsAbsenderPaymenSchema>;
