import { z } from 'zod';

export const AdresseSchema = z.object({
    name: z.string().max(200),
    strasse: z.string().max(200),
    plz: z.string().max(5),
    ort: z.string().max(100),
});

export type AddressData = z.infer<typeof AdresseSchema>;