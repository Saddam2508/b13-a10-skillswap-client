"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteTaskAction } from "@/lib/actions/admin";

export default function TasksTable({ tasks: initialTasks }) {
  const [tasks, setTasks] = useState(initialTasks);
  const [loading, setLoading] = useState("");

  const router = useRouter();

  const handleDelete = async (id) => {
    if (!confirm("Delete this task?")) return;

    try {
      setLoading(id);

      await deleteTaskAction(id);

      setTasks((prev) => prev.filter((task) => task._id !== id));

      router.refresh();
    } finally {
      setLoading("");
    }
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">

      <div className="px-6 py-5 border-b border-white/10">
        <h2 className="text-xl font-semibold text-white">
          Manage Tasks
        </h2>
      </div>

      <table className="w-full">

        <thead className="bg-zinc-900">

          <tr>
            <th className="px-5 py-4 text-left">Title</th>
            <th className="px-5 py-4 text-left">Client</th>
            <th className="px-5 py-4 text-left">Budget</th>
            <th className="px-5 py-4 text-left">Status</th>
            <th className="px-5 py-4 text-center">Action</th>
          </tr>

        </thead>

        <tbody>

          {tasks.map((task) => (

            <tr
              key={task._id}
              className="border-t border-white/10"
            >

              <td className="px-5 py-4">
                {task.title}
              </td>

              <td className="px-5 py-4">
                {task.client_email}
              </td>

              <td className="px-5 py-4">
                ${task.budget}
              </td>

              <td className="px-5 py-4 capitalize">
                {task.status}
              </td>

              <td className="px-5 py-4 text-center">

                <button
                  onClick={() => handleDelete(task._id)}
                  disabled={loading === task._id}
                  className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-500 disabled:opacity-50"
                >
                  {loading === task._id
                    ? "Deleting..."
                    : "Delete"}
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}