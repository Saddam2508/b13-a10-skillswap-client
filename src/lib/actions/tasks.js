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

export const updateTaskStatus = async (taskId, proposalId, status) => {
  return serverMutation(`/api/tasks/${taskId}/status`, { status, proposalId }, "PATCH");
};

export const submitDeliverable = async (id, deliverableUrl) =>
 {return serverMutation(`/api/tasks/${id}/deliverable`, { deliverableUrl }, "PATCH");}
 
