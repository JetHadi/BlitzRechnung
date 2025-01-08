export interface RechnungsSender {
    absender_firma?: string;
    absender_strasse?: string;
    absender_ort?: string;
    absender_plz?: string;
    absender_telefon?: string;
    absender_email?: string;
}

export const defaultRechnungsSender: RechnungsSender = {
    absender_firma: 'Your Company Name',
    absender_strasse: 'Street Address',
    absender_ort: 'City',
    absender_plz: '12345',
    absender_telefon: '+49 (0)123 456789',
    absender_email: 'contact@example.com'
};
