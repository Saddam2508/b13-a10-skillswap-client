"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { submitProposal } from "@/lib/actions/proposals";

const inputCls = "w-full bg-zinc-800 border border-zinc-700 focus:border-violet-500 rounded-xl text-white text-sm px-4 py-2.5 outline-none transition-colors placeholder-zinc-600";
const labelCls = "block text-xs text-zinc-400 mb-1.5";

export function ProposalForm({ task, freelancerEmail, onSuccess }) {
  const [form, setForm] = useState({
    proposedBudget: "",
    estimatedDays: "",
    coverNote: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  const set = (key) => (e) => setForm((p) => ({ ...p, [key]: e.target.value }));

  const handleSubmit = async () => {
    setError("");
    if (!form.proposedBudget || !form.estimatedDays || !form.coverNote.trim()) {
      setError("Please fill all fields.");
      return;
    }
    setLoading(true);
    try {
      const result = await submitProposal({
        taskId: task._id,
        freelancerEmail,
        proposedBudget: Number(form.proposedBudget),
        estimatedDays: Number(form.estimatedDays),
        coverNote: form.coverNote,
      });
      if (!result?.success) throw new Error(result?.message || "Failed.");
      setSubmitted(true);
      onSuccess?.();
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-6">
        <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-3">
          <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-emerald-400 font-semibold">Proposal Submitted!</p>
        <p className="text-zinc-500 text-sm mt-1">You can track it in your proposals dashboard.</p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-white font-semibold mb-4">Submit a Proposal</h3>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelCls}>Proposed Budget (USD)</label>
            <input
              type="number"
              className={inputCls}
              value={form.proposedBudget}
              onChange={set("proposedBudget")}
              placeholder="e.g. 300"
            />
          </div>
          <div>
            <label className={labelCls}>Estimated Days</label>
            <input
              type="number"
              className={inputCls}
              value={form.estimatedDays}
              onChange={set("estimatedDays")}
              placeholder="e.g. 7"
            />
          </div>
        </div>

        <div>
          <label className={labelCls}>Cover Note</label>
          <textarea
            className={`${inputCls} resize-none`}
            value={form.coverNote}
            onChange={set("coverNote")}
            rows={4}
            placeholder="Describe why you're the best fit..."
          />
        </div>

        {error && (
          <p className="text-red-400 text-xs bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">
            {error}
          </p>
        )}

        <Button
          onPress={handleSubmit}
          isLoading={loading}
          className="w-full bg-violet-600 hover:bg-violet-500 text-white font-medium rounded-xl py-3"
        >
          Submit Proposal
        </Button>
      </div>
    </div>
  );
}