import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IAuthSignUp, IAuthState, ISignIn, SignInResponse } from "../../auth/types/authUser"
import { signInRequest, signOutRequest, signUpRequest, UserData } from "../../auth/api/authRequests"
import { Session } from "@supabase/supabase-js";


const initialState: IAuthState = {
    name: '',
    last_name: '',
    email: '',
    password: '',
    loading: false,
    error: null,
    session: null as Session | null
}

export const signUpUser = createAsyncThunk<UserData | null, IAuthSignUp>('auth/sign_up', async ({ email, password, name, last_name }: IAuthSignUp, { rejectWithValue }) => {
    try {
        const response = await signUpRequest(email, password, name, last_name);
        return response;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw rejectWithValue(error.message)
        }
        return rejectWithValue("Occurred due to a registration error")
    }
});

export const signInUser = createAsyncThunk<
    SignInResponse,
    ISignIn,
    { rejectValue: string }
>("auth/sign_in", async ({ email, password }: ISignIn, { rejectWithValue }) => {
    try {
        const { data, error } = await signInRequest(email, password);
        if (error) {
            throw new Error(error);
        }
        return { user: data.user, session: data.session } as SignInResponse;
    } catch (error: unknown) {
        if (error instanceof Error) {
            return rejectWithValue(error.message);
        }
        return rejectWithValue("Occurred due to a sign-in error");
    }
})

export const signOutUser = createAsyncThunk<{ error: null; }, void>("auth/sign_out", async (_, { rejectWithValue }) => {
    try {
        const { error } = await signOutRequest();

        if (error) {
            throw new Error(error);
        }
        return { error: null }
    } catch (error) {
        if (error instanceof Error) {
            return rejectWithValue(error.message);
        }
        return rejectWithValue("Occurred due to a sign-out error");
    }
})

const authSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setSession(state, action: PayloadAction<Session | null>) {
            state.session = action.payload;
            if (action.payload?.user) {
                state.email = action.payload.user.email || "";
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signUpUser.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                    error: null
                }
            })
            .addCase(signUpUser.fulfilled, (state, action) => {
                if (action.payload) {
                    return {
                        ...state,
                        loading: false,
                        name: action.payload.name,
                        last_name: action.payload.last_name,
                        email: action.payload.email,
                    }
                }

                return state;
            })
            .addCase(signUpUser.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.payload as string
                }
            })
            .addCase(signInUser.pending, (state) => {
                return {
                    ...state,
                    loading: true,
                    error: null
                }
            })
            .addCase(signInUser.fulfilled, (state, action) => {
                return {
                    ...state,
                    session: action.payload.session,
                    email: action.payload.user.email || "",
                    loading: false
                }
            })
            .addCase(signInUser.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.payload as string
                }
            })
            .addCase(signOutUser.pending, (state) => {
                return { ...state, loading: true, error: null };
            })
            .addCase(signOutUser.fulfilled, (state) => {
                return { ...state, session: null, loading: false, email: "", error: null };
            })
            .addCase(signOutUser.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.payload as string
                }
            })
    }
})

export const { setSession } = authSlice.actions;
export default authSlice.reducer;
