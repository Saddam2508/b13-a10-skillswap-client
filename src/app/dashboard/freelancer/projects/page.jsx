
import ActiveProjectsView from "@/components/freelancer/projects/Activeprojectsview";
import { getActiveTasks, getCompletedTasks } from "@/lib/api/tasks";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function ActiveProjectsPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const email = session?.user?.email;

  const [activeResult, completedResult] = await Promise.all([
    getActiveTasks(email),
    getCompletedTasks(email),
  ]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <ActiveProjectsView
        activeTasks={activeResult?.data || []}
        completedTasks={completedResult?.data || []}
      />
    </div>
  );
}