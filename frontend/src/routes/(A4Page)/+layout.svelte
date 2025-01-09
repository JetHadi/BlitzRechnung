<script lang="ts">
	import * as Carousel from '$lib/components/ui/carousel';

	let { children } = $props();
</script>

<!-- <Carousel.Root>
	<Carousel.Content>
		<Carousel.Item>...</Carousel.Item>
		<Carousel.Item>...</Carousel.Item>
		<Carousel.Item>...</Carousel.Item>
	</Carousel.Content>
	<Carousel.Previous />
	<Carousel.Next />
</Carousel.Root> -->
<div
	class="mx-auto aspect-[1/1.4142] w-full max-w-[210mm] bg-white shadow-lg print:shadow-none"
>
	<div class="print-container box-border flex h-full w-full flex-col p-12">
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
