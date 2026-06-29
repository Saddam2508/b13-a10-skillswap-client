"use client";
const STATUS = {
  pending:  { label: "Pending",  className: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" },
  accepted: { label: "Accepted", className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
  rejected: { label: "Rejected", className: "bg-red-500/10 text-red-400 border-red-500/20" },
};

const fmt = (d) => d ? new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) : "N/A";

export default function MyProposalsView({ proposals = [] }) {
  if (!proposals.length)
    return (
      <div className="text-center py-20 border border-dashed border-zinc-800 rounded-2xl">
        <p className="text-zinc-500 text-sm">No proposals submitted yet.</p>
      </div>
    );

  return (
    <div className="overflow-x-auto rounded-2xl border border-white/[0.06]">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/[0.06] bg-white/[0.02]">
            {["Task Title", "Budget Bid", "Date Sent", "Status"].map((h) => (
              <th key={h} className="text-left text-xs text-zinc-500 uppercase tracking-wider px-5 py-3 font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/[0.04]">
          {proposals.map((p) => {
            const st = STATUS[p.status] || STATUS.pending;
            return (
              <tr key={p._id} className="hover:bg-white/[0.02] transition-colors">
                <td className="px-5 py-4 text-white font-medium">{p.taskTitle}</td>
                <td className="px-5 py-4 text-green-400 font-semibold">${p.proposedBudget}</td>
                <td className="px-5 py-4 text-zinc-400">{fmt(p.createdAt)}</td>
                <td className="px-5 py-4">
                  <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${st.className}`}>
                    {st.label}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}