import TaskCard from "@/components/card/TaskCard";
import { getTasks } from "@/lib/api/tasks";

export default async function HomeLatestTasks() {
  let tasks = [];

  try {
    const result = await getTasks("limit=6");
    tasks = result?.data ?? [];
  } catch (error) {
    console.error("Failed to fetch tasks:", error);
  }

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} />
      ))}
    </div>
  );
}
