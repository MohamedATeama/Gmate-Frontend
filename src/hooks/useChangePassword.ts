import { changePassword as changePasswordApi } from "@/services/apiUser";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useChangePassword() {
  const { mutate: changePassword, isPending } = useMutation({
    mutationFn: changePasswordApi,
    onSuccess: () => {
      toast.success("Password successfully changed");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { changePassword, isPending };
}
