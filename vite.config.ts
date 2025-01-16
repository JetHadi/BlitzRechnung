import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	server: {
		watch: {
			usePolling: true
		},
		host: true,
		strictPort: true,
		port: 3000
	},
	plugins: [sveltekit()]
});
