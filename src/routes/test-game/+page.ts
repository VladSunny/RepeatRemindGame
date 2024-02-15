import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async ({parent, url}) => {
    const {supabase} = await parent();
    const module_id = url.searchParams.get("module_id") || "";
    const module = await supabase.from('modules').select('content').eq("id", parseInt(module_id));
    if (!module.data?.[0]?.content)
        throw error(404, "Cant load module id");

    return { module : module.data[0].content as Record<string, string>};
}) satisfies PageLoad;