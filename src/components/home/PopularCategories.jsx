"use client";

import { motion } from "motion/react";
import Link from "next/link";

const categories = [
  {
    id: "Development",
    label: "Development",
    icon: "💻",
    description: "Web, mobile & software",
    color:
      "from-violet-500/10 to-purple-500/10 border-violet-500/20 hover:border-violet-500/50",
    iconBg: "bg-violet-500/10 text-violet-400",
    count: "120+ tasks",
  },
  {
    id: "Design",
    label: "Design",
    icon: "🎨",
    description: "UI/UX, graphics & branding",
    color:
      "from-pink-500/10 to-rose-500/10 border-pink-500/20 hover:border-pink-500/50",
    iconBg: "bg-pink-500/10 text-pink-400",
    count: "85+ tasks",
  },
  {
    id: "Writing",
    label: "Writing",
    icon: "✍️",
    description: "Content, SEO & copywriting",
    color:
      "from-blue-500/10 to-cyan-500/10 border-blue-500/20 hover:border-blue-500/50",
    iconBg: "bg-blue-500/10 text-blue-400",
    count: "64+ tasks",
  },
  {
    id: "Marketing",
    label: "Marketing",
    icon: "📣",
    description: "Social media & growth",
    color:
      "from-green-500/10 to-emerald-500/10 border-green-500/20 hover:border-green-500/50",
    iconBg: "bg-green-500/10 text-green-400",
    count: "47+ tasks",
  },
  {
    id: "Video",
    label: "Video",
    icon: "🎬",
    description: "Editing, animation & more",
    color:
      "from-orange-500/10 to-amber-500/10 border-orange-500/20 hover:border-orange-500/50",
    iconBg: "bg-orange-500/10 text-orange-400",
    count: "32+ tasks",
  },
  {
    id: "Other",
    label: "Other",
    icon: "🔧",
    description: "Data entry, translation & more",
    color:
      "from-zinc-500/10 to-slate-500/10 border-zinc-500/20 hover:border-zinc-500/50",
    iconBg: "bg-zinc-500/10 text-zinc-400",
    count: "50+ tasks",
  },
];

export default function PopularCategories() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      {/* Heading */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-white mb-2">
          Popular Categories
        </h2>
        <p className="text-zinc-400">
          Find work or hire talent across top categories
        </p>
      </motion.div>

      {/* Category Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat, index) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Link
              href={`/tasks?category=${cat.id}`}
              className={`group flex items-center gap-4 p-5 rounded-2xl border bg-gradient-to-br ${cat.color} transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}
            >
              {/* Icon */}
              <div
                className={`w-12 h-12 rounded-xl ${cat.iconBg} flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}
              >
                {cat.icon}
              </div>

              {/* Text */}
              <div className="flex-1">
                <h3 className="text-white font-semibold">{cat.label}</h3>
                <p className="text-zinc-400 text-xs mt-0.5">
                  {cat.description}
                </p>
              </div>

              {/* Count */}
              <span className="text-xs text-zinc-500 flex-shrink-0">
                {cat.count}
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
