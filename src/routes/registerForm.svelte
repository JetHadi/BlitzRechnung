<!-- frontend\src\routes\(A4Page)\(0_header)\dialogHeader.svelte -->
<script lang="ts">
	import { type SuperValidated, type Infer, superForm, defaults } from 'sveltekit-superforms';
	import { zod, zodClient } from 'sveltekit-superforms/adapters';
	import * as Form from '$lib/components/ui/form/';
	import { Input } from '$lib/components/ui/input/';
	import { RechnungsAbsenderSchema } from '$lib/schema/rechnungsAbsender';
	import { defaultRechnungsSender } from '$lib/types/rechnungsSender';
	import { z } from 'zod';
	import { headerContainerSchema } from '$lib/schema/0_headerContainer';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import * as RadioGroup from '$lib/components/ui/radio-group';
	import { Button } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	import BuyPremium from '$lib/components/buyPremium.svelte';
	import { SquareChevronLeft, SquareChevronRight } from 'lucide-svelte';
	import { fly } from 'svelte/transition';

	// for local client storage
	let {
		headerForm = $bindable(),
		headerData = $bindable(),
		openDialog = $bindable(),
		isValid = $bindable(false)
	} = $props();

	// Reactive state for current page
	let current = $state(0);
	const totalPages = 3; // Set to desired number of pages

	// Navigation functions with boundary checks
	const nextPage = () => current++;
	const prevPage = () => current--;

	// Form Submission
	const form = superForm(headerForm, {
		validators: zodClient(headerContainerSchema),
		SPA: true,
		invalidateAll: false, // Prevents full page reload
		onSubmit({}) {
			//console.log('from DialogHeader onSubmit:', $formData);
			// if ($formData.absender_telefon == undefined) {
			// 	$formData.absender_telefon = '';
			// }
		},
		onUpdate({ form }) {
			if (form.valid) {
				headerData = { ...$formData };
				//console.log('from DialogHeader onUpdate: ', headerForm);
				openDialog = false;
				isValid = true;
			} else {
				isValid = false;
			}
		}
	});

	const { form: formData, enhance, errors } = form;

	//$inspect(kleinunternehmerValue);
	// $inspect(headerData.absender_kleinunternehmer)
	$effect(() => {
		// if (!headerData.absender_kleinunternehmer) {
		// 	kleinunternehmerValue = 'hidden';
		// }
	});
</script>

<form
	method="POST"
	use:enhance
	class="mx-auto flex h-[400px] min-h-0 w-full flex-col overflow-hidden rounded-md border-2 border-brand-gray bg-white p-6"
