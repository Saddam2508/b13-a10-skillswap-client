import LatestTasks from "@/components/tasks";
import { getTasks } from "@/lib/api/tasks";
import React from "react";

const AllTaskPage = async ({ searchParams }) => {
  const filters = await searchParams;
  const querySearch = new URLSearchParams(filters);
  const queryString = querySearch.toString();
  console.log(querySearch, queryString, filters);
  const { tasks, total } = await getTasks(queryString);
  console.log(tasks);
  return (
    <div>
      <LatestTasks filters={filters} tasks={tasks || []} total={total} />
    </div>
  );
};

export default AllTaskPage;
