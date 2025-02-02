<script lang="ts">
	import { mainSectionContainerSchema } from '$lib/schema/3_mainSectionContainer';
	import { superForm } from 'sveltekit-superforms';
	import MainSectionContainer from './mainSectionContainer.svelte';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import * as Form from '$lib/components/ui/form/';
	import { Input } from '$lib/components/ui/input/';
	import * as Table from '$lib/components/ui/table';
	import { deafaultRechnungsPosition } from '$lib/types/rechnungsPositionDefaults';
	import { Plus, Minus } from 'lucide-svelte';
	import * as Select from '$lib/components/ui/select';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';

	let {
		mainSectionForm = $bindable(),
		mainSectionData = $bindable(),
		openDialog = $bindable(),
		kleinunternehmer
	} = $props();

	// Format number as German currency
	const formatCurrency = (value: number) => {
		return value.toLocaleString('de-DE', {
			style: 'currency',
			currency: 'EUR'
		});
	};

	let defaultRechnungsPosition = deafaultRechnungsPosition;

	let gesamt = $state((anzahl: number, einheitspreis: number) => {
		return anzahl * einheitspreis;
	});

	let ust = $state((ustProzent: number, gesamt: number) => {
		return gesamt * (1 + ustProzent / 100) - gesamt;
	});

	const form = superForm(mainSectionForm, {
		validators: zodClient(mainSectionContainerSchema),
		SPA: true,
		invalidateAll: false,
		dataType: 'json',
		onUpdate({ form }) {
			console.log('onUpdate', form);
			if (form.valid) {
				mainSectionData = { ...$formData };
				openDialog = false;
			}
		}
	});

	const { form: formData, enhance } = form;

	function addNewDefaultPosition() {
		$formData.RechnungsPositionen = [...$formData.RechnungsPositionen, defaultRechnungsPosition];
	}

	function removeLastAddedPosition() {
		$formData.RechnungsPositionen = $formData.RechnungsPositionen.slice(0, -1);
	}

	// $inspect(mainSectionData);
	$effect(() => {
		if (kleinunternehmer) {
			if (mainSectionData.RechnungsPositionen[0].bezeichnung == 'Premium Rechnung') {
				$formData.RechnungsPositionen[0].ustProzent = 0;
			}
			defaultRechnungsPosition.ustProzent = 0;
		}
	});
</script>

<form method="POST" use:enhance>
	<div class="rounded-md border-y">
		<Table.Root>
			<Table.Header>
				<Table.Row class="bg-muted/50">
					<Table.Head class="w-[300px]">Bezeichnung</Table.Head>
					<Table.Head class="text-right">Anzahl</Table.Head>
					<Table.Head class="text-right">Einheit</Table.Head>
					<Table.Head class="text-right">Einheitspreis</Table.Head>
					<Table.Head class="text-right">USt.%</Table.Head>
					<Table.Head class="text-right">USt.</Table.Head>
					<Table.Head class="text-right">Gesamt</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each $formData.RechnungsPositionen as position}
					<Table.Row>
						<Table.Cell class="w-min-[300px] px-1">
							<Form.Field {form} name="{position}-bezeichnung">
								<Form.Control>
									{#snippet children({ props })}
										<Textarea
											class="h-[40px] min-h-[40px] pt-2"
											{...props}
											bind:value={position.bezeichnung}
											contenteditable
										/>
									{/snippet}
								</Form.Control>
								<Form.FieldErrors />
							</Form.Field>
						</Table.Cell>
						<Table.Cell class="p-1">
							<Form.Field {form} name="{position}-anzahl">
								<Form.Control>
									{#snippet children({ props })}
										<Input
											type="number"
											{...props}
											bind:value={position.anzahl}
											class="text-right [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
										/>
									{/snippet}
								</Form.Control>
								<Form.FieldErrors />
							</Form.Field>
						</Table.Cell>

						<Table.Cell class="p-1">
							<Form.Field {form} name="{position}-einheit">
								<Form.Control>
									{#snippet children({ props })}
										<Select.Root type="single" {...props} bind:value={position.einheit}>
											<Select.Trigger class="p-2 text-right">{position.einheit}</Select.Trigger>
											<Select.Content>
												<Select.Item value="Stück">Stück</Select.Item>
												<Select.Item value="Stunde">Stunde</Select.Item>
												<Select.Item value="Tag">Tag</Select.Item>
												<Select.Item value="Kilogramm">Kilogramm</Select.Item>
												<Select.Item value="Meter">Meter</Select.Item>
												<Select.Item value="Liter">Liter</Select.Item>
											</Select.Content>
										</Select.Root>
									{/snippet}
								</Form.Control>
								<Form.FieldErrors />
							</Form.Field>
						</Table.Cell>

						<Table.Cell class="p-1">
							<Form.Field {form} name="{position}-einheitspreis">
								<Form.Control>
									{#snippet children({ props })}
										<Input
											class="text-right [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
											type="number"
											{...props}
											bind:value={position.einheitspreis}
										/>
									{/snippet}
								</Form.Control>
								<Form.FieldErrors />
							</Form.Field>
						</Table.Cell>

						<Table.Cell class="p-1">
							<Form.Field {form} name="{position}-ustProzent">
								<Form.Control>
									{#snippet children({ props })}
										<Input
											type="number"
											{...props}
											bind:value={position.ustProzent}
											class="text-right [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
										/>
									{/snippet}
								</Form.Control>
								<Form.FieldErrors />
							</Form.Field>
						</Table.Cell>

						<Table.Cell class="p-1 text-right"
							>{formatCurrency(
								ust(position.ustProzent, gesamt(position.anzahl, position.einheitspreis))
							)}</Table.Cell
						>
						<Table.Cell class="text-right font-medium"
							>{formatCurrency(gesamt(position.anzahl, position.einheitspreis))}</Table.Cell
						>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>
	<div class="mb-4 mt-4 flex gap-2">
		<button
			type="button"
			class="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
			onclick={addNewDefaultPosition}
			disabled={$formData.RechnungsPositionen.length >= 10}
		>
			<Plus />
			Add Position
		</button>

		<button
			type="button"
			class="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground ring-offset-background transition-colors hover:bg-destructive/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
			onclick={removeLastAddedPosition}
			disabled={$formData.RechnungsPositionen.length <= 1}
		>
			<Minus />
			Remove Last Position
		</button>
	</div>
	<Form.Button>Submit</Form.Button>
</form>
