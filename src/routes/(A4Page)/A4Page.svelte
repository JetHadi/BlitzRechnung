<script lang="ts">
	import A4FormCheckmarks from '$lib/components/A4FormCheckmarks.svelte';
	import Header from '$lib/components/Header.svelte';
	import * as Dialog from '$lib/components/ui/dialog';
	import HeaderContainer from './(0_header)/headerContainer.svelte';
	import HeaderDialog from './(0_header)/headerDialog.svelte';
	import FirstSectionContainer from './(1_firstSection)/firstSectionContainer.svelte';
	import FirstSectionDialog from './(1_firstSection)/firstSectionDialog.svelte';
	import SecondSectionContainer from './(2_secondContainer)/secondSectionContainer.svelte';
	import SecondSectionDialog from './(2_secondContainer)/secondSectionDialog.svelte';
	import MainSectionContainer from './(3_mainContainer)/mainSectionContainer.svelte';
	import MainSectionDialog from './(3_mainContainer)/mainSectionDialog.svelte';
	import FourthSectionContainer from './(4_fourthSection)/fourthSectionContainer.svelte';
	import FourthSectionDialog from './(4_fourthSection)/fourthSectionDialog.svelte';
	import FooterContainer from './(5_footer)/footerContainer.svelte';
	import FooterDialog from './(5_footer)/footerDialog.svelte';

	let {
		isAllValid = $bindable(),
		isInteractive = false,

		headerForm = $bindable(),
		headerData = $bindable(),

		firstSectionForm = $bindable(),
		firstSectionData = $bindable(),

		secondSectionForm = $bindable(),
		secondSectionData = $bindable(),

		mainSectionForm = $bindable(),
		mainSectionData = $bindable(),

		fourthSectionForm = $bindable(),
		fourthSectionData = $bindable(),

		footerForm = $bindable(),
		footerData = $bindable()
	} = $props();

	const origin = 'A4Page';
	let openHeaderDialog = $state(false);
	let openFirstSectionDialog = $state(false);
	let secondSectionDialog = $state(false);
	let mainSectionDialog = $state(false);
	let fourthSectionDialog = $state(false);
	let openFooterDialog = $state(false);

	const kleinunternehmer = $derived(headerData.absender_kleinunternehmer);

	// const taxId = $derived.by(() => {
	// 	(footerData.absender_ustId || footerData.absender_steuernummer)?.replace(/[ \/]/g, '');
	//});
	const verkauferKennung = $derived(
		footerData.absender_kennung || footerData.absender_steuernummer?.replace(/[ \/]/g, '')
	);

	//$inspect(firstSectionData);
	//$inspect(firstSectionData.rechnungsdatum);

	// let headerData = $state(headerForm.data)

	let isHeaderValid = $state(false);
	let isFirstSectionValid = $state(false);
	let isSecondSectionValid = $state(false);
	let isMainSectionValid = $state(false);
	let isFourthSectionValid = $state(false);
	let isFooterValid = $state(false);

	let fieldFilled_Header = $derived(isHeaderValid ? 5 : 0);
	let fieldFilled_FirstSection = $derived(isFirstSectionValid ? 6 : 0);
	let fieldFilled_SecondSection = $derived(isSecondSectionValid ? 1 : 0);
	let fieldFilled_MainSection = $derived(isMainSectionValid ? 1 : 0);
	let fieldFilled_FourthSection = $derived(isFourthSectionValid ? 1 : 0);
	let fieldFilled_Footer = $derived(isFooterValid ? 2 : 0);

	$effect(() => {
		if (
			isHeaderValid &&
			isFirstSectionValid &&
			isSecondSectionValid &&
			isMainSectionValid &&
			isFourthSectionValid &&
			isFooterValid
		) {
			isAllValid = true;
		} else {
			isAllValid = false;
		}
		// if (kleinunternehmer){
		// 	footerForm.extraInfoThird
		// }
		// console.log(origin, 'header-Form', headerForm);
		// console.log(origin, 'header-Data', headerData);
		// console.log(origin, 'first-Section-Form', firstSectionForm);
		// console.log(origin, 'first-Section-Data', firstSectionData);
	});
</script>

