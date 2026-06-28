import Link from "next/link";

const categoryColors = {
  Design: "bg-pink-500/10 text-pink-400 border-pink-500/20",
  Writing: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Development: "bg-violet-500/10 text-violet-400 border-violet-500/20",
  Marketing: "bg-green-500/10 text-green-400 border-green-500/20",
  Other: "bg-orange-500/10 text-orange-400 border-orange-500/20",
};

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export default function TaskCard({ task }) {
  return (
    <Link href={`/tasks/${task._id}`}>
      <div className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 hover:border-violet-500/30 hover:bg-white/[0.06]">
        {/* Hover Glow */}
        <div className="absolute bottom-0 right-0 h-32 w-32 rounded-full bg-violet-500/0 blur-2xl transition-all duration-300 group-hover:bg-violet-500/10" />

        {/* Category Badge */}
        <div className="mb-4 flex items-center justify-between">
          <span
            className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${
              categoryColors[task.category] || categoryColors["Other"]
            }`}
          >
            {task.category}
          </span>
          <span className="text-xs text-gray-500">{task.status || "Open"}</span>
        </div>

        {/* Task Title */}
        <h3 className="mb-3 line-clamp-2 text-base font-semibold leading-snug text-white transition group-hover:text-violet-300">
          {task.title}
        </h3>

        {/* Client Name */}
        <div className="mb-4 flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-600 text-xs font-bold text-white">
            {task.client_name?.[0]?.toUpperCase() || "C"}
          </div>
          <span className="text-sm text-gray-400">
            {task.client_name || "Anonymous"}
          </span>
        </div>

        {/* Budget & Deadline */}
        <div className="flex items-center justify-between border-t border-white/10 pt-4">
          <div className="flex items-center gap-1.5 text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-green-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="font-semibold text-green-400">${task.budget}</span>
            <span className="text-gray-500">USD</span>
          </div>

          <div className="flex items-center gap-1.5 text-sm text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            {formatDate(task.deadline)}
          </div>
        </div>
      </div>
    </Link>
  );
}
