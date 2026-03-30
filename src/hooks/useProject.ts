import { useQuery } from "@tanstack/react-query";
import { projectService } from "@/services/project.service";

export const useProject = (id?: string) => {
  const {
    data: project,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["project", id],
    queryFn: () => projectService.getProjectById(id!),
    enabled: !!id,
  });

  return { project, isLoading, error, refetch };
};
