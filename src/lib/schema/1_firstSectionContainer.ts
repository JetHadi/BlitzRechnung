//frontend\src\lib\schema\firstSectionHeader.ts
import type { z } from "zod";
import { RechnungSchema } from "./rechnungsDaten";
import { RechnungsEmpfaengerSchema } from "./rechnungsEmpfaenger";

export const firstSectionContainerSchema = RechnungsEmpfaengerSchema.and(RechnungSchema);

export type FirstSectionContainerSchema = z.infer<typeof firstSectionContainerSchema>;
