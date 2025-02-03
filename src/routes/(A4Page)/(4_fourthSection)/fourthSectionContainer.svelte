<!-- frontend/src/routes/(A4Page)/(2_secondContainer)/secondSectionContainer.svelte -->
<script lang="ts">
	import { cn } from '$lib/utils';

	let { fourthSectionData = $bindable(), isInteractive = true, propaGateFrom = '', kleinunternehmer = false} = $props();
</script>

<div
	class={cn(
		'container mx-auto rounded-lg border border-transparent p-4',
		isInteractive &&
			'cursor-pointer transition-all duration-200 hover:border-gray-200 hover:bg-gray-50'
	)}
>
	<div class="flex items-start justify-between">
		<div class="whitespace-pre-wrap text-left text-sm">
			{fourthSectionData.extraInvoiceInfoSecond}
		</div>
	</div>
</div>
