"use server";

import createSupabaseServerClient from "@/lib/supabase/server";
import { TablesInsert } from "@/types/supabase";

export async function createStudyboard(studyboard : TablesInsert<"Studyboards">) {
    const supabase = await createSupabaseServerClient();
    const result = await supabase.from("Studyboards").insert(studyboard).single();
    return JSON.stringify(result);
}

export async function getStudyboardsByUserId(id: string) {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.from("Studyboards").select().eq("created_by", id)
    if (error) {
        console.error("Error fetching studyboards:", error.message);
        return null;
    }
    return data;
}

export async function updateStudyboardById() {

}

export async function deleteStudyboardById() {

}