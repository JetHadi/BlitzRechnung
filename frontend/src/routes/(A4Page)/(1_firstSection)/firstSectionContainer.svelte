<!-- frontend\src\routes\(A4Page)\(1_firstSection)\A4FirstSection.svelte -->
<script lang="ts">
	import Logo from '$lib/components/Logo.svelte';
	import { defaultRechnungsSender } from '$lib/types/rechnungsSender';
	import { cn } from '$lib/utils';

	let { firstSectionData = $bindable(), isInteractive = true, propaGateFrom = '' } = $props();
</script>

<div
	class={cn(
		'container mx-auto rounded-lg border border-transparent p-4',
		isInteractive &&
			'cursor-pointer transition-all duration-200 hover:border-gray-200 hover:bg-gray-50'
	)}
>
	<div class="flex items-start justify-between">
		<div class="text-left text-sm">
			{firstSectionData.firma}<br />
			{firstSectionData.strasse}<br />
			{firstSectionData.plz}
			{firstSectionData.ort}<br />
		</div>
		<div class="rounded-sm bg-gray-100 p-2 text-left text-sm">
			<div class="grid grid-cols-[120px_1fr] gap-x-4">
				<span>Rechnungsnummer:</span>
				<span>{firstSectionData.rechnungsnummer}</span>

				<span>Rechnungsdatum:</span>
				<span
					>{firstSectionData.rechnungsdatum.toLocaleDateString('de-DE', {
						day: '2-digit',
						month: '2-digit',
						year: 'numeric'
					})}</span
				>
			</div>
		</div>
	</div>
</div>
