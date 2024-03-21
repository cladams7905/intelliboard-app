"use server";

import createSupabaseServerClient from "@/lib/supabase/server";
import { TablesInsert } from "@/types/supabase";

export async function createStudyboard(studyboard : TablesInsert<"Studyboards">) {
    const supabase = await createSupabaseServerClient();
    const result = await supabase.from("Studyboards").insert(studyboard).select('*').single();
    return JSON.stringify(result.data);
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

export async function getStudyboardsById(id: number) {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.from("Studyboards").select().eq("id", id).single()
    if (error) {
        console.error(`Error fetching studyboard:`, error.message);
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
        console.error(`Error deleting studyboard:`, error.message);
    }
}