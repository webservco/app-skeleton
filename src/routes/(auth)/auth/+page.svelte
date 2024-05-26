<script lang="ts">
  import { enhance } from '$app/forms';
  import { Button } from '$lib/components/ui/form';

  export let data;
</script>

<h2 class="py-4 text-xl font-bold">{data.email}</h2>

<div>
  <form method="post" class="space-y-4 sm:w-2/3" use:enhance>
    <Button>Sign out</Button>
  </form>
</div>
