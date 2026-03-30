import { forgotPassword as forgotPasswordApi } from "@/services/apiAuth";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export function useForgotPassword() {
  const navigate = useNavigate();
  const {mutate: forgotPassword, isPending} = useMutation({
    mutationFn: forgotPasswordApi,
    onSuccess: (data) => {
      Cookies.set('resetToken', data.data, {
        path: '/',
        expires: new Date(Date.now() + 1000 * 60 * 10),
      })
      toast.success(
        "Reset password code sent to your email!",
      );
      navigate("/verifyPasswordCode", { replace: true });
    },
    onError: (err) => {
      toast.error(err.message);
    }
  });

  return { forgotPassword, isPending };
}