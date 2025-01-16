import { z } from 'zod';

export const fourthSectionContainerSchema = z.object({
    extraInvoiceInfoSecond: z.string().max(500)
});

export type fourthSectionContainerType = z.infer<typeof fourthSectionContainerSchema>;