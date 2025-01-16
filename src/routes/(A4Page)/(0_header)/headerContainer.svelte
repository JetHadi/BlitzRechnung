<!-- frontend\src\routes\(A4Page)\(0_header)\A4Header.svelte -->
<script lang="ts">
	import Logo from '$lib/components/Logo.svelte';
	import { defaultRechnungsSender } from '$lib/types/rechnungsSender';
	import { cn } from '$lib/utils';

	let {
		headerData = $bindable(),
		isInteractive = true,
		propaGateFrom = ""
	} = $props();

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
    "container mx-auto rounded-lg border border-transparent p-4",
    isInteractive && "cursor-pointer transition-all duration-200 hover:border-gray-200 hover:bg-gray-50"
  )}
>
  <div class="flex items-start justify-between">
    <div class="w-1/4">
      <Logo />
    </div>

    <div class="w-2/4 text-center">
      <h1 class="text-2xl font-bold">Rechnung</h1>
    </div>

    <div class="w-1/4 text-left text-sm">
      {headerData.absender_firma}<br />
      {headerData.absender_strasse}<br />
      {headerData.plz} {headerData.absender_ort}<br />
      {#if headerData.absender_telefon}
        {headerData.absender_telefon}<br />
      {/if}
      {#if headerData.absender_email}
        {headerData.absender_email}
      {/if}
    </div>
  </div>
</div>