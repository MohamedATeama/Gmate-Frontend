import { useMutation, useQueryClient } from "@tanstack/react-query";
import { taskService } from "@/services/task.service";
import toast from "react-hot-toast";

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  const { mutate: updateTask, isPending } = useMutation({
    mutationFn: ({ id, data }: { id: string | number; data: any }) =>
      taskService.updateTask(id, data),
    onSuccess: (_data, variables) => {
      toast.success("Task updated successfully");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["task", String(variables.id)] });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["project"] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to update task");
    },
  });

  return { updateTask, isPending };
};
