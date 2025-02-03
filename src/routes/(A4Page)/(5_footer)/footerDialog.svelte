<!-- frontend\src\routes\(A4Page)\(0_footer)\dialogFooter.svelte -->
<script lang="ts">
	import {
		type SuperValidated,
		type Infer,
		superForm,
		defaults,
		superValidate
	} from 'sveltekit-superforms';
	import { zod, zodClient } from 'sveltekit-superforms/adapters';
	import * as Form from '$lib/components/ui/form/';
	import { Input } from '$lib/components/ui/input/';
	import { RechnungsAbsenderSchema } from '$lib/schema/rechnungsAbsender';
	import {
		defaultRechnungsSender,
		defaultRechnungsSenderPayment
	} from '$lib/types/rechnungsSender';
	import { z } from 'zod';
	import FooterContainer from './footerContainer.svelte';
	import { footerContainerSchema, type FooterContainerType } from '$lib/schema/5_footerContainer';
	import { derived } from 'svelte/store';

	// for local client storage
	let {
		footerForm = $bindable(),
		footerData = $bindable(),
		openDialog = $bindable(),
		kleinunternehmer
	} = $props();

	let formDataCopy = $state(footerData);

	let iniitalLoad = $state(0);

	let footerEmptyValues: FooterContainerType = {
		absender_bankname: '',
		absender_iban: '',
		absender_bic: '',
		absender_amtsgericht: '',
		absender_hrb: '',
		absender_steuernummer: undefined,
		absender_ustId: undefined
	};
	const form = superForm(footerForm, {
		SPA: true,
		validators: zodClient(footerContainerSchema),
		invalidateAll: false, // Prevents full page reload
		resetForm: false,
		onSubmit({}) {
			console.log('from DialogFooter onSubmit:', $formData);
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
				console.log('from DialogFooter onUpdate: ', footerForm.data);
				openDialog = false;
			}
		}
	});

	const { form: formData, enhance } = form;

	$effect(() => {
		// if (iniitalLoad == 1) {
		// 	$formData.absender_bankname = '';
		// 	$formData.absender_iban = '';
		// 	$formData.absender_bic = '';
		// 	$formData.absender_ustId = '';
		// 	$formData.absender_steuernummer = '';
		// 	iniitalLoad++;
		// }

		if (kleinunternehmer) {
			$formData.absender_ustId = '';
		} else {
			$formData.absender_steuernummer = '';
		}
	});
</script>

<FooterContainer
	footerData={formDataCopy}
	isInteractive={false}
	propaGateFrom={'DialogFooter'}
	kleinunternehmer
/>
<form method="POST" use:enhance>
	<Form.Field {form} name="absender_bankname">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Bankname</Form.Label>
				<Input
					{...props}
					bind:value={$formData.absender_bankname}
					placeholder={defaultRechnungsSenderPayment.absender_bankname}
					oninput={(e) => {
						formDataCopy.absender_bankname = $formData.absender_bankname;
					}}
				/>
			{/snippet}
		</Form.Control>
		<Form.Description />
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="absender_iban">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>IBAN</Form.Label>
				<Input
					{...props}
					bind:value={$formData.absender_iban}
					placeholder={defaultRechnungsSenderPayment.absender_iban}
					oninput={(e) => {
						formDataCopy.absender_iban = $formData.absender_iban;
					}}
				/>
			{/snippet}
		</Form.Control>
		<Form.Description />
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="absender_bic">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>BIC</Form.Label>
				<Input
					{...props}
					bind:value={$formData.absender_bic}
					placeholder={defaultRechnungsSenderPayment.absender_bic}
					oninput={(e) => {
						formDataCopy.absender_bic = $formData.absender_bic;
					}}
				/>
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
					placeholder={defaultRechnungsSenderPayment.absender_ustId}
					oninput={(e: any) => {
						if (e.target.value == '') {
							$formData.absender_ustId = undefined;
						} else {
							formDataCopy.absender_ustId = $formData.absender_ustId;
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
					placeholder={defaultRechnungsSenderPayment.absender_steuernummer}
					oninput={(e: any) => {
						if (e.target.value == '') {
							$formData.absender_steuernummer = undefined;
						} else {
							formDataCopy.absender_steuernummer = $formData.absender_steuernummer;
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
