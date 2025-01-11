<script lang="ts">
	
	import { type SuperValidated, type Infer, superForm, defaults } from 'sveltekit-superforms';
	import { zod, zodClient } from 'sveltekit-superforms/adapters';
	import * as Form from '$lib/components/ui/form/';
	import { Input } from '$lib/components/ui/input/';
	import { firstSectionSchema } from '$lib/schema/1_firstSectionContainer';
	import FirstSectionContainer from './firstSectionContainer.svelte';

	let { localHeaderObject = $bindable(), openDialog = $bindable() } = $props();

	let defaultValues = {
		...localHeaderObject,
		rechnungsdatum: transform2String(localHeaderObject.rechnungsdatum)
	};

	function transform2String(dateObject: Date) {
		try {
			return dateObject.toISOString().split('T')[0];
		} catch (error) {
			console.error('Invalid date object:', error);
			return null;
		}
	}

	let dateString = $state('');
	// function createState() {
	//     return {
	//         value: $state(''), // Reactive input value
	//         handleInput(e: Event & { currentTarget: EventTarget & HTMLInputElement }) {
	//             this.value = e.currentTarget.value;
	//             console.log('handleInput ', this.value);
	//         }
	//     };
	// }
	const form = superForm(defaults(defaultValues, zod(firstSectionSchema)), {
		validators: zodClient(firstSectionSchema),
		SPA: true,
		invalidateAll: false,
		resetForm: false,
		onUpdate({ form }) {
			if (form.valid) {
				localHeaderObject = { ...headerProps };
				openDialog = false;
			}
		}
	});

	const { form: formData, enhance } = form;

	const headerProps = $derived({
		firma: $formData.firma,
		strasse: $formData.strasse,
		ort: $formData.ort,
		plz: $formData.plz,
		rechnungsnummer: $formData.rechnungsnummer,
		rechnungsdatum: $formData.rechnungsdatum,
		isInteractive: false
	});

	$effect(() => {
		// console.log('localHeaderObject.rechnungsdatuml ', localHeaderObject.rechnungsdatum);
		// console.log($formData.rechnungsdatum);
		// Create a computed value for the date string
		// dateString = $formData.rechnungsdatum;
		// console.log(dateString);
	});
</script>

<FirstSectionContainer
	localHeaderObject={headerProps}
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
