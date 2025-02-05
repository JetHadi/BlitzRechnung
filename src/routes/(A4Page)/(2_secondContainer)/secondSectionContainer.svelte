<!-- frontend/src/routes/(A4Page)/(2_secondContainer)/secondSectionContainer.svelte -->
<script lang="ts">
	import { SecondSectionContainerDefaults } from '$lib/types/2_secondSectionContainerDefaults';
	import { cn } from '$lib/utils';

	let { secondSectionData = $bindable(), isInteractive = true, propaGateFrom = '' } = $props();
	let newLineCount = $derived((secondSectionData.extraInvoiceInfoFirst.match(/\n/g) || []).length);
	let calculatedMargin = $derived(
		`${Math.min(5 - newLineCount, Math.max(0, Math.min(5, 5 - secondSectionData.extraInvoiceInfoFirst.length * 0.01)))}rem`
	);

	// $inspect(propaGateFrom);

	const MAX_NEWLINES = 6;

	// $effect(() => {
	// 	if (newLineCount > MAX_NEWLINES) {
	// 		secondSectionData.extraInvoiceInfoFirst = secondSectionData.extraInvoiceInfoFirst.split('\n').slice(0, MAX_NEWLINES + 1).join('\n');
	// 	}
	// });
</script>

<div
	class={cn(
		'container mx-auto rounded-lg border border-transparent p-4',
		isInteractive &&
			'cursor-pointer transition-all duration-200 hover:border-gray-200 hover:bg-gray-50'
	)}
>
	<div style="margin-top: {propaGateFrom ? '5rem' : calculatedMargin}">
		<div class="flex items-start justify-between">
			<div class="w-full whitespace-pre-wrap break-words text-left text-sm">
				{secondSectionData.extraInvoiceInfoFirst}
			</div>
		</div>
	</div>
</div>
