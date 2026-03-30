import { useMutation, useQueryClient } from "@tanstack/react-query";
import { taskService } from "@/services/task.service";
import toast from "react-hot-toast";

export const useUploadAttachments = () => {
  const queryClient = useQueryClient();

  const { mutate: uploadAttachments, isPending } = useMutation({
    mutationFn: ({ taskId, formData }: { taskId: string | number; formData: FormData }) =>
      taskService.uploadAttachments(taskId, formData),
    onSuccess: (_data, variables) => {
      toast.success("Files uploaded successfully");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["task", String(variables.taskId)] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to upload attachments");
    },
  });

  return { uploadAttachments, isPending };
};
