import HeroBanner from "@/components/banner";
import LatestTasks from "@/components/tasks";
import { getTasks } from "@/lib/api/tasks";
export default async function Home() {
  const result = await getTasks("limit=6");
  const tasks = result?.data ?? [];

  return (
    <div className=" dark:bg-black">
      <HeroBanner />
      <LatestTasks tasks={tasks} showFilters={false} />
    </div>
  );
}
