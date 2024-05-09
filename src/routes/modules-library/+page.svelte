<script lang="ts">
    import { breakpointStore } from '$lib/stores/breakpointsStore';
    import type { PageData } from './$types';
    import { Accordion, AccordionItem, type PaginationSettings } from '@skeletonlabs/skeleton';
    import { Paginator } from '@skeletonlabs/skeleton';
    
    export let data: PageData;
    const modules_list = data.modules;

    let paginationSettings = {
        page: 0,
        limit: 5,
        size: modules_list.length,
        amounts: [1,2,5,10],
    } satisfies PaginationSettings;


    $: paginatedSource = modules_list.slice(
        paginationSettings.page * paginationSettings.limit,
        paginationSettings.page * paginationSettings.limit + paginationSettings.limit
    );
</script>


<div class="flex flex-col items-center pt-4 space-y-5">
    <h1 class="p-5 variant-glass-secondary rounded-3xl not-italic lg:text-6xl md:text-5xl sm:text-4xl">
        Каталог модулей
    </h1>
    
    <Paginator
    bind:settings={paginationSettings}
    showFirstLastButtons="{false}"
    showPreviousNextButtons="{true}"
    amountText="Элементов"
    separatorText="из"
    />

    <Accordion class="lg:text-4xl md:text-3xl sm:text-2xl space-y-5 py-5 px-3 w-3/4 variant-ghost-secondary rounded-2xl overflow-y-auto max-h-[75vh]">
        {#each paginatedSource as module}
            <AccordionItem class="variant-filled-primary rounded-2xl">
                <svelte:fragment slot="summary">
                    <div class="flex flex-col ring-4 variant-ringed-secondary rounded-2xl py-2 px-4">
                        <h1>{module.name}</h1>
                        <p>{Object.keys(module.content).length} items</p>
                        <p>ID: {module.id}</p>
                    </div>
                </svelte:fragment>

                <svelte:fragment slot="content">
                    <div class="max-h-[75vh] overflow-y-auto flex flex-col space-y-5">
                        {#each Object.entries(module.content) as [key, value]}
                            <div class="variant-ghost-secondary rounded-2xl py-3 px-4 mr-5">
                                <h1>{key}</h1>
                                <p>{module.separator} {value}</p>
                            </div>
                        {/each}
                    </div>
                </svelte:fragment>
            </AccordionItem>
        {/each}
    </Accordion>
</div>

