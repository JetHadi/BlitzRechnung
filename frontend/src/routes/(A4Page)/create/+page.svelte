<!-- frontend/src/routes/(A4Page)/create/+page.svelte -->
<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import { defaultRechnungsSender } from '$lib/types/rechnungsSender';
	import { superForm } from 'sveltekit-superforms';
	import A4Header from '../(header)/A4Header.svelte';
	import DialogHeader from './dialogHeader.svelte';
	import { zod } from 'sveltekit-superforms/adapters';
	import { RechnungsAbsenderSchema } from '$lib/schema/rechnungsAbsender';

	let { data } = $props();

	let localRechnungsAbsender = $state(data.localRechnungsAbsender);
	let openDialog = $state(false);

	const superFormObject = superForm(data.localRechnungsAbsender, {
		onSubmit({ formData }) {
			console.log('Exe onSubmit');
			Object.entries(localRechnungsAbsender).forEach(([key, value]) => {
				formData.set(key, value);
			});
		}
	});

	let { form, enhance } = superFormObject;

	$effect(() => {
		console.log('From +page localObject: ', localRechnungsAbsender);
	});
</script>

<Dialog.Root bind:open={openDialog}>
	<Dialog.Trigger
		><A4Header
			bind:localHeaderObject={localRechnungsAbsender}
			propaGateFrom={'page.svelte'}
		/></Dialog.Trigger
	>

	<Dialog.Content class="h-screen w-full sm:max-w-[800px]">
		<ScrollArea>
			<Dialog.Header>
				<Dialog.Title>Inhalt bearbeiten</Dialog.Title>
				<Dialog.Description>Passe die Einträge an</Dialog.Description>
			</Dialog.Header>
			<div class="p-4">
				<DialogHeader bind:openDialog={openDialog} bind:localHeaderObject={localRechnungsAbsender} />
			</div>
		</ScrollArea>
	</Dialog.Content>
</Dialog.Root>
<form method="POST" use:enhance>
	<div class="m-auto">
		<button type="submit">Submit</button>
	</div>
</form>
