
export default function PaymentCancelPage() {
  return (
    <div className="min-h-screen dark:bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="w-20 h-20 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Payment Cancelled</h2>
        <p className="text-zinc-400 text-sm mb-6">Your payment was not completed.</p>
        <a
          href="/dashboard/client"
          className="inline-block px-6 py-2.5 rounded-xl bg-zinc-700 hover:bg-zinc-600 text-white text-sm font-medium transition-colors"
        >
          Back to Dashboard
        </a>
      </div>
    </div>
  );
}