<div class="relative flex h-full w-full flex-col">
	{#if isInteractive}
		<div>
			<div class="absolute -left-32 z-[10]">
				<!-- Adjust right offset as needed -->
				<A4FormCheckmarks fieldFilled={fieldFilled_Header} fieldMandatory={5} />
			</div>
			<Dialog.Root bind:open={openHeaderDialog}>
				<Dialog.Trigger class="w-full"><HeaderContainer bind:headerData /></Dialog.Trigger>

				<Dialog.Content class="max-h-[92vh] w-full overflow-y-auto sm:max-w-[800px]">
					<Dialog.Header>
						<Dialog.Title>Inhalt bearbeiten</Dialog.Title>
						<Dialog.Description>Passe die Einträge an</Dialog.Description>
					</Dialog.Header>
					<HeaderDialog
						bind:openDialog={openHeaderDialog}
						bind:headerForm
						bind:headerData
						bind:isValid={isHeaderValid}
					/>
				</Dialog.Content>
			</Dialog.Root>
		</div>
		<div>
			<div class="absolute -left-32 z-[10]">
				<!-- Adjust right offset as needed -->
				<A4FormCheckmarks fieldFilled={fieldFilled_FirstSection} fieldMandatory={6} />
			</div>
			<Dialog.Root bind:open={openFirstSectionDialog}>
				<Dialog.Trigger class="w-full"
					><FirstSectionContainer bind:firstSectionData /></Dialog.Trigger
				>

				<Dialog.Content class="max-h-[92vh] w-full overflow-y-auto sm:max-w-[800px]">
					<Dialog.Header>
						<Dialog.Title>Inhalt bearbeiten</Dialog.Title>
						<Dialog.Description>Passe die Einträge an</Dialog.Description>
					</Dialog.Header>
					<FirstSectionDialog
						bind:openDialog={openFirstSectionDialog}
						bind:firstSectionForm
						bind:firstSectionData
						bind:isValid={isFirstSectionValid}
					/>
				</Dialog.Content>
			</Dialog.Root>
		</div>

		<div class="w-full flex-grow">
			<div>
				<div class="absolute -left-32 z-[10] translate-y-1/2">
					<!-- Adjust right offset as needed -->
					<A4FormCheckmarks fieldFilled={fieldFilled_SecondSection} fieldMandatory={1} />
				</div>
				<Dialog.Root bind:open={secondSectionDialog}>
					<Dialog.Trigger class="w-full"
						><SecondSectionContainer bind:secondSectionData /></Dialog.Trigger
					>

					<Dialog.Content class="max-h-[90vh] w-full overflow-y-auto sm:max-w-[800px]">
						<Dialog.Header>
							<Dialog.Title>Inhalt bearbeiten</Dialog.Title>
							<Dialog.Description>Passe die Einträge an</Dialog.Description>
						</Dialog.Header>
						<SecondSectionDialog
							bind:openDialog={secondSectionDialog}
							bind:secondSectionForm
							bind:secondSectionData
							bind:isValid={isSecondSectionValid}
						/>
					</Dialog.Content>
				</Dialog.Root>
			</div>
			<div>
				<div class="absolute -left-32 z-[10] translate-y-1/2">
					<!-- Adjust right offset as needed -->
					<A4FormCheckmarks fieldFilled={fieldFilled_MainSection} fieldMandatory={1} />
				</div>
				<Dialog.Root bind:open={mainSectionDialog}>
					<Dialog.Trigger class="w-full"
						><MainSectionContainer
							bind:mainSectionData
							kleinunternehmer={headerData.absender_kleinunternehmer}
						/></Dialog.Trigger
					>

					<Dialog.Content class="max-h-[90vh] w-full overflow-y-auto sm:max-w-[800px]">
						<Dialog.Header>
							<Dialog.Title>Inhalt bearbeiten</Dialog.Title>
							<Dialog.Description>Passe die Einträge an</Dialog.Description>
						</Dialog.Header>
						<div class="w-auto p-1">
							<MainSectionDialog
								bind:openDialog={mainSectionDialog}
								bind:mainSectionForm
								bind:mainSectionData
								kleinunternehmer={headerData.absender_kleinunternehmer}
								bind:isValid={isMainSectionValid}
							/>
						</div>
					</Dialog.Content>
				</Dialog.Root>
			</div>
			<div>
				<div class="absolute -left-32 z-[10] translate-y-1/2">
					<!-- Adjust right offset as needed -->
					<A4FormCheckmarks fieldFilled={fieldFilled_FourthSection} fieldMandatory={1} />
				</div>
				<Dialog.Root bind:open={fourthSectionDialog}>
					<Dialog.Trigger class="w-full"
						><FourthSectionContainer
							bind:fourthSectionData
							faelligkeitsdatum={firstSectionData.faelligkeitsdatum}
							rechnungsdatum={firstSectionData.rechnungsdatum}
							absender_firma={headerData.absender_firma}
						/></Dialog.Trigger
					>

					<Dialog.Content class="max-h-[90vh] w-full overflow-y-auto sm:max-w-[800px]">
							<Dialog.Header>
								<Dialog.Title>Inhalt bearbeiten</Dialog.Title>
								<Dialog.Description>Passe die Einträge an</Dialog.Description>
							</Dialog.Header>
							<div class="p-4">
								<FourthSectionDialog
									bind:openDialog={fourthSectionDialog}
									bind:fourthSectionForm
									bind:fourthSectionData
									kleinunternehmer
									bind:isValid={isFourthSectionValid}
								/>
							</div>
					</Dialog.Content>
				</Dialog.Root>
			</div>
		</div>
		<div>
			<div class="font-ligth px-4 text-left text-xs text-muted-foreground">
				{#if kleinunternehmer}
					Kein Ausweis von Umsatzsteuer, da Kleinunternehmer gemäß § 19 UStG <br />
				{:else if !firstSectionData.leistungsdatum || firstSectionData.leistungsdatum
						.toUTCString()
						.slice(0, 16) == firstSectionData.rechnungsdatum.toUTCString().slice(0, 16)}
					<span
						>Sofern nicht anders angegeben, entspricht das Liefer-/Leistungsdatum dem Rechnungsdatum</span
					><br />
				{/if}
				{#if !footerData.absender_ustId && verkauferKennung}
					<span>
						Systemkennung: Diese Rechnung trägt die Verkäuferkennung {verkauferKennung}.
					</span>
				{/if}
			</div>
		</div>
		<div>
			<div class="translate-y-1/8 absolute -left-32 z-[10]">
				<!-- Adjust right offset as needed -->
				<A4FormCheckmarks fieldFilled={fieldFilled_Footer} fieldMandatory={2} />
			</div>
			<Dialog.Root bind:open={openFooterDialog}>
				<Dialog.Trigger class="w-full"><FooterContainer bind:footerData /></Dialog.Trigger>
				<Dialog.Content class="max-h-[90vh] w-full overflow-y-auto sm:max-w-[800px]">
					<Dialog.Header>
						<Dialog.Title>Inhalt bearbeiten</Dialog.Title>
						<Dialog.Description>Passe die Einträge an</Dialog.Description>
					</Dialog.Header>
					<FooterDialog
						bind:openDialog={openFooterDialog}
						bind:footerForm
						bind:footerData
						kleinunternehmer
						bind:isValid={isFooterValid}
					/>
				</Dialog.Content>
			</Dialog.Root>
		</div>
	{:else}
		<HeaderContainer {headerData} {isInteractive} />
		<FirstSectionContainer {firstSectionData} {isInteractive} />
		<div class="mt-20 w-full flex-grow">
			<SecondSectionContainer {secondSectionData} {isInteractive} />
			<MainSectionContainer {mainSectionData} {isInteractive} kleinunternehmer />
			<FourthSectionContainer {fourthSectionData} {isInteractive} />
		</div>
		<div>
			<div class="font-ligth px-4 text-left text-xs text-muted-foreground">
				{#if kleinunternehmer}
					Kein Ausweis von Umsatzsteuer, da Kleinunternehmer gemäß § 19 UStG <br />
				{:else if !firstSectionData.leistungsdatum || firstSectionData.leistungsdatum
						.toUTCString()
						.slice(0, 16) == firstSectionData.rechnungsdatum.toUTCString().slice(0, 16)}
					<span
						>Sofern nicht anders angegeben, entspricht das Liefer-/Leistungsdatum dem Rechnungsdatum</span
					><br />
				{/if}
				{#if !footerData.absender_ustId && verkauferKennung}
					<span>
						Systemkennung: Diese Rechnung trägt die Verkäuferkennung {verkauferKennung}.
					</span>
				{/if}
			</div>
		</div>
		<FooterContainer {footerData} {isInteractive} />
	{/if}
</div>
