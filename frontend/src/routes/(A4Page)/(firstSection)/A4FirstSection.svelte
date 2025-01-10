<script lang="ts">
	import Logo from '$lib/components/Logo.svelte';
	import { defaultRechnungsSender } from '$lib/types/rechnungsSender';

	let {
		localHeaderObject = $bindable(),
		isInteractive = true,
		propaGateFrom
	} = $props();

	const headerProps = $derived({
		firma: localHeaderObject.firma,
		strasse: localHeaderObject.strasse,
		ort: localHeaderObject.ort,
		plz: localHeaderObject.plz,
		telefon: localHeaderObject.telefon,
		email: localHeaderObject.email,
		isInteractive: false
	});

	$effect(() => {
		// console.log('coming from', {propaGateFrom}, '-A4Header: ',localHeaderObject);
	});
</script>

<div
	class="container mx-auto rounded-lg border border-transparent p-4"
	class:cursor-pointer={isInteractive}
	class:transition-all={isInteractive}
	class:duration-200={isInteractive}
	class:hover:border-gray-200={isInteractive}
	class:hover:bg-gray-50={isInteractive}
>
	<div class="flex items-start justify-between">
		<div class="text-center">
			<h1 class="text-2xl font-bold">Rechnung</h1>
		</div>

		<div class="text-left text-sm">
			{headerProps.firma}<br />
			{headerProps.strasse}<br />
			{headerProps.plz}
			{headerProps.ort}<br />
			{headerProps.telefon}<br />
			{headerProps.email}
		</div>
	</div>
</div>
