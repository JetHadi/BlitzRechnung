<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import { secondSectionContainerSchema } from '$lib/schema/2_secondSectionContainer';
	import SecondSectionContainer from './secondSectionContainer.svelte';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import * as Form from '$lib/components/ui/form/';
	import { Textarea } from '$lib/components/ui/textarea';

	let {
		secondSectionForm = $bindable(),
		secondSectionData = $bindable(),
		openDialog = $bindable(),
		isValid = $bindable(false)
	} = $props();

	const form = superForm(secondSectionForm, {
		validators: zodClient(secondSectionContainerSchema),
		SPA: true,
		invalidateAll: false, // Prevents full page reload
		onUpdate({ form }) {
			console.log(form);
			if (form.valid) {
				secondSectionData = { ...$formData };
				openDialog = false;
				isValid = true;
			} else {
				isValid = false;
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

<form method="POST" use:enhance class="mx-auto w-full p-1">
	<Form.Field {form} name="extraInvoiceInfoFirst">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Zusätzliche Informationen für den Empfänger eintragen:</Form.Label>
				<Textarea {...props} bind:value={$formData.extraInvoiceInfoFirst} class="h-[160px]" />
			{/snippet}
		</Form.Control>
		<Form.Description />
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button>Submit</Form.Button>
</form>
