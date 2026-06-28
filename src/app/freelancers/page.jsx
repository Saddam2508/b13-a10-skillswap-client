import FreelancerCard from "@/components/card/FreelancerCard";
import { getTopFreelancers } from "@/lib/api/users";

export default async function FreelancersPage() {
  let freelancers = [];

  try {
    const result = await getTopFreelancers();
    freelancers = result.data;
  } catch (error) {
    console.error("Failed to fetch freelancers:", error);
  }

  return (
    <div className="dark:bg-black min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-3">
            All Freelancers
          </h1>
          <p className="text-zinc-400 text-lg">
            Find the best freelancers for your project
          </p>
          <p className="text-zinc-500 text-sm mt-2">
            {freelancers.length} freelancers available
          </p>
        </div>

        {/* Grid */}
        {freelancers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {freelancers.map((freelancer) => (
              <FreelancerCard
                key={freelancer._id?.toString()}
                freelancer={freelancer}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border border-dashed border-zinc-800 rounded-[32px]">
            <p className="text-zinc-500 text-lg">No freelancers found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
