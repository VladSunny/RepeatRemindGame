export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
	public: {
		Tables: {
			donates: {
				Row: {
					chat_id: string;
					donated: number;
				};
				Insert: {
					chat_id: string;
					donated?: number;
				};
				Update: {
					chat_id?: string;
					donated?: number;
				};
				Relationships: [];
			};
			modules: {
				Row: {
					chat_id: string;
					content: Json | null;
					id: number;
					name: string | null;
					separator: string;
				};
				Insert: {
					chat_id: string;
					content?: Json | null;
					id?: number;
					name?: string | null;
					separator: string;
				};
				Update: {
					chat_id?: string;
					content?: Json | null;
					id?: number;
					name?: string | null;
					separator?: string;
				};
				Relationships: [];
			};
			settings: {
				Row: {
					chat_id: string;
					get_updates: boolean | null;
					repetitions_for_block: number | null;
					show_in_donate_table: boolean | null;
					words_in_block: number | null;
				};
				Insert: {
					chat_id: string;
					get_updates?: boolean | null;
					repetitions_for_block?: number | null;
					show_in_donate_table?: boolean | null;
					words_in_block?: number | null;
				};
				Update: {
					chat_id?: string;
					get_updates?: boolean | null;
					repetitions_for_block?: number | null;
					show_in_donate_table?: boolean | null;
					words_in_block?: number | null;
				};
				Relationships: [];
			};
			users_tg: {
				Row: {
					chat_id: string;
					lang: Database['public']['Enums']['languages'];
				};
				Insert: {
					chat_id: string;
					lang: Database['public']['Enums']['languages'];
				};
				Update: {
					chat_id?: string;
					lang?: Database['public']['Enums']['languages'];
				};
				Relationships: [];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			[_ in never]: never;
		};
		Enums: {
			languages: 'en' | 'ru';
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
};

export type Tables<
	PublicTableNameOrOptions extends
		| keyof (Database['public']['Tables'] & Database['public']['Views'])
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
				Database[PublicTableNameOrOptions['schema']]['Views'])
		: never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
			Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
			Row: infer R;
		}
		? R
		: never
	: PublicTableNameOrOptions extends keyof (Database['public']['Tables'] &
				Database['public']['Views'])
		? (Database['public']['Tables'] &
				Database['public']['Views'])[PublicTableNameOrOptions] extends {
				Row: infer R;
			}
			? R
			: never
		: never;

export type TablesInsert<
	PublicTableNameOrOptions extends keyof Database['public']['Tables'] | { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
		: never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
			Insert: infer I;
		}
		? I
		: never
	: PublicTableNameOrOptions extends keyof Database['public']['Tables']
		? Database['public']['Tables'][PublicTableNameOrOptions] extends {
				Insert: infer I;
			}
			? I
			: never
		: never;

export type TablesUpdate<
	PublicTableNameOrOptions extends keyof Database['public']['Tables'] | { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
		: never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
			Update: infer U;
		}
		? U
		: never
	: PublicTableNameOrOptions extends keyof Database['public']['Tables']
		? Database['public']['Tables'][PublicTableNameOrOptions] extends {
				Update: infer U;
			}
			? U
			: never
		: never;

export type Enums<
	PublicEnumNameOrOptions extends keyof Database['public']['Enums'] | { schema: keyof Database },
	EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
		: never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
	? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
	: PublicEnumNameOrOptions extends keyof Database['public']['Enums']
		? Database['public']['Enums'][PublicEnumNameOrOptions]
		: never;
