"use client";
import { useState } from "react";
import { Button, Input, TextArea } from "@heroui/react";
import { submitProposal } from "@/lib/actions/proposals";

export function ProposalForm({ task, freelancerEmail, onSuccess }) {
  const [form, setForm] = useState({
    proposedBudget: "",
    estimatedDays: "",
    coverNote: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (key) => (e) =>
    setForm((p) => ({ ...p, [key]: e?.target ? e.target.value : e }));

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
      if (result?.error || !result?.success) throw new Error(result?.message || "Failed.");
      onSuccess?.();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 border-t border-zinc-800 pt-6">
      <h3 className="text-white font-semibold mb-4">Submit a Proposal</h3>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Proposed Budget (USD)"
            type="number"
            value={form.proposedBudget}
            onChange={set("proposedBudget")}
            startContent={<span className="text-zinc-500 text-sm">$</span>}
            classNames={{
              input: "bg-transparent text-white",
              inputWrapper: "bg-zinc-800 border border-zinc-700 hover:border-violet-500 data-[focus=true]:border-violet-500 rounded-xl",
              label: "text-zinc-400 text-xs",
            }}
          />
          <Input
            label="Estimated Days"
            type="number"
            value={form.estimatedDays}
            onChange={set("estimatedDays")}
            classNames={{
              input: "bg-transparent text-white",
              inputWrapper: "bg-zinc-800 border border-zinc-700 hover:border-violet-500 data-[focus=true]:border-violet-500 rounded-xl",
              label: "text-zinc-400 text-xs",
            }}
          />
        </div>
        <TextArea
          label="Cover Note"
          value={form.coverNote}
          onChange={set("coverNote")}
          rows={4}
          placeholder="Describe why you're the best fit..."
          classNames={{
            input: "bg-transparent text-white placeholder-zinc-600",
            inputWrapper: "bg-zinc-800 border border-zinc-700 hover:border-violet-500 data-[focus=true]:border-violet-500 rounded-xl",
            label: "text-zinc-400 text-xs",
          }}
        />
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