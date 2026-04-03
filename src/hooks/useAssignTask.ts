import { useMutation, useQueryClient } from "@tanstack/react-query";
import { taskService } from "@/services/task.service";
import toast from "react-hot-toast";

export const useAssignTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ taskId, email }: { taskId: string | number; email: string }) => taskService.assignTask(taskId, email),
    onSuccess: (_, { taskId }) => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["task", String(taskId)] });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["project"] });
      toast.success("Task assigned successfully");
    },
    onError: (error: Error) => {
      const axiosError = error as Error & { response?: { data?: { message?: string } } };
      toast.error(axiosError.response?.data?.message || "Failed to assign task");
    }
  });
};
