import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FetchResourceParams, Resources, fetchResourcesByUserId } from "../../app/api/resources/resourcesRequest";
import { PostgrestError } from "@supabase/supabase-js";

const initialState = {
    resources: [] as Resources[] | null,
    loading: false,
    error: null as string | null,
}


export const fetchResourcesUserById = createAsyncThunk<{ data: Resources[] | null; error: PostgrestError | null }, FetchResourceParams, { rejectValue: string }>(
    'resources/fetchResourcesUserById',
    async ({ user_uuid }: FetchResourceParams, { rejectWithValue }) => {
        try {
            const response = fetchResourcesByUserId(user_uuid);
            return response;

        } catch (error: unknown) {
            if (error instanceof Error) {
                throw rejectWithValue(error.message)
            }
            return rejectWithValue("Occurred due to a fetch error")
        }
    },
)

const resourcesSlice = createSlice({
    name: 'resources',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchResourcesUserById.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                    error: null
                }
            })
            .addCase(fetchResourcesUserById.fulfilled, (state, action) => {
                return {
                    ...state,
                    resources: action.payload.data || [],
                    loading: false
                }
            })
            .addCase(fetchResourcesUserById.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.payload || 'Failed to fetch resources'
                }
            })
    }
})

export default resourcesSlice.reducer;