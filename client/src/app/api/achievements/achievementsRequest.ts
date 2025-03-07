import { supabase } from "../../../auth/constants/supabaseConfig"
import { PostgrestError } from "@supabase/supabase-js";


export interface FetchAchievementsParams {
    user_uuid: string
}

export interface Achievements {
    id: number,
    title: string,
    description: string,
    status: string,
    user_uuid: string
}

export const fetchTasksByUserId = async (user_uuid: string): Promise<{ data: Achievements[] | null; error: PostgrestError | null }> => {
    const { data, error } = await supabase.from("achievements").select("*").eq("user_uuid", user_uuid);

    if (error) {
        throw new Error(`Failed to fetch achievements: ${error.message}`);
    }

    return { data, error: null };
}