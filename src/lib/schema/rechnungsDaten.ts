import { z } from 'zod';

const requiredField = (fieldName: string) => ({
    required_error: `${fieldName} ist erforderlich`,
    invalid_type_error: `${fieldName} muss ein Text sein`
});

export const RechnungSchema = z.object({
    rechnungsnummer: z.string(requiredField("Rechnungsnummer"))
        .min(1, { message: "Rechnungsnummer muss mindestens 1 Zeichen lang sein" })
        .max(50, { message: "Rechnungsnummer darf maximal 50 Zeichen lang sein" }), // BT-1 (Rechnungsnummer)

    rechnungsdatum: z.coerce.date({
        required_error: "Rechnungsdatum ist erforderlich",
        invalid_type_error: "Rechnungsdatum muss ein Datum sein"
    }), // BT-2 (Rechnungsdatum)

    leistungsdatum: z.coerce.date({
        invalid_type_error: "Leistungsdatum muss ein Datum sein"
    }).optional(), // BT-72 (Tatsächliches Lieferdatum)

    leistungsZeitraumA: z.coerce.date({
        invalid_type_error: "Leistungsdatum muss ein Datum sein"
    }).optional(), // BT-73 Beginn der Rechnungsperiode -- bei dieser Angabe wird das Ende der Periode auch als Leistungsdatum gesehen

    leistungsZeitraumB: z.coerce.date({
        invalid_type_error: "Leistungsdatum muss ein Datum sein"
    }).optional(), // BT-74 Ende der Rechnungsperiode -- bei dieser Angabe wird das Ende der Periode auch als Leistungsdatum gesehen

    faelligkeitsdatum: z.coerce.date({
        invalid_type_error: "Fälligkeitsdatum muss ein Datum sein"
    }).optional() // BT-9 (Fälligkeitsdatum der Zahlung)
}).superRefine((data, ctx) => {
    // Rechnungsdatum should not be before Leistungsdatum
    if (data.leistungsdatum && data.leistungsdatum > data.rechnungsdatum) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Das Leistungsdatum kann nicht nach dem Rechnungsdatum liegen.",
            path: ["leistungsdatum"]
        });
    }

    if (data.leistungsZeitraumB && data.leistungsZeitraumB > data.rechnungsdatum) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Das Ende des Leistungszeitraum kann nicht nach dem Rechnungsdatum liegen.",
            path: ["leistungsdatum"]
        });
    }


    // Fälligkeitsdatum should not be before Rechnungsdatum
    if (data.faelligkeitsdatum && data.faelligkeitsdatum < data.rechnungsdatum) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Das Fälligkeitsdatum kann nicht vor dem Rechnungsdatum liegen.",
            path: ["faelligkeitsdatum"]
        });
    }

    // If both Leistungsdatum and Fälligkeitsdatum are provided, Fälligkeitsdatum should not be before Leistungsdatum
    if (data.leistungsdatum && data.faelligkeitsdatum && data.faelligkeitsdatum < data.leistungsdatum) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Das Fälligkeitsdatum kann nicht vor dem Leistungsdatum liegen.",
            path: ["faelligkeitsdatum"]
        });
    }
});

// Type inference for TypeScript
export type RechnungsDaten = z.infer<typeof RechnungSchema>;