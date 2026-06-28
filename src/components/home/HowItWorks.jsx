"use client";

import { motion } from "motion/react";

const steps = [
  {
    number: "01",
    title: "Post a Task",
    description:
      "Describe your project, set your budget and deadline. It only takes a few minutes.",
    icon: "📋",
    color: "from-violet-500 to-purple-600",
  },
  {
    number: "02",
    title: "Get Proposals",
    description:
      "Receive proposals from skilled freelancers. Review their profiles and pick the best fit.",
    icon: "📩",
    color: "from-blue-500 to-cyan-600",
  },
  {
    number: "03",
    title: "Hire and Pay",
    description:
      "Hire your freelancer, collaborate, and pay securely when the work is done.",
    icon: "✅",
    color: "from-green-500 to-emerald-600",
  },
];

export default function HowItWorks() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      {/* Heading */}
      <motion.div
        className="text-center mb-14"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-white mb-2">How It Works</h2>
        <p className="text-zinc-400">Get started in 3 simple steps</p>
      </motion.div>

      {/* Steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        {/* Connector Line */}
        <div className="hidden md:block absolute top-10 left-1/4 right-1/4 h-px bg-gradient-to-r from-violet-500/0 via-violet-500/50 to-violet-500/0" />

        {steps.map((step, index) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            className="relative flex flex-col items-center text-center group"
          >
            {/* Icon Circle */}
            <div
              className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-3xl mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}
            >
              {step.icon}
            </div>

            {/* Step Number */}
            <span className="text-xs font-bold text-zinc-500 tracking-widest uppercase mb-2">
              Step {step.number}
            </span>

            <h3 className="text-lg font-semibold text-white mb-3">
              {step.title}
            </h3>

            <p className="text-zinc-400 text-sm leading-relaxed">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
