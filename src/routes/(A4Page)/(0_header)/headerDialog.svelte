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

	// for local client storage
	let { headerForm = $bindable(), headerData = $bindable(), openDialog = $bindable() } = $props();

	const form = superForm(headerForm, {
		validators: zodClient(headerContainerSchema),
		SPA: true,
		invalidateAll: false, // Prevents full page reload
		onSubmit({}){
			// console.log("from DialogHeader onSubmit:",headerForm.data.firma)
		},
		onUpdate({ form }) {
			if (form.valid) {
				headerForm.data = { ...$formData };
				// console.log('from DialogHeader onUpdate: ', headerForm.data.firma);
				openDialog = false
			}
		}
	});

	const { form: formData, enhance } = form;
</script>

<HeaderContainer headerData={$formData} isInteractive={false} propaGateFrom={'DialogHeader'} />
<form method="POST" use:enhance>
	<Form.Field {form} name="firma">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Firma</Form.Label>
				<Input {...props} bind:value={$formData.absender_firma} />
			{/snippet}
		</Form.Control>
		<Form.Description />
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="strasse">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Straße</Form.Label>
				<Input {...props} bind:value={$formData.absender_strasse} />
			{/snippet}
		</Form.Control>
		<Form.Description />
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="plz">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>PLZ</Form.Label>
				<Input {...props} bind:value={$formData.absender_plz} />
			{/snippet}
		</Form.Control>
		<Form.Description />
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="ort">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Ort</Form.Label>
				<Input {...props} bind:value={$formData.absender_ort} />
			{/snippet}
		</Form.Control>
		<Form.Description />
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="telefon">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Telefon</Form.Label>
				<Input {...props} bind:value={$formData.absender_telefon} />
			{/snippet}
		</Form.Control>
		<Form.Description />
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="email">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Email</Form.Label>
				<Input {...props} bind:value={$formData.absender_email} />
			{/snippet}
		</Form.Control>
		<Form.Description />
		<Form.FieldErrors />
	</Form.Field>

	<Form.Button>Submit</Form.Button>
</form>
