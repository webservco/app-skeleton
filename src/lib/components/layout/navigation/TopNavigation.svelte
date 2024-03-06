<script lang="ts">
  export let isAuthenticated: boolean;
</script>

<div class="hidden md:block">
  <div class="ml-10 flex items-baseline space-x-4">
    <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
    {#if isAuthenticated}
      <a
        href="/auth"
        class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
        >Profile</a
      >
    {:else}
      <a
        href="/auth/login"
        class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
        >Login</a
      >
      <a
        href="/auth/register"
        class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
        >Register</a
      >
    {/if}

    <!--
      <a
          href="/"
          class="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
          aria-current="page">Dashboard</a
        >
      <a
        href="/"
        class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
        >Projects</a
      >
      <a
        href="/"
        class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
        >Calendar</a
      >
      <a
        href="/"
        class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
        >Reports</a
      >
      -->
  </div>
</div>
