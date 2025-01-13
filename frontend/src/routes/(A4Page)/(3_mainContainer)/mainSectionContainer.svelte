<!-- frontend\src\routes\(A4Page)\(3_mainContainer)\mainSectionContainer.svelte -->
<script lang="ts">
	import * as Table from '$lib/components/ui/table';
	import type { RechnungsPositionType } from '$lib/schema/rechnungsPosition';
	import { cn } from '$lib/utils';

	let { mainSectionData = $bindable(), isInteractive = true, propaGateFrom = '' } = $props();

	// Format number as German currency
	const formatCurrency = (value: number) => {
		return value.toLocaleString('de-DE', {
			style: 'currency',
			currency: 'EUR'
		});
	};

	let gesamt = $state((anzahl: number, einheitspreis: number) => {
		return anzahl * einheitspreis;
	});

	let ust = $state((ustProzent: number, gesamt: number) => {
		return gesamt * (1 + ustProzent / 100) - gesamt;
	});

	let totalNetto = $derived(
		mainSectionData.RechnungsPositionen.reduce(
			(sum: number, position: RechnungsPositionType) =>
				sum + gesamt(position.anzahl, position.einheitspreis),
			0
		)
	);

	let totalUst = $derived(
		mainSectionData.RechnungsPositionen.reduce(
			(sum: number, position: RechnungsPositionType) =>
				sum + ust(position.ustProzent, gesamt(position.anzahl, position.einheitspreis)),
			0
		)
	);

	let totalRechnung = $derived(totalNetto + totalUst);

	// Format number as German percentage
	const formatPercent = (value: number) => {
		return value.toLocaleString('de-DE', {
			style: 'percent',
			minimumFractionDigits: 0,
			maximumFractionDigits: 0
		});
	};
</script>

<div
	class={cn(
		'container mx-auto rounded-lg border border-transparent p-4',
		isInteractive &&
			'cursor-pointer transition-all duration-200 hover:border-gray-200 hover:bg-gray-50'
	)}
>
	<Table.Root>
		<Table.Header>
			<Table.Row class="bg-muted/50">
				<Table.Head class="w-[300px]">Bezeichnung</Table.Head>
				<Table.Head class="text-right">Anzahl</Table.Head>
				<Table.Head class="text-right">Einheit</Table.Head>
				<Table.Head class="text-right">Einheitspreis</Table.Head>
				<Table.Head class="text-right">USt.%</Table.Head>
				<Table.Head class="text-right">USt.</Table.Head>
				<Table.Head class="text-right">Gesamt</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each mainSectionData.RechnungsPositionen as position}
				<Table.Row>
					<Table.Cell class="font-medium">{position.bezeichnung}</Table.Cell>
					<Table.Cell class="text-right">{position.anzahl}</Table.Cell>
					<Table.Cell class="text-right">{position.einheit}</Table.Cell>
					<Table.Cell class="text-right">{formatCurrency(position.einheitspreis)}</Table.Cell>
					<Table.Cell class="text-right">{position.ustProzent}</Table.Cell>
					<Table.Cell class="text-right"
						>{formatCurrency(
							ust(position.ustProzent, gesamt(position.anzahl, position.einheitspreis))
						)}</Table.Cell
					>
					<Table.Cell class="text-right font-medium"
						>{formatCurrency(gesamt(position.anzahl, position.einheitspreis))}</Table.Cell
					>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>

	<!-- Summary section -->
	<div class="mt-4 space-y-2">
		<div class="grid grid-cols-[1fr_auto_auto] gap-4 px-4">
			<div></div>
			<span class="text-right text-sm font-medium">Nettobetrag</span>
			<span class="min-w-[120px] text-right text-sm">{formatCurrency(totalNetto)}</span>
		</div>
		<div class="grid grid-cols-[1fr_auto_auto] gap-4 px-4">
			<div></div>
			<span class="text-right text-sm font-medium">Umsatzsteuer</span>
			<span class="min-w-[120px] text-right text-sm">{formatCurrency(totalUst)}</span>
		</div>
		<div class="grid grid-cols-[1fr_auto_auto] gap-4 border-t px-4 pt-2">
			<div></div>
			<span class="text-right text-base font-semibold">Rechnungsbetrag</span>
			<span class="min-w-[120px] text-right text-base font-semibold"
				>{formatCurrency(totalRechnung)}</span
			>
		</div>
	</div>
</div>
