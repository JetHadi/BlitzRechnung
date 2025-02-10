<script lang="ts">
	import { Check, Cloud, Zap } from 'lucide-svelte';
	import { isValid } from 'zod';

	let { fieldMandatory = 0, fieldFilled = 0, start = false, end = false, isAllValid = false } = $props();

	const isComplete = $derived(fieldFilled >= fieldMandatory && fieldMandatory > 0);
</script>

<div
	class="relative flex h-full w-10 flex-col items-center justify-center border-x-2 p-1
		{isComplete ? 'border-brand-gray text-brand-gray' : 'border-brand-gray text-brand-gray'}
		{start ? 'rounded-t-md border-t-2' : ''}
		{end ? 'rounded-b-md border-b-2' : ''}
		overflow-hidden transition-colors duration-500"
>
	<!-- Animated fill background -->
	<div
		class="absolute left-0 top-0 w-full bg-brand-yellow transition-[height] duration-500 ease-out"
		style={`height: ${isComplete ? '100%' : '0%'}`}
	></div>

	<!-- Content -->
	<div class="relative z-10">
		{#if isComplete}
			<Check size={20} strokeWidth={3} />
		{/if}

		<div class="mt-1 text-xs font-medium">
			{fieldFilled}/{fieldMandatory}
		</div>
	</div>
</div>
{#if end}
	<!-- Cloud & Zap container -->
	<div class="absolute -bottom-20 -right-4 z-20">
		<Cloud
			size={70}
			color="#6E6E6E"
			fill={isAllValid ? '#6E6E6E' : 'none'}
			class="transition-all duration-500"
		/>
		<Zap
			size={55}
			color="#FFD43A"
			fill={isAllValid ? '#FFD43A' : 'none'}
			class="relative transition-all duration-500
		  {isAllValid ? 'scale-105 animate-[zap_1.2s_ease-in-out_2]' : 'opacity-70'}"
		/>
	</div>
{/if}
