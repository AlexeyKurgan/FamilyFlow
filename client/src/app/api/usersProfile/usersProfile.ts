import { supabase } from "../../../auth/constants/supabaseConfig";
import { PostgrestError } from "@supabase/supabase-js";

export interface FetchUserProfileParams {
    user_uuid: string;
}


interface Profile {
    id: number;
    bio_info: string;
    avatar_url: string;
    theme: string;
    notifications: boolean;
}

export interface UserProfile {
    id: number;
    name: string;
    uuid: string;
    last_name: string;
    email: string;
    role: string;
    is_admin: boolean;
    profiles: Profile[];
}

export const fetchUserProfileByUserId = async (
    user_uuid: string
): Promise<{ data: UserProfile[] | null; error: PostgrestError | null }> => {
    const { data, error } = await supabase
        .from("users")
        .select(`
      id,
      name,
      uuid,
      last_name,
      email,
      role,
      is_admin,
      profiles (
        id,
        bio_info,
        avatar_url,
        theme,
        notifications
      )
    `)
        .eq("uuid", user_uuid);

    if (error) {
        throw new Error(`Failed to fetch user profile: ${error.message}`);
    }

    return { data, error: null };
};