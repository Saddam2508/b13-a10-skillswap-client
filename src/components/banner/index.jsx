"use client";

import { motion } from "motion/react";
import Link from "next/link";

export default function HeroBanner() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0B0B0F] flex items-center justify-center px-4">
      {/* Background Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-violet-600/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 h-[300px] w-[300px] rounded-full bg-fuchsia-600/15 blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 h-[250px] w-[250px] rounded-full bg-indigo-600/15 blur-[100px] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-sm text-violet-300"
        >
          <span className="h-2 w-2 rounded-full bg-violet-400 animate-pulse" />
          Freelance Micro-Task Platform
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
        >
          Get your tasks done by{" "}
          <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
            skilled freelancers
          </span>
        </motion.h1>

        {/* Sub Text */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-base leading-8 text-gray-400 sm:text-lg"
        >
          SkillSwap connects clients with talented freelancers for quick,
          one-time tasks. Post a task, receive proposals, hire the best match,
          and get it done — fast, simple, and secure.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          {/* Post a Task — for clients */}
          <Link
            href="/dashboard/client/post-task"
            className="group relative inline-flex h-12 items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition-all duration-300 hover:shadow-violet-500/40 hover:scale-105"
          >
            <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
            Post a Task
          </Link>

          {/* Browse Tasks — for freelancers */}
          <Link
            href="/tasks"
            className="group inline-flex h-12 items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-8 text-sm font-semibold text-white backdrop-blur transition-all duration-300 hover:bg-white/10 hover:scale-105 hover:border-white/30"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
              />
            </svg>
            Browse Tasks
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 grid grid-cols-3 gap-8 border-t border-white/10 pt-10"
        >
          {[
            { value: "500+", label: "Tasks Posted" },
            { value: "200+", label: "Freelancers" },
            { value: "$50K+", label: "Total Payouts" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-bold text-white sm:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
