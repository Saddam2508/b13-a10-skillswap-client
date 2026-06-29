
import EarningsView from "@/components/freelancer/earning/Earningsview";
import { getCompletedTasks } from "@/lib/api/tasks";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function EarningsPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const email = session?.user?.email;
  const result = await getCompletedTasks(email);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">My Earnings</h2>
        <p className="text-sm text-zinc-500 mt-0.5">Completed task payment breakdown</p>
      </div>
      <EarningsView tasks={result?.data || []} />
    </div>
  );
}