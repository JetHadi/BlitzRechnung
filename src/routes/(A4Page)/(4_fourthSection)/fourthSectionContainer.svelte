<!-- frontend/src/routes/(A4Page)/(2_secondContainer)/secondSectionContainer.svelte -->
<script lang="ts">
	import { addDays, cn, transformDate2String } from '$lib/utils';

	let {
		fourthSectionData = $bindable(),
		isInteractive = true,
		propaGateFrom = '',
		faelligkeitsdatum = undefined,
		rechnungsdatum = undefined,
		absender_firma = undefined
	} = $props();

	$inspect(faelligkeitsdatum);
	$inspect(absender_firma);

	$effect(() => {
		if (faelligkeitsdatum instanceof Date && absender_firma) {
			let faelligkeitsVermerk = '';
			if (
				transformDate2String(faelligkeitsdatum) != transformDate2String(addDays(rechnungsdatum, 30))
			) {
				faelligkeitsVermerk =
					'Zahlbar bis ' +
					faelligkeitsdatum.toLocaleDateString('de-DE', {
						day: '2-digit',
						month: '2-digit',
						year: 'numeric'
					}) +
					'\n\n';
			}
			faelligkeitsdatum = faelligkeitsdatum?.toLocaleDateString('de-DE', {
				day: '2-digit',
				month: '2-digit',
				year: 'numeric'
			});

			fourthSectionData.extraInvoiceInfoSecond =
				'Bitte überweisen Sie den Rechnungsbetrag unter Angabe der Rechnungsnummer auf das unten angegebene Konto.\n' +
				'\n' +
				faelligkeitsVermerk +
				'Mit freundlichen Grüßen\n' +
				absender_firma;
		}
	});
</script>

<div
	class={cn(
		'container mx-auto rounded-lg border border-transparent p-4',
		isInteractive &&
			'cursor-pointer transition-all duration-200 hover:border-gray-200 hover:bg-gray-50'
	)}
>
	<div class="flex items-start justify-between">
		<div class="w-full whitespace-pre-wrap break-words text-left text-sm">
			<span>{fourthSectionData.extraInvoiceInfoSecond}</span>
		</div>
	</div>
</div>
