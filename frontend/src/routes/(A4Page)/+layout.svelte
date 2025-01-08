<script lang="ts">
	let { children } = $props();
</script>

<div class="mx-auto h-[297mm] w-[210mm] bg-white shadow-lg flex">
	<div class="flex h-full w-full flex-col p-12">
	{@render children()}
	</div>
</div>

<style lang="postcss">
	@page {
		size: A4;
		margin: 0;
	}

	@media print {
		body {
			background-color: white !important;
		}
		nav,
		footer,
		.messages {
			display: none !important;
		}
		.print-wrapper {
			width: 210mm;
			height: 297mm;
			margin: 0 !important;
			padding: 0 !important;
		}
		.container {
			max-width: none !important;
			padding: 0 !important;
		}
	}

	:global(.container) {
		max-width: none !important;
		padding: 0 !important;
	}

	.print-wrapper {
		@apply mx-auto h-[297mm] w-[210mm];
	}
</style>