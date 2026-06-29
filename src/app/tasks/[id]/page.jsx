import { getTaskById } from "@/lib/api/tasks";
import { checkProposalExists } from "@/lib/api/proposals";
import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { ProposalForm } from "@/components/freelancer/proposals/ProposalForm";


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
    month: "long",
    day: "numeric",
  });
};

export default async function TaskDetailsPage({ params }) {
  const { id } = await params;
  let task = null;

  try {
    const result = await getTaskById(id);
    task = result?.data;
  } catch (error) {
    console.error("Failed to fetch task:", error);
  }

  if (!task) return notFound();

  // ── session check ──────────────────────────────────────────────────────────
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;
  const isFreelancer = user?.role === "freelancer";
  const isTaskOpen = task.status === "open";

  let alreadyApplied = false;
  if (isFreelancer && isTaskOpen) {
    const check = await checkProposalExists(task._id, user.email);
    alreadyApplied = check?.exists;
  }

  return (
    <div className="dark:bg-black min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/tasks"
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-white text-sm mb-8 transition-colors"
        >
          ← Back to Tasks
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left — Main Content */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Title Card */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${categoryColors[task.category] || categoryColors["Other"]}`}>
                  {task.category}
                </span>
                <span className="text-xs px-3 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                  {task.status || "Open"}
                </span>
              </div>

              <h1 className="text-2xl font-bold text-white mb-4">{task.title}</h1>

              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-600 text-sm font-bold text-white">
                  {task.client_name?.[0]?.toUpperCase() || "C"}
                </div>
                <div>
                  <p className="text-sm text-white font-medium">{task.client_name || "Anonymous"}</p>
                  <p className="text-xs text-zinc-500">{task.client_email}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Task Description</h2>
              <p className="text-zinc-400 leading-relaxed whitespace-pre-line">{task.description}</p>
            </div>

            {/* ── Proposal Section ─────────────────────────────────────────── */}
            {!user && (
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center">
                <p className="text-zinc-400 text-sm mb-3">
                  Want to work on this task?
                </p>
                <Link
                  href="/auth/signin"
                  className="inline-block px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium transition-colors"
                >
                  Sign in to Submit a Proposal
                </Link>
              </div>
            )}

            {user && !isFreelancer && (
              <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/[0.03] p-4">
                <p className="text-yellow-400 text-sm">
                  Only freelancer accounts can submit proposals.
                </p>
              </div>
            )}

            {isFreelancer && isTaskOpen && alreadyApplied && (
              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.03] p-4">
                <p className="text-emerald-400 text-sm">
                  ✓ You have already submitted a proposal for this task.
                </p>
              </div>
            )}

            {isFreelancer && isTaskOpen && !alreadyApplied && (
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <ProposalForm
                  task={task}
                  freelancerEmail={user.email}
                />
              </div>
            )}

            {isFreelancer && !isTaskOpen && (
              <div className="rounded-2xl border border-zinc-700 bg-white/[0.02] p-4">
                <p className="text-zinc-500 text-sm">
                  This task is no longer accepting proposals.
                </p>
              </div>
            )}
          </div>

          {/* Right — Sidebar */}
          <div className="flex flex-col gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 flex flex-col gap-4">
              <div>
                <p className="text-xs text-zinc-500 uppercase tracking-widest mb-1">Budget</p>
                <p className="text-2xl font-bold text-green-400">
                  ${task.budget}{" "}
                  <span className="text-sm text-zinc-500">USD</span>
                </p>
              </div>
              <div className="border-t border-white/10 pt-4">
                <p className="text-xs text-zinc-500 uppercase tracking-widest mb-1">Deadline</p>
                <p className="text-white font-medium">{formatDate(task.deadline)}</p>
              </div>
              <div className="border-t border-white/10 pt-4">
                <p className="text-xs text-zinc-500 uppercase tracking-widest mb-1">Posted On</p>
                <p className="text-white font-medium">{formatDate(task.createdAt)}</p>
              </div>
            </div>

            <Link
              href="/tasks"
              className="w-full py-3 rounded-xl border border-zinc-700 hover:border-zinc-500 text-zinc-400 hover:text-white font-medium text-sm text-center transition-all duration-300"
            >
              Browse More Tasks
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}