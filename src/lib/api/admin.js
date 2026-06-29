import { serverFetch, serverMutation } from "../core/server";

export const getAdminDashboardStats = () =>
  serverFetch("/api/admin/stats");

export const getAllUsers = () =>
  serverFetch("/api/admin/users");

export const blockUser = (id) =>
  serverMutation(`/api/admin/users/${id}/block`, {}, "PATCH");

export const unblockUser = (id) =>
  serverMutation(`/api/admin/users/${id}/unblock`, {}, "PATCH");

export const getAllTasks = () =>
  serverFetch("/api/admin/tasks");

export const deleteTask = (id) =>
  serverMutation(`/api/admin/tasks/${id}`, {}, "DELETE");