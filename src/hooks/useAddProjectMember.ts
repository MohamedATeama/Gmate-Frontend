import { useMutation, useQueryClient } from "@tanstack/react-query";
import { projectService } from "@/services/project.service";

export const useAddProjectMember = (projectId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { email: string; role?: string }) => projectService.addMember(projectId, data.email, data.role),
    onSuccess: () => {
      // Intelligently invalidate UI states instantly
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};
