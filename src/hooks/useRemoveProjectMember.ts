import { useMutation, useQueryClient } from "@tanstack/react-query";
import { projectService } from "@/services/project.service";
import toast from "react-hot-toast";

export const useRemoveProjectMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ projectId, memberId }: { projectId: string; memberId: string }) => 
      projectService.removeMember(projectId, memberId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Member removed successfully");
    },
    onError: (error: Error) => {
      const axiosError = error as any;
      toast.error(axiosError.response?.data?.message || "Failed to remove member");
    }
  });
};
