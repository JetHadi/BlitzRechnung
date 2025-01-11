import type { z } from "zod";
import { RechnungsAbsenderSchema } from "./rechnungsAbsender";

export const headerContainerSchema = RechnungsAbsenderSchema

export type HeaderContainerSchema = z.infer<typeof headerContainerSchema>;
