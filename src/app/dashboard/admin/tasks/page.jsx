import TasksTable from "@/components/admin/tasks/TasksTable";
import { getTasks } from "@/lib/actions/admin";

export default async function TasksPage() {
  const tasks = await getTasks();

  return <TasksTable tasks={tasks} />;
}