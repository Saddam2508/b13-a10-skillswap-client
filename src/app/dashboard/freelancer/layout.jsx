import { requireRole } from "@/lib/core/session";
import React from "react";

const FreelancerLayout = async ({ children }) => {
  await requireRole("freelancer");
  return children;
};

export default FreelancerLayout;
