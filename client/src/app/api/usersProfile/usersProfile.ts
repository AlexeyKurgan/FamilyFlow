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
    user_uuid: string;
}

export interface UserProfile {
    id: number;
    name: string;
    uuid: string;
    last_name: string;
    family_id: string;
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
      family_id,
      profiles (
        id,
        bio_info,
        avatar_url,
        theme,
        notifications,
        user_uuid
      )
    `)
        .eq("uuid", user_uuid);

    if (error) {
        throw new Error(`Failed to fetch user profile: ${error.message}`);
    }

    return { data, error: null };
};

export const ensureProfileExists = async (
    userUuid: string
): Promise<{ success: boolean; id: number | null; error: string | null }> => {
    const { data: existingProfile, error: fetchError } = await supabase
        .from("profiles")
        .select("id")
        .eq("user_uuid", userUuid)
        .single();

    if (fetchError && fetchError.code !== "PGRST116") {
        return { success: false, id: null, error: `Ошибка проверки профиля: ${fetchError.message}` };
    }

    if (!existingProfile) {
        const { data: newProfile, error: insertError } = await supabase
            .from("profiles")
            .insert({ user_uuid: userUuid, bio_info: "", avatar_url: null })
            .select()
            .single();

        if (insertError) {
            return { success: false, id: null, error: `Ошибка создания профиля: ${insertError.message}` };
        }
        return { success: true, id: newProfile.id, error: null };
    }

    return { success: true, id: existingProfile.id, error: null };
};

export const uploadAvatar = async (
    userUuid: string,
    file: File
): Promise<{ success: boolean; avatarUrl: string | null; error: string | null }> => {
    const filePath = `${userUuid}/${file.name}`;

    const { error: uploadError } = await supabase.storage
        .from("Profile Avatars")
        .upload(filePath, file, { upsert: true });

    if (uploadError) {
        return { success: false, avatarUrl: null, error: `Ошибка загрузки аватара: ${uploadError.message}` };
    }

    const { data: publicUrlData } = supabase.storage
        .from("Profile Avatars")
        .getPublicUrl(filePath);

    const newAvatarUrl = publicUrlData.publicUrl;

    const { success, id: profileId, error: ensureError } = await ensureProfileExists(userUuid);
    if (!success) return { success: false, avatarUrl: null, error: ensureError };

    const { error: updateError } = await supabase
        .from("profiles")
        .update({ avatar_url: newAvatarUrl })
        .eq("id", profileId);

    if (updateError) {
        return { success: false, avatarUrl: null, error: `Ошибка обновления профиля: ${updateError.message}` };
    }

    return { success: true, avatarUrl: newAvatarUrl, error: null };
};

export const deleteAvatar = async (
    userUuid: string,
    currentAvatarUrl: string
): Promise<{ success: boolean; error: string | null }> => {
    const filePath = currentAvatarUrl.split("/storage/v1/object/public/Profile Avatars/")[1]; // Обновляем путь

    const { error: deleteError } = await supabase.storage
        .from("Profile Avatars") // Используем правильное имя бакета
        .remove([filePath]);

    if (deleteError) {
        return { success: false, error: `Ошибка удаления аватара из Storage: ${deleteError.message}` };
    }

    const { success, id: profileId, error: ensureError } = await ensureProfileExists(userUuid);
    if (!success) return { success: false, error: ensureError };

    const { error: updateError } = await supabase
        .from("profiles")
        .update({ avatar_url: null })
        .eq("id", profileId);

    if (updateError) {
        return { success: false, error: `Ошибка обновления профиля: ${updateError.message}` };
    }

    return { success: true, error: null };
};

export const saveProfile = async (
    userUuid: string,
    updates: { name?: string; lastName?: string; bio?: string }
): Promise<{ success: boolean; error: string | null }> => {
    const userUpdates = {
        name: updates.name,
        last_name: updates.lastName,
    };

    const { error: userError } = await supabase
        .from("users")
        .update(userUpdates)
        .eq("uuid", userUuid);

    if (userError) {
        return { success: false, error: `Ошибка обновления users: ${userError.message}` };
    }

    const { success, id: profileId, error: ensureError } = await ensureProfileExists(userUuid);
    if (!success) return { success: false, error: ensureError };

    const profileUpdates = {
        bio_info: updates.bio || "",
    };

    const { error: profileError } = await supabase
        .from("profiles")
        .update(profileUpdates)
        .eq("id", profileId);

    if (profileError) {
        return { success: false, error: `Ошибка обновления profiles: ${profileError.message}` };
    }

    return { success: true, error: null };
};