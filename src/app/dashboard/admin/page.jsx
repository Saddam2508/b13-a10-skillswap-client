import AdminStats from "@/components/admin/dashboard/AdminStats";
import { getAdminDashboardStats } from "@/lib/api/admin";

export default async function AdminDashboard() {
  const result = await getAdminDashboardStats();
const stats = result.data
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">
          Admin Dashboard
        </h1>

        <p className="text-zinc-400 mt-2">
          Platform overview and statistics.
        </p>
      </div>

      <AdminStats stats={stats} />
    </div>
  );
}