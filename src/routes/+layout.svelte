<script lang="ts">
  /**
   * Custom layout functionality.
   *
   * Layout source:
   * https://tailwindui.com/components/application-ui/application-shells/stacked
   */

  import { version } from '$app/environment';
  import Footer from '$lib/components/layout/navigation/Footer.svelte';
  import Header from '$lib/components/layout/navigation/Header.svelte';
  import Logo from '$lib/components/layout/navigation/Logo.svelte';
  import MobileMenuButton from '$lib/components/layout/navigation/MobileMenuButton.svelte';
  import MobileMenuNavigation from '$lib/components/layout/navigation/MobileMenuNavigation.svelte';
  import ModeWatcherLayout from '$lib/components/layout/navigation/ModeWatcherLayout.svelte';
  //import ProfileDropdown from '$lib/components/layout/navigation/ProfileDropdown.svelte';
  //import ProfileNotifications from '$lib/components/layout/navigation/ProfileNotifications.svelte';
  import TopNavigation from '$lib/components/layout/navigation/TopNavigation.svelte';
  import { ModeWatcher } from 'mode-watcher';
  import '../app.pcss';

  export let data;
</script>

<ModeWatcher />

<!--
  This example requires updating your template:

  ```
  <html class="h-full bg-gray-100">
  <body class="h-full">
  ```
-->
<div class="min-h-full">
  <nav class="bg-gray-800">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <div class="flex items-center">
          <Logo />

          <TopNavigation isAuthenticated={data.authenticated} />
        </div>

        <div class="flex">
          <div class="mr-2 hidden md:block">
            <div class="ml-4 flex items-center md:ml-6">
              <!--
              <ProfileNotifications />

              <ProfileDropdown />
              -->
            </div>
          </div>

          <MobileMenuButton />

          <ModeWatcherLayout />
        </div>
      </div>
    </div>

    <MobileMenuNavigation isAuthenticated={data.authenticated} />
  </nav>

  <Header />

  <main>
    <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <!-- Your content -->
      <slot />
    </div>
  </main>

  <Footer appVersion={version} />
</div>
