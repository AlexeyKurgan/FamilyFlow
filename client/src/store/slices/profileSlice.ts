import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PostgrestError } from "@supabase/supabase-js";
import { fetchUserProfileByUserId, UserProfile, FetchUserProfileParams } from "../../app/api/usersProfile/usersProfile";

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

const userProfileSlice = createSlice({
    name: "userProfile",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserProfile.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                    error: null,
                };
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
    },
});

export default userProfileSlice.reducer;