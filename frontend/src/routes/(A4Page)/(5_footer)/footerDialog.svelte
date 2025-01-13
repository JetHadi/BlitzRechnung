<!-- frontend\src\routes\(A4Page)\(0_footer)\dialogFooter.svelte -->
<script lang="ts">
	import { type SuperValidated, type Infer, superForm, defaults } from 'sveltekit-superforms';
	import { zod, zodClient } from 'sveltekit-superforms/adapters';
	import * as Form from '$lib/components/ui/form/';
	import { Input } from '$lib/components/ui/input/';
	import { RechnungsAbsenderSchema } from '$lib/schema/rechnungsAbsender';
	import { defaultRechnungsSender } from '$lib/types/rechnungsSender';
	import { z } from 'zod';
	import FooterContainer from './footerContainer.svelte';
	import { footerContainerSchema } from '$lib/schema/5_footerContainer';

	// for local client storage
	let { footerForm = $bindable(), footerData = $bindable(), openDialog = $bindable() } = $props();

	const form = superForm(footerForm, {
		validators: zodClient(footerContainerSchema),
		SPA: true,
		invalidateAll: false, // Prevents full page reload
		onSubmit({}){
			console.log("from DialogFooter onSubmit:",footerForm.data.firma)
		},
		onUpdate({ form }) {
			if (form.valid) {
				footerForm.data = { ...$formData };
				console.log('from DialogFooter onUpdate: ', footerForm.data.firma);
				openDialog = false
			}
		}
	});

	const { form: formData, enhance } = form;
</script>

<FooterContainer footerData={$formData} isInteractive={false} propaGateFrom={'DialogFooter'} />
<form method="POST" use:enhance>
	<Form.Field {form} name="bankname">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Bankname</Form.Label>
				<Input {...props} bind:value={$formData.bankname} />
			{/snippet}
		</Form.Control>
		<Form.Description />
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="iban">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>IBAN</Form.Label>
				<Input {...props} bind:value={$formData.iban} />
			{/snippet}
		</Form.Control>
		<Form.Description />
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="bic">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>BIC</Form.Label>
				<Input {...props} bind:value={$formData.bic} />
			{/snippet}
		</Form.Control>
		<Form.Description />
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="ustId">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>USt.-ID</Form.Label>
				<Input {...props} bind:value={$formData.ustId} />
			{/snippet}
		</Form.Control>
		<Form.Description />
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="steuernummer">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Steuernummer</Form.Label>
				<Input {...props} bind:value={$formData.steuernummer} />
			{/snippet}
		</Form.Control>
		<Form.Description />
		<Form.FieldErrors />
	</Form.Field>
    
	<Form.Button>Submit</Form.Button>
</form>
