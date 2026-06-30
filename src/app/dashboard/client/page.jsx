"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import {
  Briefcase,
  Thunderbolt,
  CircleCheck,
  CircleDollar,
} from "@gravity-ui/icons";
import { DashboardStats } from "@/components/dashbaord/DashboardStats";

const ClientDashboardHomePage = ({ stats }) => {
  const { data: session } = useSession();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const clientStats = [
    { title: "Total Tasks", value: stats?.totalTasks ?? 0, icon: Briefcase },
    { title: "Open Tasks", value: stats?.openTasks ?? 0, icon: Thunderbolt },
    { title: "Tasks In Progress", value: stats?.inProgressTasks ?? 0, icon: CircleCheck },
    { title: "Total Spent (USD)", value: `$${stats?.totalSpent ?? 0}`, icon: CircleDollar },
  ];

  return (
    <div>
      {/* ✅ mounted হওয়ার আগে name দেখাবে না — server ও client একই HTML */}
      <h2 className="text-4xl">
        Welcome back, {mounted ? (session?.user?.name ?? "") : ""}
      </h2>
      <DashboardStats statsData={clientStats} />
    </div>
  );
};

export default ClientDashboardHomePage;