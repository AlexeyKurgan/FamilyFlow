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

interface AddNotificationPayload {
    notification: INotification;
    userId: string;
}

const loadNotificationsFromStorage = (userId: string): INotification[] => {
    const stored = localStorage.getItem(`notifications_${userId}`);
    return stored ? JSON.parse(stored) : [];
};

const initialState: NotificationsState = {
    notifications: [],
};

const notificationsSlice = createSlice({
    name: "notifications",
    initialState,
    reducers: {
        addNotification: (state, action: PayloadAction<AddNotificationPayload>) => {
            const { notification, userId } = action.payload;
            const now = new Date();
            state.notifications.unshift({
                ...notification,
                timestamp: now.toLocaleString(),
                created_at: now.toISOString(),
                isRead: false,
            });


            const twoWeeksAgo = new Date();
            twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
            state.notifications = state.notifications.filter(
                (n) => new Date(n.created_at) >= twoWeeksAgo
            );


            localStorage.setItem(
                `notifications_${userId}`,
                JSON.stringify(state.notifications)
            );
        },
        markNotificationAsRead: (state, action: PayloadAction<{ id: number; userId: string }>) => {
            const notification = state.notifications.find(
                (n) => n.id === action.payload.id
            );
            if (notification) {
                notification.isRead = true;
            }
            localStorage.setItem(
                `notifications_${action.payload.userId}`,
                JSON.stringify(state.notifications)
            );
        },
        markAllNotificationsAsRead: (state, action: PayloadAction<string>) => {
            state.notifications.forEach((n) => (n.isRead = true));
            localStorage.setItem(
                `notifications_${action.payload}`,
                JSON.stringify(state.notifications)
            );
        },
        clearNotifications: (state, action: PayloadAction<string>) => {
            state.notifications = [];
            localStorage.setItem(
                `notifications_${action.payload}`,
                JSON.stringify(state.notifications)
            );
        },
        loadNotifications: (state, action: PayloadAction<string>) => {
            state.notifications = loadNotificationsFromStorage(action.payload);
        },
    },
});

export const {
    addNotification,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    clearNotifications,
    loadNotifications,
} = notificationsSlice.actions;
export default notificationsSlice.reducer;