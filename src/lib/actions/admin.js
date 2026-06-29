"use server";

import { blockUser, deleteTask, getAdminDashboardStats, getAllTasks, getAllUsers, unblockUser } from "../api/admin";

export async function getAdminStats() {
  const result = await getAdminDashboardStats();
  return result.data;
}

export async function getUsers() {
  const result = await getAllUsers();
  return result.data;
}

export async function blockUserAction(id) {
  return blockUser(id);
}

export async function unblockUserAction(id) {
  return unblockUser(id);
}

export async function getTasks() {
  const result = await getAllTasks();
  return result.data;
}

export async function deleteTaskAction(id) {
  return deleteTask(id);
}