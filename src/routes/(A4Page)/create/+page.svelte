<!-- frontend/src/routes/(A4Page)/create/+page.svelte -->
<script lang="ts">
	import { LoaderCircle, SquareArrowRight } from 'lucide-svelte';
	import A4Page from '../A4Page.svelte';
	import { superForm } from 'sveltekit-superforms';
	import { date } from 'zod';
	import { onDestroy } from 'svelte';

	let { data } = $props();

	const isInteractive = true;

	let localSubmitObject = $state(data);

	let localHeaderFormObject = $state(data.headerForm);
	let localFirstSectionFormObject = $state(data.firstSectionForm);
	let localSecondSectionFormObject = $state(data.secondSectionForm);
	let localMainSectionObject = $state(data.mainSectionForm);
	let localFourthSectionObject = $state(data.fourthSectionForm);
	let localFooterFormObject = $state(data.footerForm);

	const objectForm = superForm(localSubmitObject, {
		delayMs: 500,
		timeoutMs: 8000,
		dataType: 'json',
		onSubmit({ formData, cancel, jsonData }) {
			const startTime = performance.now();
			console.log(`🟦 Submit started at: ${new Date().toISOString()}`);
			// localSubmitObject.headerForm = { ...localHeaderFormObject };
			// localSubmitObject.firstSectionForm = { ...localFirstSectionFormObject };
			// updateFormData();
			// jsonData(localSubmitObject);
			// console.log('onSubmit localFormObject', localSubmitObject);
			// console.log('onSubmit formData', formData.getAll)

			const submissionData = createSubmissionData();
			console.log('onSubmit submissionData: ', submissionData);
			// Update form data before submission
			// formData.set('data', JSON.stringify(submissionData));
			jsonData(submissionData);
			console.log(submissionData);

			// return async ({ result, update }) => {
			// 	const submitDuration = performance.now() - startTime;
			// 	console.log(`🟨 Form submission took: ${submitDuration.toFixed(2)}ms`);

			// 	if (result.type === 'success') {
			// 		console.log('✅ Submission successful', result.data);
			// 	} else {
			// 		console.log('❌ Submission failed', result.data);
			// 	}
			// };
		},
		onResult({ result }) {
			const timestamp = new Date().toISOString();
			console.log(`🔄 Form updated at: ${timestamp}`);
			if (result.type === 'success') {
				//console.log('Download URL:', result.data?.downloadUrl);
				if (result.data?.fileData) {
					// Clean up previous blob URL if it exists
					if (downloadUrl) URL.revokeObjectURL(downloadUrl);

					// Convert base64 to blob
					const binaryData = atob(result.data?.fileData.content);
					const bytes = new Uint8Array(binaryData.length);
					for (let i = 0; i < binaryData.length; i++) {
						bytes[i] = binaryData.charCodeAt(i);
					}

					const blob = new Blob([bytes], { type: result.data?.fileData.contentType });
					downloadUrl = URL.createObjectURL(blob);
				}
			}
		},
		onError({ result }) {
			console.error('🚫 Form error:', result);
		}
	});

	const { form: formData, enhance, delayed } = objectForm;

	const origin = 'Main';
	let count = $state(0);

	function createSubmissionData() {
		return {
			headerForm: { ...localHeaderFormObject.data },
			firstSectionForm: { ...localFirstSectionFormObject.data },
			secondSectionForm: { ...localSecondSectionFormObject.data },
			mainSectionForm: { ...localMainSectionObject.data },
			fourthSectionForm: { ...localFourthSectionObject.data },
			footerForm: { ...localFooterFormObject.data }
		};
	}

	let downloadUrl = $state('');

	$effect(() => {
		// if (objectForm?.downloadUrl) {
		//     downloadUrl = $form.downloadUrl;
		// }
		// console.log(origin, 'header-Form', localHeaderFormObject);
		// console.log(origin, 'header-Data', localHeaderFormObject.data);
		// console.log(origin, 'first-Section-Form', localFirstSectionFormObject);
		// console.log(origin, 'first-Section-Data', localFirstSectionFormObject.data);
		// console.log(origin, 'second-Section-Form', localSecondSectionFormObject);
		// console.log(origin, 'second-Section-Data', localSecondSectionFormObject.data);
		// console.log(origin, 'main-Data', localSubmitObject);
		// console.log(origin, 'main-Data formData', formData);
	});

	// TODO: check how onDestroy works in Svelte
	onDestroy(() => {
		if (downloadUrl) {
			URL.revokeObjectURL(downloadUrl);
		}
	});
</script>

<div class="flex items-start gap-4">
	<div class="mx-auto aspect-[1/1.4142] w-full max-w-[210mm] bg-white shadow-lg print:shadow-none">
		<div class="print-container box-border flex h-full w-full flex-col p-6">
			<A4Page
				{isInteractive}
				bind:headerForm={localHeaderFormObject}
				bind:headerData={localHeaderFormObject.data}
				bind:firstSectionForm={localFirstSectionFormObject}
				bind:firstSectionData={localFirstSectionFormObject.data}
				bind:secondSectionForm={localSecondSectionFormObject}
				bind:secondSectionData={localSecondSectionFormObject.data}
				bind:mainSectionForm={localMainSectionObject}
				bind:mainSectionData={localMainSectionObject.data}
				bind:fourthSectionForm={localFourthSectionObject}
				bind:fourthSectionData={localFourthSectionObject.data}
				bind:footerForm={localFooterFormObject}
				bind:footerData={localFooterFormObject.data}
			></A4Page>
		</div>
	</div>
</div>
<div class="no-print">
	<form method="POST" use:enhance>
		<button type="submit">Submit</button>
		{#if $delayed}<LoaderCircle class="animate-spin" />{/if}
	</form>
	{#if downloadUrl}
		<a
			href={downloadUrl}
			download="invoice.pdf"
			class="inline-flex items-center rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
		>
			Download Invoice
		</a>
	{/if}
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
		.no-print {
			display: none !important;
		}
	}
</style>
