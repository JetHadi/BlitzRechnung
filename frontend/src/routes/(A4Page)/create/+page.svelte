<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import { defaultRechnungsSender } from '$lib/types/rechnungsSender';
	import A4Header from '../(header)/A4Header.svelte';
	import DialogHeader from './dialogHeader.svelte';
	
	let { data } = $props();

	let localRechnungsAbsender = $state(data.localRechnungsAbsender)

	$effect(()=> {
		localRechnungsAbsender = {...defaultRechnungsSender}
	})

</script>

<Dialog.Root>
	<Dialog.Trigger><A4Header bind:localHeaderObject={localRechnungsAbsender} propaGateFrom={'page.svelte'}/></Dialog.Trigger>

	<Dialog.Content class="h-screen w-full sm:max-w-[800px]">
		<ScrollArea>
			<Dialog.Header>
				<Dialog.Title>Inhalt bearbeiten</Dialog.Title>
				<Dialog.Description>Passe die Einträge an</Dialog.Description>
			</Dialog.Header>
			<div class="p-4">
				<DialogHeader bind:localHeaderObject={localRechnungsAbsender}/>
			</div>
		</ScrollArea>
	</Dialog.Content>
</Dialog.Root>
