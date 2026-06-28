import Image from "next/image";
import { StarRating } from "../rating";

export default function FreelancerCard({ freelancer }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 hover:border-violet-500/30 hover:bg-white/[0.06]">
      <div className="absolute bottom-0 right-0 h-32 w-32 rounded-full bg-violet-500/0 blur-2xl transition-all duration-300 group-hover:bg-violet-500/10" />

      {/* Profile */}
      <div className="flex items-center gap-4 mb-4">
        <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-violet-500/30">
          <Image
            src={freelancer.image || "https://i.pravatar.cc/150"}
            alt={freelancer.name}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h3 className="text-white font-semibold">{freelancer.name}</h3>
          <StarRating rating={freelancer.rating || 0} />
        </div>
      </div>

      {/* Bio */}
      <p className="text-zinc-400 text-sm line-clamp-2 mb-4">
        {freelancer.bio}
      </p>

      {/* Skills */}
      <div className="flex flex-wrap gap-2 mb-4">
        {freelancer.skills?.map((skill) => (
          <span
            key={skill}
            className="px-2 py-1 text-xs rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="border-t border-white/10 pt-4 flex items-center justify-between">
        <div className="text-sm text-zinc-400">
          <span className="text-white font-semibold">
            {freelancer.totalJobs}
          </span>{" "}
          jobs done
        </div>
        <span className="text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
          Available
        </span>
      </div>
    </div>
  );
}
