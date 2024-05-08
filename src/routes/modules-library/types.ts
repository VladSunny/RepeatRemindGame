export interface Module {
    id: number;
    chat_id: string;
    separator: string;
    name: string;
    content: Record<string, string>;
}