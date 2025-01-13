<script lang="ts">
	import { superForm } from "sveltekit-superforms";
	import FourthSectionContainer from "./fourthSectionContainer.svelte";
	import { zodClient } from "sveltekit-superforms/adapters";
	import * as Form from '$lib/components/ui/form/';
	import { Input } from '$lib/components/ui/input/';
	import { fourthSectionContainerSchema } from "$lib/schema/4_fourthSectionContainer";

	let {
		fourthSectionForm = $bindable(),
		fourthSectionData = $bindable(),
		openDialog = $bindable()
	} = $props();


	const form = superForm(fourthSectionForm, {
		validators: zodClient(fourthSectionContainerSchema),
		SPA: true,
		invalidateAll: false, // Prevents full page reload
		onUpdate({ form }) {
			if (form.valid) {
				fourthSectionData = { ...$formData };
				openDialog = false;
			}
		}
	});

	const { form: formData, enhance } = form;

</script>

<FourthSectionContainer
	fourthSectionData={$formData}
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