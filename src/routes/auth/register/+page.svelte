<script lang="ts">
  import type { PageData } from './$types';
  import RegisterForm from './register-form.svelte';
  export let data: PageData;
</script>

<div>
  <RegisterForm data={data.form} />
</div>
