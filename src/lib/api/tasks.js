import { serverFetch } from "../core/server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getTasks = async (queryString) => {
  return serverFetch(`/api/tasks?${queryString}`);
};
