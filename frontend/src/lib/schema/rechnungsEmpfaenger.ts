import { z } from 'zod';
import { AdresseSchema } from './adresse';

export const RechnungsEmpfaengerSchema = z.object({
    empfaenger_name: z.string().max(200),       // BT-44 (Name des Käufers)
    empfaenger_strasse: z.string().min(2).max(200), // BT-50 (Zeile 1 der Käuferanschrift)
    empfaenger_plz: z.string().length(5),       // BT-53 (Postleitzahl der Käuferanschrift)
    empfaenger_ort: z.string().min(2).max(100), // BT-52 (Stadt der Käuferanschrift)
    empfaenger_firma: z.string().max(20),       // BT-45 (Handelsname des Käufers)
});

export type RechnungsEmpfaenger = z.infer<typeof RechnungsEmpfaengerSchema>;
