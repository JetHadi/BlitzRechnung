<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import HeaderContainer from './(0_header)/headerContainer.svelte';
	import HeaderDialog from './(0_header)/headerDialog.svelte';
	import FirstSectionContainer from './(1_firstSection)/firstSectionContainer.svelte';
	import FirstSectionDialog from './(1_firstSection)/firstSectionDialog.svelte';

	let {
		reactive = false,
        
		headerForm = $bindable(),
        headerData = $bindable(),

        firstSectionForm = $bindable(),
		firstSectionData = $bindable(),

	} = $props();

	const origin = 'A4Page';
	let openHeaderDialog = $state(false);
	let openFirstSectionDialog = $state(false);

	// let headerData = $state(headerForm.data)

	$effect(() => {
		// console.log(origin, headerForm);
	});
</script>

{#if reactive}
	<Dialog.Root bind:open={openHeaderDialog}>
		<Dialog.Trigger><HeaderContainer bind:headerData /></Dialog.Trigger>

		<Dialog.Content class="w-full sm:max-w-[800px]">
			<ScrollArea>
				<Dialog.Header>
					<Dialog.Title>Inhalt bearbeiten</Dialog.Title>
					<Dialog.Description>Passe die Einträge an</Dialog.Description>
				</Dialog.Header>
				<div class="p-4">
					<HeaderDialog bind:openDialog={openHeaderDialog} bind:headerForm bind:headerData />
				</div>
			</ScrollArea>
		</Dialog.Content>
	</Dialog.Root>

	<Dialog.Root bind:open={openFirstSectionDialog}>
		<Dialog.Trigger
			><FirstSectionContainer
				bind:firstSectionData
			/></Dialog.Trigger
		>

		<Dialog.Content class="w-full sm:max-w-[800px]">
			<ScrollArea>
				<Dialog.Header>
					<Dialog.Title>Inhalt bearbeiten</Dialog.Title>
					<Dialog.Description>Passe die Einträge an</Dialog.Description>
				</Dialog.Header>
				<div class="p-4">
					<FirstSectionDialog
						bind:openDialog={openFirstSectionDialog}
                        bind:firstSectionForm
						bind:firstSectionData 
					/>
				</div>
			</ScrollArea>
		</Dialog.Content>
	</Dialog.Root>
{:else}
	<HeaderContainer bind:headerData isInteractive={reactive}/>
	<!-- <FirstSectionContainer bind:localHeaderObject={firstSectionData.firstSectionObject} /> -->
{/if}
