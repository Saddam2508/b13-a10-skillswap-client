"use client";
import React from "react";
import { useSession } from "@/lib/auth-client";
import {
  Briefcase,
  Thunderbolt,
  CircleCheck,
  CircleDollar,
} from "@gravity-ui/icons";
import { DashboardStats } from "@/components/dashbaord/DashboardStats";

const ClientDashboardHomePage = ({ stats }) => {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return <div>Loading...</div>;
  }

  const user = session?.user;

  // if (!stats) return <p> No stats found</p>;

  const clientStats = [
    { title: "Total Tasks", value: stats?.totalTasks ?? 0, icon: Briefcase },
    { title: "Open Tasks", value: stats?.openTasks ?? 0, icon: Thunderbolt },
    {
      title: "Tasks In Progress",
      value: stats?.inProgressTasks ?? 0,
      icon: CircleCheck,
    },
    {
      title: "Total Spent (USD)",
      value: `$${stats?.totalSpent ?? 0}`,
      icon: CircleDollar,
    },
  ];

  return (
    <div>
      <h2 className="text-4xl">Welcome back, {user?.name}</h2>
      <DashboardStats statsData={clientStats} />
    </div>
  );
};

export default ClientDashboardHomePage;
