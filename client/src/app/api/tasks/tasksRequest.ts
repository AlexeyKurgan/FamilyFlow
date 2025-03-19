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
        .or(`creator_id.eq.${user_uuid},assigned_to.eq.${user_uuid}`);


    if (error) {
        throw new Error(`Failed to fetch tasks: ${error.message}`);
    }

    return { data, error: null };
}


export const addTask = async ({
    title,
    description,
    status,
    priority,
    assigned_to,
    creator_id,
}: {
    title: string;
    description: string;
    status: string;
    priority: string;
    assigned_to: string;
    creator_id: string;
}): Promise<{ data: Task | null; error: PostgrestError | null }> => {
    const { data, error } = await supabase
        .from("tasks")
        .insert([
            {
                title,
                description,
                status,
                priority,
                creator_id,
                assigned_to,
                created_at: new Date().toISOString(),
            },
        ])
        .select(`
        id,
        title,
        description,
        status,
        priority,
        creator_id,
        created_at,
        assigned_to,
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
        .single();

    if (error) {
        throw new Error(`Failed to add task: ${error.message}`);
    }

    return { data, error: null };
};

export const updateTask = async ({
    id,
    title,
    description,
    status,
    priority,
    assigned_to,
}: {
    id: number;
    title: string;
    description: string;
    status: string;
    priority: string;
    assigned_to: string;
}): Promise<{ data: Task | null; error: PostgrestError | null }> => {
    const { data, error } = await supabase
        .from("tasks")
        .update({
            title,
            description,
            status,
            priority,
            assigned_to,
        })
        .eq("id", id)
        .select(`
        id,
        title,
        description,
        status,
        priority,
        creator_id,
        created_at,
        assigned_to,
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
        .single();

    if (error) {
        throw new Error(`Failed to update task: ${error.message}`);
    }

    return { data, error: null };
};

export const deleteTask = async (
    taskId: number
): Promise<{ data: null; error: PostgrestError | null }> => {
    const { error } = await supabase
        .from("tasks")
        .delete()
        .eq("id", taskId);

    if (error) {
        throw new Error(`Failed to delete task: ${error.message}`);
    }

    return { data: null, error: null };
};