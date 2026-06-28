"use server";

import { updateTaskStatus } from "./tasks";

export const completePaymentAction = async (taskId) => {
  return updateTaskStatus(taskId, "in_progress");
};
