<!-- frontend/src/routes/(A4Page)/create/+page.svelte -->
<script lang="ts">
	import { LoaderCircle, SquareArrowRight } from 'lucide-svelte';
	import A4Page from '../A4Page.svelte';
	import { superForm } from 'sveltekit-superforms';

	let { data } = $props();

	const reactive = true;

	let firstSectionData = $state({
		hallo: 'hallo'
	});

	let localFormObject = $state(data.headerForm);

	const form = superForm(data.headerForm, {
		delayMs: 500,
		timeoutMs: 8000,
		dataType: 'json',
		onSubmit({ jsonData }) {
			console.log('Main Create Page--', localFormObject.data);
			jsonData(localFormObject.data);
		}
	});

	const { form: formData, enhance, delayed } = form;

	$effect(() => {
		// console.log('Main Create Page--', localFormObject);
	});
</script>

<div class="flex items-start gap-4">
	<div class="mx-auto aspect-[1/1.4142] w-full max-w-[210mm] bg-white shadow-lg print:shadow-none">
		<div class="print-container box-border flex h-full w-full flex-col p-12">
			<A4Page
				{reactive}
				bind:headerForm={localFormObject}
				bind:headerData={localFormObject.data}
				bind:firstSectionData
			></A4Page>
			<form method="POST" use:enhance>
				<button type="submit">Submit</button>
				{#if $delayed}<LoaderCircle class="animate-spin" />{/if}
			</form>
		</div>
	</div>
</div>

<!-- 
<form
	method="POST"
	use:enhance
	class="non-print group fixed bottom-28 right-4 z-10 mx-auto h-[calc(100vh-13rem)] cursor-pointer rounded-lg border
	border-transparent
	p-8
	transition-all
	duration-200
	hover:border-gray-200
	hover:bg-gray-50/50"
>
	<button
		type="submit"
		class="flex h-full w-full items-center justify-center transition-all duration-300 ease-in-out"
	>
		<SquareArrowRight
			size={130}
			strokeWidth={1.5}
			class="group-hover:text-primary text-gray-400 
				   opacity-40 transition-all 
				   duration-300 
				   ease-in-out 
				   group-hover:scale-150 
				   group-hover:opacity-100"
		/>
	</button>
</form> -->

<style lang="postcss">
	@media print {
		@page {
			size: A4;
			margin: 0;
		}

		body * {
			visibility: hidden;
		}

		.print-container,
		.print-container * {
			visibility: visible;
		}

		.print-container {
			position: absolute;
			left: 0;
			top: 0;
			margin: 0;
			padding: 10;
		}

		nav,
		footer,
		.non-print {
			display: none !important;
		}
	}
</style>
