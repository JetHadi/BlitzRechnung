<script lang="ts">
	import { Check } from "lucide-svelte";

	let { fieldMandatory = 0, fieldFilled = 0 } = $props<{
		fieldMandatory: number;
		fieldFilled: number;
	}>();

	const isComplete = $derived(fieldFilled >= fieldMandatory && fieldMandatory > 0);
</script>

<div
	class="flex h-20 w-20 flex-col items-center justify-center rounded-lg border-4 p-1
           {isComplete
		? 'border--brand-gray text-brand-gray bg-brand-yellow'
		: 'border-gray-400 text-gray-400 opacity-30'}"
>
	{#if isComplete}
		<Check size={40} strokeWidth={3} />
	{/if}

	<div class="mt-1 text-xs font-medium">
		{fieldFilled}/{fieldMandatory}
	</div>
</div>
