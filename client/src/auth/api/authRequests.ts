import { supabase } from "../constants/supabaseConfig";
import { InsertToUserSupaBaseTableData, registerUserWithSupaBase } from "./utils/supabaseUtils";
import { checkExistUser } from "./utils/userUtils";

export interface UserData {
    uuid: string;
    name: string;
    last_name: string;
    email: string;
}

interface SupabaseUser {
    id: string;
    email: string;
}

export const signUpRequest = async (email: string, password: string, name: string, last_name: string): Promise<UserData | null> => {
    // check user exist
    const existingUser = await checkExistUser(email);
    if (existingUser) {
        throw new Error('User already exists')
    }

    // register new user
    const user = await registerUserWithSupaBase(email, password);

    if (!user || !user.email) {
        throw new Error('User object or email is missing after sign-up.')
    }

    //insert new user data to table users
    const insertData = await InsertToUserSupaBaseTableData(user as SupabaseUser, name, last_name);

    return insertData;
};

// signin request
export const signInRequest = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email, password
    })
    if (error) {
        console.error(error)
        throw new Error(`Sign-in error: ${error}`,)
    } else {
        console.log('User signed in', data)
    }

    return { data, error: null }
}

// sign out
export const signOutRequest = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
        console.log(error)
        throw new Error(`Sign out error: ${error}`)
    } else {
        console.log('User sig out successfully')
    }

    return { error: null }
}