<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
  import { resetMode, setMode } from 'mode-watcher';
  // https://icones.js.org/collection/heroicons
  import IconDark from '~icons/heroicons/moon';
  import IconLight from '~icons/heroicons/sun';
</script>

<div class="">
  <!-- ModeWatcher-->
  <DropdownMenu.Root>
    <DropdownMenu.Trigger asChild let:builder>
      <Button builders={[builder]} variant="outline" size="icon">
        <IconLight
          class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
        />
        <IconDark
          class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
        />
        <span class="sr-only">Toggle theme</span>
      </Button>
    </DropdownMenu.Trigger>
    <DropdownMenu.Content align="end">
      <DropdownMenu.Item on:click={() => setMode('light')}>Light</DropdownMenu.Item>
      <DropdownMenu.Item on:click={() => setMode('dark')}>Dark</DropdownMenu.Item>
      <DropdownMenu.Item on:click={() => resetMode()}>System</DropdownMenu.Item>
    </DropdownMenu.Content>
  </DropdownMenu.Root>
  <!-- ModeWatcher-->
</div>
