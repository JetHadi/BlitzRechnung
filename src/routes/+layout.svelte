<script lang="ts">
	import '../app.css';
	let { children } = $props();
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<div class="grid min-h-screen bg-gray-100 print:bg-white">
	<div class="no-print m-auto w-full">
		<Header />
	</div>
	<main class="container m-auto px-8 py-8">
		{@render children()}
	</main>
	<div class="no-print m-auto w-full">
		<Footer />
	</div>
</div>

<style lang="postcss">
	@media print {
		/* Hide everything except print-specific content */
		body * {
			visibility: hidden;
		}

		/* Target elements you want to be visible when printing */
		.print-content,
		.print-content * {
			visibility: visible;
		}

		/* Position print content */
		.print-content {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
		}

		/* Specific print page setup */
		@page {
			size: A4;
			margin: 10mm;
		}

		/* Hide header, footer, and navigation during print */
		nav,
		header,
		footer,
		.no-print {
			display: none !important;
		}
	}
</style>
