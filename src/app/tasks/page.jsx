import LatestTasks from "@/components/tasks";
import { getTasks } from "@/lib/api/tasks";
import React from "react";

const AllTaskPage = async ({ searchParams }) => {
  const filters = await searchParams;
  const querySearch = new URLSearchParams(filters);
  const queryString = querySearch.toString();
  const result = await getTasks(queryString);
  const tasks = result?.data || [];
  console.log(tasks)
  const total = result?.total || 0;
  return (
    <div>
      <LatestTasks
        filters={filters}
        tasks={tasks}
        total={total}
        showFilters={true}
      />
    </div>
  );
};

export default AllTaskPage;
