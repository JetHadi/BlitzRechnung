import { z } from 'zod';

export const RechnungSchema = z.object({
    rechnungsnummer: z.string().trim(),
    rechnungsdatum: z.coerce.date(),
    leistungsdatum: z.coerce.date(),
    faelligkeitsdatum: z.coerce.date().optional()
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
export type RechnungFormData = z.infer<typeof RechnungSchema>;
