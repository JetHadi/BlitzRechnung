import type { RechnungsEmpfaenger } from "$lib/schema/rechnungsEmpfaenger";

export const defaultRechnungsEmfpaenger: RechnungsEmpfaenger = {
    empfaenger_firma: 'Kunde',
    empfaenger_strasse: 'Street Address',
    empfaenger_ort: 'City',
    empfaenger_plz: '12345',
    empfaenger_name: ""
};