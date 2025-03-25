import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PostgrestError } from "@supabase/supabase-js";
import {
    fetchUserProfileByUserId,
    UserProfile,
    FetchUserProfileParams,
    uploadAvatar,
    deleteAvatar,
    saveProfile,
} from "../../app/api/usersProfile/usersProfile";

interface UserProfileState {
    userProfile: UserProfile | null;
    loading: boolean;
    error: string | null;
}

const initialState: UserProfileState = {
    userProfile: null,
    loading: false,
    error: null,
};

export const fetchUserProfile = createAsyncThunk<
    { data: UserProfile[] | null; error: PostgrestError | null },
    FetchUserProfileParams,
    { rejectValue: string }
>(
    "userProfile/fetchUserProfile",
    async ({ user_uuid }: FetchUserProfileParams, { rejectWithValue }) => {
        try {
            const response = await fetchUserProfileByUserId(user_uuid);
            return response;
        } catch (error: unknown) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
            return rejectWithValue("Occurred due to a fetch error");
        }
    }
);

export const uploadUserAvatar = createAsyncThunk<
    string,
    { userUuid: string; file: File },
    { rejectValue: string }
>(
    "userProfile/uploadUserAvatar",
    async ({ userUuid, file }, { rejectWithValue }) => {
        const { success, avatarUrl, error } = await uploadAvatar(userUuid, file);
        if (!success) {
            return rejectWithValue(error || "Failed to upload avatar");
        }
        return avatarUrl!;
    }
);

export const deleteUserAvatar = createAsyncThunk<
    void,
    { userUuid: string; currentAvatarUrl: string },
    { rejectValue: string }
>(
    "userProfile/deleteUserAvatar",
    async ({ userUuid, currentAvatarUrl }, { rejectWithValue }) => {
        const { success, error } = await deleteAvatar(userUuid, currentAvatarUrl);
        if (!success) {
            return rejectWithValue(error || "Failed to delete avatar");
        }
    }
);

export const saveUserProfile = createAsyncThunk<
    void,
    { userUuid: string; updates: { name?: string; lastName?: string; bio?: string } },
    { rejectValue: string }
>(
    "userProfile/saveUserProfile",
    async ({ userUuid, updates }, { rejectWithValue }) => {
        const { success, error } = await saveProfile(userUuid, updates);
        if (!success) {
            return rejectWithValue(error || "Failed to save profile");
        }
    }
);

const userProfileSlice = createSlice({
    name: "userProfile",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserProfile.pending, (state) => {
                return { ...state, loading: true, error: null };
            })
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                return {
                    ...state,
                    userProfile: action.payload.data ? action.payload.data[0] || null : null,
                    loading: false,
                };
            })
            .addCase(fetchUserProfile.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.payload || "Failed to fetch user profile",
                };
            });

        builder
            .addCase(uploadUserAvatar.pending, (state) => {
                return { ...state, loading: true, error: null };
            })
            .addCase(uploadUserAvatar.fulfilled, (state) => {
                return { ...state, loading: false };
            })
            .addCase(uploadUserAvatar.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.payload || "Failed to upload avatar",
                };
            });

        builder
            .addCase(deleteUserAvatar.pending, (state) => {
                return { ...state, loading: true, error: null };
            })
            .addCase(deleteUserAvatar.fulfilled, (state) => {
                return { ...state, loading: false };
            })
            .addCase(deleteUserAvatar.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.payload || "Failed to delete avatar",
                };
            });

        builder
            .addCase(saveUserProfile.pending, (state) => {
                return { ...state, loading: true, error: null };
            })
            .addCase(saveUserProfile.fulfilled, (state) => {
                return { ...state, loading: false };
            })
            .addCase(saveUserProfile.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.payload || "Failed to save profile",
                };
            });
    },
});

export default userProfileSlice.reducer;