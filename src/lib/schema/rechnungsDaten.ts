import { z } from 'zod';

// TODO: fix condition that either date has to be present
export const RechnungSchema = z.object({
    rechnungsnummer: z.string().trim(),     // BT-1 (Rechnungsnummer)
    rechnungsdatum: z.coerce.date(),        // BT-2 (Rechnungsdatum)
    leistungsdatum: z.coerce.date().optional(),        // BT-72 (Tatsächliches Lieferdatum)
    faelligkeitsdatum: z.coerce.date().optional()      // BT-9 (Fälligkeitsdatum der Zahlung)
}).superRefine((data, ctx) => {
    // Only perform validation if faelligkeitsdatum is present
    if (data.faelligkeitsdatum) {
        if (data.faelligkeitsdatum < data.rechnungsdatum) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Das Fälligkeitsdatum kann nicht vor dem Rechnungsdatum liegen.",
                path: ["faelligkeitsdatum"]
            });
        }
    }
});

// Type inference for TypeScript
export type RechnungsDaten = z.infer<typeof RechnungSchema>;
