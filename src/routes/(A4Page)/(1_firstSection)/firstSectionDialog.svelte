<script lang="ts">
	import { type SuperValidated, type Infer, superForm, defaults } from 'sveltekit-superforms';
	import { zod, zodClient } from 'sveltekit-superforms/adapters';
	import * as Form from '$lib/components/ui/form/';
	import { Input } from '$lib/components/ui/input/';
	import FirstSectionContainer from './firstSectionContainer.svelte';
	import { firstSectionContainerSchema } from '$lib/schema/1_firstSectionContainer';
	import { defaultRechnungsEmfpaenger } from '$lib/types/rechnungsEmpfaenger';
	import { defaultRechnungsDaten } from '$lib/types/rechnungsDaten';
	import { addDays } from '$lib/utils';
	import { Switch } from '$lib/components/ui/switch';
	import { Button } from '$lib/components/ui/button';
	import * as ToggleGroup from '$lib/components/ui/toggle-group';
	import { RangeCalendar } from '$lib/components/ui/range-calendar';
	import { CalendarDate, getLocalTimeZone, today } from '@internationalized/date';

	let {
		firstSectionForm = $bindable(),
		firstSectionData = $bindable(),
		openDialog = $bindable()
	} = $props();

	let leistungsdatumType = $state(
		firstSectionData.leistungsZeitraumA ? 'leistungszeitraum' : 'leistungsdatum'
	); // Default value for the ToggleGroup

	const lDateA = new CalendarDate(
		firstSectionData.leistungsZeitraumA?.getFullYear(),
		firstSectionData.leistungsZeitraumA?.getMonth() + 1,
		firstSectionData.leistungsZeitraumA?.getDate()
	);

	const lDateB = new CalendarDate(
		firstSectionData.leistungsZeitraumB?.getFullYear(),
		firstSectionData.leistungsZeitraumB?.getMonth() + 1,
		firstSectionData.leistungsZeitraumB?.getDate()
	);

	const start = firstSectionData.leistungsZeitraumA ? lDateA : today(getLocalTimeZone());
	const end = firstSectionData.leistungsZeitraumB ? lDateB : start.add({ days: 7 });

	let rangeCalenderValue = $state({
		start,
		end
	});

	// let defaultValues = {
	// 	...localHeaderObject,
	// 	rechnungsdatum: transform2String(localHeaderObject.rechnungsdatum)
	// };

	function transform2String(dateObject: Date | string | null): string {
		if (!dateObject) return '';

		if (dateObject instanceof Date) {
			return dateObject.toISOString().split('T')[0];
		}

		// If it's already a string in YYYY-MM-DD format, return it
		if (typeof dateObject === 'string') {
			return dateObject;
		}

		return '';
	}

	function convertToDate(dateStr: string): Date {
		const date = new Date(dateStr);

		// Validate the date is valid
		if (isNaN(date.getTime())) {
			throw new Error('Invalid date format');
		}

		return date;
	}

	function handleDateChange(newValue: string, datum: string) {
		// Update the store with the new date value
		if (datum == 'rechnungsdatum') {
			$formData.rechnungsdatum = newValue;
		}
		if (datum == 'leistungsdatum') {
			$formData.leistungsdatum = newValue;
		}
		if (datum == 'faelligkeitsdatum') {
			$formData.faelligkeitsdatum = newValue;
		}
	}

	// for local client storage

	const form = superForm(firstSectionForm, {
		validators: zodClient(firstSectionContainerSchema),
		SPA: true,
		invalidateAll: false, // Prevents full page reload
		onSubmit() {
			console.log($formData);
		},
		onUpdate({ form }) {
			if (form.valid) {
				firstSectionData = { ...$formData };
				firstSectionData.leistungsZeitraumA = rangeCalenderValue.start.toDate('America/New_York');
				firstSectionData.leistungsZeitraumB = rangeCalenderValue.end.toDate('America/New_York');
				if (leistungsdatumType == 'leistungsdatum') {
					firstSectionData.leistungsZeitraumA = undefined;
					firstSectionData.leistungsZeitraumB = undefined;
				} else {
					firstSectionData.leistungsdatum = undefined;
				}
				openDialog = false;
			}
		}
	});

	const { form: formData, enhance } = form;

	$inspect(firstSectionData);

	$effect(() => {
		if (!$formData.rechnungsdatum) {
			$formData.rechnungsdatum = defaultRechnungsDaten.rechnungsdatum;
		}
		if (!$formData.leistungsdatum) {
			$formData.leistungsdatum = defaultRechnungsDaten.rechnungsdatum;
		}
		if (!$formData.faelligkeitsdatum) {
			$formData.faelligkeitsdatum = addDays(defaultRechnungsDaten.rechnungsdatum, 30);
		}
	});
