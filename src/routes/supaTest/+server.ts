import { supabase } from "$lib/supabaseClient";

export async function _load() {
  const { data } = await supabase.from("donates").select('*');
  return {
    countries: data ?? [],
  };
}
