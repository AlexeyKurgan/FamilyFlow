import { supabase } from "../../../auth/constants/supabaseConfig"
import { PostgrestError } from "@supabase/supabase-js";


export interface FetchAchievementsParams {
    user_uuid: string
}

export interface Achievements {
    id: number,
    name: string,
    description: string,
    image_url: string,
    earned_at: string,
    creator_id: string,
    is_earned: boolean,
    user_uuid: string
}

export const fetchAchievementsByUserId = async (user_uuid: string): Promise<{ data: Achievements[] | null; error: PostgrestError | null }> => {
    const { data, error } = await supabase.from("achievements").select("*").eq("user_uuid", user_uuid);

    if (error) {
        throw new Error(`Failed to fetch achievements: ${error.message}`);
    }

    return { data, error: null };
}