import { z } from 'zod';

export const AdresseSchema = z.object({
    name: z.string().max(200).optional(),
    strasse: z.string().max(200).optional(),
    plz: z.string().max(5).optional(),
    ort: z.string().max(100).optional(),
});

export type AddressData = z.infer<typeof AdresseSchema>;