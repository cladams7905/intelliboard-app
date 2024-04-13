"use server";

import createSupabaseServerClient from "@/lib/supabase/server";
import { localStudyboard } from "@/types/customTypes";
import { TablesInsert, Tables } from "@/types/supabase";
import { Session } from "@supabase/supabase-js";

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

export async function getStudyboardById(id: number) {
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

/**
 * Combines all public data about a studyboard with local data
 * @param userId
 * @returns an array of all studyboards associated with a user, combined with local data about the studyboard (last time opened, original owner, etc)
 */
export async function getLocalStudyboardData(userId : string) {
    
    const studyboards = await getStudyboardsByUserId(userId) || [];
    let localStudyboards: localStudyboard[] = [];

    for (const studyboard of studyboards) {
      const localData = await getLocalStudyboardById(studyboard.created_by, studyboard.id);

      if (localData) {
        let localStudyboard: localStudyboard = {
          content: studyboard.content,
          created_at: studyboard.created_at,
          created_by: studyboard.created_by,
          difficulty: studyboard.difficulty,
          id: studyboard.id,
          is_public: studyboard.is_public,
          language: studyboard.language,
          tags: studyboard.tags,
          title: studyboard.title,
          snapshot_url: localData?.snapshot_url,
          last_opened: localData?.last_opened,
          owned_by: localData.owned_by
        };
        localStudyboards.push(localStudyboard);
      }
    }

    //Reorder localStudyboards based on last_opened value
    localStudyboards.sort((a, b) => {
        if (!a.last_opened) return 1;
        if (!b.last_opened) return -1;
        return new Date(b.last_opened).getTime() - new Date(a.last_opened).getTime();
    });

    return localStudyboards;
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