>
	<div class="relative min-h-0 flex-1">
		{#if current == 0}
			<div
				in:fly={{ x: 20 }}
				out:fly={{ x: -20 }}
				class="absolute grid h-full w-full grid-cols-2 gap-4 p-4"
			>
				<Form.Field {form} name="absender_kleinunternehmer" class="col-span-full hidden">
					<Form.Control>
						{#snippet children({ props })}
							<RadioGroup.Root class="flex items-center gap-4">
								<Form.Label class="text-sm font-medium">Bist du Kleinunternehmer?*</Form.Label>
								<div class="flex gap-4">
									<div class="hidden">
										<RadioGroup.Item value="hidden" id="r3" />
										<Label for="r3"></Label>
									</div>
									<div class="flex items-center space-x-2">
										<RadioGroup.Item value="false" id="r2" />
										<Label for="r2">Nein</Label>
									</div>
									<div class="flex items-center space-x-2">
										<RadioGroup.Item value="true" id="r1" />
										<Label for="r1">Ja</Label>
									</div>
								</div>
							</RadioGroup.Root>

							<!-- <Checkbox {...props} bind:checked={$formData.absender_kleinunternehmer} class="mt-1.5" /> -->
						{/snippet}
					</Form.Control>
					<Form.Description class="mt-1 text-sm text-muted-foreground" />
					<Form.FieldErrors class="mt-1 text-sm text-destructive" />
				</Form.Field>

				<!-- Company Field -->
				<Form.Field {form} name="absender_firma">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label class="text-sm font-medium">Firma*</Form.Label>
							<Input
								{...props}
								bind:value={$formData.absender_firma}
								placeholder={defaultRechnungsSender.absender_firma}
								class="mt-1.5"
							/>
						{/snippet}
					</Form.Control>
					<Form.Description class="mt-1 text-sm text-muted-foreground" />
					<Form.FieldErrors class="mt-1 text-sm text-destructive" />
				</Form.Field>

				<!-- Street Field -->
				<Form.Field {form} name="absender_strasse">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label class="text-sm font-medium">Straße*</Form.Label>
							<Input
								{...props}
								bind:value={$formData.absender_strasse}
								placeholder={defaultRechnungsSender.absender_strasse}
								class="mt-1.5"
							/>
						{/snippet}
					</Form.Control>
					<Form.Description class="mt-1 text-sm text-muted-foreground" />
					<Form.FieldErrors class="mt-1 text-sm text-destructive" />
				</Form.Field>

				<!-- ZIP and City in one row on larger screens -->
				<Form.Field {form} name="absender_plz">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label class="text-sm font-medium">PLZ*</Form.Label>
							<Input
								{...props}
								bind:value={$formData.absender_plz}
								placeholder={defaultRechnungsSender.absender_plz}
								class="mt-1.5"
							/>
						{/snippet}
					</Form.Control>
					<Form.Description class="mt-1 text-sm text-muted-foreground" />
					<Form.FieldErrors class="mt-1 text-sm text-destructive" />
				</Form.Field>

				<Form.Field {form} name="absender_ort">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label class="text-sm font-medium">Ort*</Form.Label>
							<Input
								{...props}
								bind:value={$formData.absender_ort}
								placeholder={defaultRechnungsSender.absender_ort}
								class="mt-1.5"
							/>
						{/snippet}
					</Form.Control>
					<Form.Description class="mt-1 text-sm text-muted-foreground" />
					<Form.FieldErrors class="mt-1 text-sm text-destructive" />
				</Form.Field>

				<!-- Contact Information -->
				<Form.Field {form} name="absender_telefon">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label class="text-sm font-medium">Telefon</Form.Label>
							<Input
								{...props}
								bind:value={$formData.absender_telefon}
								placeholder={defaultRechnungsSender.absender_telefon}
								class="mt-1.5"
							/>
						{/snippet}
					</Form.Control>
					<Form.Description class="mt-1 text-sm text-muted-foreground" />
					<Form.FieldErrors class="mt-1 text-sm text-destructive" />
				</Form.Field>
			</div>
		{:else if current == 1}
			<!-- FIXME: Hier Zahlungsoption einrichten -->
			<div
				in:fly={{ x: 20 }}
				out:fly={{ x: -20 }}
				class="absolute grid h-full w-full grid-cols-1 overflow-y-auto md:grid-cols-2 gap-4 p-4"
			>
			<Form.Field {form} name="absender_email">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label class="text-sm font-medium">Email*</Form.Label>
						<Input
							{...props}
							bind:value={$formData.absender_email}
							placeholder={defaultRechnungsSender.absender_email}
							class="mt-1.5"
						/>
					{/snippet}
				</Form.Control>
				<Form.Description class="mt-1 text-sm text-muted-foreground" />
				<Form.FieldErrors class="mt-1 text-sm text-destructive" />
			</Form.Field>

			<Form.Field {form} name="absender_password">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label class="text-sm font-medium">Passwort*</Form.Label>
						<Input
							{...props}
							type="password"
							bind:value={$formData.absender_email}
							placeholder={defaultRechnungsSender.absender_email}
							class="mt-1.5"
						/>
					{/snippet}
				</Form.Control>
				<Form.Description class="mt-1 text-sm text-muted-foreground" />
				<Form.FieldErrors class="mt-1 text-sm text-destructive" />
			</Form.Field>
					</div>
		{:else if current == 2}
			<!-- FIXME: Hier Zahlungsoption einrichten -->
			<div
				transition:fly={{ x: 20 }}
				class="absolute grid h-full w-full grid-cols-1 gap-4 overflow-y-auto md:grid-cols-2 p-4"
			>
				Test
			</div>
		{/if}
	</div>
	<!-- Navigation Controls -->
	<div class="flex justify-between border-t border-gray-200 pt-2">
		<SquareChevronLeft
			size={40}
			type="button"
			onclick={prevPage}
			class="rounded-md p-2 text-gray-500 transition-colors hover:bg-brand-yellow/30"
		/>

		<!-- Page Indicators -->
		<div class="flex gap-2">
			{#each Array(totalPages) as _, i}
				<div
					class="mt-4 h-2 w-8 rounded-full transition-colors"
					class:bg-brand-yellow={i === current}
					class:bg-gray-200={i !== current}
				></div>
			{/each}
		</div>

		<SquareChevronRight
			size={40}
			type="button"
			onclick={nextPage}
			class="rounded-md p-2 text-gray-500 transition-colors hover:bg-brand-yellow/30"
		/>
	</div>
</form>

<style lang="css">
	.fly-active {
		position: absolute;
		width: 100%;
		transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1);
	}
</style>
