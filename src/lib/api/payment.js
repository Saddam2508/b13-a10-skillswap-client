import { serverFetch } from "../core/server";

export const getTransactions = () =>
  serverFetch("/api/admin/payments");