</script>

<FirstSectionContainer
	firstSectionData={$formData}
	isInteractive={false}
	propaGateFrom={'DialogFirstSection'}
/>

<form method="POST" use:enhance class="mx-auto w-auto space-y-2 p-6">
	<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
		<Form.Field {form} name="empfaenger_firma">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label class="text-sm font-medium">Firma</Form.Label>
					<Input
						{...props}
						bind:value={$formData.empfaenger_firma}
						placeholder={defaultRechnungsEmfpaenger.empfaenger_firma}
						class="mt-1.5"
					/>
				{/snippet}
			</Form.Control>
			<Form.Description class="mt-1 text-sm text-muted-foreground" />
			<Form.FieldErrors class="mt-1 text-sm text-destructive" />
		</Form.Field>

		<Form.Field {form} name="empfaenger_strasse">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label class="text-sm font-medium">Straße</Form.Label>
					<Input
						{...props}
						bind:value={$formData.empfaenger_strasse}
						placeholder={defaultRechnungsEmfpaenger.empfaenger_strasse}
						class="mt-1.5"
					/>
				{/snippet}
			</Form.Control>
			<Form.Description class="mt-1 text-sm text-muted-foreground" />
			<Form.FieldErrors class="mt-1 text-sm text-destructive" />
		</Form.Field>

		<Form.Field {form} name="empfaenger_plz">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label class="text-sm font-medium">PLZ</Form.Label>
					<Input
						{...props}
						bind:value={$formData.empfaenger_plz}
						placeholder={defaultRechnungsEmfpaenger.empfaenger_plz}
						class="mt-1.5"
					/>
				{/snippet}
			</Form.Control>
			<Form.Description class="mt-1 text-sm text-muted-foreground" />
			<Form.FieldErrors class="mt-1 text-sm text-destructive" />
		</Form.Field>

		<Form.Field {form} name="empfaenger_ort">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label class="text-sm font-medium">Ort</Form.Label>
					<Input
						{...props}
						bind:value={$formData.empfaenger_ort}
						placeholder={defaultRechnungsEmfpaenger.empfaenger_ort}
						class="mt-1.5"
					/>
				{/snippet}
			</Form.Control>
			<Form.Description class="mt-1 text-sm text-muted-foreground" />
			<Form.FieldErrors class="mt-1 text-sm text-destructive" />
		</Form.Field>

		<Form.Field {form} name="rechnungsnummer">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label class="text-sm font-medium">Rechnungsnummer</Form.Label>
					<Input
						{...props}
						bind:value={$formData.rechnungsnummer}
						placeholder={defaultRechnungsDaten.rechnungsnummer}
						class="mt-1.5"
					/>
				{/snippet}
			</Form.Control>
			<Form.Description class="mt-1 text-sm text-muted-foreground" />
			<Form.FieldErrors class="mt-1 text-sm text-destructive" />
		</Form.Field>

		<Form.Field {form} name="rechnungsdatum">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label class="text-sm font-medium">Rechnungsdatum</Form.Label>
					<!-- TODO: here is an example of a function inside bind -->
					<Input
						type="date"
						{...props}
						bind:value={() =>
							transform2String($formData.rechnungsdatum || defaultRechnungsDaten.rechnungsdatum),
						(v) => handleDateChange(v, 'rechnungsdatum')}
						class="mt-1.5"
					/>
				{/snippet}
			</Form.Control>
			<Form.Description class="mt-1 text-sm text-muted-foreground" />
			<Form.FieldErrors class="mt-1 text-sm text-destructive" />
		</Form.Field>

		<Form.Field {form} name="empfaenger_ustId">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label class="text-sm font-medium">Kunden USt. ID</Form.Label>
					<Input
						{...props}
						bind:value={$formData.empfaenger_ustId}
						placeholder={defaultRechnungsEmfpaenger.empfaenger_ustId}
						class="mt-1.5"
					/>
				{/snippet}
			</Form.Control>
			<Form.Description class="mt-1 text-sm text-muted-foreground" />
			<Form.FieldErrors class="mt-1 text-sm text-destructive" />
		</Form.Field>

		<Form.Field {form} name="empfaenger_steuernummer">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label class="text-sm font-medium">Kunden SteuerNr</Form.Label>
					<Input
						{...props}
						bind:value={$formData.empfaenger_steuernummer}
						placeholder={defaultRechnungsEmfpaenger.empfaenger_steuernummer}
						class="mt-1.5"
					/>
				{/snippet}
			</Form.Control>
			<Form.Description class="mt-1 text-sm text-muted-foreground" />
			<Form.FieldErrors class="mt-1 text-sm text-destructive" />
		</Form.Field>

		<Form.Field {form} name="leistungsdatum">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label class="text-sm font-medium">
						<ToggleGroup.Root bind:value={leistungsdatumType} size="sm" type="single">
							<ToggleGroup.Item
								value="leistungsdatum"
								class="bg-background-alt data-[state=on]:text-brand-yellow-foreground h-6 transition-colors hover:bg-brand-yellow/20 data-[state=on]:bg-brand-yellow/20"
							>
								Leistungsdatum
							</ToggleGroup.Item>
							<ToggleGroup.Item
								value="leistungszeitraum"
								class="bg-background-alt data-[state=on]:text-brand-yellow-foreground h-6 transition-colors hover:bg-brand-yellow/20 data-[state=on]:bg-brand-yellow/20"
								>Leistungszeitraum</ToggleGroup.Item
							>
						</ToggleGroup.Root>
					</Form.Label>
					{#if leistungsdatumType == 'leistungsdatum'}
						<Input
							type="date"
							{...props}
							bind:value={() => transform2String($formData.leistungsdatum),
							(v) => handleDateChange(v, 'leistungsdatum')}
							class="mt-1.5"
						/>
					{:else}
						<!-- [&:has([data-selected])]:bg-brand-yellow
			[&:has([data-selected][data-outside-month])]:bg-brand-yellow/50  -->
						<RangeCalendar
							bind:value={rangeCalenderValue}
							class="
							rounded-md
					  border"
						/>
					{/if}
				{/snippet}
			</Form.Control>

			<Form.Description class="mt-1 text-sm text-muted-foreground" />
			<Form.FieldErrors class="mt-1 text-sm text-destructive" />
		</Form.Field>

		<Form.Field {form} name="faelligkeitsdatum">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label class="text-sm font-medium">Fälligkeitsdatum</Form.Label>
					<!-- TODO: here is an example of a function inside bind -->
					<Input
						type="date"
						{...props}
						bind:value={() => transform2String($formData.faelligkeitsdatum),
						(v) => handleDateChange(v, 'faelligkeitsdatum')}
						class="mt-1.5"
					/>
				{/snippet}
			</Form.Control>
			<Form.Description class="mt-1 text-sm text-muted-foreground" />
			<Form.FieldErrors class="mt-1 text-sm text-destructive" />
		</Form.Field>
	</div>

	<div class="mt-2 flex justify-end">
		<Form.Button class="w-full md:w-auto">Submit</Form.Button>
	</div>
</form>
