<script lang="ts">
	import Logo from '$lib/components/Logo.svelte';
	import type { RechnungsSender } from '$lib/types/rechnungsSender';
	import { defaultRechnungsSender } from '$lib/types/rechnungsSender';

	let {
		absender_firma = defaultRechnungsSender.absender_firma,
		absender_strasse = defaultRechnungsSender.absender_strasse,
		absender_ort = defaultRechnungsSender.absender_ort,
		absender_plz = defaultRechnungsSender.absender_plz,
		absender_telefon = defaultRechnungsSender.absender_telefon,
		absender_email = defaultRechnungsSender.absender_email
	}: RechnungsSender = $props();
</script>

<div
	class="container mx-auto cursor-pointer rounded-lg border border-transparent p-4 transition-all duration-200 hover:border-gray-200 hover:bg-gray-50"
>
	<div class="flex items-start justify-between">
		<div class="w-1/4">
			<Logo></Logo>
		</div>

		<div class="w-2/4 text-center">
			<h1 class="text-2xl font-bold">Rechnung</h1>
		</div>

		<div class="w-1/4 text-left text-sm">
			{absender_firma}<br />
			{absender_strasse}<br />
			{absender_plz}
			{absender_ort}<br />
			{absender_telefon}<br />
			{absender_email}
		</div>
	</div>
</div>
