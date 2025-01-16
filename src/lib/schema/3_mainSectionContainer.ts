import { z } from 'zod';
import { RechnungsPositionSchema } from './rechnungsPosition';

export const mainSectionContainerSchema = z.object({
    RechnungsPositionen: z.array(RechnungsPositionSchema).min(1, "At least one position is required")
});

export type mainSectionContainerType = z.infer<typeof mainSectionContainerSchema>;