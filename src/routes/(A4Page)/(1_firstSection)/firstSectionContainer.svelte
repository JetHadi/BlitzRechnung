<!-- frontend\src\routes\(A4Page)\(1_firstSection)\A4FirstSection.svelte -->
<script lang="ts">
	import Logo from '$lib/components/Logo.svelte';
	import { defaultRechnungsSender } from '$lib/types/rechnungsSender';
	import { cn } from '$lib/utils';

	let { firstSectionData = $bindable(), isInteractive = true, propaGateFrom = '' } = $props();

	function formatToGermanDate(date: Date | string | null): string {
		if (!date) return '';

		try {
			// If it's a Date object
			if (date instanceof Date) {
				return date.toLocaleDateString('de-DE', {
					day: '2-digit',
					month: '2-digit',
					year: 'numeric'
				});
			}

			// If it's a string in 'yyyy-mm-dd' format
			if (typeof date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(date)) {
				const [year, month, day] = date.split('-');
				const dateObject = new Date(Number(year), Number(month) - 1, Number(day));

				return dateObject.toLocaleDateString('de-DE', {
					day: '2-digit',
					month: '2-digit',
					year: 'numeric'
				});
			}

			return '';
		} catch (error) {
			console.error('Error formatting date:', error);
			return '';
		}
	}
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
			{firstSectionData.empfaenger_firma}<br />
			{firstSectionData.empfaenger_strasse}<br />
			{firstSectionData.empfaenger_plz}
			{firstSectionData.empfaenger_ort}<br />
		</div>
		<div class="rounded-sm bg-brand-gray/20 p-2 text-left text-sm">
			<div class="grid grid-cols-[120px_1fr] gap-x-4">
				<span>Rechnungsnummer:</span>
				<span>{firstSectionData.rechnungsnummer}</span>

				<span>Rechnungsdatum:</span>
				<span
					>{formatToGermanDate(firstSectionData.rechnungsdatum)}</span
				>
				{#if firstSectionData.empfaenger_ustId}
				<span>Kunden USt. ID:</span>
				<span
					>{firstSectionData.empfaenger_ustId}</span
				>
				{:else if firstSectionData.empfaenger_steuernummer}
				<span>Kunden SteuerNr:</span>
				<span
					>{firstSectionData.empfaenger_steuernummer}</span
				>
				{/if}
				
			</div>
		</div>
	</div>
</div>
