<script lang="ts">
	import * as Card from '$lib/components/ui/card/';
	import { Check } from 'lucide-svelte';

	let selectedPlan = $state('');
</script>

<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
	<Card.Root
		role="button"
		aria-pressed={selectedPlan === 'premium'}
		onclick={() => (selectedPlan = 'premium')}
		class="group relative cursor-pointer bg-white transition-all
        hover:scale-[1.02] hover:shadow-lg
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue
        {selectedPlan === 'premium' ? 'border-4 border-brand-blue' : 'border-2 border-brand-gray'} 
        rounded-lg shadow-md"
	>
		<Card.Header class="pb-2">
			<Card.Title class="text-2xl font-bold text-brand-blue">Premium</Card.Title>
			<Card.Description class="text-lg font-semibold text-brand-gray">
				4€ pro Monat zzgl. USt
			</Card.Description>
		</Card.Header>

		<Card.Content class="space-y-3">
			<div class="flex items-center gap-2 text-brand-gray">
				<Check color="#FFD43A" />
				<p>E-Rechnungen erstellen mit Firmen-Logo</p>
			</div>
			<div class="flex items-center gap-2 text-brand-gray">
				<Check color="#FFD43A" />
				<p>Empfangene E-Rechnungen hochladen und archivieren</p>
			</div>
			<div class="flex items-center gap-2 text-brand-gray">
				<Check color="#FFD43A" />
				<p>GoBD konforme Archivierung</p>
			</div>
			<div class="flex items-center gap-2 text-brand-gray">
				<Check color="#FFD43A" />
				<p>keine Warteschlange</p>
			</div>
			<!-- Repeat for other features -->
		</Card.Content>

		<Card.Footer class="pt-4">
			<p class="text-sm font-medium text-brand-blue/90">
				12 Rechnungen pro Jahr oder maximaler Umsatz von 12000€
			</p>
		</Card.Footer>

		<div
			class="absolute -right-2 -top-2 h-6 w-6 rounded-full bg-brand-yellow
        opacity-0 transition-opacity group-hover:opacity-100"
		></div>
	</Card.Root>

	<Card.Root
		role="button"
		aria-pressed={selectedPlan === 'premiumplus'}
		onclick={() => (selectedPlan = 'premiumplus')}
		class="group relative cursor-pointer bg-white transition-all
        hover:scale-[1.02] hover:shadow-lg
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue
        {selectedPlan === 'premiumplus' ? 'border-4 border-brand-blue' : 'border-2 border-brand-gray'} 
        rounded-lg shadow-md"
	>
		<Card.Header class="pb-2">
			<Card.Title class="text-2xl font-bold text-brand-blue">Premium Plus</Card.Title>
			<Card.Description class="text-lg font-semibold text-brand-gray">
				8€ pro Monat zzgl. USt
			</Card.Description>
		</Card.Header>

		<Card.Content class="space-y-3">
            <div class="flex items-center gap-2 text-brand-gray">
				<Check color="#FFD43A" />
				<p>Unbegrenzte Anzahl Rechnungen erstellen</p>
			</div>
            <div class="flex items-center gap-2 text-brand-gray">
				<Check color="#FFD43A" />
				<p>E-Rechnungen erstellen mit Firmen-Logo</p>
			</div>
			<div class="flex items-center gap-2 text-brand-gray">
				<Check color="#FFD43A" />
				<p>E-Rechnungen erstellen mit Firmen-Logo</p>
			</div>
			<div class="flex items-center gap-2 text-brand-gray">
				<Check color="#FFD43A" />
				<p>Empfangene E-Rechnungen hochladen und archivieren</p>
			</div>
			<div class="flex items-center gap-2 text-brand-gray">
				<Check color="#FFD43A" />
				<p>GoBD konforme Archivierung</p>
			</div>
			<div class="flex items-center gap-2 text-brand-gray">
				<Check color="#FFD43A" />
				<p>keine Warteschlange</p>
			</div>
			<!-- Repeat for other features -->
		</Card.Content>
		<div
			class="absolute -right-2 -top-2 h-6 w-6 rounded-full bg-brand-yellow
        opacity-0 transition-opacity group-hover:opacity-100"
		></div>
	</Card.Root>

</div>
