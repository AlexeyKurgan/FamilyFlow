import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FetchTasksParams, fetchTasksByUserId, Task } from "../../app/api/tasks/tasksRequest";
import { PostgrestError } from "@supabase/supabase-js";

const initialState = {
    tasks: [] as Task[] | null,
    loading: false,
    error: null as string | null,
};

export const fetchTasksUserById = createAsyncThunk<
    { data: Task[] | null; error: PostgrestError | null },
    FetchTasksParams,
    { rejectValue: string }
>(
    "tasks/fetchTasksByUserId",
    async ({ user_uuid }: FetchTasksParams, { rejectWithValue }) => {
        try {
            const response = await fetchTasksByUserId(user_uuid);
            return response;
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw rejectWithValue(error.message);
            }
            return rejectWithValue("Occurred due to a fetch error");
        }
    }
);

const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        addTask(state, action: PayloadAction<Task>) {
            if (state.tasks) {
                state.tasks.push(action.payload);
            } else {
                state.tasks = [action.payload];
            }
        },
        updateTask(state, action: PayloadAction<Task>) {
            if (state.tasks) {
                const index = state.tasks.findIndex(
                    (task) => task.id === action.payload.id
                );
                if (index !== -1) {
                    state.tasks[index] = action.payload;
                }
            }
        },
        removeTask(state, action: PayloadAction<number>) {
            if (state.tasks) {
                state.tasks = state.tasks.filter((task) => task.id !== action.payload);
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasksUserById.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                    error: null,
                };
            })
            .addCase(fetchTasksUserById.fulfilled, (state, action) => {
                return {
                    ...state,
                    tasks: action.payload.data || [],
                    loading: false,
                };
            })
            .addCase(fetchTasksUserById.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.payload || "Failed to fetch tasks",
                };
            });
    },
});

export const { addTask, updateTask, removeTask } = tasksSlice.actions;
export default tasksSlice.reducer;