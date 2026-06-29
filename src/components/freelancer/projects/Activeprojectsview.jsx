"use client";
import { useState } from "react";
import { Button } from "@heroui/react";
import { submitDeliverable } from "@/lib/actions/tasks";
import { useRouter } from "next/navigation";

const fmt = (d) => d ? new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) : "N/A";

function DeliverableModal({ task, onClose, onSubmit }) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handle = async () => {
    if (!url.trim()) return setError("Please enter a deliverable URL.");
    setLoading(true);
    try {
      const result = await submitDeliverable(task._id, url);
      if (result?.error) throw new Error(result.message);
      onSubmit(task._id);
    } catch (err) {
      setError(err.message || "Failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-2xl">
        <h3 className="text-white font-semibold mb-1">Submit Deliverable</h3>
        <p className="text-zinc-400 text-sm mb-5">Enter the link to your work (GitHub, Docs, etc.)</p>
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://github.com/..."
          className="w-full bg-zinc-800 border border-zinc-700 focus:border-violet-500 rounded-xl text-white text-sm px-4 py-2.5 outline-none transition-colors mb-3"
        />
        {error && <p className="text-red-400 text-xs mb-3">{error}</p>}
        <div className="flex gap-2 justify-end">
          <Button variant="flat" onPress={onClose} className="text-zinc-400">Cancel</Button>
          <Button onPress={handle} isLoading={loading} className="bg-violet-600 text-white rounded-xl">
            Mark as Completed
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function ActiveProjectsView({ activeTasks = [], completedTasks = [] }) {
  const [submittingTask, setSubmittingTask] = useState(null);
  const [localActive, setLocalActive] = useState(activeTasks);
  const [localCompleted, setLocalCompleted] = useState(completedTasks);
  const router = useRouter();

  const handleSubmit = (taskId) => {
    const task = localActive.find((t) => t._id === taskId);
    setLocalActive((p) => p.filter((t) => t._id !== taskId));
    if (task) setLocalCompleted((p) => [{ ...task, status: "completed", deliverable_url: submittingTask?.url }, ...p]);
    setSubmittingTask(null);
    router.refresh();
  };

  return (
    <>
      {/* Active */}
      <section className="mb-10">
        <h2 className="text-lg font-bold text-white mb-4">
          Active Projects
          <span className="ml-2 text-sm font-normal text-zinc-500">({localActive.length})</span>
        </h2>
        {localActive.length > 0 ? (
          <div className="flex flex-col gap-3">
            {localActive.map((task) => (
              <div key={task._id} className="flex flex-col sm:flex-row sm:items-center gap-4 px-5 py-4 rounded-2xl border border-blue-500/20 bg-blue-500/[0.03]">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{task.title}</p>
                  <p className="text-xs text-zinc-500 mt-0.5">{task.category} · Deadline: {fmt(task.deadline)}</p>
                </div>
                <div className="text-center shrink-0">
                  <p className="text-xs text-zinc-600 mb-0.5">Budget</p>
                  <p className="text-sm font-semibold text-green-400">${task.budget}</p>
                </div>
                <Button
                  size="sm"
                  onPress={() => setSubmittingTask(task)}
                  className="bg-violet-600 hover:bg-violet-500 text-white rounded-xl text-xs font-medium shrink-0"
                >
                  Submit Deliverable
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 border border-dashed border-zinc-800 rounded-2xl">
            <p className="text-zinc-500 text-sm">No active projects.</p>
          </div>
        )}
      </section>

      {/* Completed */}
      <section>
        <h2 className="text-lg font-bold text-white mb-4">
          Completed Projects
          <span className="ml-2 text-sm font-normal text-zinc-500">({localCompleted.length})</span>
        </h2>
        {localCompleted.length > 0 ? (
          <div className="flex flex-col gap-3">
            {localCompleted.map((task) => (
              <div key={task._id} className="flex flex-col sm:flex-row sm:items-center gap-4 px-5 py-4 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{task.title}</p>
                  <p className="text-xs text-zinc-500 mt-0.5">{task.category}</p>
                </div>
                <div className="text-center shrink-0">
                  <p className="text-xs text-zinc-600 mb-0.5">Earned</p>
                  <p className="text-sm font-semibold text-green-400">${task.budget}</p>
                </div>
                {task.deliverable_url && (
                  <a
                    href={task.deliverable_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-violet-400 hover:text-violet-300 underline shrink-0"
                  >
                    View Deliverable →
                  </a>
                )}
                <span className="inline-flex items-center rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400 shrink-0">
                  Completed
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 border border-dashed border-zinc-800 rounded-2xl">
            <p className="text-zinc-500 text-sm">No completed projects yet.</p>
          </div>
        )}
      </section>

      {submittingTask && (
        <DeliverableModal
          task={submittingTask}
          onClose={() => setSubmittingTask(null)}
          onSubmit={handleSubmit}
        />
      )}
    </>
  );
}