import { User } from "../../../shared/components/modal/addTaskModal/AddTaskModal";
import { setSession } from "../../../store/slices/authSlice";
import { fetchUserProfile } from "../../../store/slices/profileSlice";
import { AppDispatch } from "../../../store/store";
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

export const loadSessionAndProfile = async (dispatch: AppDispatch) => {
    const session = await checkUserSession();
    if (session) {
        dispatch(setSession(session));
        dispatch(fetchUserProfile({ user_uuid: session.user.id }));
    }
    return session;
}

export const fetchFamilyMembers = async (): Promise<User[]> => {
    try {
        const { data: { user } } = await supabase.auth.getUser();
        const currentUserUuid = user?.id;

        if (!currentUserUuid) throw new Error("User not authenticated");

        const { data: currentUserData } = await supabase
            .from("users")
            .select("family_id")
            .eq("uuid", currentUserUuid)
            .single();

        const familyId = currentUserData?.family_id;

        if (!familyId) {
            return [];
        }

        const { data: members } = await supabase
            .from("users")
            .select(`
          uuid,
          name,
          last_name,
          profiles (avatar_url)
        `)
            .eq("family_id", familyId);


        return (
            members?.map((member: {
                uuid: string;
                name: string;
                last_name: string;
                profiles: { avatar_url: string }[]
            }) => ({
                uuid: member.uuid,
                name: member.name,
                last_name: member.last_name,
                avatar_url: member.profiles?.[0]?.avatar_url || "",
            })) || []
        );
    } catch (error) {
        console.error("Failed to fetch family members:", error);
        return [];
    }
};