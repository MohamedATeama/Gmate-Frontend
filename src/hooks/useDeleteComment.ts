import { useMutation, useQueryClient } from "@tanstack/react-query";
import { taskService } from "@/services/task.service";
import toast from "react-hot-toast";

export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteComment, isPending } = useMutation({
    mutationFn: ({ taskId, commentId }: { taskId: string | number; commentId: string }) =>
      taskService.deleteComment(commentId),
    onSuccess: (_data, variables) => {
      toast.success("Comment deleted");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["task", String(variables.taskId)] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to delete comment");
    },
  });

  return { deleteComment, isPending };
};
