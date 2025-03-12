import { supabase } from "../../../auth/constants/supabaseConfig"
import { PostgrestError } from "@supabase/supabase-js";


export interface FetchTasksParams {
    user_uuid: string
}

interface IUsers {
    name: string;
    last_name: string;
    email: string;
    role: string;
    is_admin: boolean;
}

export interface Task {
    id: number,
    title: string,
    description: string,
    status: string,
    priority: string,
    creator_id: string,
    created_at: Date,
    assigned_to: string,
    user_uuid: string,
    creator: IUsers[];
    assigned: IUsers[];
}


export const fetchTasksByUserId = async (user_uuid: string): Promise<{ data: Task[] | null; error: PostgrestError | null }> => {
    const { data, error } = await supabase
        .from("tasks")
        .select(`
        id,
        title,
        description,
        status,
        priority,
        creator_id,
        created_at,
        assigned_to,
        user_uuid,
        creator:users!tasks_creator_id_fkey (
            name,
            last_name,
            email,
            role,
            is_admin
        ),
        assigned:users!tasks_assigned_to_fkey (
            name,
            last_name,
            email,
            role,
            is_admin
        )
    `)
        .eq("user_uuid", user_uuid);


    if (error) {
        throw new Error(`Failed to fetch tasks: ${error.message}`);
    }

    return { data, error: null };
}