import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FetchTasksParams, Task, fetchTasksByUserId } from "../../app/api/tasks/tasksRequest";
import { PostgrestError } from "@supabase/supabase-js";

const initialState = {
    tasks: [] as Task[] | null,
    loading: false,
    error: null as string | null,
}


export const fetchUserById = createAsyncThunk<{ data: Task[] | null; error: PostgrestError | null }, FetchTasksParams, { rejectValue: string }>(
    'tasks/fetchTasksByUserId',
    async ({ user_uuid }: FetchTasksParams, { rejectWithValue }) => {
        try {
            const response = fetchTasksByUserId(user_uuid);
            return response;

        } catch (error: unknown) {
            if (error instanceof Error) {
                throw rejectWithValue(error.message)
            }
            return rejectWithValue("Occurred due to a fetch error")
        }
    },
)

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserById.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                    error: null
                }
            })
            .addCase(fetchUserById.fulfilled, (state, action) => {
                return {
                    ...state,
                    tasks: action.payload.data || [],
                    loading: false
                }
            })
            .addCase(fetchUserById.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.payload || 'Failed to fetch tasks'
                }
            })
    }
})

export default tasksSlice.reducer;