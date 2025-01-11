//frontend\src\lib\schema\firstSectionHeader.ts
import type { z } from "zod";
import { RechnungSchema } from "./rechnungsDaten";
import { RechnungsEmpfaengerSchema } from "./rechnungsEmpfaenger";

export const firstSectionSchema = RechnungsEmpfaengerSchema.and(RechnungSchema);

export type FirstSectionSchema = z.infer<typeof firstSectionSchema>;
