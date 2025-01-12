<!-- frontend/src/routes/(A4Page)/create/+page.svelte -->
<script lang="ts">
	import A4Page from '../A4Page.svelte';
	let { data } = $props();

	const reactive = false;

	let localFormObject = $state(data);

	let localHeaderFormObject = $state(data.headerForm);

	let localFirstSectionFormObject = $state(data.firstSectionForm);

	$effect(() => {
		console.log('Main-Read-Page--', localHeaderFormObject);
		console.log('Main-Read-Page--', localFirstSectionFormObject);
	});
</script>

<div class="flex items-start gap-4">
	<div class="mx-auto aspect-[1/1.4142] w-full max-w-[210mm] bg-white shadow-lg print:shadow-none">
		<div class="print-container box-border flex h-full w-full flex-col p-12">
			<A4Page
				{reactive}
				headerForm={localHeaderFormObject}
				headerData={localHeaderFormObject.data}
				firstSectionForm={localFirstSectionFormObject}
				firstSectionData={localFirstSectionFormObject.data}
			></A4Page>
		</div>
	</div>
</div>

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
