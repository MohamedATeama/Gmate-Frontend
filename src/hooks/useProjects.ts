import { useQuery } from "@tanstack/react-query";
import { projectService, type GetProjectsParams } from "@/services/project.service";
import type { Project } from "@/types/project";

export const useProjects = (params?: GetProjectsParams): {
  projects: Project[];
  metadata: { totalPages: number; currentPage: number; };
  length: number;
  isLoading: boolean;
  error: unknown;
  refetch: unknown;
} => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["projects", params],
    queryFn: () => projectService.getProjects(params),
  });

  return {
    projects: data?.projects || [],
    metadata: {
      totalPages: data?.totalPages || 1,
      currentPage: data?.currentPage || 1,
    },
    length: data?.length || 0,
    isLoading,
    error,
    refetch,
  };
};
