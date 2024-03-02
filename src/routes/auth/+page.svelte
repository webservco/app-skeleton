<script lang="ts">
  import { enhance } from '$app/forms';
  import { Button } from '$lib/components/ui/form';

  export let data;
</script>

<h2>{data.email}</h2>

<div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
  <form method="post" class="w-2/3 space-y-6" use:enhance>
    <Button>Sign out</Button>
  </form>
</div>

