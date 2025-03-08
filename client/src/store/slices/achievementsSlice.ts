import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Achievements, FetchAchievementsParams, fetchAchievementsByUserId } from "../../app/api/achievements/achievementsRequest";
import { PostgrestError } from "@supabase/supabase-js";

const initialState = {
    achievements: [] as Achievements[] | null,
    loading: false,
    error: null as string | null,
}


export const fetchAchievementsUserById = createAsyncThunk<{ data: Achievements[] | null; error: PostgrestError | null }, FetchAchievementsParams, { rejectValue: string }>(
    'achievements/fetchAchievementsByUserId',
    async ({ user_uuid }: FetchAchievementsParams, { rejectWithValue }) => {
        try {
            const response = fetchAchievementsByUserId(user_uuid);
            return response;

        } catch (error: unknown) {
            if (error instanceof Error) {
                throw rejectWithValue(error.message)
            }
            return rejectWithValue("Occurred due to a fetch error")
        }
    },
)

const achievementsSlice = createSlice({
    name: 'achievements',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAchievementsUserById.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                    error: null
                }
            })
            .addCase(fetchAchievementsUserById.fulfilled, (state, action) => {
                return {
                    ...state,
                    achievements: action.payload.data || [],
                    loading: false
                }
            })
            .addCase(fetchAchievementsUserById.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.payload || 'Failed to fetch resources'
                }
            })
    }
})

export default achievementsSlice.reducer;