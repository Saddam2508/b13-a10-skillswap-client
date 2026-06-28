import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import ProposalsContainer from "@/components/dashboard/ProposalsContainer";
import { redirect } from "next/navigation";
import { getProposalsByClientEmail } from "@/lib/api/proposals";

export default async function ProposalsPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/auth/signin");

  let proposals = [];
  try {
    const result = await getProposalsByClientEmail(session.user.email);
    proposals = result?.data ?? [];
  } catch (error) {
    console.error(error);
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-white mb-6">Manage Proposals</h1>
      <ProposalsContainer proposals={proposals} />
    </div>
  );
}
