import { serverFetch } from "../core/server";


export const getProposalsByClientEmail = async (email) => {
  return serverFetch(`/api/proposals/client/${email}`);
};

export const getProposalsByTask = (taskId) =>
  serverFetch(`/api/proposals?taskId=${taskId}`);
 
export const getMyProposals = (email) =>
  serverFetch(`/api/proposals?freelancerEmail=${encodeURIComponent(email)}`);
 
export const checkProposalExists = (taskId, email) =>
  serverFetch(`/api/proposals/check?taskId=${taskId}&email=${encodeURIComponent(email)}`);