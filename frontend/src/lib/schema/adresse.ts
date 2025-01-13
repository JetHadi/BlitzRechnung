import { z } from 'zod';

export const AdresseSchema = z.object({
    name: z.string().max(200),
    strasse: z.string().min(2).max(200),
    plz: z.string().min(5).max(5),
    ort: z.string().min(2).max(100),
});

export type AddressData = z.infer<typeof AdresseSchema>;