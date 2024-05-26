<script lang="ts">
  import { scrollTop, scrollBottom } from 'svelte-scrolling';

  // https://icones.js.org/collection/heroicons
  import IconDown from '~icons/heroicons/arrow-down-circle';
  import IconUp from '~icons/heroicons/arrow-up-circle';

  export let appVersion: string;
</script>

<div class="sticky bottom-0 z-50 flex items-center justify-between bg-accent px-4 py-2">
  <small class="text-xs">v{appVersion}</small>

  <div>
    <button on:click={() => scrollTop()}><IconUp /></button>
    <button on:click={() => scrollBottom()}><IconDown /></button>
  </div>
</div>
