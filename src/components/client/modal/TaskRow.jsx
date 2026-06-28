import {
  Button,
  Chip,
} from "@heroui/react";


const STATUS = {
  open: { label: "Open", color: "success" },
  "in-progress": { label: "In Progress", color: "primary" },
  completed: { label: "Completed", color: "default" },
};


const fmt = (d) =>
  d
    ? new Date(d).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "N/A";

export function TaskRow({ task, onEdit, onDelete }) {
  const st = STATUS[task.status] || STATUS.open;
  const canEdit = task.status === "open";
  const canDelete = task.status !== "in-progress";

  return (
    <div className="group flex flex-col sm:flex-row sm:items-center gap-4 px-5 py-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-violet-500/20 transition-all duration-200">
      {/* Title + meta */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs text-zinc-500">{task.category}</span>
          <span className="text-zinc-700 text-xs">·</span>
          <span className="text-xs text-zinc-600">{fmt(task.createdAt)}</span>
        </div>
        <p className="text-sm font-medium text-white truncate group-hover:text-violet-300 transition-colors">
          {task.title}
        </p>
        <p className="text-xs text-zinc-500 mt-0.5 line-clamp-1">
          {task.description}
        </p>
      </div>

      {/* Budget + Deadline */}
      <div className="flex items-center gap-6 shrink-0 text-center">
        <div>
          <p className="text-[10px] text-zinc-600 uppercase tracking-wider mb-0.5">
            Budget
          </p>
          <p className="text-sm font-semibold text-green-400">${task.budget}</p>
        </div>
        <div>
          <p className="text-[10px] text-zinc-600 uppercase tracking-wider mb-0.5">
            Deadline
          </p>
          <p className="text-sm text-zinc-300">{fmt(task.deadline)}</p>
        </div>
      </div>

      {/* Status chip */}
      <Chip
        color={st.color}
        variant="flat"
        size="sm"
        className={{ base: "shrink-0", content: "text-xs font-medium" }}
      >
        {st.label}
      </Chip>

      {/* Actions */}
      <div className="flex items-center gap-2 shrink-0">
        <Button
          isIconOnly
          size="sm"
          variant="flat"
          isDisabled={!canEdit}
          onPress={() => canEdit && onEdit(task)  }
          title={canEdit ? "Edit task" : "Only open tasks can be edited"}
          className={
            canEdit
              ? "border border-zinc-700 text-zinc-400 hover:border-violet-500/60 hover:text-violet-400 bg-transparent rounded-xl"
              : "border border-zinc-800 text-zinc-700 bg-transparent rounded-xl cursor-not-allowed"
          }
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        </Button>

        <Button
          isIconOnly
          size="sm"
          variant="flat"
          isDisabled={!canDelete}
          onPress={() => canDelete && onDelete(task)}
          title={
            canDelete
              ? "Delete task"
              : "Cannot delete — a proposal has been approved"
          }
          className={
            canDelete
              ? "border border-zinc-700 text-zinc-400 hover:border-red-500/60 hover:text-red-400 bg-transparent rounded-xl"
              : "border border-zinc-800 text-zinc-700 bg-transparent rounded-xl cursor-not-allowed"
          }
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </Button>
      </div>
    </div>
  );
}