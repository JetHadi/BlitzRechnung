<script lang="ts">
	import { Zap } from 'lucide-svelte';
	let { isInteractive = true } = $props();
</script>

<div class="flex flex-shrink-0 items-center">
	<Zap size={60} />
	{#if isInteractive}
		<a href="/" class="flex flex-col text-xl font-bold text-gray-800">
			<p>Blitz-</p>
			<p>Rechnung</p>
		</a>
	{:else}
		<span class="flex flex-col text-xl font-bold text-gray-800">
			<p>Blitz-</p>
			<p>Rechnung</p>
		</span>
	{/if}
</div>
