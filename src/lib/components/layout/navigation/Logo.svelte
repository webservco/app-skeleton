<script lang="ts">
  import { showNavigationMenu } from './navigationMenuStore';
  import { toggleNavigationMenu } from './toggleNavigationMenu';

  function handleNavigationMenu() {
    if ($showNavigationMenu) {
      toggleNavigationMenu(false);
    }
  }
</script>

<div class="flex-shrink-0">
  <a on:click={handleNavigationMenu} class="text-gray-200" href="/" title="Home">
    App
    <!--
      <img
        class="h-8 w-8"
        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
        alt="Your Company"
      />
      -->
  </a>
</div>
