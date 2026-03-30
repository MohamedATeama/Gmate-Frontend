import { useMutation, useQueryClient } from "@tanstack/react-query";
import { projectService } from "@/services/project.service";
import type { ProjectFormData } from "@/types/project";
import { toast } from "react-hot-toast";

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  const { mutate: createProject, isPending } = useMutation({
    mutationFn: (data: ProjectFormData) => projectService.createProject(data as any),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Project created successfully");
    },
    onError: () => {
      toast.error("Failed to create project");
    },
  });

  return { createProject, isPending };
};
