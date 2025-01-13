import { z } from 'zod';
import { AdresseSchema } from './adresse';

export const RechnungsAbsenderSchema = AdresseSchema.extend({
    firma: z.string().max(20).optional(),
    email: z.string().email().optional(),
    telefon: z.string().max(20).optional(),
    logo: z.string().url().optional(),
});

export const RechnungsAbsenderPaymenSchema = z.object({

    steuernummer: z.string().max(20).optional(),
    ustId: z.string().max(14).optional(),
    bankname: z.string().max(100).optional(),
    iban: z.string().min(15).max(34),
    bic: z.string().max(11).optional(),
    amtsgericht: z.string().max(100).optional(),
    hrb: z.string().max(50).optional()
})

export type RechnungsAbsenderType = z.infer<typeof RechnungsAbsenderSchema>;
export type RechnungsAbsenderPaymentType = z.infer<typeof RechnungsAbsenderPaymenSchema>;
