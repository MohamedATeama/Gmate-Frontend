import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "@/services/apiUser";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: logout, isPending } = useMutation({
    mutationFn: () => logoutApi(),
    onSuccess: () => {
      Cookies.remove("accessToken", { path: "/" });
      Cookies.remove("refreshToken", { path: "/" });
      queryClient.removeQueries();
      navigate("/", { replace: true });
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error("Logout failed");
    },
  });

  return { logout, isPending };
}
