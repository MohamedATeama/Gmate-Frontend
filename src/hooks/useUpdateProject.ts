import { useMutation, useQueryClient } from "@tanstack/react-query";
import { projectService } from "@/services/project.service";
import type { ProjectFormData } from "@/types/project";
import { toast } from "react-hot-toast";

export const useUpdateProject = () => {
  const queryClient = useQueryClient();

  const { mutate: updateProject, isPending } = useMutation({
    mutationFn: ({ id, data }: { id: string; data: ProjectFormData }) => projectService.updateProject(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["project", variables.id] });
      toast.success("Project updated successfully");
    },
    onError: () => {
      toast.error("Failed to update project");
    },
  });

  return { updateProject, isPending };
};
