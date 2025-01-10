//frontend\src\lib\types\rechnungsDaten.ts
import type { RechnungsDaten } from "$lib/schema/rechnungsDaten";

export const defaultRechnungsDaten: RechnungsDaten = {
    rechnungsnummer: "1",
    rechnungsdatum: new Date(Date.now()), // Converts timestamp to Date
};