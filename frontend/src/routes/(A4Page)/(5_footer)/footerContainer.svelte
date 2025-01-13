<!-- frontend\src\routes\(A4Page)\(1_firstSection)\A4FirstSection.svelte -->
<script lang="ts">
	import { cn } from '$lib/utils';

	let { footerData = $bindable(), isInteractive = true, propaGateFrom = '' } = $props();
</script>

<div
	class={cn(
		'container mx-auto rounded-lg border border-transparent p-4',
		isInteractive &&
			'cursor-pointer transition-all duration-200 hover:border-gray-200 hover:bg-gray-50'
	)}
>
	<div class="flex items-start justify-between border-t pt-4">
		<div class="text-left text-sm">
			<div class="grid grid-cols-[30px_1fr] gap-x-4">
				<span>Bank:</span>
				<span>{footerData.absender_bankname}</span>

				<span>IBAN:</span>
				<span>{footerData.absender_iban}</span>

				<span>BIC:</span>
				<span>{footerData.absender_bic}</span>
			</div>
		</div>
		<div class="text-left text-sm">
			<div class="grid grid-cols-[80px_1fr] gap-x-4">
				{#if footerData.absender_ustId}
					<span>USt.-ID: </span>
					<span>{footerData.absender_ustId}</span>
				{/if}

				{#if footerData.absender_steuernummer}
					<span>Steuer-Nr.:</span>
					<span>{footerData.absender_steuernummer}</span>
				{/if}
			</div>
		</div>
	</div>
</div>
