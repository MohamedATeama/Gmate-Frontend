import { useQuery } from "@tanstack/react-query";
import { taskService } from "@/services/task.service";

export const useTask = (id?: string | number) => {
  const { data: task, isLoading, error, refetch } = useQuery({
    queryKey: ["task", id],
    queryFn: () => taskService.getTaskById(id!),
    enabled: !!id,
  });

  return { task, isLoading, error, refetch };
};
