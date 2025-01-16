import { z } from 'zod';

export const secondSectionContainerSchema = z.object({
    extraInvoiceInfoFirst: z.string().max(500)
});

export type secondSectionContainerType = z.infer<typeof secondSectionContainerSchema>;