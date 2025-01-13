import { z } from 'zod';
import { AdresseSchema } from './adresse';

export const RechnungsEmpfaengerSchema = z.object({
    empfaenger_name: z.string().max(200),
    empfaenger_strasse: z.string().min(2).max(200),
    empfaenger_plz: z.string().length(5),
    empfaenger_ort: z.string().min(2).max(100),
    empfaenger_firma: z.string().max(20).optional(),
});

export type RechnungsEmpfaenger = z.infer<typeof RechnungsEmpfaengerSchema>;
