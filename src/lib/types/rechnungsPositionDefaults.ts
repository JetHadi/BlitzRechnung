import type { RechnungsPositionType } from "$lib/schema/rechnungsPosition";

// frontend\src\lib\types\rechnungsPositionDefaults.ts
export class RechnungsPosition implements RechnungsPositionType {
    bezeichnung = 'Premium Rechnung';
    anzahl = 12;
    einheit = 'Stück';
    einheitspreis = 1;
    ustProzent = 19;

    get gesamt() {
        return this.anzahl * this.einheitspreis;
    }

    get ust() {
        return this.gesamt * (this.ustProzent / 100);
    }
}

export const deafaultRechnungsPosition = new RechnungsPosition();
