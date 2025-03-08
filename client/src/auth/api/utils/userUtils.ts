import { supabase } from "../../constants/supabaseConfig"

export const checkExistUser = async (email: string) => {
    const { data: existingUser, error: userCheckError } = await supabase
        .from('users')
        .select('email')
        .eq('email', email)
        .single()


    if (userCheckError) {
        if (userCheckError.code === "PGRST116" || userCheckError.message.includes("multiple (or no) rows returned")) {
            return null;
        }

        throw new Error(`Error: ${userCheckError.message}`)

    }

    return existingUser;
}

export const checkUserSession = async () => {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) {
        console.error("Session check error:", error);
        return null;
    }
    return session;
}
