import { supabase } from "../../constants/supabaseConfig";

interface SupabaseUser {
    id: string;
    email: string;
}

export const registerUserWithSupaBase = async (email: string, password: string) => {
    console.log('Sending signUp request');

    const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
    });

    if (authError) {
        throw new Error(`Sign-up failed: ${authError}`)
    }

    return authData?.user
}

export const InsertToUserSupaBaseTableData = async (user: SupabaseUser, name: string, last_name: string, familyId: string | null) => {
    if (!user.email) {
        throw new Error(`User email is undefined: ${user.email}`)
    }

    const { data: insertData, error: insertError } = await supabase
        .from('users')
        .insert([
            {
                uuid: user.id,
                name,
                last_name,
                email: user.email,
                family_id: familyId
            }
        ]).select();

    if (insertError) {
        throw new Error(`Failed to insert user data: ${insertError}`)
    }

    return insertData[0];
}