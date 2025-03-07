import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/authSlice';
import alertReducer from './slices/alertSlice';
import languageSlice from "./slices/languageSlice";
import tasksSlice from "./slices/tasksSlice";
import integrationsSlice from "./slices/integrationsSlice";

export const store = configureStore(
    {
        reducer: {
            auth: authReducer,
            alert: alertReducer,
            language: languageSlice,
            tasks: tasksSlice,
            integrations: integrationsSlice,
        }
    }
)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;