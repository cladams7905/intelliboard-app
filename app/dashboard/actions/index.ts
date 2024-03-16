"use server";

import createSupabaseServerClient from "@/lib/supabase/server";
import { TablesInsert } from "@/types/supabase";

export async function createNewStudyboard(studyboard : TablesInsert<"Studyboards">) {
    const supabase = await createSupabaseServerClient();
    const result = await supabase.from("Studyboards").insert(studyboard).single();
    return JSON.stringify(result);
}

export async function readStudyboard() {

}

export async function updateStudyboardById() {

}

export async function deleteStudyboardById() {

}