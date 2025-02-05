import { z } from 'zod';

export const secondSectionContainerSchema = z.object({
    extraInvoiceInfoFirst: z.string()
        .max(500)
        .refine(
            (val) => (val.match(/\n/g) || []).length <= 6, 
            {
                message: "Ihre Nachricht ist zu lang!" // Ensures error is attached to the field
            }
        )
});

export type secondSectionContainerType = z.infer<typeof secondSectionContainerSchema>;
