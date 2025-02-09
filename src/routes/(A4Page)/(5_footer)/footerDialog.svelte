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
	import * as ToggleGroup from '$lib/components/ui/toggle-group';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import Label from '$lib/components/ui/label/label.svelte';
	import { Info } from 'lucide-svelte';
	import BuyPremium from '$lib/components/buyPremium.svelte';

	// for local client storage
	let {
		footerForm = $bindable(),
		footerData = $bindable(),
		openDialog = $bindable(),
		kleinunternehmer
	} = $props();

	// let $formData = $state(footerData);
	let vatType = $state(
		footerData.absender_steuernummer
			? 'Steuernummer'
			: footerData.absender_ustId
				? 'USt.-ID'
				: undefined
	);
	let hoveredVatType = $state<string | null>(null);

	let vatInput = $state('');

	const form = superForm(footerForm, {
		SPA: true,
		validators: zodClient(footerContainerSchema),
		invalidateAll: false, // Prevents full page reload
		resetForm: false,
		onSubmit({}) {
			console.log('from DialogFooter onSubmit:', $formData);
			console.log(vatType);
			if (vatType == 'USt.-ID') {
				$formData.absender_steuernummer = undefined;
				if (!$formData.absender_kennung) {
					$formData.absender_kennung = undefined;
				}
			} else {
				$formData.absender_ustId = undefined;
				if (!$formData.absender_kennung) {
					$formData.absender_kennung = autKennung
				}
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

	$inspect($formData.absender_kennung);
	
	let autKennung = $derived($formData.absender_steuernummer ? `BLITZ-` + $formData.absender_steuernummer?.replace(/[ \/]/g, '') + `-KU` : '')

	$effect(() => {
		// if (iniitalLoad == 1) {
		// 	$formData.absender_bankname = '';
		// 	$formData.absender_iban = '';
		// 	$formData.absender_bic = '';
		// 	$formData.absender_ustId = '';
		// 	$formData.absender_steuernummer = '';
		// 	iniitalLoad++;
		// }
		// if (vatType === 'USt.-ID') {
		// 	$formData.absender_ustId = vatInput;
		// 	$formData.absender_steuernummer = '';
		// } else {
		// 	$formData.absender_steuernummer = vatInput;
		// 	$formData.absender_ustId = '';
		// }
		// if (kleinunternehmer) {
		// 	$formData.absender_ustId = '';
		// } else {
		// 	$formData.absender_steuernummer = '';
		// }
	});
</script>

<FooterContainer footerData={$formData} isInteractive={false} propaGateFrom={'DialogFooter'} />
<form method="POST" use:enhance class="mx-auto w-full p-6">
	<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
		<Form.Field {form} name={vatType == 'USt.-ID' ? 'absender_ustId' : 'absender_steuernummer'}>
			<Form.Control>
				{#snippet children({ props })}
					<ToggleGroup.Root bind:value={vatType} size="sm" type="single">
						<ToggleGroup.Item
							value="USt.-ID"
							class={`bg-background-alt data-[state=on]:text-brand-yellow-foreground h-6 transition-colors hover:bg-brand-yellow/20 data-[state=on]:bg-brand-yellow/20 ${!vatType ? 'animate-pulse bg-brand-yellow/10' : ''}`}
							onmouseover={() => (hoveredVatType = 'USt.-ID')}
							onmouseleave={() => (hoveredVatType = null)}
						>
							<Form.Label>
								USt.-ID{#if (vatType === 'USt.-ID' && (!hoveredVatType || hoveredVatType === 'USt.-ID')) || (hoveredVatType === 'USt.-ID' && vatType !== 'USt.-ID')}*{/if}
							</Form.Label>
						</ToggleGroup.Item>
						<ToggleGroup.Item
							value="Steuernummer"
							class={`bg-background-alt data-[state=on]:text-brand-yellow-foreground h-6 transition-colors hover:bg-brand-yellow/20 data-[state=on]:bg-brand-yellow/20 ${!vatType ? 'animate-pulse bg-brand-yellow/10' : ''}`}
							onmouseover={() => (hoveredVatType = 'Steuernummer')}
							onmouseleave={() => (hoveredVatType = null)}
						>
							<Form.Label>
								Steuernummer{#if (vatType === 'Steuernummer' && (!hoveredVatType || hoveredVatType === 'Steuernummer')) || (hoveredVatType === 'Steuernummer' && vatType !== 'Steuernummer')}*{/if}
							</Form.Label>
						</ToggleGroup.Item>
					</ToggleGroup.Root>

					<Input
						disabled={vatType == '' ? true : false}
						{...props}
						bind:value={() =>
							vatType === 'USt.-ID' ? $formData.absender_ustId : $formData.absender_steuernummer,
						(v) =>
							vatType === 'USt.-ID'
								? (($formData.absender_steuernummer = undefined), ($formData.absender_ustId = v))
								: (($formData.absender_ustId = undefined), ($formData.absender_steuernummer = v))}
						placeholder={vatType
							? vatType == 'USt.-ID'
								? defaultRechnungsSenderPayment.absender_ustId
								: defaultRechnungsSenderPayment.absender_steuernummer
							: ''}
					/>
				{/snippet}
			</Form.Control>
			<Form.Description />
			<Form.FieldErrors />
		</Form.Field>

		<Form.Field {form} name="absender_iban">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>IBAN*</Form.Label>
					<Input
						{...props}
						bind:value={$formData.absender_iban}
						placeholder={defaultRechnungsSenderPayment.absender_iban}
						oninput={(e) => {
							$formData.absender_iban = $formData.absender_iban;
						}}
					/>
				{/snippet}
			</Form.Control>
			<Form.Description />
			<Form.FieldErrors />
		</Form.Field>

		<Form.Field {form} name="absender_bankname">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>Bankname</Form.Label>
					<Input
						{...props}
						bind:value={$formData.absender_bankname}
						placeholder={defaultRechnungsSenderPayment.absender_bankname}
						oninput={(e) => {
							$formData.absender_bankname = $formData.absender_bankname;
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
							$formData.absender_bic = $formData.absender_bic;
						}}
					/>
				{/snippet}
			</Form.Control>
			<Form.Description />
			<Form.FieldErrors />
		</Form.Field>

		<Form.Field {form} name="absender_kennung">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>
						automatisch generierte Verkäuferkennung
						<Tooltip.Provider>
							<Tooltip.Root delayDuration={200}>
								<Tooltip.Trigger><Info size={14} /></Tooltip.Trigger>
								<Tooltip.Content>
									<p>
										Die Verkäuferkennung dient der vereinfachten <br /> automatisierten Verarbeitung
										dieser Rechnung <br /> in Buchhaltungssystemen ihrer Kunden. <br />
										Im Regelfall entspricht die Verkäuferkennung der USt.-ID. <br />
										Falls keine USt.-ID vorhanden ist erzeugt unser <br />
										System eine automatisch generierte Verkäuferkennung
									</p>
								</Tooltip.Content>
							</Tooltip.Root>
						</Tooltip.Provider>
					</Form.Label>

						<!-- FIXME:  Premium funktion zum entfernen von disabled-->
					<Input
						{...props}
						disabled
						bind:value={$formData.absender_kennung}
						placeholder={$formData.absender_ustId || autKennung}
					/>
				{/snippet}
			</Form.Control>
			<Form.Description />
			<Form.FieldErrors />
			<div class="font-ligth text-left text-xs text-muted-foreground">
				keine USt-ID ? individuelle Verkäuferkennung generieren:<br />
				<BuyPremium />
				<br />
			</div>
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
	</div>
	<div class="mt-2 flex justify-end">
		<Form.Button class="w-full md:w-auto">Submit</Form.Button>
	</div>
</form>
