import { useMutation, useQueryClient } from "@tanstack/react-query";
import { taskService } from "@/services/task.service";
import toast from "react-hot-toast";

export const useDeleteAttachment = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteAttachment, isPending } = useMutation({
    mutationFn: ({ taskId, attachmentId }: { taskId: string | number; attachmentId: string }) =>
      taskService.deleteAttachment(taskId, attachmentId),
    onSuccess: (_data, variables) => {
      toast.success("Attachment deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["task", String(variables.taskId)] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to delete attachment");
    },
  });

  return { deleteAttachment, isPending };
};
