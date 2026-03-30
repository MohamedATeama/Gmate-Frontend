import { useMutation, useQueryClient } from "@tanstack/react-query";
import { projectService } from "@/services/project.service";
import { toast } from "react-hot-toast";

export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteProject, isPending } = useMutation({
    mutationFn: projectService.deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Project deleted");
    },
    onError: () => {
      toast.error("Failed to delete project");
    },
  });

  return { deleteProject, isPending };
};
