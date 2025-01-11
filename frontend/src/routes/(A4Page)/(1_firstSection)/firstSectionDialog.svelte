<script lang="ts">
	import { type SuperValidated, type Infer, superForm, defaults } from 'sveltekit-superforms';
	import { zod, zodClient } from 'sveltekit-superforms/adapters';
	import * as Form from '$lib/components/ui/form/';
	import { Input } from '$lib/components/ui/input/';
	import FirstSectionContainer from './firstSectionContainer.svelte';
	import { firstSectionContainerSchema } from '$lib/schema/1_firstSectionContainer';

	let {
		firstSectionForm = $bindable(),
		firstSectionData = $bindable(),
		openDialog = $bindable()
	} = $props();

	// let defaultValues = {
	// 	...localHeaderObject,
	// 	rechnungsdatum: transform2String(localHeaderObject.rechnungsdatum)
	// };

	function transform2String(dateObject: Date) {
		try {
			return dateObject.toISOString().split('T')[0];
		} catch (error) {
			console.error('Invalid date object:', error);
			return null;
		}
	}

	// for local client storage

	const form = superForm(firstSectionForm, {
		validators: zodClient(firstSectionContainerSchema),
		SPA: true,
		invalidateAll: false, // Prevents full page reload
		onUpdate({ form }) {
			if (form.valid) {
				firstSectionData = { ...$formData };
				openDialog = false;
			}
		}
	});

	const { form: formData, enhance } = form;
</script>

<FirstSectionContainer
	firstSectionData={$formData}
	isInteractive={false}
	propaGateFrom={'DialogFirstSection'}
/>

<form method="POST" use:enhance>
	<Form.Field {form} name="firma">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Firma</Form.Label>
				<Input {...props} bind:value={$formData.firma} />
			{/snippet}
		</Form.Control>
		<Form.Description />
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="strasse">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Straße</Form.Label>
				<Input {...props} bind:value={$formData.strasse} />
			{/snippet}
		</Form.Control>
		<Form.Description />
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="plz">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>PLZ</Form.Label>
				<Input {...props} bind:value={$formData.plz} />
			{/snippet}
		</Form.Control>
		<Form.Description />
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="ort">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Ort</Form.Label>
				<Input {...props} bind:value={$formData.ort} />
			{/snippet}
		</Form.Control>
		<Form.Description />
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="rechnungsnummer">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>rechnungsnummer</Form.Label>
				<Input {...props} bind:value={$formData.rechnungsnummer} />
			{/snippet}
		</Form.Control>
		<Form.Description />
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="rechnungsdatum">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Rechnungsdatum</Form.Label>
				<Input type="date" {...props} bind:value={$formData.rechnungsdatum} />
			{/snippet}
		</Form.Control>
		<Form.Description />
		<Form.FieldErrors />
	</Form.Field>

	<Form.Button>Submit</Form.Button>
</form>
