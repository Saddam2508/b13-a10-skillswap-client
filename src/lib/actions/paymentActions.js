"use server";

import { updateTaskStatus } from "./tasks";

export const completePaymentAction = async (taskId, proposalId) => {
  return updateTaskStatus(taskId, proposalId, "in_progress");
};
