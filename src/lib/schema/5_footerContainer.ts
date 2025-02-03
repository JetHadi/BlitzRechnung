//src/lib/schema/5_footerContainer.ts
import type { z } from "zod";
import { RechnungsAbsenderPaymenSchema } from "./rechnungsAbsender";

export const footerContainerSchema = RechnungsAbsenderPaymenSchema

export type FooterContainerType = z.infer<typeof footerContainerSchema>;
