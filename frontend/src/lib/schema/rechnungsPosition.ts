// frontend\src\lib\schema\rechnungsPosition.ts
import { z } from "zod";

export const RechnungsPositionSchema = z.object({
  bezeichnung: z.string().min(1),      // BT-153 (Artikelname)
  anzahl: z.number().positive(),       // BT-129 (In Rechnung gestellte Menge)
  einheit: z.string().min(1),          // BT-130 (Code der Maßeinheit der in Rechnung gestellten Menge)
  einheitspreis: z.number().positive(), // BT-146 (Nettopreis des Artikels)
  ustProzent: z.number().min(0).max(100) // BT-152 (Umsatzsteuersatz für den in Rechnung gestellten Artikel)
});


export type RechnungsPositionType = z.infer<typeof RechnungsPositionSchema> & {
  get gesamt(): number; // BT-131: Nettobetrag der Rechnungsposition
  get ust(): number; // BT-117: Kategoriespezifischer Steuerbetrag
};
