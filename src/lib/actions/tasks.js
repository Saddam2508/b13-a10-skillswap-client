"use server";
import { serverMutation } from "../core/server";

export const createTask = async (newTaskData) => {
  return serverMutation("/api/tasks", newTaskData);
};

export const updateTask = async (id, updatedData) => {
  return serverMutation(`/api/tasks/${id}`, updatedData, "PUT");
};
 
export const deleteTask = async (id) => {
  return serverMutation(`/api/tasks/${id}`, {}, "DELETE");
};
 
