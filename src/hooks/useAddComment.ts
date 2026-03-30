import { useMutation, useQueryClient } from "@tanstack/react-query";
import { taskService } from "@/services/task.service";
import toast from "react-hot-toast";

export const useAddComment = () => {
  const queryClient = useQueryClient();

  const { mutate: addComment, isPending } = useMutation({
    mutationFn: ({ taskId, text }: { taskId: string | number; text: string }) =>
      taskService.addComment(taskId, text),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["task", String(variables.taskId)] });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to add comment");
    },
  });

  return { addComment, isPending };
};
