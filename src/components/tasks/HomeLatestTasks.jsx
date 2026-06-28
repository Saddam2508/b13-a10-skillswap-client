import TaskCard from "@/components/card/TaskCard";
import { getTasks } from "@/lib/api/tasks";
import Link from "next/link";

export default async function HomeLatestTasks() {
  let tasks = [];

  try {
    const result = await getTasks("limit=6");
    tasks = result?.data ?? [];
  } catch (error) {
    console.error("Failed to fetch tasks:", error);
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      {/* Heading */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-white mb-2">
          Latest Featured Tasks
        </h2>
        <p className="text-zinc-400">
          Browse the most recent open tasks from our clients
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map((task) => (
          <TaskCard key={task._id} task={task} />
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <Link
          href="/tasks"
          className="px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium transition-all duration-300"
        >
          View All Tasks
        </Link>
      </div>
    </section>
  );
}
