<!-- frontend/src/routes/(A4Page)/create/+page.svelte -->
<script lang="ts">
	import { ArrowRight, LoaderCircle, SquareArrowRight } from 'lucide-svelte';
	import A4Page from '../A4Page.svelte';
	import { superForm } from 'sveltekit-superforms';
	import { date, isValid } from 'zod';
	import { onDestroy } from 'svelte';
	import { mount, unmount } from 'svelte';
	import { slide, fly, scale, fade } from 'svelte/transition';
	import { backIn, quintOut } from 'svelte/easing';
	import Button from '$lib/components/ui/button/button.svelte';
	import Progress from '$lib/components/ui/progress/progress.svelte';
	import RegisterForm from '../../signup/registerForm.svelte';

	let { data } = $props();

	let isSubmitted = $state(false);
	let isInteractive = $state(true);
	let localSubmitObject = $state(data);

	let waiters = $state(data.waiters);
	let queueWaitTime = $derived(waiters.reduce((sum, current) => sum + current, 0) / 1000);
	let currentWaiters = $state<number[]>();

	let localHeaderFormObject = $state(data.headerForm);
	let localFirstSectionFormObject = $state(data.firstSectionForm);
	let localSecondSectionFormObject = $state(data.secondSectionForm);
	let localMainSectionObject = $state(data.mainSectionForm);
	let localFourthSectionObject = $state(data.fourthSectionForm);
	let localFooterFormObject = $state(data.footerForm);
	let startTime: number = $state(0);
	let submitDuration: number = $state(0);

	async function processWaiters(waiters: number[]) {
		isSubmitted = true;
		isInteractive = false;

		let localWaiters = [...waiters];
		window.scrollTo({
			top: 0,
			behavior: 'smooth' // Enables smooth scrolling
		});

		while (localWaiters.length > 0) {
			await new Promise((resolve) => setTimeout(resolve, localWaiters[0]));
			localWaiters = localWaiters.slice(1);
			currentWaiters = localWaiters;
			console.log('Remaining delays:', currentWaiters);
		}
		submit();
	}

	const objectForm = superForm(localSubmitObject, {
		delayMs: 500,
		timeoutMs: 8000,
		dataType: 'json',
		onSubmit({ formData, cancel, jsonData }) {
			startTime = performance.now();
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
			//
			// 	console.log(`🟨 Form submission took: ${submitDuration.toFixed(2)}ms`);

			// 	if (result.type === 'success') {
			// 		console.log('✅ Submission successful', result.data);
			// 	} else {
			// 		console.log('❌ Submission failed', result.data);
			// 	}
			// };
		},
		onResult({ result }) {
			submitDuration = (performance.now() - startTime) / 1000;
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

	const { form: formData, enhance, delayed, submitting, submit } = objectForm;

	const origin = 'Main';

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

	let isAllValid = $state(false);

	// $inspect(localHeaderFormObject)

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

<div class="relative mx-auto max-w-[210mm] flex-col items-center">
	{#if isSubmitted}
		<div class="duration-3000 mb-4 rounded-md border-4 bg-white p-4 transition-all print:hidden">
			<div class="flex items-center gap-3">
				<LoaderCircle
					size={40}
					strokeWidth={1.5}
					class="transition-duration-3000 {$delayed
						? 'animate-spin text-brand-yellow'
						: 'text-brand-gray/50'}"
				/>
				{#if !downloadUrl && !$delayed}
					<div class="flex w-full flex-col items-center gap-1">
						<p class="text-gray-700 dark:text-gray-300">Deine Rechnung ist in der Warteschlange.</p>
						<p>Es sind noch <strong>{currentWaiters?.length ?? '??'}</strong> vor dir.</p>
						<p class="text-gray-700 dark:text-gray-300">
							Jetzt mit <strong class="font-medium text-brand-yellow">Premium</strong> Warteschlange
							überspringen und direkt ans Ziel kommen.
						</p>
					</div>
				{:else if !downloadUrl && $delayed}
					<div class="flex w-full flex-col items-center gap-1">
						<p class="text-gray-700 dark:text-gray-300">Deine Rechnung wird erstellt.</p>
						<p class="text-gray-700 dark:text-gray-300">
							Jetzt mit <strong class="font-medium text-brand-yellow">Premium</strong> Warteschlange
							überspringen und direkt ans Ziel kommen.
						</p>
					</div>
				{:else}
					<div class="flex w-full flex-col items-center gap-1">
						<p><strong class="font-medium text-brand-yellow">Fertig</strong></p>
						<p class="text-gray-700 dark:text-gray-300">
							Die Warteschlange dauerte {queueWaitTime.toFixed(1)} Sekunden
						</p>
						<p class="text-gray-700 dark:text-gray-300">
							Deine Rechnung wurde blitzschnell erstellt in {submitDuration.toFixed(1)} Sekunden.
						</p>
						<p class="text-gray-700 dark:text-gray-300">
							Jetzt mit <strong class="font-medium text-brand-yellow">Premium</strong>
							{((1 - submitDuration / queueWaitTime) * 100).toFixed(0)}% schneller sein und die
							Warteschlange überspringen.
						</p>
					</div>
				{/if}
			</div>
		</div>
		<RegisterForm />
		{#if downloadUrl}
			<div class="flex flex-row space-x-2">
				<Button
					href={downloadUrl}
					download="invoice.pdf"
					class="w-full rounded-md bg-brand-yellow p-4 text-white hover:bg-brand-yellow/90"
				>
					Hier herunterladen
				</Button>
				<Button
					href="/create"
					data-sveltekit-reload
					type="button"
					class="w-full rounded-md p-4 text-white hover:bg-brand-blue/90"
				>
					neue Rechnung erstellen
				</Button>
			</div>
		{/if}
	{/if}
	<div class="transition-all duration-500 {isSubmitted ? '-mt-20 scale-75' : ''}">
		<div
			class="print:shadow-noe aspect-[1/1.4142] w-full bg-white shadow-lg
           "
		>
			<div class="print-container box-border flex h-full w-full flex-col p-6">
				<A4Page
					bind:isAllValid
					{isInteractive}
					{isSubmitted}
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
				/>
			</div>
		</div>
		<div class="no-print mt-4">
			<form method="POST" use:enhance>
				<Button
					disabled={!isAllValid || isSubmitted}
					class="w-full {isSubmitted ? 'hidden' : ''}"
					type="button"
					onclick={() => processWaiters(waiters)}
					>{!isAllValid ? 'Bitte füllen Sie alle Felder aus' : 'Jetzt Rechnung erstellen'}</Button
				>
			</form>
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
		.no-print {
			display: none !important;
		}
	}
</style>
