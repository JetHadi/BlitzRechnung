<!-- frontend/src/routes/(A4Page)/+layout.svelte -->
<script lang="ts">
	import { SquareArrowRight, SquareArrowLeft } from 'lucide-svelte';

	let { children } = $props();
	
</script>

<div class="flex items-start gap-4">
	<div class="mx-auto aspect-[1/1.4142] w-full max-w-[210mm] bg-white shadow-lg print:shadow-none">
		<div class="print-container box-border flex h-full w-full flex-col p-12">
			{@render children()}
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
