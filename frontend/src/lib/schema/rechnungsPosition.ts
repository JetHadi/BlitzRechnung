import { z } from "zod";

const RechnungsPositionSchema = z.object({
  bezeichnung: z.string().min(1, "Bezeichnung is required"),
  anzahl: z.number().positive("Anzahl must be a positive number"),
  einheit: z.string().min(1, "Einheit is required"),
  einheitspreis: z.number().positive("Einheitspreis must be a positive number"),
  ustProzent: z.number().min(0, "UstProzent must be at least 0").max(100, "UstProzent cannot exceed 100"),
});

type RechnungsPosition = z.infer<typeof RechnungsPositionSchema> & {
  get gesamt(): number;
  get ust(): number;
};
