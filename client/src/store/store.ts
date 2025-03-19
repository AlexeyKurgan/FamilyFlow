import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/authSlice';
import alertReducer from './slices/alertSlice';
import languageReducer from "./slices/languageSlice";
import tasksReducer from "./slices/tasksSlice";
import integrationsReducer from "./slices/integrationsSlice";
import resourcesReducer from "./slices/resourcesSlice";
import achievementsReducer from "./slices/achievementsSlice";
import userProfileReducer from "./slices/profileSlice";
import modalReducer from "./slices/modalSlice";
import notificationsReducer from "./slices/notificationsSlice";

export const store = configureStore(
    {
        reducer: {
            auth: authReducer,
            alert: alertReducer,
            language: languageReducer,
            tasks: tasksReducer,
            integrations: integrationsReducer,
            resources: resourcesReducer,
            achievements: achievementsReducer,
            profile: userProfileReducer,
            modal: modalReducer,
            notifications: notificationsReducer
        }
    }
)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;