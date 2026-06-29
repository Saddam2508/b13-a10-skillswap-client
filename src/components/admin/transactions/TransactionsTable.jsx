"use client";

export default function TransactionsTable({
  transactions,
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-zinc-800">
      <table className="w-full">
        <thead className="bg-zinc-900">
          <tr>
            <th className="p-3">Client</th>
            <th>Freelancer</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((payment) => (
            <tr
              key={payment._id}
              className="border-t border-zinc-800"
            >
              <td className="p-3">
                {payment.clientEmail}
              </td>

              <td>
                {payment.freelancerEmail}
              </td>

              <td>
                ${payment.amount}
              </td>

              <td>
                {new Date(
                  payment.paidAt
                ).toLocaleDateString()}
              </td>

              <td>
                <span className="bg-green-600 px-2 py-1 rounded">
                  {payment.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}