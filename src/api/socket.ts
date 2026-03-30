import { io, Socket } from "socket.io-client";
import Cookies from "js-cookie";

class SocketService {
  public socket: Socket | null = null;
  private backendUrl = import.meta.env.VITE_API_URL;

  connect() {
    if (this.socket?.connected) return;

    const token = Cookies.get("accessToken");

    let originStr = this.backendUrl;
    try {
      const url = new URL(this.backendUrl);
      originStr = url.origin;
    } catch {
      console.error("Invalid backend URL");
    }

    this.socket = io(originStr, {
      auth: {
        token: token || "", 
      },
      extraHeaders: {
        Authorization: token ? `Bearer ${token}` : "",
      },
      withCredentials: true,
      transports: ["websocket", "polling"],
    });

    this.socket.on("connect", () => {
      console.log("Socket connected");
    });

    this.socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  on(event: string, callback: (...args: unknown[]) => void) {
    if (this.socket) {
      this.socket.on(event, callback);
    }
  }

  off(event: string, callback?: (...args: unknown[]) => void) {
    if (this.socket) {
      this.socket.off(event, callback);
    }
  }
}

export const socketService = new SocketService();
