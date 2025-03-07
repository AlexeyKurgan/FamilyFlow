import { supabase } from "../../../auth/constants/supabaseConfig"
import { PostgrestError } from "@supabase/supabase-js";


export interface FetchRewardsParams {
    user_uuid: string
}

export interface Rewards {
    id: number,
    title: string,
    description: string,
    status: string,
    user_uuid: string
}

export const fetchRewardsByUserId = async (user_uuid: string): Promise<{ data: Rewards[] | null; error: PostgrestError | null }> => {
    const { data, error } = await supabase.from("tasks").select("*").eq("user_uuid", user_uuid);

    if (error) {
        throw new Error(`Failed to fetch tasks: ${error.message}`);
    }

    return { data, error: null };
}