<script lang="ts">
  import type { PageData } from './$types';
  import AuthForm from '$lib/components/auth/auth-form.svelte';
  export let data: PageData;
</script>

<div>
  <AuthForm data={data.form} />
</div>
