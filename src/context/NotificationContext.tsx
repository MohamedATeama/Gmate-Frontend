import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { notificationService } from "@/services/notification.service";
import { socketService } from "@/api/socket";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

export type NotificationType = "task_assigned" | "task_overdue" | "task_comment" | "project_member_added";

export interface Notification {
  _id: number | string;
  type: NotificationType;
  title: string;
  body: string;
  createdAt: string;
  read: boolean;
  task?: string;
  project?: string;
}

interface NotificationContextValue {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: number | string) => void;
  markAllAsRead: () => void;
  addNotification: (notification: Omit<Notification, "_id" | "read" | "createdAt">) => void;
}

const NotificationContext = createContext<NotificationContextValue | null>(null);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();

  const { data: initialNotifications } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => notificationService.getNotifications(),
    enabled: !!Cookies.get("accessToken"),
  });

  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Sync state when query data changes
  useEffect(() => {
    if (initialNotifications) {
      setNotifications(initialNotifications);
    }
  }, [initialNotifications]);

  // Socket setup
  useEffect(() => {
    const token = Cookies.get("accessToken");
    if (!token) return;

    socketService.connect();

    const handleNewNotification = (...args: unknown[]) => {
      console.log(args);
      toast.success("New notification");
      const newNotif = args[0] as Notification;
      if (!newNotif || typeof newNotif !== 'object') return;
      setNotifications((prev) => [newNotif, ...prev]);
      // Also update query cache
      queryClient.setQueryData<Notification[]>(["notifications"], (old) => {
        return old ? [newNotif, ...old] : [newNotif];
      });
    };

    socketService.on("notification", handleNewNotification);

    return () => {
      socketService.off("notification", handleNewNotification);
      socketService.disconnect();
    };
  }, [queryClient]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsReadMutation = useMutation({
    mutationFn: (id: number | string) => notificationService.markAsRead(id),
    onSuccess: (_, id) => {
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, read: true } : n))
      );
      queryClient.setQueryData<Notification[]>(["notifications"], (old) => {
        return old?.map((n) => (n._id === id ? { ...n, read: true } : n)) || [];
      });
    },
  });

  const markAllAsReadMutation = useMutation({
    mutationFn: () => notificationService.markAllAsRead(),
    onSuccess: () => {
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
      queryClient.setQueryData<Notification[]>(["notifications"], (old) => {
        return old?.map((n) => ({ ...n, read: true })) || [];
      });
    },
  });

  const markAsRead = useCallback((id: number | string) => {
    markAsReadMutation.mutate(id);
  }, [markAsReadMutation]);

  const markAllAsRead = useCallback(() => {
    markAllAsReadMutation.mutate();
  }, [markAllAsReadMutation]);

  const addNotification = useCallback((n: Omit<Notification, "_id" | "read" | "createdAt">) => {
    const newNotif: Notification = {
      ...n,
      _id: Date.now(),
      read: false,
      createdAt: "Just now",
    };
    setNotifications((prev) => [newNotif, ...prev]);
  }, []);

  return (
    <NotificationContext.Provider
      value={{ notifications, unreadCount, markAsRead, markAllAsRead, addNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotifications must be used within a NotificationProvider");
  }
  return context;
}
