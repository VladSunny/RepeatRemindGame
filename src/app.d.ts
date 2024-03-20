// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import { SupabaseClient, Session as SupabaseSession } from '@supabase/supabase-js';
import { Database } from '$lib/types/supabase';

// and what to do when importing types
declare global {
	namespace App {
		interface Session extends SupabaseSession {}
		interface Locals {
			supabase: SupabaseClient<Database>;
		}
		// interface Error {}
		// interface Platform {}
	}
	declare interface Window {
		TelegramGameProxy?: {
			shareScore: () => void;
		};
	}
}
