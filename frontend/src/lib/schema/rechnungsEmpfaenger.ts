import { z } from 'zod';
import { AdresseSchema } from './adresse';

export const RechnungsEmpfaengerSchema = AdresseSchema.extend({
    firma: z.string().max(20).optional(),
});

export type RechnungsEmpfaenger = z.infer<typeof RechnungsEmpfaengerSchema>;
