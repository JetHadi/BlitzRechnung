<script lang="ts">
	import { secondSectionContainerSchema } from "$lib/schema/2_secondSectionContainer";
	import { superForm } from "sveltekit-superforms";
	import SecondSectionContainer from "./secondSectionContainer.svelte";
	import { zodClient } from "sveltekit-superforms/adapters";
	import * as Form from '$lib/components/ui/form/';
	import { Input } from '$lib/components/ui/input/';

	let {
		secondSectionForm = $bindable(),
		secondSectionData = $bindable(),
		openDialog = $bindable()
	} = $props();


	const form = superForm(secondSectionForm, {
		validators: zodClient(secondSectionContainerSchema),
		SPA: true,
		invalidateAll: false, // Prevents full page reload
		onUpdate({ form }) {
			if (form.valid) {
				secondSectionData = { ...$formData };
				openDialog = false;
			}
		}
	});

	const { form: formData, enhance } = form;

</script>

<SecondSectionContainer
	secondSectionData={$formData}
	isInteractive={false}
	propaGateFrom={'DialogFirstSection'}
/>

<form method="POST" use:enhance>
	<Form.Field {form} name="firma">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Zusätzliche Informationen für den Empfänger eintragen:</Form.Label>
				<Input {...props} bind:value={$formData.text} />
			{/snippet}
		</Form.Control>
		<Form.Description />
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button>Submit</Form.Button>
</form>