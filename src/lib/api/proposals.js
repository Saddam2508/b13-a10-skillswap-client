import { serverFetch } from "../core/server";


export const getProposalsByClientEmail = async (email) => {
  return serverFetch(`/api/proposals/client/${email}`);
};

