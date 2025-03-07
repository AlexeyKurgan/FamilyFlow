import { supabase } from "../../../auth/constants/supabaseConfig"
import { PostgrestError } from "@supabase/supabase-js";


export interface FetchUserProfileParams {
    user_uuid: string
}

export interface UserProfile {
    id: number,
    serviceName: string,
    apiKey: string,
    serviceApiUrl: string,
    isActive: boolean,
    user_uuid: string
}

export const fetchUserProfileByUserId = async (user_uuid: string): Promise<{ data: UserProfile[] | null; error: PostgrestError | null }> => {
    const { data, error } = await supabase.from("profiles").select("*").eq("user_uuid", user_uuid);

    if (error) {
        throw new Error(`Failed to fetch user profile: ${error.message}`);
    }

    return { data, error: null };
}