import { User, Session } from "@supabase/supabase-js";

export interface IUser {
    name: string;
    last_name: string;
    email: string;
    password: string;
    role: string;
    is_admin: boolean;
    user_parents: string[];
    tasks: string[];
    resources: string[];
    integrations: string[];
    profiles: string[];
    settings: object;
    favorites: string[];
}

export interface IAuthSignUp {
    email: string,
    password: string,
    name: string,
    last_name: string,
    familyOption: string,
    familyID: string
}

export interface ISignIn {
    email: string,
    password: string
}

export interface SignInResponse {
    user: User;
    session: Session;
}

export interface IAuthState extends IAuthSignUp {
    token?: null,
    loading: boolean,
    error: string | null,
    session?: Session | null;
}