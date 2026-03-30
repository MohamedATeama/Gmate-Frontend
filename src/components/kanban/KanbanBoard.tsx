import { useState, useMemo, useEffect } from "react";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  defaultDropAnimationSideEffects,
} from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import type { Task, TaskStatus } from "@/types/project";
import { useNavigate } from "react-router-dom";
import { KanbanColumn } from "./KanbanColumn";
import { KanbanTaskCard } from "./KanbanTaskCard";
import { useKanbanBoard } from "@/hooks/kanban/useKanbanBoard";

interface Props {
  projectId?: string;
  tasks: Task[];
}

const COLUMNS: { id: TaskStatus; label: string }[] = [
  { id: "to-do", label: "To Do" },
  { id: "in-progress", label: "In Progress" },
  { id: "review", label: "In Review" },
  { id: "completed", label: "Completed" },
];

export default function KanbanBoard({ projectId, tasks }: Props) {
  const navigate = useNavigate();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setIsMounted(true), 0);
    return () => clearTimeout(t);
  }, []);

  const { activeTask, sensors, onDragStart, onDragEnd } = useKanbanBoard(projectId);

  const tasksByStatus = useMemo(() => {
    return COLUMNS.reduce(
      (acc, col) => {
        acc[col.id] = tasks.filter((t: Task) => t.status === col.id);
        return acc;
      },
      {} as Record<TaskStatus, Task[]>
    );
  }, [tasks]);

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        <div className="flex h-full w-full items-start gap-6 overflow-x-auto pb-6">
          <SortableContext
            items={COLUMNS.map((c) => c.id)}
            strategy={horizontalListSortingStrategy}
          >
            {COLUMNS.map((col) => (
              <KanbanColumn
                key={col.id}
                status={col.id}
                label={col.label}
                tasks={tasksByStatus[col.id] || []}
                onTaskClick={(task: Task) => navigate(`/dashboard/tasks/${task._id}`)}
              />
            ))}
          </SortableContext>
        </div>

        {isMounted &&
          createPortal(
            <DragOverlay
              dropAnimation={{
                sideEffects: defaultDropAnimationSideEffects({
                  styles: {
                    active: {
                      opacity: "0.5",
                    },
                  },
                }),
              }}
            >
              {activeTask ? <KanbanTaskCard task={activeTask} /> : null}
            </DragOverlay>,
            document.body
          )}
      </DndContext>
    </>
  );
}
