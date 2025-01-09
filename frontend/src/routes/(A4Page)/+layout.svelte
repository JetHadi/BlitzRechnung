<script lang="ts">
	let { children } = $props();
</script>

<div class="print-container mx-auto w-full max-w-[210mm] aspect-[1/1.4142] bg-white shadow-lg print:shadow-none">
	<div class="flex flex-col w-full h-full p-12 box-border">
		{@render children()}
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
			width: 210mm;
			height: 297mm;
			margin: 0;
			padding: 0;
		}

		nav,
		footer,
		.non-print {
			display: none !important;
		}
	}
</style>
