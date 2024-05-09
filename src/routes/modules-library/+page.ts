import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import type { Module } from './types';

export const load = (async ({ parent, url }) => {
	const { supabase } = await parent();
	const modules = await supabase.from('modules').select('*').eq('public', true);

	if (!modules.data?.[0]?.content) throw error(404, 'Cant load modules');

	return { modules: modules.data as Module[]};
}) satisfies PageLoad;
