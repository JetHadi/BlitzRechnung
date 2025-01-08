<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import A4Header from '../(header)/A4Header.svelte';
	import DialogHeader from '../(header)/dialogHeader.svelte';
</script>

<Dialog.Root>
	<Dialog.Trigger><A4Header /></Dialog.Trigger>
	<Dialog.Content class="max-h-[90vh] w-full sm:max-w-[800px]">
		<Dialog.Header>
			<Dialog.Title>Inhalt bearbeiten</Dialog.Title>
			<Dialog.Description>
				Passe die Einträge an
			</Dialog.Description>
		</Dialog.Header>
        <DialogHeader/>
	</Dialog.Content>
</Dialog.Root>
