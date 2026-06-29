"use server";

import { serverMutation } from "../core/server";

export const acceptProposal = async (id) => {
  return serverMutation(`/api/proposals/${id}/accept`, {}, "PATCH");
};

export const rejectProposal = async (id) => {
  return serverMutation(`/api/proposals/${id}/reject`, {}, "PATCH");
};
 
export const submitProposal = async (data) =>
  serverMutation("/api/proposals", data);
 
export const updateProposalStatus = async (id, status) =>
  serverMutation(`/api/proposals/${id}/status`, { status }, "PATCH");
 
 