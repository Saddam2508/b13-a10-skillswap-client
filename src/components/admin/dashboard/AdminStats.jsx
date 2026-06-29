import StatCard from "./StatCard";

export default function AdminStats({ stats }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      <StatCard
        title="Total Users"
        value={stats.totalUsers}
        color="text-sky-400"
      />

      <StatCard
        title="Total Tasks"
        value={stats.totalTasks}
        color="text-violet-400"
      />

      <StatCard
        title="Total Revenue"
        value={`$${stats.totalRevenue}`}
        color="text-green-400"
      />

      <StatCard
        title="Active Tasks"
        value={stats.activeTasks}
        color="text-yellow-400"
      />

    </div>
  );
}