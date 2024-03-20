"use server";

import createSupabaseServerClient from "@/lib/supabase/server";
import { TablesInsert } from "@/types/supabase";

export async function createStudyboard(studyboard : TablesInsert<"Studyboards">) {
    const supabase = await createSupabaseServerClient();
    const result = await supabase.from("Studyboards").insert(studyboard).single();
    return JSON.stringify(result);
}

export async function getStudyboardsByUserId(userId: string) {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.from("Studyboards").select().eq("created_by", userId)
    if (error) {
        console.error("Error fetching studyboards:", error.message);
        return null;
    }
    return data;
}

export async function updateStudyboardById() {

}

export async function deleteStudyboardById(id: number) {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.from("Studyboards").delete().eq("id", id)
    if (error) {
        console.error(`Error deleting studyboard ${id}:`, error.message);
    }
}