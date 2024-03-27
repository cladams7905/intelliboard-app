"use server";

import createSupabaseServerClient from "@/lib/supabase/server";
import { TablesInsert, Tables } from "@/types/supabase";

export async function createStudyboard(studyboard : TablesInsert<"Studyboards">) {
    const supabase = await createSupabaseServerClient();
    const result = await supabase.from("Studyboards").insert(studyboard).select('*').single();
    return JSON.stringify(result);
}

export async function getStudyboardsByUserId(userId: string) {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.from("Studyboards").select().eq("created_by", userId)
    if (error) {
        console.error(`Error fetching studyboards for user ${userId}:`, error.message);
        return null;
    }
    return data;
}

export async function getStudyboardsById(id: number) {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.from("Studyboards").select().eq("id", id).single()
    if (error) {
        console.error(`Error fetching studyboard ${id}:`, error.message);
        return null;
    }
    return data;
}

export async function getLocalStudyboardById( userId: string, studyboardId: number) {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.from("LocalStudyboards").select()
        .eq("created_by", userId)
        .eq("studyboard_id", studyboardId)
        .single();
    if (error) {
        console.error(`Error fetching local studyboard ${studyboardId}:`, error.message);
        return null;
    }
    return data;
}

/**
 * For now, this function only needs to update any column, and that will trigger 
 * a sql trigger that updates the time.
 */
export async function updateLocalStudyboard(userId: string, studyboardId: number, snapshot_url: string) {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.from("LocalStudyboards").update({snapshot_url: snapshot_url})
        .eq("created_by", userId)
        .eq("studyboard_id", studyboardId)
    if (error) {
        console.error(`Error updating last opened time for studyboard ${studyboardId}:`, error.message);
        return null;
    }
    return data;
}

export async function updateStudyboardById(id: number, values: TablesInsert<"Studyboards">) {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.from("Studyboards").update(values).eq("id", id).select('*').single();
    if (error) {
        console.error(`Error updating studyboard ${id}:`, error.message);
        return null;
    }
    return data;
}

export async function deleteStudyboardById(id: number) {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.from("Studyboards").delete().eq("id", id)
    if (error) {
        console.error(`Error deleting studyboard ${id}:`, error.message);
    }
}