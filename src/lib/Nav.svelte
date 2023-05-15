<script lang="ts">
  import type { SvelteComponent } from 'svelte';

  export let username: string | null | undefined = '';
  export let avatar: string | null | undefined = '';
  export let routes: {
    href: string;
    name: string;
    icon: typeof SvelteComponent;
  }[] = [];
  export let activeRoute: string | undefined = undefined;
</script>

<nav class="flex flex-1 flex-col">
  <ul role="list" class="flex flex-1 flex-col gap-y-7">
    <li>
      <ul role="list" class="-mx-2 space-y-1">
        {#each routes as route}
          <li>
            <a
              href={route.href}
              class={`hover:text-white hover:bg-accent group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold ${
                activeRoute === route.href ? 'bg-accent text-white' : 'text-white'
              }`}
            >
              <svelte:component this={route.icon} />
              {route.name}
            </a>
          </li>
        {/each}
      </ul>
    </li>

    {#if username}
      <li class="-mx-6 mt-auto">
        <a
          href="#"
          class="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-accent"
        >
          {#if avatar}
            <img class="h-8 w-8 rounded-full bg-accent" src={avatar} alt="" />
          {/if}
          <span class="sr-only">Your profile</span>
          <span aria-hidden="true">{username}</span>
        </a>
      </li>
    {/if}
  </ul>
</nav>
