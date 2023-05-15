<script lang="ts">
  import '../app.postcss';
  import { page } from '$app/stores';
  import Nav from '$lib/Nav.svelte';
  import MobileNav from '$lib/MobileNav.svelte';
  import Home from '$lib/icons/Home.svelte';
  import Income from '$lib/icons/Income.svelte';
  import Expense from '$lib/icons/Expense.svelte';
  import Payments from '$lib/icons/Payments.svelte';
  import type { SvelteComponent } from 'svelte';

  const routes: {
    href: string;
    name: string;
    icon: typeof SvelteComponent;
  }[] = [
    { href: '/', name: 'Home', icon: Home },
    { href: '/incomes', name: 'Incomes', icon: Income },
    { href: '/expenses', name: 'Expenses', icon: Expense },
    { href: '/payments', name: 'Payments', icon: Payments }
  ];

  let open = false;

  $: pageName = routes.find((r) => r.href === $page.url.pathname)?.name ?? 'Home';
</script>

<div>
  {#if $page.data.session}
    <!-- Off-canvas menu for mobile, show/hide based on off-canvas menu state. -->
    <MobileNav activeRoute={$page.url.pathname} {routes} {open} on:close={() => (open = false)} />
    <!-- Static sidebar for desktop -->
    <div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div
        class="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-base-200 px-6"
      >
        <div class="flex h-16 shrink-0 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="white"
            class="w-8 h-8"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
            />
          </svg>
        </div>
        <Nav
          username={$page.data.session.user?.name}
          avatar={$page.data.session.user?.image}
          activeRoute={$page.url.pathname}
          {routes}
        />
      </div>
    </div>

    <div
      class="sticky top-0 z-40 flex items-center gap-x-6 bg-base-200 px-4 py-4 shadow-sm sm:px-6 lg:hidden"
    >
      <button
        type="button"
        class="-m-2.5 p-2.5 text-white lg:hidden"
        on:click={() => (open = true)}
      >
        <span class="sr-only">Open sidebar</span>
        <svg
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>
      <div class="flex-1 text-sm font-semibold leading-6 text-white">{pageName}</div>
      <a href="/profile">
        <span class="sr-only">Your profile</span>
        <img
          class="h-8 w-8 rounded-full bg-accent"
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
        />
      </a>
    </div>

    <main class="py-10 lg:pl-72">
      <div class="px-4 sm:px-6 lg:px-8">
        <span class="signedInText">
          <small>Signed in as</small><br />
          <strong>{$page.data.session.user?.email ?? $page.data.session.user?.name}</strong>
        </span>
        <a href="/auth/signout" class="button" data-sveltekit-preload-data="off">Sign out</a>
        <slot />
      </div>
    </main>
  {:else}
    <main class="h-screen mx-auto flex items-center justify-center">
      <div class="px-4 sm:px-6 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            class="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
            Sign in to your account
          </h2>
          <div class="text-center">
            <a href="/auth/signin" class="btn btn-primary mt-10" data-sveltekit-preload-data="off"
              >Github</a
            >
          </div>
        </div>
      </div>
    </main>
  {/if}
</div>
