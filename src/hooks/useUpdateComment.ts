import { useMutation, useQueryClient } from "@tanstack/react-query";
import { taskService } from "@/services/task.service";
import toast from "react-hot-toast";

export const useUpdateComment = () => {
  const queryClient = useQueryClient();

  const { mutate: updateComment, isPending } = useMutation({
    mutationFn: ({ commentId, text }: { taskId: string | number; commentId: string; text: string }) =>
      taskService.updateComment(commentId, text),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["task", String(variables.taskId)] });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to update comment");
    },
  });

  return { updateComment, isPending };
};
