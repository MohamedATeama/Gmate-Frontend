import { useState, memo } from "react";
import { useNavigate } from "react-router-dom";
import { CalendarDays, Trash2, Loader2 } from "lucide-react";
import EditTaskDialog from "@/components/tasks/EditTaskDialog";
import AssignTaskDialog from "@/components/tasks/AssignTaskDialog";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useDeleteTask } from "@/hooks/useDeleteTask";
import type { Task } from "@/types/project";

const getStatusStyles = (status: string) => {
  switch (status) {
    case "important":
      return "border-rose-500/20 text-rose-600 dark:text-rose-400 bg-rose-500/5 dark:bg-rose-500/10 shadow-[0_0_15px_rgba(244,63,94,0.1)]";
    case "inProgress":
      return "border-blue-500/20 text-blue-600 dark:text-blue-400 bg-blue-500/5 dark:bg-blue-500/10 shadow-[0_0_15px_rgba(59,130,246,0.1)]";
    case "upcoming":
      return "border-indigo-500/20 text-indigo-600 dark:text-indigo-400 bg-indigo-500/5 dark:bg-indigo-500/10 shadow-[0_0_15px_rgba(99,102,241,0.1)]";
    case "completed":
      return "border-emerald-500/20 text-emerald-600 dark:text-emerald-400 bg-emerald-500/5 dark:bg-emerald-500/10 shadow-[0_0_15px_rgba(16,185,129,0.1)]";
    default:
      return "border-slate-500/20 text-slate-600 dark:text-slate-400 bg-slate-500/5 dark:bg-slate-500/10";
  }
};

type TaskCardProps = {
  task: Task; 
};

function TaskCardComponent({ task }: TaskCardProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAssignOpen, setIsAssignOpen] = useState(false);
  const navigate = useNavigate();
  const { deleteTask, isPending: isDeleting } = useDeleteTask();
  
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteTask(task._id!);
  };

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task._id,
    data: {
      type: "Task",
      task,
    },
  });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <>
      <article
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        onClick={() => navigate(`/dashboard/tasks/${task._id}`)}
        className="universal-card group flex flex-col gap-4 hover:shadow-xl cursor-pointer"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 space-y-2 flex-1">
            <span
              className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[9px] font-black tracking-widest uppercase transition-all duration-500 ${getStatusStyles(
                task.status,
              )}`}
            >
              {task.status}
            </span>
            <h2 className="text-foreground line-clamp-2 text-base font-bold leading-tight group-hover:text-primary transition-colors">
              {task.title}
            </h2>
            <p className="text-muted-foreground line-clamp-2 text-[13px] font-medium leading-relaxed opacity-70">
              {task.description}
            </p>
          </div>
          <button 
            disabled={isDeleting}
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(e);
            }}
            className="bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
          >
            {isDeleting ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
          </button>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border/50 mt-auto">
          <div className="flex flex-col gap-1.5">
            <p className="text-muted-foreground flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider">
              <CalendarDays className="opacity-50 h-3.5 w-3.5" />
              <span>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No Due Date"}</span>
            </p>
            {task.assignee ? (
              <div className="flex items-center gap-2" title={`Assigned to ${task.assignee.name}`}>
                {task.assignee.avatar ? (
                  <img src={task.assignee.avatar.url} alt={task.assignee.name} className="h-5 w-5 rounded-full object-cover border border-border" />
                ) : (
                  <div className="h-5 w-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold shrink-0">
                    {task.assignee.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="text-[10px] font-bold text-slate-500 truncate max-w-[80px]">{task.assignee.name.split(" ")[0]}</span>
              </div>
            ) : (
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest opacity-60">Unassigned</span>
            )}
          </div>
          <div className="flex gap-2 items-center">
            <span 
              onClick={(e) => {
                e.stopPropagation();
                setIsAssignOpen(true);
              }}
              className="px-2 py-1 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-md cursor-pointer text-[10px] font-black uppercase tracking-wider hover:bg-indigo-100 dark:hover:bg-indigo-500/20 transition-all opacity-100 block"
            >
              Assign
            </span>
            <span 
              onClick={(e) => {
                e.stopPropagation();
                setIsEditOpen(true);
              }}
              className="text-primary cursor-pointer text-[10px] font-black uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-all"
            >
              Edit
            </span>
          </div>
        </div>
      </article>

      {isEditOpen && (
        <EditTaskDialog
          task={task}
          open={isEditOpen}
          onOpenChange={setIsEditOpen}
        />
      )}

      {isAssignOpen && task._id && (
        <AssignTaskDialog
          taskId={task._id}
          projectId={task.project}
          open={isAssignOpen}
          onOpenChange={setIsAssignOpen}
        />
      )}
    </>
  );
}

export default memo(TaskCardComponent);
