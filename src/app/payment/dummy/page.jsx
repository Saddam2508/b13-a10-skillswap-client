"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { completePaymentAction } from "@/lib/actions/paymentActions";
import { acceptProposal } from "@/lib/actions/proposals";

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const amount = searchParams.get("amount");
  const taskId = searchParams.get("taskId");
  const proposalId = searchParams.get("proposalId");

  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handlePayment = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Dummy payment — 2 second delay
    await new Promise((res) => setTimeout(res, 2000));

    try {
      await acceptProposal(proposalId);
      await completePaymentAction(taskId, proposalId);
      setSuccess(true);
      setTimeout(() => router.push("/dashboard/client"), 2000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen dark:bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">✅</div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Payment Successful!
          </h2>
          <p className="text-zinc-400">
            Task is now In Progress. Redirecting...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen dark:bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.03] p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-1">Checkout</h1>
          <p className="text-zinc-400 text-sm">Complete your payment</p>
          <div className="mt-4 p-3 rounded-xl bg-green-500/10 border border-green-500/20">
            <p className="text-green-400 font-bold text-2xl">${amount} USD</p>
          </div>
        </div>

        <form onSubmit={handlePayment} className="flex flex-col gap-4">
          {/* Card Number */}
          <div>
            <label className="text-sm text-zinc-400 block mb-1">
              Card Number
            </label>
            <input
              type="text"
              placeholder="4242 4242 4242 4242"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              maxLength={19}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-violet-500 transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Expiry */}
            <div>
              <label className="text-sm text-zinc-400 block mb-1">
                Expiry Date
              </label>
              <input
                type="text"
                placeholder="MM/YY"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                maxLength={5}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-violet-500 transition-colors"
              />
            </div>

            {/* CVV */}
            <div>
              <label className="text-sm text-zinc-400 block mb-1">CVV</label>
              <input
                type="text"
                placeholder="123"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                maxLength={3}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-violet-500 transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm transition-all mt-2 disabled:opacity-50"
          >
            {isLoading ? "Processing..." : `Pay $${amount}`}
          </button>
        </form>
 <form action="/api/checkout_sessions" method="POST">
      <section>
        <button type="submit" role="link">
          Checkout
        </button>
      </section>
    </form>
        <p className="text-center text-xs text-zinc-600 mt-4">
          🔒 This is a dummy checkout for demo purposes
        </p>
      </div>
    </div>
  );
}
