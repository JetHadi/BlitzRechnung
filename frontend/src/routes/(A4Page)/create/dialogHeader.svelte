<script lang="ts">
	import A4Header from '../(header)/A4Header.svelte';
	import { type SuperValidated, type Infer, superForm, defaults } from 'sveltekit-superforms';
	import { zod, zodClient } from 'sveltekit-superforms/adapters';
	import * as Form from '$lib/components/ui/form/';
	import { Input } from '$lib/components/ui/input/';
	import { RechnungsAbsenderSchema } from '$lib/schema/rechnungsAbsender';
	import { defaultRechnungsSender } from '$lib/types/rechnungsSender';
	import { z } from 'zod';

	// for local client storage
	let { data } = $props();

	let localRechnungsAbsender = $state<z.infer<typeof RechnungsAbsenderSchema>>(
		data.localRechnungsAbsender
	);

	const form = superForm(defaults(defaultRechnungsSender, zod(RechnungsAbsenderSchema)), {
		validators: zodClient(RechnungsAbsenderSchema),
		SPA: true,
		onUpdate({ form }) {
			if (form.valid) {
				data.localRechnungsAbsender = { ...headerProps };
				console.log(data);
			}
		}
	});

	const { form: formData, enhance } = form;

	const headerProps = $derived({
		firma: $formData.firma,
		strasse: $formData.strasse,
		ort: $formData.ort,
		plz: $formData.plz,
		telefon: $formData.telefon,
		email: $formData.email,
		isInteractive: false
	});

	/* 	$effect(() => {
		console.log(data);
	}); */
</script>

<A4Header data={headerProps} isInteractive={false} />
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

	<Form.Field {form} name="telefon">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Telefon</Form.Label>
				<Input {...props} bind:value={$formData.telefon} />
			{/snippet}
		</Form.Control>
		<Form.Description />
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="email">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Email</Form.Label>
				<Input {...props} bind:value={$formData.email} />
			{/snippet}
		</Form.Control>
		<Form.Description />
		<Form.FieldErrors />
	</Form.Field>

	<Form.Button>Submit</Form.Button>
</form>
