import api from "@/api/axios";
import type { Notification } from "@/context/NotificationContext";

export const notificationService = {
  async getNotifications(): Promise<Notification[]> {
    const res = await api.get("/notifications");
    return res.data.data.notifications || res.data;
  },
  
  async markAsRead(id: number | string): Promise<void> {
    await api.patch(`/notifications/${id}/read`);
  },
  
  async markAllAsRead(): Promise<void> {
    await api.patch("/notifications/read-all");
  }
};
