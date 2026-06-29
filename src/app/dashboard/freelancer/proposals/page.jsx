

import MyProposalsView from "@/components/freelancer/proposals/Myproposalsview";
import { getMyProposals } from "@/lib/api/proposals";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function MyProposalsPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const email = session?.user?.email;
  const result = await getMyProposals(email);
  const proposals = result?.data || [];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">My Proposals</h2>
        <p className="text-sm text-zinc-500 mt-0.5">{proposals.length} proposal{proposals.length !== 1 && "s"} submitted</p>
      </div>
      <MyProposalsView proposals={proposals} />
    </div>
  );
}