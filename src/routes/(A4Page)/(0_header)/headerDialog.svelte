<!-- frontend\src\routes\(A4Page)\(0_header)\dialogHeader.svelte -->
<script lang="ts">
	import { type SuperValidated, type Infer, superForm, defaults } from 'sveltekit-superforms';
	import { zod, zodClient } from 'sveltekit-superforms/adapters';
	import * as Form from '$lib/components/ui/form/';
	import { Input } from '$lib/components/ui/input/';
	import { RechnungsAbsenderSchema } from '$lib/schema/rechnungsAbsender';
	import { defaultRechnungsSender } from '$lib/types/rechnungsSender';
	import { z } from 'zod';
	import HeaderContainer from './headerContainer.svelte';
	import { headerContainerSchema } from '$lib/schema/0_headerContainer';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Button } from '$lib/components/ui/button';

	// for local client storage
	let { headerForm = $bindable(), headerData = $bindable(), openDialog = $bindable() } = $props();

	const form = superForm(headerForm, {
		validators: zodClient(headerContainerSchema),
		SPA: true,
		invalidateAll: false, // Prevents full page reload
		onSubmit({}) {
			console.log('from DialogHeader onSubmit:', $formData);
			if ($formData.absender_telefon== undefined) {
				$formData.absender_telefon = '';
			}
		},
		onUpdate({ form }) {
			if (form.valid) {
				headerForm.data = { ...$formData };
				// console.log('from DialogHeader onUpdate: ', headerForm.data.firma);
				openDialog = false;
			}
		}
	});

	const handleLogoUpload = (event: Event) => {
		const input = event.target as HTMLInputElement;
		if (input.files?.[0]) {
			const reader = new FileReader();
			reader.onload = (e) => {
				$formData.absender_logo = e.target?.result as string;
			};
			reader.readAsDataURL(input.files[0]);
		}
	};

	function removeLogo() {
		console.log('Remove BUtton');
		$formData.absender_logo = '';
	}

	const { form: formData, enhance, errors } = form;
</script>

<HeaderContainer headerData={$formData} isInteractive={false} propaGateFrom={'DialogHeader'} />

<form method="POST" use:enhance class="mx-auto max-w-2xl space-y-6 p-6">
	<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
		<Form.Field {form} name="absender_kleinunternehmer" class="col-span-full">
			<Form.Control>
				{#snippet children({ props })}
					<Checkbox {...props} bind:checked={$formData.absender_kleinunternehmer} class="mt-1.5" />
					<Form.Label class="text-sm font-medium">Hier ankreuzen falls Kleinunternehmer</Form.Label>
				{/snippet}
			</Form.Control>
			<Form.Description class="mt-1 text-sm text-muted-foreground" />
			<Form.FieldErrors class="mt-1 text-sm text-destructive" />
		</Form.Field>

		<!-- Absender Name TODO: für später könnte der Absendername noch hier hinzugefügt werden -->
		<!-- <Form.Field {form} name="absender_name" class="">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label class="text-sm font-medium">Absender</Form.Label>
					<Input {...props} bind:value={$formData.absender_name} class="mt-1.5" />
				{/snippet}
			</Form.Control>
			<Form.Description class="mt-1 text-sm text-muted-foreground" />
			<Form.FieldErrors class="mt-1 text-sm text-destructive" />
		</Form.Field> -->

		<!-- Company Field -->
		<Form.Field {form} name="absender_firma">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label class="text-sm font-medium">Firma</Form.Label>
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
					<Form.Label class="text-sm font-medium">Straße</Form.Label>
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
					<Form.Label class="text-sm font-medium">PLZ</Form.Label>
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
					<Form.Label class="text-sm font-medium">Ort</Form.Label>
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

		<Form.Field {form} name="absender_email">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label class="text-sm font-medium">Email</Form.Label>
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

		<!-- TODO: Add Premium function -->
		<Form.Field {form} name="absender_logo" class="col-span-full">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label class="text-sm font-medium">
						<b class="font-bold text-brand-yellow"> Premium Funktion - </b> jetzt freischalten für
						nur 4€ pro Monat
						<br />
						<span class=" text-brand-gray/30"
							>Logo hochladen - <button
								type="button"
								onclick={removeLogo}
								class="transition-colors hover:text-brand-yellow"
							>
								Logo entfernen
							</button>
						</span></Form.Label
					>
					<Input
						type="file"
						disabled
						accept="image/*"
						onchange={handleLogoUpload}
						id="logo-upload"
						class=""
					/>
				{/snippet}
			</Form.Control>
		</Form.Field>
	</div>

	<div class="mt-2 flex justify-end">
		<Form.Button class="w-full md:w-auto">Submit</Form.Button>
	</div>
</form>
