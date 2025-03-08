import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FetchIntegrationsParams, Integrations, fetchIntegrationsByUserId } from "../../app/api/integrations/integrationsRequest";
import { PostgrestError } from "@supabase/supabase-js";

const initialState = {
    integrations: [] as Integrations[] | null,
    loading: false,
    error: null as string | null,
}


export const fetchIntegrationsUserById = createAsyncThunk<{ data: Integrations[] | null; error: PostgrestError | null }, FetchIntegrationsParams, { rejectValue: string }>(
    'integrations/fetchIntegrationsByUserId',
    async ({ user_uuid }: FetchIntegrationsParams, { rejectWithValue }) => {
        try {
            const response = fetchIntegrationsByUserId(user_uuid);
            return response;

        } catch (error: unknown) {
            if (error instanceof Error) {
                throw rejectWithValue(error.message)
            }
            return rejectWithValue("Occurred due to a fetch error")
        }
    },
)

const integrationsSlice = createSlice({
    name: 'integrations',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchIntegrationsUserById.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                    error: null
                }
            })
            .addCase(fetchIntegrationsUserById.fulfilled, (state, action) => {
                return {
                    ...state,
                    integrations: action.payload.data || [],
                    loading: false
                }
            })
            .addCase(fetchIntegrationsUserById.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.payload || 'Failed to fetch integrations'
                }
            })
    }
})

export default integrationsSlice.reducer;