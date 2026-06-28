
import MyTasksView from "@/components/client/tasks/MyTasksView";
import { getMyTasks } from "@/lib/api/tasks";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function MyTasksPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const email = session?.user?.email;

  const result = await getMyTasks(email);
  const tasks = result?.data || [];
console.log(tasks)
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <MyTasksView initialTasks={tasks} />
    </div>
  );
}