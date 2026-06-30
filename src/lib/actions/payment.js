"use server";

import { getTransactions } from "../api/payment";

export async function getTransactionsAction() {
  const result = await getTransactions();

  return result?.data || [];
}