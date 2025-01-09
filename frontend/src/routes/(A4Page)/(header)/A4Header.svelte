<script lang="ts">
	import Logo from '$lib/components/Logo.svelte';
	import { defaultRechnungsSender } from '$lib/types/rechnungsSender';

	let {
		data,
		isInteractive = true
	} = $props();

	const headerProps = $derived({
		firma: data.firma,
		strasse: data.strasse,
		ort: data.ort,
		plz: data.plz,
		telefon: data.telefon,
		email: data.email,
		isInteractive: false
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
		<div class="w-1/4">
			<Logo />
		</div>

		<div class="w-2/4 text-center">
			<h1 class="text-2xl font-bold">Rechnung</h1>
		</div>

		<div class="w-1/4 text-left text-sm">
			{headerProps.firma}<br />
			{headerProps.strasse}<br />
			{headerProps.plz}
			{headerProps.ort}<br />
			{headerProps.telefon}<br />
			{headerProps.email}
		</div>
	</div>
</div>
