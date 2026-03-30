import { useMutation, useQueryClient } from "@tanstack/react-query";
import { taskService } from "@/services/task.service";
import toast from "react-hot-toast";

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  const { mutate: createTask, isPending } = useMutation({
    mutationFn: taskService.createTask,
    onSuccess: () => {
      toast.success("Task created successfully");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to create task");
    },
  });

  return { createTask, isPending };
};
