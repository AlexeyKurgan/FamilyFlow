import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IAlert from "../../shared/types/alert";

const initialState: IAlert = {
    show: false,
    message: null,
    severity: 'info',
    title: ''
}

const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        showAlert: (state, action: PayloadAction<IAlert>) => {
            return {
                ...state,
                show: true,
                message: action.payload.message,
                severity: action.payload.severity,
                title: action.payload.title
            }
        },
        hideAlert: (state) => {
            return {
                ...state,
                show: false,
                message: null,
                title: ''
            }
        }
    }
})


export const { showAlert, hideAlert } = alertSlice.actions;
export default alertSlice.reducer;