import { supabase } from "../../../auth/constants/supabaseConfig"
import { PostgrestError } from "@supabase/supabase-js";


export interface FetchResourceParams {
    user_uuid: string
}

export interface Resources {
    id: number,
    title: string,
    type: string,
    url: string,
    favorites: boolean,
    resource_image: string,
    resource_icon: string,
    user_uuid: string
}

export const fetchResourcesByUserId = async (user_uuid: string): Promise<{ data: Resources[] | null; error: PostgrestError | null }> => {
    const { data, error } = await supabase.from("resources").select("*").eq("user_uuid", user_uuid);

    if (error) {
        throw new Error(`Failed to fetch resources: ${error.message}`);
    }

    return { data, error: null };
}