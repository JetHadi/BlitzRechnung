<script lang="ts">
	import { page } from '$app/stores';
	import { navigationItems } from '$lib/types/navigation';
	import Logo from './Logo.svelte';
	import { Button } from '$lib/components/ui/button';
</script>

<header class="flex items-center justify-between border-b bg-white p-3 shadow-lg">
	<Logo></Logo>
	<nav class="absolute left-1/2 flex -translate-x-1/2 transform space-x-4">
		{#each navigationItems as { label, href }}
			<a
				{href}
				class="px-3 py-2 {$page.url.pathname === href
					? 'text-primary font-bold'
					: 'text-muted-foreground'}"
			>
				{label}
			</a>
		{/each}
	</nav>

	<div class="flex space-x-4"><Button variant="default">Login</Button></div>
</header>
