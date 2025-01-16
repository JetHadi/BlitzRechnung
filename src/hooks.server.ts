import { redirect } from '@sveltejs/kit';

export const handle = async ({ event, resolve }) => {
    if (event.url.pathname === '/') {
        throw redirect(301, '/create');
    }
    return await resolve(event);
};
