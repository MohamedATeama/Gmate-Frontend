import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "@/services/apiAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginApi({ email, password }),
    onSuccess: (data) => {
      Cookies.set("accessToken", data.data.token.accessToken, {
        path: "/",
        expires: new Date(Date.now() + 1000 * 60 * 60),
      });
      Cookies.set("refreshToken", data.data.token.refreshToken, {
        path: "/",
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      });
      queryClient.setQueryData(["user"], data.data.user);
      navigate("/dashboard", { replace: true });
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error("Provided email or password are incorrect");
    },
  });

  return { login, isPending };
}
