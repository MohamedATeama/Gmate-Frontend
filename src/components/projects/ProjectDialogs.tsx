import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProjectFormSchema } from "@/types/project";
import type { ProjectFormData, Project } from "@/types/project";
import { useCreateProject } from "@/hooks/useCreateProject";
import { useUpdateProject } from "@/hooks/useUpdateProject";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface EditProjectDialogProps extends ProjectDialogProps {
  project: Project;
}

export const CreateProjectDialog: React.FC<ProjectDialogProps> = ({ open, onOpenChange }) => {
  const { createProject, isPending } = useCreateProject();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(ProjectFormSchema),
    defaultValues: {
      status: "planning",
      startDate: "",
      endDate: "",
    },
  });

  const onSubmit = (data: ProjectFormData) => {
    const payload = { ...data };
    if (!payload.startDate) delete payload.startDate;
    if (!payload.endDate) delete payload.endDate;

    createProject(payload, {
      onSuccess: () => {
        reset();
        onOpenChange(false);
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Project Title</Label>
            <Input
              id="title"
              placeholder="Enter project title"
              {...register("title")}
              className={errors.title ? "border-red-500" : ""}
            />
            {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Brief description of the project"
              {...register("description")}
              className={errors.description ? "border-red-500" : ""}
            />
            {errors.description && (
              <p className="text-xs text-red-500">{errors.description.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                {...register("startDate")}
                className={errors.startDate ? "border-red-500" : ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="date"
                {...register("endDate")}
                className={errors.endDate ? "border-red-500" : ""}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              defaultValue="planning"
              onValueChange={(value) => setValue("status", value as ProjectFormData["status"])}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="planning">Planning</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="on-hold">On Hold</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Creating..." : "Create Project"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export const EditProjectDialog: React.FC<EditProjectDialogProps> = ({
  open,
  onOpenChange,
  project,
}) => {
  const { updateProject, isPending } = useUpdateProject();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(ProjectFormSchema),
    values: {
      title: project.title,
      description: project.description,
      status: project.status,
      startDate: project.startDate ? new Date(project.startDate).toISOString().split('T')[0] : "",
      endDate: project.endDate ? new Date(project.endDate).toISOString().split('T')[0] : "",
    },
  });

  const onSubmit = (data: ProjectFormData) => {
    const payload = { ...data };
    if (!payload.startDate) delete payload.startDate;
    if (!payload.endDate) delete payload.endDate;

    updateProject({ id: project._id!, data: payload }, {
      onSuccess: () => {
        onOpenChange(false);
      }
    });
  };

  const onError = (errors: any) => {
    console.error("Form validation failed:", errors);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Project</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="edit-title">Project Title</Label>
            <Input
              id="edit-title"
              {...register("title")}
              className={errors.title ? "border-red-500" : ""}
            />
            {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-description">Description</Label>
            <Textarea
              id="edit-description"
              {...register("description")}
              className={errors.description ? "border-red-500" : ""}
            />
            {errors.description && (
              <p className="text-xs text-red-500">{errors.description.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-startDate">Start Date</Label>
              <Input
                id="edit-startDate"
                type="date"
                {...register("startDate")}
                className={errors.startDate ? "border-red-500" : ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-endDate">End Date</Label>
              <Input
                id="edit-endDate"
                type="date"
                {...register("endDate")}
                className={errors.endDate ? "border-red-500" : ""}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-status">Status</Label>
            <Select
              defaultValue={project.status}
              onValueChange={(value) => setValue("status", value as ProjectFormData["status"])}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="planning">Planning</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
