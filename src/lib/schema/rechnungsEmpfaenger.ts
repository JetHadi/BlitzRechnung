// src/lib/schema/rechnungsEmpfaenger.ts
import { z } from 'zod';

// Basis-Validierungsfunktionen für Wiederverwendung
const requiredField = (fieldName: string) => ({
    required_error: `${fieldName} ist erforderlich`,
    invalid_type_error: `${fieldName} muss ein Text sein`
});

export const RechnungsEmpfaengerSchema = z.object({
    empfaenger_name: z.string(requiredField("Name des Käufers"))
        .max(200, { message: "Name der Ansprechperson darf maximal 200 Zeichen lang sein" }), // BT-44

    empfaenger_strasse: z.string(requiredField("Straße"))
        .min(1, { message: "Straßenangabe darf nicht leer sein" })
        .max(200, { message: "Straßenangabe darf maximal 200 Zeichen lang sein" }), // BT-50

    empfaenger_plz: z.string(requiredField("Postleitzahl"))
        .length(5, { message: "Postleitzahl muss genau 5 Zeichen lang sein" }), // BT-53

    empfaenger_ort: z.string(requiredField("Ort"))
        .min(2, { message: "Ortsangabe darf nicht leer sein" })
        .max(100, { message: "Ortsangabe darf maximal 100 Zeichen lang sein" }), // BT-52

    empfaenger_firma: z.string(requiredField("Handelsname"))
        .min(1, { message: "Name des Käufers darf nicht leer sein" })
        .max(200, { message: "Name des Käufers darf maximal 200 Zeichen lang sein" }), // BT-45

    empfaenger_steuernummer: z.string()
        .min(10, { message: "Steuernummer muss min 10 Zeichen haben" })
        .max(13, { message: "Steuernummer darf maximal 13 Zeichen haben" })
        .optional()
        .transform(val => val?.trim() || undefined),

    empfaenger_ustId: z.string()
        .length(11, { message: "Die Umsatzsteuer-ID hat genau 11 Zeichen und beginnt mit DE" })
        .optional()
        .transform(val => val?.trim() || undefined)

})

export type RechnungsEmpfaenger = z.infer<typeof RechnungsEmpfaengerSchema>;