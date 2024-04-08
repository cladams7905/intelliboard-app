import { Json } from "./supabase";

export type StudyboardContent = {
    contentBody: string
}

export type localStudyboard = {
    content: Json,
    created_at: string;
    created_by: string;
    difficulty: "0" | "1" | "1+" | "2" | "2+" | "3" | "3+" | null;
    id: number;
    is_public: boolean | null;
    language: "chinese" | "english" | "spanish" | null;
    snapshot_url: string | null
    tags: string[] | null;
    title: string | null;
    last_opened: string | null
    owned_by: string | null
}