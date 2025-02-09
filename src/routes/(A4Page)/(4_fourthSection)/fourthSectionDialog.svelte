<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import { fourthSectionContainerSchema } from '$lib/schema/4_fourthSectionContainer';
	import FourthSectionContainer from './fourthSectionContainer.svelte';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import * as Form from '$lib/components/ui/form/';
	import { Textarea } from '$lib/components/ui/textarea';

	let {
		fourthSectionForm = $bindable(),
		fourthSectionData = $bindable(),
		openDialog = $bindable(),
		faelligkeitsdatum = undefined,
		kleinunternehmer
	} = $props();

	const form = superForm(fourthSectionForm, {
		validators: zodClient(fourthSectionContainerSchema),
		SPA: true,
		invalidateAll: false, // Prevents full page reload
		onUpdate({ form }) {
			console.log(form)
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

<form method="POST" use:enhance class="mx-auto w-full p-1">
	<Form.Field {form} name="extraInvoiceInfoSecond">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Zusätzliche Informationen über die Rechnung für den Empfänger hier eintragen:</Form.Label>
				<Textarea {...props} bind:value={$formData.extraInvoiceInfoSecond} class="min-h-[160px]"/>
			{/snippet}
		</Form.Control>
		<Form.Description />
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button>Submit</Form.Button>
</form>
