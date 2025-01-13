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

	let {
		mainSectionForm = $bindable(),
		mainSectionData = $bindable(),
		openDialog = $bindable()
	} = $props();

	// Format number as German currency
	const formatCurrency = (value: number) => {
		return value.toLocaleString('de-DE', {
			style: 'currency',
			currency: 'EUR'
		});
	};

	const defaultRechnungsPositiion = deafaultRechnungsPosition;

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
            console.log('onUpdate', form)
			if (form.valid) {
				mainSectionData = { ...$formData};
				openDialog = false;
			}
		}
	});

	const { form: formData, enhance } = form;

	function addNewDefaultPosition() {
		$formData.RechnungsPositionen = [...$formData.RechnungsPositionen, defaultRechnungsPositiion];
	}

	function removeLastAddedPosition() {
		$formData.RechnungsPositionen = $formData.RechnungsPositionen.slice(0, -1);
	}

    $inspect(mainSectionData)
</script>

<form method="POST" use:enhance>
	<div class="rounded-md border">
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
						<Table.Cell class="font-medium">
							<Form.Field {form} name="{position}-bezeichnung">
								<Form.Control>
									{#snippet children({ props })}
										<Input {...props} bind:value={position.bezeichnung} />
									{/snippet}
								</Form.Control>
								<Form.FieldErrors />
							</Form.Field>
						</Table.Cell>
						<Table.Cell class="text-right">
							<Form.Field {form} name="{position}-anzahl">
								<Form.Control>
									{#snippet children({ props })}
										<Input type="number" {...props} bind:value={position.anzahl} />
									{/snippet}
								</Form.Control>
								<Form.FieldErrors />
							</Form.Field>
						</Table.Cell>

						<Table.Cell class="text-right">
							<Form.Field {form} name="{position}-einheit">
								<Form.Control>
									{#snippet children({ props })}
										<Input {...props} bind:value={position.einheit} />
									{/snippet}
								</Form.Control>
								<Form.FieldErrors />
							</Form.Field>
						</Table.Cell>

						<Table.Cell class="text-right">
							<Form.Field {form} name="{position}-einheitspreis">
								<Form.Control>
									{#snippet children({ props })}
										<Input  type="number" {...props} bind:value={position.einheitspreis} />
									{/snippet}
								</Form.Control>
								<Form.FieldErrors />
							</Form.Field>
						</Table.Cell>

						<Table.Cell class="text-right">
							<Form.Field {form} name="{position}-ustProzent">
								<Form.Control>
									{#snippet children({ props })}
										<Input type="number" {...props} bind:value={position.ustProzent} />
									{/snippet}
								</Form.Control>
								<Form.FieldErrors />
							</Form.Field>
						</Table.Cell>

						<Table.Cell class="text-right"
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
			class="ring-offset-background focus-visible:ring-ring bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
			onclick={addNewDefaultPosition}
			disabled={$formData.RechnungsPositionen.length >= 10}
		>
			<Plus />
			Add Position
		</button>

		<button
			type="button"
			class="ring-offset-background focus-visible:ring-ring bg-destructive text-destructive-foreground hover:bg-destructive/90 inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
			onclick={removeLastAddedPosition}
			disabled={$formData.RechnungsPositionen.length <= 1}
		>
			<Minus />
			Remove Last Position
		</button>
	</div>
	<Form.Button>Submit</Form.Button>
</form>
