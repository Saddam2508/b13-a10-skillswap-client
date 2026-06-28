import { serverFetch, serverMutation } from "../server";

export const getProposalsByClientEmail = async (email) => {
  return serverFetch(`/api/proposals/client/${email}`);
};

export const acceptProposal = async (id) => {
  return serverMutation(`/api/proposals/${id}/accept`, {}, "PATCH");
};

export const rejectProposal = async (id) => {
  return serverMutation(`/api/proposals/${id}/reject`, {}, "PATCH");
};
