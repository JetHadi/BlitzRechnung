<script lang="ts">
	import { page } from '$app/state';
	import { navigationItems } from '$lib/types/navigation';
	import Logo from './Logo.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Menu, X } from 'lucide-svelte';
	
	let mobileMenuOpen = $state(false);
</script>

<header class="flex items-center justify-between border-b bg-white p-3 shadow-lg">
	<a href="/create"><Logo /></a>
		<nav class="hidden md:flex space-x-4">
		{#each navigationItems as { label, href }}
			<a
				{href}
				class="px-3 py-2 {page.url.pathname === href
					? 'text-primary font-bold'
					: 'text-muted-foreground'}"
			>
				{label}
			</a>
		{/each}
	</nav>

	<div class="hidden md:flex space-x-4">
		<Button variant="default">Login</Button>
	</div>

	<div class="md:hidden">
		<button 
			onclick={() => mobileMenuOpen = !mobileMenuOpen}
			class="text-gray-500 hover:text-gray-700"
		>
			{#if mobileMenuOpen}
				<X size={24} />
			{:else}
				<Menu size={24} />
			{/if}
		</button>
	</div>

	{#if mobileMenuOpen}
		<div class="fixed inset-0 z-50 bg-white md:hidden">
			<div class="flex flex-col items-center justify-center h-full space-y-6">
				{#each navigationItems as { label, href }}
					<a
						{href}
						class="text-2xl {page.url.pathname === href
							? 'text-primary font-bold'
							: 'text-muted-foreground'}"
						onclick={() => mobileMenuOpen = false}
					>
						{label}
					</a>
				{/each}
				<Button variant="default" class="mt-4">Login</Button>
			</div>
		</div>
	{/if}
</header>
