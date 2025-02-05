<script lang="ts">
	import { type SuperValidated, type Infer, superForm, defaults } from 'sveltekit-superforms';
	import { zod, zodClient } from 'sveltekit-superforms/adapters';
	import * as Form from '$lib/components/ui/form/';
	import { Input } from '$lib/components/ui/input/';
	import FirstSectionContainer from './firstSectionContainer.svelte';
	import { firstSectionContainerSchema } from '$lib/schema/1_firstSectionContainer';
	import { defaultRechnungsEmfpaenger } from '$lib/types/rechnungsEmpfaenger';
	import { defaultRechnungsDaten } from '$lib/types/rechnungsDaten';
	import { addDays, cn, transformDate2String } from '$lib/utils';
	import { Switch } from '$lib/components/ui/switch';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import * as ToggleGroup from '$lib/components/ui/toggle-group';
	import { RangeCalendar } from '$lib/components/ui/range-calendar';
	import {
		CalendarDate,
		DateFormatter,
		getLocalTimeZone,
		GregorianCalendar,
		today,
		type DateValue
	} from '@internationalized/date';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import { CalendarIcon } from 'lucide-svelte';
	import { Calendar } from '$lib/components/ui/calendar';
	import { date } from 'svelte-i18n';
	import { tick, untrack } from 'svelte';
	import { range } from 'pdf-lib';
	import { Label } from '$lib/components/ui/label';

	let {
		firstSectionForm = $bindable(),
		firstSectionData = $bindable(),
		openDialog = $bindable()
	} = $props();

	let leistungsdatumType = $state(
		firstSectionData.leistungsZeitraumA ? 'leistungszeitraum' : 'leistungsdatum'
	);

	// const lDateA = new CalendarDate(
	// 	firstSectionData.leistungsZeitraumA?.getFullYear(),
	// 	firstSectionData.leistungsZeitraumA?.getMonth() + 1,
	// 	firstSectionData.leistungsZeitraumA?.getDate()
	// );

	// const lDateB = new CalendarDate(
	// 	firstSectionData.leistungsZeitraumB?.getFullYear(),
	// 	firstSectionData.leistungsZeitraumB?.getMonth() + 1,
	// 	firstSectionData.leistungsZeitraumB?.getDate()
	// );

	const start: DateValue =
		convertToCalenderDate(firstSectionData.leistungsZeitraumA) ||
		today(getLocalTimeZone()).subtract({ days: 7 });
	const end: DateValue =
		convertToCalenderDate(firstSectionData.leistungsZeitraumB) || today(getLocalTimeZone());

	const calendarSystem = new GregorianCalendar();

	let rangeCalendarValue = $state({
		// Correct spelling
		start,
		end
	});
	$inspect(firstSectionData);
	// $inspect(transform2String(firstSectionData.faelligkeitsdatum) != transform2String(addDays(firstSectionData.rechnungsdatum, 30)))
	// $inspect(firstSectionData.faelligkeitsdatum)
	// $inspect(addDays(firstSectionData.rechnungsdatum, 30))
	let extraInfo = $state(
		firstSectionData.empfaenger_steuernummer ||
			firstSectionData.empfaenger_ustId ||
			transformDate2String(firstSectionData.faelligkeitsdatum) !=
				transformDate2String(addDays(firstSectionData.rechnungsdatum, 30)) ||
			firstSectionData.leistungsdatum ||
			firstSectionData.leistungsZeitraumA
			? true
			: false
	);

	let isRechnungsdatumDatePickerOpenDatePickerOpen = $state(false);
	let isLeistungsDatumDatePickerOpenDatePickerOpen = $state(false);
	let isFaelligkeitsDatePickerOpenDatePickerOpen = $state(false);
	let isLeistungszeitraumDatePickerOpenDatePickerOpen = $state(false);

	function getDateRange(dateObject: any) {
		return dateObject;
	}

	const df = new DateFormatter('de-DE', {
		dateStyle: 'long'
	});

	// let defaultValues = {
	// 	...localHeaderObject,
	// 	rechnungsdatum: transform2String(localHeaderObject.rechnungsdatum)
	// };

	function convertToDate(dateStr: string): Date {
		const date = new Date(dateStr);

		// Validate the date is valid
		if (isNaN(date.getTime())) {
			throw new Error('Invalid date format');
		}

		return date;
	}

	function convertToCalenderDate(dateObj: Date) {
		if (!dateObj) {
			return undefined;
		}
		return new CalendarDate(dateObj.getFullYear(), dateObj.getMonth() + 1, dateObj.getDate());
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
			console.log(form);
			if (form.valid) {
				if (extraInfo) {
					if (leistungsdatumType == 'leistungsdatum') {
						firstSectionData.leistungsZeitraumA = undefined;
						firstSectionData.leistungsZeitraumB = undefined;
					} else {
						firstSectionData.leistungsdatum = undefined;
						firstSectionData.leistungsZeitraumA =
							rangeCalendarValue?.start?.toDate('America/New_York');
						firstSectionData.leistungsZeitraumB =
							rangeCalendarValue?.end?.toDate('America/New_York');
					}
				} else {
					firstSectionData.leistungsZeitraumA = undefined;
					firstSectionData.leistungsZeitraumB = undefined;
					$formData.faelligkeitsdatum = addDays($formData.rechnungsdatum, 30);
				}

				firstSectionData = { ...$formData };

				openDialog = false;
			}
		}
	});

	const { form: formData, enhance } = form;

	function handleDateChange(newValue: any, datum: string) {
		// Update the store with the new date value
		console.log(newValue);
		if (datum == 'rechnungsdatum') {
			$formData.rechnungsdatum = newValue;
		}
		if (datum == 'leistungsdatum') {
			$formData.leistungsdatum = newValue;
		}
		if (datum == 'leistungszeitraum') {
			rangeCalendarValue = newValue;
			//$formData.leistungsZeitraumA = defaultRechnungsDaten.rechnungsdatum;
		}
		if (datum == 'faelligkeitsdatum') {
			$formData.faelligkeitsdatum = newValue;
		}
	}

	function handleTypeChange(dateType: string) {
		leistungsdatumType = dateType;

		if (leistungsdatumType === 'leistungsdatum') {
			$formData.leistungsdatum = $formData.rechnungsdatum;
			$formData.leistungsZeitraumA = undefined;
			$formData.leistungsZeitraumB = undefined;
		}
		if (leistungsdatumType === 'leistungszeitraum') {
			$formData.leistungsdatum = undefined;
			formatJsonToDates(rangeCalendarValue);
		}
	}

	function formatJsonToDates(dateRange: any) {
		const formatDate = (dateObj: any) => {
			const { year, month, day } = dateObj;
			// Ensure month and day are two digits (e.g., "02" for February)
			const formattedMonth = String(month).padStart(2, '0');
			const formattedDay = String(day).padStart(2, '0');
			return `${year}-${formattedMonth}-${formattedDay}`;
		};
		const jsonObj = JSON.parse(JSON.stringify(dateRange));

		$formData.leistungsZeitraumA = formatDate(jsonObj.start);
		$formData.leistungsZeitraumB = formatDate(jsonObj.end);
	}

	$effect(() => {
		if (!$formData.rechnungsdatum) {
			$formData.rechnungsdatum = defaultRechnungsDaten.rechnungsdatum;
			$formData.faelligkeitsdatum = addDays(defaultRechnungsDaten.rechnungsdatum, 30);
		}
		// if (!$formData.leistungsdatum) {
		// 	$formData.leistungsdatum = defaultRechnungsDaten.rechnungsdatum;
		// }
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
					<Form.Label class="text-sm font-medium">Firma*</Form.Label>
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
					<Form.Label class="text-sm font-medium">Straße*</Form.Label>
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
					<Form.Label class="text-sm font-medium">PLZ*</Form.Label>
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
					<Form.Label class="text-sm font-medium">Ort*</Form.Label>
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

		<Form.Field {form} name="rechnungsdatum">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label class="text-sm font-medium">Rechnungsdatum*</Form.Label>
					<Popover.Root bind:open={isRechnungsdatumDatePickerOpenDatePickerOpen}>
						<Popover.Trigger>
							{#snippet child({ props })}
								<Button
									variant="outline"
									class={cn(
										'w-full justify-start text-left font-normal',
										!$formData.rechnungsdatum && 'text-muted-foreground'
									)}
									{...props}
								>
									<CalendarIcon class="mr-2 size-4" />
									{$formData.rechnungsdatum
										? df.format($formData.rechnungsdatum)
										: 'Datum auswählen'}
								</Button>
							{/snippet}
						</Popover.Trigger>
						<Popover.Content class="w-auto p-0">
							<Calendar
								bind:value={() => convertToCalenderDate($formData.rechnungsdatum),
								(v) => {
									$formData.rechnungsdatum = v
										? v.toDate('America/New_York')
										: $formData.rechnungsdatum;
									// if (!extraInfo){
									// 	$formData.leistungsdatum =
									// }
									isRechnungsdatumDatePickerOpenDatePickerOpen = false;
								}}
								type="single"
								initialFocus
							/>
						</Popover.Content>
					</Popover.Root>
				{/snippet}
			</Form.Control>
			<Form.Description class="mt-1 text-sm text-muted-foreground" />
			<Form.FieldErrors class="mt-1 text-sm text-destructive" />
		</Form.Field>

		<Form.Field {form} name="rechnungsnummer">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label class="text-sm font-medium">Rechnungsnummer*</Form.Label>
					<Input
						{...props}
						bind:value={$formData.rechnungsnummer}
						class="mt-1.5"
					/>
				{/snippet}
			</Form.Control>
			<Form.Description class="mt-1 text-sm text-muted-foreground" />
			<Form.FieldErrors class="mt-1 text-sm text-destructive" />
		</Form.Field>
	</div>

	<div class="mx-auto flex items-center space-x-2">
		<Switch
			class="data-[state=checked]:bg-brand-yellow"
			bind:checked={extraInfo}
			id="extraInfo"
			onCheckedChange={(checked) => {
				if (checked) {
					$formData.leistungsdatum = $formData.rechnungsdatum;
				} else {
					$formData.leistungsdatum = undefined;
				}
			}}
		/>
		<Label for="extraInfo">Zusätzliche Angaben</Label>
	</div>
	{#if extraInfo}
		<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
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
							<ToggleGroup.Root
								bind:value={() => leistungsdatumType, (v) => handleTypeChange(v)}
								size="sm"
								type="single"
							>
								<ToggleGroup.Item
									value="leistungsdatum"
									class="bg-background-alt data-[state=on]:text-brand-yellow-foreground h-6 transition-colors hover:bg-brand-yellow/20 data-[state=on]:bg-brand-yellow/20"
								>
									Leistungs-/Lieferdatum
								</ToggleGroup.Item>
								<ToggleGroup.Item
									value="leistungszeitraum"
									class="bg-background-alt data-[state=on]:text-brand-yellow-foreground h-6 transition-colors hover:bg-brand-yellow/20 data-[state=on]:bg-brand-yellow/20"
									>Leistungszeitraum</ToggleGroup.Item
								>
							</ToggleGroup.Root>
						</Form.Label>
						{#if leistungsdatumType == 'leistungsdatum'}
							<Popover.Root bind:open={isLeistungsDatumDatePickerOpenDatePickerOpen}>
								<Popover.Trigger>
									{#snippet child({ props })}
										<Button
											variant="outline"
											class={cn(
												'w-full justify-start text-left font-normal',
												!$formData.leistungsdatum && 'text-muted-foreground'
											)}
											{...props}
										>
											<CalendarIcon class="mr-2 size-4" />
											{$formData.leistungsdatum
												? df.format($formData.leistungsdatum)
												: 'Datum auswählen'}
										</Button>
									{/snippet}
								</Popover.Trigger>
								<Popover.Content class="w-auto p-0">
									<Calendar
										bind:value={() =>
											convertToCalenderDate($formData.leistungsdatum || $formData.rechnungsdatum),
										(v) => {
											$formData.leistungsdatum =
												v?.toDate('America/New_York') || $formData.leistungsdatum;
											isLeistungsDatumDatePickerOpenDatePickerOpen = false;
										}}
										type="single"
										initialFocus
									/>
								</Popover.Content>
							</Popover.Root>
						{:else}
							<!-- [&:has([data-selected])]:bg-brand-yellow
			[&:has([data-selected][data-outside-month])]:bg-brand-yellow/50  -->

							<div class="grid gap-2">
								<Popover.Root>
									<Popover.Trigger
										class={cn(
											buttonVariants({ variant: 'outline' }),
											'w-full justify-start text-left font-normal',
											!rangeCalendarValue && 'text-muted-foreground'
										)}
									>
										<CalendarIcon class="mr-2 size-4" />
										{#if rangeCalendarValue && rangeCalendarValue.start}
											{#if rangeCalendarValue.end}
												{df.format(rangeCalendarValue.start.toDate(getLocalTimeZone()))} - {df.format(
													rangeCalendarValue.end.toDate(getLocalTimeZone())
												)}
											{:else}
												{df.format(rangeCalendarValue.start.toDate(getLocalTimeZone()))}
											{/if}
										{:else}
											Bitte Zeitraum aussuchen
										{/if}
									</Popover.Trigger>
									<Popover.Content class="w-auto p-0" align="start">
										<RangeCalendar
											bind:value={rangeCalendarValue}
											onValueChange={() => formatJsonToDates(rangeCalendarValue)}
											class="rounded-md border"
											numberOfMonths={2}
											locale="de"
										/>
									</Popover.Content>
								</Popover.Root>
							</div>
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

						<Popover.Root bind:open={isFaelligkeitsDatePickerOpenDatePickerOpen}>
							<Popover.Trigger>
								{#snippet child({ props })}
									<Button
										variant="outline"
										class={cn(
											'w-full justify-start text-left font-normal',
											!$formData.faelligkeitsdatum && 'text-muted-foreground'
										)}
										{...props}
									>
										<CalendarIcon class="mr-2 size-4" />
										{$formData.faelligkeitsdatum
											? df.format($formData.faelligkeitsdatum)
											: 'Datum auswählen'}
									</Button>
								{/snippet}
							</Popover.Trigger>
							<Popover.Content class="w-auto p-0">
								<Calendar
									bind:value={() => convertToCalenderDate($formData.faelligkeitsdatum),
									(v) => {
										$formData.faelligkeitsdatum = v?.toDate('America/New_York');
										isFaelligkeitsDatePickerOpenDatePickerOpen = false;
									}}
									type="single"
									initialFocus
								/>
							</Popover.Content>
						</Popover.Root>
					{/snippet}
				</Form.Control>
				<Form.Description class="mt-1 text-sm text-muted-foreground" />
				<Form.FieldErrors class="mt-1 text-sm text-destructive" />
			</Form.Field>
		</div>
	{/if}

	<div class="mt-2 flex justify-end">
		<Form.Button class="w-full md:w-auto">Submit</Form.Button>
	</div>
</form>
