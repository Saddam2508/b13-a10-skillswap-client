
import TransactionsTable from "@/components/admin/transactions/TransactionsTable";
import { getTransactionsAction } from "@/lib/actions/payment";

export default async function TransactionsPage() {
  const transactions = await getTransactionsAction();
console.log(transactions)
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">
        Transactions History
      </h1>

      <TransactionsTable
        transactions={transactions}
      />
    </div>
  );
}