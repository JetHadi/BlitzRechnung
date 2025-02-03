<!-- frontend\src\routes\(A4Page)\(0_header)\A4Header.svelte -->
<script lang="ts">
	import Logo from '$lib/components/Logo.svelte';
	import { defaultRechnungsSender } from '$lib/types/rechnungsSender';
	import { cn } from '$lib/utils';

	let { headerData = $bindable(), isInteractive = true, propaGateFrom = '' } = $props();

	// const headerProps = $derived({
	// 	firma: localHeaderObject.firma,
	// 	strasse: localHeaderObject.strasse,
	// 	ort: localHeaderObject.ort,
	// 	plz: localHeaderObject.plz,
	// 	telefon: localHeaderObject.telefon,
	// 	email: localHeaderObject.email,
	// 	isInteractive: false
	// });

	// $effect(() => {
	// 	console.log('coming from', {propaGateFrom}, '-Data: ',headerData);
	// });
</script>

<div
	class={cn(
		'container mx-auto rounded-lg border border-transparent p-4',
		isInteractive &&
			'cursor-pointer transition-all duration-200 hover:border-gray-200 hover:bg-gray-50'
	)}
>
	<div class="flex items-start justify-between">
		<div class="w-1/3 text-left">
			<h1 class="text-xl text-muted-foreground">Rechnung</h1>
		</div>
		<div class="w-1/3 text-center">
			{#if headerData.absender_logo === ''}
				<div class="select-none opacity-0">
					<!-- Invisible placeholder -->
					<Logo />
				</div>
			{:else if headerData.absender_logo}
				<img
					src={headerData.absender_logo}
					alt="Company Logo"
					class="h-auto max-w-[160px] object-contain"
				/>
			{:else}
				<Logo /> <!-- Fallback to default logo -->
			{/if}
		</div>

		<div class="w-1/4 text-left text-sm">
			{headerData.absender_firma || defaultRechnungsSender.absender_firma}<br />
			{headerData.absender_strasse || defaultRechnungsSender.absender_strasse}<br />
			{headerData.absender_plz || defaultRechnungsSender.absender_plz}
			{headerData.absender_ort || defaultRechnungsSender.absender_ort}<br />
			{#if headerData.absender_telefon}
				{headerData.absender_telefon}<br />
			{:else if headerData.absender_telefon == ''}
				<span></span>
			{:else}
				{defaultRechnungsSender.absender_telefon}<br />
			{/if}
			{#if headerData.absender_email}
				{headerData.absender_email}<br />
			{:else}
				{defaultRechnungsSender.absender_email}<br />
			{/if}
			<!-- {#if headerData.absender_name != headerData.absender_firma}
      Ihre Kontaktperson:<br/>
      <span class="font-bold">{headerData.absender_name}</span>
      {/if} -->
		</div>
	</div>
</div>
