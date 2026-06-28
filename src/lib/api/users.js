import { headers } from "next/headers";
import { auth } from "../auth";
import { serverFetch } from "../core/server";

export const getUsersList = async () => {
  const users = await auth.api.listUsers({
    query: {
      sortBy: "createdAt",
      sortDirection: "desc",
    },
    // This endpoint requires session cookies.
    headers: await headers(),
  });
  return users;
};

export const getTopFreelancers = async () => {
  return serverFetch("/api/users/freelancers/top?limit=6");
};

export const getAllFreelancers = async () => {
  return serverFetch("/api/users/freelancers");
};
