import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface ILanguage {
    language: string
}

const initialState: ILanguage = {
    language: localStorage.getItem("language") || "en"
}

const languageSlice = createSlice({
    name: 'language',
    initialState,
    reducers: {
        changeLanguage: (state, action: PayloadAction<string>) => {
            state.language = action.payload;
            localStorage.setItem("language", action.payload);
        }
    }

})

export const { changeLanguage } = languageSlice.actions;
export default languageSlice.reducer;