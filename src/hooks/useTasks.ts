import { useQuery } from "@tanstack/react-query";
import { taskService } from "@/services/task.service";
import type { GetTasksParams } from "@/services/task.service";

export const useTasks = (params?: GetTasksParams) => {
  const { data, isPending, error, refetch } = useQuery({
    queryKey: ["tasks", params],
    queryFn: () => taskService.getTasks(params),
  });

  return {
    tasks: data?.tasks || (Array.isArray(data) ? data : []),
    length: data?.length || 0,
    totalPages: data?.totalPages || 1,
    currentPage: data?.currentPage || 1,
    isPending,
    error,
    refetch,
  };
};
