import { z } from 'zod';
import { AdresseSchema } from './adresse';

export const RechnungsAbsenderSchema = AdresseSchema.extend({
    firma: z.string().max(200).optional(),
    email: z.string().email().optional(),
    telefon: z.string().max(20).optional(),
    steuernummer: z.string().max(20).optional(),
    ustid: z.string().max(14).optional(),
    logo: z.string().url().optional(),
    bankname: z.string().max(100).optional(),
    iban: z.string().max(34).optional(),
    bic: z.string().max(11).optional(),
    amtsgericht: z.string().max(100).optional(),
    hrb: z.string().max(50).optional()
});

export type RechnungsAbsender = z.infer<typeof RechnungsAbsenderSchema>;
