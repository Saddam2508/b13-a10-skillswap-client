import { protectedFetch, serverFetch, serverMutation } from "../core/server";

export const getAdminDashboardStats = () =>
  protectedFetch("/api/admin/stats");

export const getAllUsers = () =>
  protectedFetch("/api/admin/users");

export const blockUser = (id) =>
  serverMutation(`/api/admin/users/${id}/block`, {}, "PATCH");

export const unblockUser = (id) =>
  serverMutation(`/api/admin/users/${id}/unblock`, {}, "PATCH");

export const getAllTasks = () =>
   protectedFetch("/api/admin/tasks");

export const deleteTask = (id) =>
  serverMutation(`/api/admin/tasks/${id}`, {}, "DELETE");