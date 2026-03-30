import { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  Circle,
  MessageSquare,
  Send,
  UploadCloud,
  FileText,
  X,
} from "lucide-react";
import { useTask } from "@/hooks/useTask";
import { useUpdateTask } from "@/hooks/useUpdateTask";
import { useUploadAttachments } from "@/hooks/useUploadAttachments";
import { useDeleteAttachment } from "@/hooks/useDeleteAttachment";
import { useAddComment } from "@/hooks/useAddComment";
import { useUpdateComment } from "@/hooks/useUpdateComment";
import { useDeleteComment } from "@/hooks/useDeleteComment";
import { useUser } from "@/hooks/useUser";
import EditTaskDialog from "@/components/tasks/EditTaskDialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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

export default function TaskDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { task, isLoading } = useTask(id);
  const { updateTask, isPending: isUpdating } = useUpdateTask();
  const { uploadAttachments, isPending: isUploading } = useUploadAttachments();
  const { deleteAttachment, isPending: isDeletingAttachment } = useDeleteAttachment();
  const { addComment, isPending: isAddingComment } = useAddComment();
  const { updateComment, isPending: isUpdatingComment } = useUpdateComment();
  const { deleteComment, isPending: isDeletingComment } = useDeleteComment();
  const { user } = useUser();

  const handleUploadFiles = () => {
    if (!files.length) return;
    const formData = new FormData();
    files.forEach(f => formData.append("attachments", f));
    uploadAttachments(
      { taskId: task._id!, formData },
      { onSuccess: () => setFiles([]) }
    );
  };

  const isCompleted = task?.status === "completed";
  const [editingTask, setEditingTask] = useState<any | null>(null);
  const [newComment, setNewComment] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editingCommentText, setEditingCommentText] = useState("");

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!task) return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-center space-y-4">
      <h1 className="text-2xl font-bold">Task not found</h1>
      <Button onClick={() => navigate(-1)} variant="outline" className="rounded-full px-8">Go Back</Button>
    </div>
  );

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    addComment({ taskId: task._id!, text: newComment }, { onSuccess: () => setNewComment("") });
  };

  const handleUpdateComment = (commentId: string) => {
    if (!editingCommentText.trim()) return;
    updateComment({ taskId: task._id!, commentId, text: editingCommentText }, {
      onSuccess: () => {
        setEditingCommentId(null);
        setEditingCommentText("");
      }
    });
  };

  const handleToggleComplete = () => {
    updateTask({ id: task._id!, data: { status: isCompleted ? "to-do" : "completed" } });
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 md:p-8 space-y-10 animate-fade-in text-foreground">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="space-y-4">
          <button
            onClick={() => navigate(-1)}
            className="text-muted-foreground hover:text-primary flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest transition-colors"
          >
            <ArrowLeft size={14} /> Back to tasks
          </button>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className={`text-3xl sm:text-4xl font-black tracking-tight leading-none ${isCompleted ? "opacity-50 line-through" : ""}`}>
              {task.title}
            </h1>
            <Badge variant="outline" className={`px-3 py-0.5 text-[10px] font-black uppercase tracking-widest rounded-full transition-all duration-500 ${getStatusStyles(task.status)}`}>
              {task.status}
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Button variant="outline" onClick={() => setEditingTask(task)} className="rounded-xl flex-1 sm:flex-none font-bold">Edit Task</Button>
          {(user?.email === task?.createdBy?.email) && (
            <Button 
              onClick={handleToggleComplete}
              disabled={isUpdating}
              className={`rounded-xl flex-1 sm:flex-none font-bold shadow-lg transition-all ${isCompleted ? "bg-emerald-600 hover:bg-emerald-500" : "bg-primary hover:bg-indigo-500"}`}
            >
              {isCompleted ? <CheckCircle2 className="mr-2" size={18} /> : <Circle className="mr-2" size={18} />}
              {isCompleted ? "Completed" : "Complete"}
            </Button>
          )}
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-8 space-y-8">
          {/* Description */}
          <section className="bg-card border border-border p-8 rounded-4xl shadow-sm space-y-4">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Description</h3>
            <p className="text-foreground/80 text-base font-medium leading-relaxed italic">
              "{task.description}"
            </p>
          </section>

          {/* Attachments */}
          <section className="bg-card border border-border p-8 rounded-4xl shadow-sm space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
              <UploadCloud size={14} /> Attachments
            </h3>

            {task.attachments && task.attachments.length > 0 && (
              <div className="grid gap-3 sm:grid-cols-2 mb-4">
                {task.attachments.map((attachment: any, i: number) => {
                  // Fallback string extraction if backend saves objects
                  const url = typeof attachment === "string" ? attachment : attachment?.url || "";
                  const name = url.split('/').pop() || `Attachment ${i + 1}`;
                  const attachmentId = typeof attachment === "string" ? attachment : attachment?._id || attachment?.id;

                  if (!url) return null;
                  return (
                    <div key={`server-${i}`} className="flex items-center justify-between p-3 bg-primary/5 rounded-xl border border-primary/20 group">
                      <div className="flex items-center gap-3 overflow-hidden">
                        <FileText size={18} className="text-primary shrink-0 opacity-70" />
                        <a href={url} target="_blank" rel="noreferrer" className="text-[11px] font-bold truncate hover:underline hover:text-primary">
                          {name}
                        </a>
                      </div>
                      {attachmentId && (
                        <button 
                          onClick={() => deleteAttachment({ taskId: task._id!, attachmentId })}
                          disabled={isDeletingAttachment}
                          className="p-1 text-muted-foreground hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer disabled:opacity-50"
                        >
                          <X size={14} />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
            
            <div 
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => { e.preventDefault(); setIsDragging(false); if (e.dataTransfer.files) setFiles([...files, ...Array.from(e.dataTransfer.files)]); }}
              className={`border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center transition-all cursor-pointer ${isDragging ? "border-primary bg-primary/5" : "border-border hover:bg-muted/50"}`}
            >
              <UploadCloud className="text-muted-foreground mb-2" size={32} />
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest text-center">Drag files or click to upload</p>
              <input type="file" ref={fileInputRef} className="hidden" multiple onChange={(e) => e.target.files && setFiles([...files, ...Array.from(e.target.files)])} />
            </div>

            {files.length > 0 && (
              <div className="space-y-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  {files.map((f, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-muted/30 rounded-xl border border-border group hover:border-primary/30 transition-all">
                      <div className="flex items-center gap-3 overflow-hidden">
                        <FileText size={18} className="text-primary shrink-0" />
                        <span className="text-[11px] font-bold truncate">{f.name}</span>
                      </div>
                      <button onClick={() => setFiles(files.filter((_, idx) => idx !== i))} className="p-1 text-muted-foreground hover:text-rose-500"><X size={14} /></button>
                    </div>
                  ))}
                </div>
                <div className="flex justify-end pt-2 border-t border-border/50">
                  <Button 
                    onClick={handleUploadFiles} 
                    disabled={isUploading}
                    className="font-bold rounded-xl text-[10px] uppercase tracking-widest px-8 shadow-lg h-11"
                  >
                    {isUploading ? "Uploading..." : `Upload ${files.length} File${files.length > 1 ? "s" : ""}`}
                  </Button>
                </div>
              </div>
            )}
          </section>

          {/* Comments */}
          <section className="bg-card border border-border p-8 rounded-4xl shadow-sm space-y-8">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
              <MessageSquare size={14} /> Discussion ({task.comments?.length || 0})
            </h3>
            
            <div className="space-y-6 max-h-60 overflow-y-auto">
              {task.comments?.map((c: any) => {
                const authorName = c.createdBy.name;
                const authorInitial = authorName.split(" ")[0][0]?.toUpperCase() || "U";
                const text = c.text || c.content || "";
                const authorEmail = c.createdBy.email;
                const time = c.createdAt ? new Date(c.createdAt).toLocaleDateString() : "Just now";

                return (
                  <div key={c._id || c.id} className="group flex gap-4">
                    <div className="bg-primary/10 border-primary/20 text-primary flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-[10px] font-black">
                      {authorInitial}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-black tracking-widest uppercase">
                            {authorName}
                          </span>
                          <span className="text-muted-foreground text-[10px] font-bold">
                            {time}
                          </span>
                        </div>
                        {user?.email === authorEmail && (
                          <div className="flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                            <button
                              onClick={() => {
                                setEditingCommentId(c._id);
                                setEditingCommentText(text);
                              }}
                              className="text-[10px] font-bold tracking-widest text-indigo-500 uppercase hover:text-indigo-400"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() =>
                                deleteComment({
                                  taskId: task._id!,
                                  commentId: c._id,
                                })
                              }
                              disabled={isDeletingComment}
                              className="text-[10px] font-bold tracking-widest text-rose-500 uppercase hover:text-rose-400"
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                      {editingCommentId === c._id ? (
                        <div className="mt-2 flex gap-2">
                          <input
                            value={editingCommentText}
                            onChange={(e) =>
                              setEditingCommentText(e.target.value)
                            }
                            onKeyDown={(e) =>
                              e.key === "Enter" && handleUpdateComment(c._id)
                            }
                            className="bg-muted/30 border-border flex-1 rounded-lg border px-3 py-1.5 text-sm outline-none"
                            autoFocus
                          />
                          <Button
                            size="sm"
                            onClick={() => handleUpdateComment(c._id)}
                            disabled={isUpdatingComment}
                            className="h-8"
                          >
                            Save
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setEditingCommentId(null)}
                            className="h-8"
                          >
                            Cancel
                          </Button>
                        </div>
                      ) : (
                        <div className="bg-muted/50 rounded-2xl rounded-tl-sm p-4 text-sm leading-relaxed font-medium">
                          {text}
                        </div>
                      )}
                    </div>
                  </div>
                );})}
            </div>

            {(user?.email === task?.createdBy?.email) && (
              <div className="flex gap-3 pt-4 border-t border-border/50">
                <input 
                  value={newComment}
                  onChange={e => setNewComment(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleAddComment()}
                  placeholder="Write a message..."
                  className="flex-1 bg-muted/30 border border-border rounded-xl px-4 py-2.5 text-sm font-medium outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
                <Button 
                  onClick={handleAddComment}
                  disabled={isAddingComment || !newComment.trim()}
                  className="rounded-xl h-11 px-6 font-black uppercase tracking-widest shadow-lg shadow-indigo-500/20"
                >
                  <Send size={16} />
                </Button>
              </div>
            )}
          </section>
        </div>

        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-8">
          <div className="bg-card border border-border p-8 rounded-4xl shadow-sm space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Properties</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-border/50">
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Due Date</span>
                <span className="text-xs font-black">{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No Due Date"}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-border/50">
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Priority</span>
                <Badge variant="secondary" className="rounded-md font-bold uppercase text-[9px] tracking-widest">{task.priority}</Badge>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-border/50">
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Status</span>
                <Badge variant="outline" className={`rounded-full font-bold uppercase text-[9px] tracking-widest ${getStatusStyles(task.status)}`}>{task.status}</Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      {editingTask && (
        <EditTaskDialog
          task={editingTask}
          open={!!editingTask}
          onOpenChange={(open) => !open && setEditingTask(null)}
        />
      )}
    </div>
  );
}
