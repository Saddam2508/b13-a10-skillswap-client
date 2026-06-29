"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { TaskRow } from "../modal/TaskRow";
import { EditModal } from "../modal/EditModal";
import { DeleteModal } from "../modal/DeleteModal";
import { deleteTask } from "@/lib/actions/tasks";

export default function MyTasksView({ initialTasks = [] }) {
  const [tasks, setTasks] = useState(initialTasks);
  const [editTask, setEditTask] = useState(null);
  const [deleteTask_, setDeleteTask] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [toast, setToast] = useState(null);
  const router = useRouter();

  const counts = {
    all: tasks.length,
    open: tasks.filter((t) => t.status === "open").length,
    "in_progress": tasks.filter((t) => t.status === "in_progress").length,
    completed: tasks.filter((t) => t.status === "completed").length,
  };

  const filtered =
    activeTab === "all" ? tasks : tasks.filter((t) => t.status === activeTab);

  const handleSave = (updated) => {
    setTasks((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
    setEditTask(null);
    router.refresh();
  };

  const handleDeleteConfirm = async () => {
    setDeleting(true);
    try {
      const result = await deleteTask(deleteTask_._id);
      if (result?.error) throw new Error(result.error);
      setTasks((prev) => prev.filter((t) => t._id !== deleteTask_._id));
      setDeleteTask(null);
      setToast({ message: "Task deleted successfully.", type: "success" });
    } catch (err) {
      setToast({ message: err.message || "Delete failed.", type: "error" });
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      {/* Toast */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-[100] flex items-center gap-3 px-4 py-3 rounded-xl border shadow-xl text-sm font-medium transition-all ${
            toast.type === "success"
              ? "bg-zinc-900 border-emerald-500/30 text-emerald-400"
              : "bg-zinc-900 border-red-500/30 text-red-400"
          }`}
        >
          {toast.message}
          <button
            onClick={() => setToast(null)}
            className="ml-2 text-zinc-500 hover:text-white"
          >
            ✕
          </button>
        </div>
      )}
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">My Tasks</h2>
          <p className="text-sm text-zinc-500 mt-0.5">
            {tasks.length} task{tasks.length !== 1 && "s"} posted
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-1 bg-white/[0.03] border border-white/[0.06] rounded-xl p-1">
          {[
            { key: "all", label: "All" },
            { key: "open", label: "Open" },
            { key: "in_progress", label: "In Progress" },
            { key: "completed", label: "Completed" },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === key
                  ? "bg-violet-600 text-white"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {label}
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  activeTab === key ? "bg-white/20" : "bg-white/[0.06] text-zinc-500"
                }`}
              >
                {counts[key]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Task list */}
      {filtered.length > 0 ? (
        <div className="flex flex-col gap-3">
          {filtered.map((task) => (
            <TaskRow
              key={task._id}
              task={task}
              onEdit={setEditTask}
              onDelete={setDeleteTask}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border border-dashed border-zinc-800 rounded-2xl">
          <div className="w-14 h-14 rounded-full bg-zinc-800/80 flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-7 h-7 text-zinc-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
          <p className="text-zinc-500 text-sm">No tasks found.</p>
          {activeTab !== "all" && (
            <Button
              variant="light"
              size="sm"
              onPress={() => setActiveTab("all")}
              className="mt-3 text-violet-400 hover:text-violet-300 text-xs underline"
            >
              View all tasks
            </Button>
          )}
        </div>
      )}

      {/* Edit Modal */}
      {editTask && (
        <EditModal
          task={editTask}
          isOpen={!!editTask}
          onClose={() => setEditTask(null)}
          onSave={handleSave}
        />
      )}

      {/* Delete Modal */}
      {deleteTask_ && (
        <DeleteModal
          task={deleteTask_}
          isOpen={!!deleteTask_}
          onClose={() => setDeleteTask(null)}
          onConfirm={handleDeleteConfirm}
          deleting={deleting}
        />
      )}
    </>
  );
}