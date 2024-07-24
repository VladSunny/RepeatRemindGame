<script lang="ts">
    import type { PageData } from './$types';
    import { type PaginationSettings } from '@skeletonlabs/skeleton';
    import { Paginator } from '@skeletonlabs/skeleton';
    import { Drawer, getDrawerStore, type DrawerSettings } from "@skeletonlabs/skeleton";
	import type Module from 'module';

    const drawerStore = getDrawerStore();
    
    export let data: PageData;
    const modules_list = data.modules;

    let selectedModuleName: string;
    let selectedModuleContent: Record<string, string>;
    let selectedModuleSeparator: string;
    let selectedModuleID: number;

    let paginationSettings = {
        page: 0,
        limit: 5,
        size: modules_list.length,
        amounts: [1,2,5,10],
    } satisfies PaginationSettings;

    const drawerSettings: DrawerSettings = {
        id: 'example-2',
        width: 'w-4/5',
    };

    $: paginatedSource = modules_list.slice(
        paginationSettings.page * paginationSettings.limit,
        paginationSettings.page * paginationSettings.limit + paginationSettings.limit
    );

    const viewHandler = (moduleName: string, moduleContent: Record<string, string>, moduleSeparator: string, moduleID: number) => () => {
        selectedModuleName = moduleName;
        selectedModuleContent = moduleContent;
        selectedModuleSeparator = moduleSeparator;
        selectedModuleID = moduleID;

        drawerStore.open(drawerSettings);
    }
</script>


<div class="flex flex-col items-center pt-4 space-y-5">
    <h1 class="p-5 variant-glass-secondary rounded-3xl not-italic lg:text-6xl md:text-5xl sm:text-4xl">
        Каталог модулей
    </h1>

    <div class="variant-ghost-secondary rounded-2xl w-5/6 lg:text-4xl md:text-3xl sm:text-2xl space-y-5 py-5 px-3">
        {#each paginatedSource as module}
            <div class="flex flex-row items-center justify-between variant-filled-primary rounded-2xl py-2 px-4 w-full">
                <div class="flex flex-col">
                    <h1 class="truncate max-w-[40vw]">{module.name}</h1>
                    <p>{Object.keys(module.content).length} элементов</p>
                    <p>ID: {module.id}</p>
                </div>

                <button class="btn variant-filled-secondary lg:w-1/5 md:w-2/5 sm:3/5"
                 on:click={viewHandler(module.name, module.content, module.separator, module.id)}>
                    <p>Подробнее</p>
                </button>
            </div>
        {/each}
    </div>

    <div class="pb-5">
        <Paginator
        bind:settings={paginationSettings}
        showFirstLastButtons="{false}"
        showPreviousNextButtons="{true}"
        amountText="Элементов"
        separatorText="из"
        />
    </div>
</div>

<Drawer class="lg:text-5xl md:text-4xl sm:text-3xl">
    <h1 class="m-5">{selectedModuleName}</h1>
    <h1 class="m-5">ID: {selectedModuleID}</h1>
    <div class="mx-5 py-5 px-5 variant-filled-primary rounded-3xl max-h-[75vh] overflow-y-auto flex flex-col space-y-5">
        {#each Object.entries(selectedModuleContent) as [key, value]}
            <div class="variant-ghost-secondary rounded-2xl py-5 pl-3">
                <h1 class="truncate pb-1">{key}</h1>
                <p class="truncate pb-1">{selectedModuleSeparator} {value}</p>
            </div>
        {/each}
    </div>
</Drawer>
