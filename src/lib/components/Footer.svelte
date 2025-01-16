<script lang="ts">
    import { navigationItems } from '$lib/types/navigation';
</script>

<footer class="flex items-center justify-between border-b p-4 bg-white shadow-lg">
    <div class="container mx-auto flex justify-between">
        <div class="space-x-4">
            {#each navigationItems as { label, href }}
                <a href={href} class="hover:underline">{label}</a>
            {/each}
        </div>
        <div>
            <a href="/contact" class="hover:underline">Contact Us</a>
        </div>
    </div>
    <div class="text-center mt-4 text-sm">
        © {new Date().getFullYear()} Your Company. All Rights Reserved.
    </div>
</footer>
