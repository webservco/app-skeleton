<script lang="ts">
  import type { PageData } from './$types';
  import AuthForm from '$lib/components/auth/auth-form.svelte';
  export let data: PageData;
</script>

<h2 class="py-4 text-xl font-bold">Login</h2>

<div>
  <AuthForm data={data.form} />
</div>
