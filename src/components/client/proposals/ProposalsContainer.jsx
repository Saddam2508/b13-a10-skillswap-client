"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { rejectProposal } from "@/lib/actions/proposals";


export default function ProposalsContainer({ proposals }) {
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleAccept = async (proposal) => {
    setError("");
    setLoading(proposal._id);
    try {
      router.push(
        `/payment/checkout?proposalId=${proposal._id}&amount=${proposal.proposedBudget}&taskId=${proposal.task._id}`,
      );
    } catch (err) {
      setError(err.message || "Already accepted a proposal for this task");
    } finally {
      setLoading(null);
    }
  };

  const handleReject = async (id) => {
    setLoading(id);
    try {
      await rejectProposal(id);
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(null);
    }
  };

  if (proposals.length === 0) {
    return (
      <div className="text-center py-20 border border-dashed border-zinc-800 rounded-2xl">
        <p className="text-zinc-500">No proposals received yet.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {error && (
        <div className="p-3 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl">
          {error}
        </div>
      )}

      {proposals.map((proposal) => (
        <div
          key={proposal._id}
          className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
        >
          {/* Task Title */}
          <div className="mb-4">
            <span className="text-xs text-zinc-500 uppercase tracking-widest">
              Task
            </span>
            <h3 className="text-white font-semibold mt-1">
              {proposal.task?.title || "Unknown Task"}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            {/* Freelancer */}
            <div>
              <span className="text-xs text-zinc-500 uppercase tracking-widest block mb-1">
                Freelancer
              </span>
              <p className="text-white text-sm font-medium">
                {proposal.freelancerEmail}
              </p>
            </div>

            {/* Budget */}
            <div>
              <span className="text-xs text-zinc-500 uppercase tracking-widest block mb-1">
                Proposed Budget
              </span>
              <p className="text-green-400 font-semibold">
                ${proposal.proposedBudget} USD
              </p>
            </div>

            {/* Days */}
            <div>
              <span className="text-xs text-zinc-500 uppercase tracking-widest block mb-1">
                Completion Days
              </span>
              <p className="text-white text-sm">
                {proposal.estimatedDays} days
              </p>
            </div>
          </div>

          {/* Cover Note */}
          <div className="mb-5">
            <span className="text-xs text-zinc-500 uppercase tracking-widest block mb-1">
              Message
            </span>
            <p className="text-zinc-400 text-sm leading-relaxed">
              {proposal.coverNote}
            </p>
          </div>

          {/* Status & Actions */}
          <div className="flex items-center justify-between border-t border-white/10 pt-4">
            {/* Status Badge */}
            <span
              className={`text-xs px-3 py-1 rounded-full border font-medium ${
                proposal.status === "accepted"
                  ? "bg-green-500/10 text-green-400 border-green-500/20"
                  : proposal.status === "rejected"
                    ? "bg-red-500/10 text-red-400 border-red-500/20"
                    : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
              }`}
            >
              {proposal.status === "accepted"
                ? "Accepted"
                : proposal.status === "rejected"
                  ? "Rejected"
                  : "Pending"}
            </span>

            {/* Buttons — শুধু pending হলে দেখাবে */}
            {proposal.status === "pending" && (
              <div className="flex gap-3">
                <button
                  onClick={() => handleReject(proposal._id)}
                  disabled={loading === proposal._id}
                  className="px-4 py-2 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 text-sm transition-all disabled:opacity-50"
                >
                  {loading === proposal._id ? "..." : "Reject"}
                </button>
                <button
                  onClick={() => handleAccept(proposal)}
                  disabled={loading === proposal._id}
                  className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm transition-all disabled:opacity-50"
                >
                  {loading === proposal._id ? "..." : "Accept"}
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
