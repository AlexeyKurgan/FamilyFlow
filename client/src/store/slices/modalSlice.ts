import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IModal } from "../../shared/types/modal";

const initialState: IModal = {
    show: false,
    title: '',
    type: null,
    taskId: undefined,
    content: undefined,
    className: '',
}

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        showModal: (state, action: PayloadAction<Partial<IModal>>) => {
            return {
                ...state,
                show: true,
                title: action.payload.title,
                type: action.payload.type || null,
                taskId: action.payload.taskId,
                content: action.payload.content || '',
                className: action.payload.className || '',
            }
        },
        hideModal: (state) => {
            return {
                ...state,
                show: false,
                title: '',
                type: null,
                taskId: undefined,
                content: undefined,
                className: '',
            }
        }
    }
})


export const { hideModal, showModal } = modalSlice.actions;
export default modalSlice.reducer;