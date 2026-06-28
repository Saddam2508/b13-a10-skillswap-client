import FreelancerCard from "@/components/card/FreelancerCard";
import { getTopFreelancers } from "@/lib/api/users";

import Link from "next/link";

export default async function TopFreelancers() {
  let freelancers = [];

  try {
    const result = await getTopFreelancers();
    freelancers = result.data;
  } catch (error) {
    console.error("Failed to fetch freelancers:", error);
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-white mb-2">Top Freelancers</h2>
        <p className="text-zinc-400">Meet our best performing freelancers</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {freelancers.map((freelancer) => (
          <FreelancerCard key={freelancer._id} freelancer={freelancer} />
        ))}
      </div>

      <div className="flex justify-end mt-10">
        <Link
          href="/freelancers"
          className="px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium transition-all duration-300"
        >
          View All Freelancers
        </Link>
      </div>
    </section>
  );
}
