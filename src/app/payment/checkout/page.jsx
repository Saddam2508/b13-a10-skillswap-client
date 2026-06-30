"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const amount = searchParams.get("amount");
  const taskId = searchParams.get("taskId");
  const proposalId = searchParams.get("proposalId");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleStripeCheckout = async () => {
    setIsLoading(true);
    setError("");
    try {
      const res = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, taskId, proposalId }),
      });
      const data = await res.json();
      if (data?.url) {
        window.location.href = data.url; 
      } else {
        throw new Error("Failed to create checkout session.");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen dark:bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.03] p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-1">Checkout</h1>
          <p className="text-zinc-400 text-sm">Complete your payment to hire the freelancer</p>
          <div className="mt-4 p-4 rounded-xl bg-green-500/10 border border-green-500/20">
            <p className="text-xs text-zinc-500 mb-1">Amount Due</p>
            <p className="text-green-400 font-bold text-3xl">
              ${amount} <span className="text-sm font-normal text-zinc-500">USD</span>
            </p>
          </div>
        </div>

        {error && (
          <p className="text-red-400 text-xs bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2 mb-4">
            {error}
          </p>
        )}

        <button
          onClick={handleStripeCheckout}
          disabled={isLoading}
          className="w-full py-3.5 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white font-semibold text-sm transition-all flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
              </svg>
              Redirecting to Stripe...
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              Pay ${amount} with Stripe
            </>
          )}
        </button>

        <p className="text-center text-xs text-zinc-600 mt-4">
          🔒 Secured by Stripe
        </p>
      </div>
    </div>
  );
}