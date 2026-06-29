"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  blockUserAction,
  unblockUserAction,
} from "@/lib/actions/admin";

export default function UsersTable({ users: initialUsers }) {
  const router = useRouter();

  const [users, setUsers] = useState(initialUsers);
  const [loading, setLoading] = useState("");

  const handleBlock = async (id) => {
    try {
      setLoading(id);

      await blockUserAction(id);

      setUsers((prev) =>
        prev.map((user) =>
          user._id === id ? { ...user, isBlocked: true } : user
        )
      );

      router.refresh();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading("");
    }
  };

  const handleUnblock = async (id) => {
    try {
      setLoading(id);

      await unblockUserAction(id);

      setUsers((prev) =>
        prev.map((user) =>
          user._id === id ? { ...user, isBlocked: false } : user
        )
      );

      router.refresh();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading("");
    }
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">

      <div className="px-6 py-5 border-b border-white/10">
        <h2 className="text-xl font-semibold text-white">
          Manage Users
        </h2>

        <p className="text-zinc-400 text-sm mt-1">
          Block or unblock platform users.
        </p>
      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-zinc-900">

            <tr>

              <th className="text-left px-6 py-4 text-zinc-400">
                Name
              </th>

              <th className="text-left px-6 py-4 text-zinc-400">
                Email
              </th>

              <th className="text-left px-6 py-4 text-zinc-400">
                Role
              </th>

              <th className="text-left px-6 py-4 text-zinc-400">
                Status
              </th>

              <th className="text-center px-6 py-4 text-zinc-400">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {users.map((user) => (

              <tr
                key={user._id}
                className="border-t border-white/10"
              >

                <td className="px-6 py-5 text-white">
                  {user.name}
                </td>

                <td className="px-6 py-5 text-zinc-300">
                  {user.email}
                </td>

                <td className="px-6 py-5 capitalize text-zinc-300">
                  {user.role}
                </td>

                <td className="px-6 py-5">

                  {user.isBlocked ? (
                    <span className="px-3 py-1 rounded-full text-xs bg-red-500/20 text-red-400">
                      Blocked
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full text-xs bg-green-500/20 text-green-400">
                      Active
                    </span>
                  )}

                </td>

                <td className="px-6 py-5 text-center">

                  {user.isBlocked ? (

                    <button
                      onClick={() => handleUnblock(user._id)}
                      disabled={loading === user._id}
                      className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-500 text-white disabled:opacity-50"
                    >
                      {loading === user._id
                        ? "Loading..."
                        : "Unblock"}
                    </button>

                  ) : (

                    <button
                      onClick={() => handleBlock(user._id)}
                      disabled={loading === user._id}
                      className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white disabled:opacity-50"
                    >
                      {loading === user._id
                        ? "Loading..."
                        : "Block"}
                    </button>

                  )}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}