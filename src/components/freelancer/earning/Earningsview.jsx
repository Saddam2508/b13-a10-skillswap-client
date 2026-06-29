"use client";
const fmt = (d) => d ? new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) : "N/A";

export default function EarningsView({ tasks = [] }) {
  const total = tasks.reduce((sum, t) => sum + (t.budget || 0), 0);

  return (
    <>
      {/* Summary */}
      <div className="mb-6 inline-flex items-center gap-3 bg-white/[0.03] border border-white/[0.06] rounded-2xl px-6 py-4">
        <div>
          <p className="text-xs text-zinc-500 uppercase tracking-wider">Total Earned</p>
          <p className="text-2xl font-bold text-green-400">${total.toLocaleString()}</p>
        </div>
      </div>

      {tasks.length > 0 ? (
        <div className="overflow-x-auto rounded-2xl border border-white/[0.06]">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                {["Task Title", "Client", "Amount", "Completion Date"].map((h) => (
                  <th key={h} className="text-left text-xs text-zinc-500 uppercase tracking-wider px-5 py-3 font-medium">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {tasks.map((t) => (
                <tr key={t._id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-5 py-4 text-white font-medium">{t.title}</td>
                  <td className="px-5 py-4 text-zinc-400">{t.client_name || "—"}</td>
                  <td className="px-5 py-4 text-green-400 font-semibold">${t.budget}</td>
                  <td className="px-5 py-4 text-zinc-400">{fmt(t.completedAt || t.updatedAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-20 border border-dashed border-zinc-800 rounded-2xl">
          <p className="text-zinc-500 text-sm">No earnings yet.</p>
        </div>
      )}
    </>
  );
}