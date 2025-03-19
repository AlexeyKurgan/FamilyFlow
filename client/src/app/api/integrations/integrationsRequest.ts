import { supabase } from "../../../auth/constants/supabaseConfig"
import { PostgrestError } from "@supabase/supabase-js";


export interface FetchIntegrationsParams {
    user_uuid: string
}

export interface Integrations {
    id: number,
    service_name: string,
    apiKey: string,
    serviceApiUrl: string,
    is_active: boolean,
    creator_id: string,
    api_icon: string,
    user_uuid: string
}

export const fetchIntegrationsByUserId = async (user_uuid: string): Promise<{ data: Integrations[] | null; error: PostgrestError | null }> => {
    const { data, error } = await supabase.from("integrations").select("*").eq("user_uuid", user_uuid);

    if (error) {
        throw new Error(`Failed to fetch integrations: ${error.message}`);
    }

    return { data, error: null };
}