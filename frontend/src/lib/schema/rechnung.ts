// frontend/src/lib/schema/rechnung.ts
import { z } from "zod";
import { firstSectionContainerSchema } from "./1_firstSectionContainer";
import { headerContainerSchema } from "./0_headerContainer";

export const A4RechnungSchema = z.object({
    headerForm: headerContainerSchema,
    firstSectionForm: firstSectionContainerSchema
  });

export type A4RechnungType = z.infer<typeof A4RechnungSchema>;
