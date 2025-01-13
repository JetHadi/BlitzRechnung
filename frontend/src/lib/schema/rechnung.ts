// frontend/src/lib/schema/rechnung.ts
import { z } from "zod";
import { firstSectionContainerSchema } from "./1_firstSectionContainer";
import { headerContainerSchema } from "./0_headerContainer";
import { secondSectionContainerSchema } from "./2_secondSectionContainer";
import { mainSectionContainerSchema } from "./3_mainSectionContainer";

export const A4RechnungSchema = z.object({
    headerForm: headerContainerSchema,
    firstSectionForm: firstSectionContainerSchema,
    secondSectionForm: secondSectionContainerSchema,
    mainSectionForm: mainSectionContainerSchema
  });

export type A4RechnungType = z.infer<typeof A4RechnungSchema>;
