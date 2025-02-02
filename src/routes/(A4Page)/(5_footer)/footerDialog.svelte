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
	let {
		footerForm = $bindable(),
		footerData = $bindable(),
		openDialog = $bindable(),
		kleinunternehmer
	} = $props();

	const form = superForm(footerForm, {
		validators: zodClient(footerContainerSchema),
		SPA: true,
		invalidateAll: false, // Prevents full page reload
		onSubmit({}) {
			console.log('from DialogFooter onSubmit:', footerForm.data.firma);
			if ($formData.absender_steuernummer == '') {
				$formData.absender_steuernummer = undefined;
			}
			console.log($formData.absender_steuernummer);
			if ($formData.absender_ustId == '') {
				$formData.absender_ustId = undefined;
			}
		},
		onUpdate({ form }) {
			if (form.valid) {
				footerForm.data = { ...$formData };
				console.log('from DialogFooter onUpdate: ', footerForm.data.firma);
				openDialog = false;
			}
		}
	});

	const { form: formData, enhance } = form;

	$effect(() => {
		console.log(kleinunternehmer);

		if (kleinunternehmer) {
			$formData.absender_ustId = '';
		} else {
			$formData.absender_steuernummer = '';
		}
	});
</script>

<FooterContainer footerData={$formData} isInteractive={false} propaGateFrom={'DialogFooter'} />
<form method="POST" use:enhance>
	<Form.Field {form} name="absender_bankname">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Bankname</Form.Label>
				<Input {...props} bind:value={$formData.absender_bankname} />
			{/snippet}
		</Form.Control>
		<Form.Description />
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="absender_iban">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>IBAN</Form.Label>
				<Input {...props} bind:value={$formData.absender_iban} />
			{/snippet}
		</Form.Control>
		<Form.Description />
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="absender_bic">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>BIC</Form.Label>
				<Input {...props} bind:value={$formData.absender_bic} />
			{/snippet}
		</Form.Control>
		<Form.Description />
		<Form.FieldErrors />
	</Form.Field>
	<!--TODO: Add Prefix like DE etc here 
	<Form.Field {form} name="absender_ustId">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>USt.-ID</Form.Label>
				<Input
					{...props}
					bind:value={$formData.absender_ustId}
					oninput={(e) => {
						if (!e.target.value.startsWith('DE')) {
							e.target.value = `DE${e.target.value.replace(/^DE/, '')}`;
							$formData.absender_ustId = e.target.value;
						}
					}}
				/>
			{/snippet}
		</Form.Control>
		<Form.Description />
		<Form.FieldErrors />
	</Form.Field>
	-->
	<Form.Field {form} name="absender_ustId">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>USt.-ID</Form.Label>
				<Input
					{...props}
					bind:value={$formData.absender_ustId}
					oninput={(e) => {
						if (e.target.value == '') {
							$formData.absender_ustId = undefined;
						}
					}}
				/>
			{/snippet}
		</Form.Control>
		<Form.Description />
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="absender_steuernummer">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Steuernummer</Form.Label>
				<Input
					{...props}
					bind:value={$formData.absender_steuernummer}
					oninput={(e) => {
						if (e.target.value == '') {
							$formData.absender_steuernummer = undefined;
						}
					}}
				/>
			{/snippet}
		</Form.Control>
		<Form.Description />
		<Form.FieldErrors />
	</Form.Field>

	<Form.Button>Submit</Form.Button>
</form>
