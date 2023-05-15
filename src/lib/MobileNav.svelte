<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { fly, fade } from 'svelte/transition';

  export let routes: {
    href: string;
    name: string;
  }[] = [];
  export let activeRoute: string | undefined = undefined;

  export let open: boolean;

  const dispatch = createEventDispatcher();
</script>

<div class="relative z-50 lg:hidden" role="dialog" aria-modal="true">
  {#if open}
    <div class="fixed inset-0 bg-gray-900/80" transition:fade />
  {/if}

  {#if open}
    <div class="fixed inset-0 flex">
      <div
        class="relative mr-16 flex w-full max-w-xs flex-1"
        transition:fly={{ x: -300, duration: 300 }}
      >
        <div class="absolute left-full top-0 flex w-16 justify-center pt-5">
          <button type="button" class="-m-2.5 p-2.5" on:click={() => dispatch('close')}>
            <span class="sr-only">Close sidebar</span>
            <svg
              class="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Sidebar component, swap this element with another sidebar if you like -->
        <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-base-200 px-6 pb-2">
          <div class="flex h-16 shrink-0 items-center">
            <img
              class="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
          </div>
          <nav class="flex flex-1 flex-col">
            <ul role="list" class="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" class="-mx-2 space-y-1">
                  {#each routes as route}
                    <li>
                      <a
                        on:click={() => dispatch('close')}
                        href={route.href}
                        class={`hover:text-white hover:bg-accent group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold ${
                          activeRoute === route.href ? 'bg-accent text-white' : 'text-white'
                        }`}
                      >
                        <svg
                          class="h-6 w-6 shrink-0 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                          />
                        </svg>
                        {route.name}
                      </a>
                    </li>
                  {/each}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  {/if}
</div>
