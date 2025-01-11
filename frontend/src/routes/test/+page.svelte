<script lang="ts">
	import { LoaderCircle } from 'lucide-svelte';
	import { superForm } from 'sveltekit-superforms';

	let { data } = $props();

	// Client API:
	const form = superForm(data.form,{
        delayMs: 500,
		timeoutMs: 8000
    });

    const { form: formData, enhance, delayed } = form;

</script>

<form method="POST" use:enhance >
	<label for="name">Name</label>
	<input type="text" name="name" bind:value={$formData.name} />

	<label for="email">E-mail</label>
	<input type="email" name="email" bind:value={$formData.email} />

	<div><button>Submit</button></div>
    {#if $delayed}<LoaderCircle class="animate-spin" />{/if}
</form>
