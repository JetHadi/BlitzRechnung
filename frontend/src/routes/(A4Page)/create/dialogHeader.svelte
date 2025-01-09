<script lang="ts">
	import A4Header from '../(header)/A4Header.svelte';
	import { type SuperValidated, type Infer, superForm, defaults } from 'sveltekit-superforms';
	import { zod, zodClient } from 'sveltekit-superforms/adapters';
	import * as Form from '$lib/components/ui/form/';
	import { Input } from '$lib/components/ui/input/';
	import { RechnungsAbsenderSchema } from '$lib/schema/rechnungsAbsender';
	import { defaultRechnungsSender } from '$lib/types/rechnungsSender';

	const form = superForm(
		defaults(defaultRechnungsSender, zod(RechnungsAbsenderSchema)),
		{
			validators: zodClient(RechnungsAbsenderSchema),
			SPA: true
		}
	);

	const { form: formData, enhance } = form;
</script>

<A4Header isInteractive={false} />
<form method="POST" use:enhance>
	<Form.Field {form} name="email">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Email</Form.Label>
				<Input {...props} bind:value={$formData.email} />
			{/snippet}
		</Form.Control>
		<Form.Description />
		<Form.FieldErrors />
	</Form.Field>
</form>
