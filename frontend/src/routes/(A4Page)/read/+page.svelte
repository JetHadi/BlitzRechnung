<script lang="ts">
	import A4Page from '../A4Page.svelte';

	let { data } = $props();

	const reactive = false;

	let firstSectionData = $state({
		hallo: 'hallo'
	});

</script>

<div class="flex items-start gap-4">
	<div class="mx-auto aspect-[1/1.4142] w-full max-w-[210mm] bg-white shadow-lg print:shadow-none">
		<div class="print-container box-border flex h-full w-full flex-col p-12">
			<A4Page {reactive} bind:headerForm={data.headerForm} bind:firstSectionData={firstSectionData}></A4Page>
		</div>
	</div>
</div>