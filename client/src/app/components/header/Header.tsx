import { Avatar, Menu, MenuItem, Typography } from "@mui/material";
import styles from "./Header.module.scss";
import Logo from "../../../shared/components/Logo";
import LanguageSwitcher from "../../../shared/components/language-switcher/LanguageSwitcher";
import { Link, useNavigate } from "react-router-dom";
import { t } from "i18next";
import { useAppDispatch } from "../../../shared/hooks/hooks";
import { signOutUser } from "../../../store/slices/authSlice";
import { showAlert } from "../../../store/slices/alertSlice";
import { RootState } from "../../../store/store";
import { useSelector } from "react-redux";
import {
  MdNotifications,
  MdNotificationsActive,
} from "../../../shared/react-icons/icons";
import { useEffect, useState, useRef } from "react";
import NotificationMessage from "../notificationMessage/NotificationMessage";
import { supabase } from "../../../auth/constants/supabaseConfig";
import { Task } from "../../../app/api/tasks/tasksRequest";
import { addNotification } from "../../../store/slices/notificationsSlice";
import { RealtimeChannel } from "@supabase/supabase-js";

interface HeaderProps {
  onAvatarClick: (event: React.MouseEvent<HTMLElement>) => void;
  onMenuClose: () => void;
  anchorEl: null | HTMLElement;
}

const Header = ({ onAvatarClick, onMenuClose, anchorEl }: HeaderProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { userProfile } = useSelector((state: RootState) => state.profile);
  const { session } = useSelector((state: RootState) => state.auth);
  const notifications = useSelector(
    (state: RootState) => state.notifications.notifications
  );

  const [isVisibleNotificationPanel, setIsVisibleNotificationPanel] =
    useState(false);
  const hasUnreadNotifications = notifications.some((n) => !n.isRead);
  const subscriptionRef = useRef<RealtimeChannel | null>(null);

  const toggleNotificationMessage = () => {
    setIsVisibleNotificationPanel((prev) => !prev);
  };

  useEffect(() => {
    if (!session?.user.id) {
      if (subscriptionRef.current) {
        supabase.removeChannel(subscriptionRef.current);
        subscriptionRef.current = null;
      }
      return;
    }

    const subscribeToTasks = () => {
      if (subscriptionRef.current) {
        supabase.removeChannel(subscriptionRef.current);
      }

      const subscription = supabase.channel(`tasks-channel-${session.user.id}`);

      subscription
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "tasks",
            filter: `assigned_to=eq.${session.user.id}`,
          },
          (payload) => {
            const newTask = payload.new as Task;
            console.log("New task received:", newTask);
            console.log("Current user ID:", session.user.id);
            if (newTask.assigned_to === session.user.id) {
              dispatch(
                addNotification({
                  id: newTask.id,
                  title: newTask.title,
                  message: `New task assigned: ${newTask.title}`,
                  timestamp: new Date().toLocaleString(),
                  created_at: new Date().toISOString(),
                })
              );
            }
          }
        )
        .on(
          "postgres_changes",
          {
            event: "UPDATE",
            schema: "public",
            table: "tasks",
            filter: `assigned_to=eq.${session.user.id}`,
          },
          (payload) => {
            const updatedTask = payload.new as Task;
            if (updatedTask.assigned_to === session.user.id) {
              dispatch(
                addNotification({
                  id: updatedTask.id,
                  title: updatedTask.title,
                  message: `Task updated: ${updatedTask.title}`,
                  timestamp: new Date().toLocaleString(),
                  created_at: new Date().toISOString(),
                })
              );
            }
          }
        )
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "deleted_tasks",
            filter: `creator_id=eq.${session.user.id}`,
          },
          (payload) => {
            const deletedTask = payload.new;
            if (deletedTask.creator_id === session.user.id) {
              dispatch(
                addNotification({
                  id: deletedTask.id,
                  title: deletedTask.title,
                  message: `Task was deleted: ${deletedTask.title}`,
                  timestamp: new Date().toLocaleString(),
                  created_at: new Date().toISOString(),
                })
              );
            }
          }
        )
        .subscribe((status) => {
          if (status === "SUBSCRIBED") {
            console.log("Successfully subscribed to tasks-channel");
          } else if (status === "CHANNEL_ERROR") {
            console.error("Channel error occurred, attempting to resubscribe");
            subscriptionRef.current?.unsubscribe();
            subscribeToTasks();
          }
        });

      subscriptionRef.current = subscription;
    };

    subscribeToTasks();

    return () => {
      if (subscriptionRef.current) {
        supabase.removeChannel(subscriptionRef.current);
        subscriptionRef.current = null;
      }
    };
  }, [session?.user.id, dispatch]);

  const handleLogout = async () => {
    try {
      await dispatch(signOutUser());
      dispatch(
        showAlert({ message: "Signed out successfully", severity: "success" })
      );
      navigate("/");
    } catch (error) {
      dispatch(
        showAlert({ message: `Sign out failed: ${error}`, severity: "error" })
      );
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <Logo classNames={styles.logo} />
      </div>
      <div className={styles.headerRight}>
        {hasUnreadNotifications ? (
          <div className="relative">
            <MdNotificationsActive
              onClick={toggleNotificationMessage}
              className="cursor-pointer hover:text-amber-400 animate-wiggle"
              size={25}
            />
            <span className="absolute text-left min-w-[40px] top-[-15px] right-[-30px] text-[15px] font-bold text-amber-800">
              {notifications.filter((n) => !n.isRead).length}
            </span>
          </div>
        ) : (
          <MdNotifications
            onClick={toggleNotificationMessage}
            className="cursor-pointer hover:text-amber-400"
            size={25}
          />
        )}
        <NotificationMessage isPanelShow={isVisibleNotificationPanel} />
        <LanguageSwitcher className={styles.languageSwitcher} />
        <Avatar
          alt={`${userProfile?.name} ${userProfile?.last_name}`}
          src={userProfile?.profiles[0]?.avatar_url?.toString() || ""}
          onClick={onAvatarClick}
          className={styles.avatar}
        />
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={onMenuClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <div className={styles.menuProfile}>
            <Avatar
              alt={`${userProfile?.name} ${userProfile?.last_name}`}
              src={userProfile?.profiles[0]?.avatar_url?.toString() || ""}
              className={styles.menuAvatar}
            />
            <div>
              <Typography variant="body1">{`${userProfile?.name} ${userProfile?.last_name}`}</Typography>
              <Typography variant="body2" color="text.secondary">
                {userProfile?.email}
              </Typography>
            </div>
          </div>
          <MenuItem
            className="item-menu"
            component={Link}
            to="/dashboard/profile"
          >
            {t("Profile")}
          </MenuItem>
          <MenuItem
            className="item-menu"
            component={Link}
            to="/dashboard/settings"
          >
            {t("Settings")}
          </MenuItem>
          <MenuItem className="item-menu" onClick={handleLogout}>
            {t("Logout")}
          </MenuItem>
        </Menu>
      </div>
    </header>
  );
};

export default Header;
