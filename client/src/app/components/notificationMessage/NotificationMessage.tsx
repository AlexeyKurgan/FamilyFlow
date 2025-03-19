import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { markAllNotificationsAsRead } from "../../../store/slices/notificationsSlice";
import { useAppDispatch } from "../../../shared/hooks/hooks";
import { useEffect } from "react";

interface NotificationMessageProps {
  isPanelShow: boolean;
}

const NotificationMessage = ({ isPanelShow }: NotificationMessageProps) => {
  const dispatch = useAppDispatch();
  const notifications = useSelector(
    (state: RootState) => state.notifications.notifications
  );
  const { session } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (isPanelShow && session?.user.id) {
      dispatch(markAllNotificationsAsRead(session.user.id));
    }
  }, [isPanelShow, dispatch, session?.user.id]);

  return (
    <>
      {isPanelShow && (
        <div
          className="bg-black border-amber-400 rounded-md z-10 absolute p-[20px] top-[45px] left-[-600px] w-[750px] h-[350px] 
          max-h-[450px] max-w-[750px] overflow-hidden"
        >
          <ul className="text-[.8em] h-full font-bold list-none border-2 border-amber-400 scrollbar overflow-auto">
            {notifications.length === 0 ? (
              <li className="text-amber-400 text-center p-4">
                Нет уведомлений
              </li>
            ) : (
              notifications.map((notification, index) => (
                <li
                  key={index}
                  className={`flex items-center justify-between mb-2.5 mr-[20px] ${
                    index % 2 === 0
                      ? "bg-amber-400 text-black"
                      : "text-amber-400"
                  }`}
                >
                  <span className="p-1.5 min-w-[120px] truncate">
                    {notification.title}
                  </span>
                  <p className="p-1.5 max-w-[250px] min-w-[250px] overflow-hidden truncate">
                    {notification.message}
                  </p>
                  <p className="p-1.5 min-w-[120px] truncate">System</p>
                  <p className="p-1.5 min-w-[150px] truncate">
                    {notification.timestamp}
                  </p>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </>
  );
};

export default NotificationMessage;
