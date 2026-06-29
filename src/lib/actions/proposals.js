"use server";

import { serverMutation } from "../core/server";

export const acceptProposal = async (id) => {
  return serverMutation(`/api/proposals/${id}/accept`, {}, "PATCH");
};

export const rejectProposal = async (id) => {
  return serverMutation(`/api/proposals/${id}/reject`, {}, "PATCH");
};
