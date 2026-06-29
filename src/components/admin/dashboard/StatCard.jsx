export default function StatCard({
  title,
  value,
  color,
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">

      <p className="text-zinc-500 text-sm uppercase tracking-wider">
        {title}
      </p>

      <h2
        className={`mt-3 text-4xl font-bold ${color}`}
      >
        {value}
      </h2>

    </div>
  );
}