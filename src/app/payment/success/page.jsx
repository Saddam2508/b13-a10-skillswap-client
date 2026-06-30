

import { completePaymentAction } from "@/lib/actions/paymentActions";
import { acceptProposal } from "@/lib/actions/proposals";
import { redirect } from "next/navigation";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function PaymentSuccessPage({ searchParams }) {
  const { taskId, proposalId, session_id } = await searchParams;
  const session = await stripe.checkout.sessions.retrieve(session_id);

  if (session.payment_status === "paid") {
    await acceptProposal(proposalId);
    await completePaymentAction(taskId, proposalId);
  }

  return (
    <div className="min-h-screen dark:bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Payment Successful!</h2>
        <p className="text-zinc-400 text-sm mb-6">Task is now In Progress.</p>
        <a
          href="/dashboard/client"
          className="inline-block px-6 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium transition-colors"
        >
          Go to Dashboard
        </a>
      </div>
    </div>
  );
}