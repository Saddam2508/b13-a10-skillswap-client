import TaskCard from "@/components/card/TaskCard";

export default async function HomeLatestTasks() {
  const result = await getTasks(queryString);
  const tasks = result?.data || [];

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} />
      ))}
    </div>
  );
}
