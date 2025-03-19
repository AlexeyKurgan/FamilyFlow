import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface INotification {
    id?: number;
    title: string;
    message: string;
    timestamp: string;
    created_at: string;
    isRead?: boolean;
}

interface NotificationsState {
    notifications: INotification[];
}

const loadNotificationsFromStorage = (): INotification[] => {
    const stored = localStorage.getItem("notifications");
    return stored ? JSON.parse(stored) : [];
};

const initialState: NotificationsState = {
    notifications: loadNotificationsFromStorage(),
};

const notificationsSlice = createSlice({
    name: "notifications",
    initialState,
    reducers: {
        addNotification: (state, action: PayloadAction<INotification>) => {
            const now = new Date();
            state.notifications.unshift({
                ...action.payload,
                timestamp: now.toLocaleString(),
                created_at: now.toISOString(),
                isRead: false,
            });

            const twoWeeksAgo = new Date();
            twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
            state.notifications = state.notifications.filter(
                (notification) =>
                    new Date(notification.created_at) >= twoWeeksAgo
            );

            localStorage.setItem("notifications", JSON.stringify(state.notifications));
        },
        markNotificationAsRead: (state, action: PayloadAction<number>) => {
            const notification = state.notifications.find(
                (n) => n.id === action.payload
            );
            if (notification) {
                notification.isRead = true;
            }
            localStorage.setItem("notifications", JSON.stringify(state.notifications));
        },
        markAllNotificationsAsRead: (state) => {
            state.notifications.forEach((n) => (n.isRead = true));
            localStorage.setItem("notifications", JSON.stringify(state.notifications));
        },
        clearNotifications: (state) => {
            state.notifications = [];
            localStorage.setItem("notifications", JSON.stringify(state.notifications));
        },
    },
});

export const {
    addNotification,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    clearNotifications,
} = notificationsSlice.actions;
export default notificationsSlice.reducer;