// src/lib/schema/rechnungsAbsender.ts
import { z } from 'zod';

// Basis-Validierungsfunktionen für Wiederverwendung
const requiredField = (fieldName: string) => ({
    required_error: `${fieldName} ist erforderlich`,
    invalid_type_error: `${fieldName} muss ein Text sein`
});

export const RechnungsAbsenderSchema = z.object({
    absender_kleinunternehmer: z.boolean({
        required_error: "Kleinunternehmerstatus muss angegeben werden",
        invalid_type_error: "Kleinunternehmerstatus muss wahr/falsch sein"
    }).default(undefined), //TODO: fix type error

    absender_firma: z.string(requiredField("Firmenname"))
        .min(1, { message: "Firmenname darf nicht leer sein" })
        .max(20, { message: "Firmenname darf maximal 20 Zeichen lang sein" }),

    absender_strasse: z.string(requiredField("Straße"))
        .min(2, { message: "Straßenangabe muss mindestens 2 Zeichen lang sein" })
        .max(200, { message: "Straßenangabe darf maximal 200 Zeichen lang sein" }),

    absender_plz: z.string(requiredField("Postleitzahl"))
        .length(5, { message: "Postleitzahl muss genau 5 Zeichen lang sein" }),

    absender_ort: z.string(requiredField("Ort"))
        .min(2, { message: "Ortsangabe muss mindestens 2 Zeichen lang sein" })
        .max(100, { message: "Ortsangabe darf maximal 100 Zeichen lang sein" }),

    absender_email: z.string(requiredField("E-Mail"))
        .email({ message: "Ungültige E-Mail-Adresse" }),

    absender_telefon: z.string()
        .max(20, { message: "Telefonnummer darf maximal 20 Zeichen lang sein" })
        .optional(),

    absender_logo: z.string()
        .refine(val => val.startsWith('data:image/') || val === '', {
            message: "Ungültiges Bildformat - muss Data-URL sein oder leer"
        }).optional(),

    absender_name: z.string(requiredField("Name"))
        .max(200, { message: "Name darf maximal 200 Zeichen lang sein" })
});

export const RechnungsAbsenderPaymenSchema = z.object({
    absender_steuernummer: z.string()
        .optional()
        .transform(val => val?.trim().replace(/\s/g, '') || undefined) // Leerzeichen entfernen
        .refine(val => !val || /^[0-9\/]+$/.test(val), {
            message: "Darf nur Zahlen und/oder Schrägstriche enthalten"
        })
        .refine(val => !val || (val.length >= 10 && val.length <= 13), {
            message: "Muss zwischen 10-13 Zeichen lang sein"
        }),

    absender_ustId: z.string()
        .optional()
        .transform(val => val?.trim().replace(/\s/g, '') || undefined) // Leerzeichen entfernen
        .refine(val => !val || /^DE[a-zA-Z0-9]{9}$/.test(val), {
            message: "Muss mit DE beginnen und genau 11 alphanumerische Zeichen haben"
        }),

    absender_bankname: z.string(requiredField("Bankname"))
        .max(100, { message: "Bankname darf maximal 100 Zeichen lang sein" }),

    absender_iban: z.string(requiredField("IBAN"))
        .min(15, { message: "Bitte eine korrekte IBAN angeben" })
        .max(34, { message: "IBAN darf maximal 34 Zeichen lang sein" }),

    absender_bic: z.string(requiredField("BIC"))
        .max(11, { message: "BIC darf maximal 11 Zeichen lang sein" }),

    absender_kennung: z.string().optional(),

    absender_amtsgericht: z.string(requiredField("Amtsgericht"))
        .max(100, { message: "Amtsgericht darf maximal 100 Zeichen lang sein" }),

    absender_hrb: z.string(requiredField("Handelsregisternummer"))
        .max(50, { message: "HRB-Nummer darf maximal 50 Zeichen lang sein" })
}).superRefine((val, ctx) => {
    const hasSteuer = val.absender_steuernummer !== undefined
    const hasUst = val.absender_ustId !== undefined

    if (!hasSteuer && !hasUst) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Mindestens eines der Felder muss angegeben werden",
            path: ['absender_steuernummer']
        })
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Mindestens eines der Felder muss angegeben werden",
            path: ['absender_ustId']
        })
    }
})



export type RechnungsAbsenderType = z.infer<typeof RechnungsAbsenderSchema>;
export type RechnungsAbsenderPaymentType = z.infer<typeof RechnungsAbsenderPaymenSchema>;
