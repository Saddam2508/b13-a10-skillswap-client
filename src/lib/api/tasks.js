import { serverFetch } from "../core/server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getTasks = async (queryString) => {
  return serverFetch(`/api/tasks?${queryString}`);
};

export const getTaskById = async (id) => {
  return serverFetch(`/api/tasks/${id}`);
};

export const getMyTasks = async (email) => {
  return serverFetch(`/api/tasks/my-tasks?email=${email}`);
};
 