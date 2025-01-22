import i18n from 'svelte-i18n';

export const config = {
    loaders: [
        {
            locale: 'en',
            key: 'invoice',
            loader: async () => (
                await import('./en/invoice.json')
            ).default,
        },
        {
            locale: 'de',
            key: 'invoice',
            loader: async () => (
                await import('./de/invoice.json')
            ).default,
        }
    ],
};

export const { t, locale, loadTranslations } = new i18n(config);
