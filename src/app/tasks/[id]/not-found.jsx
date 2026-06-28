import Link from "next/link";

export default function NotFound() {
  return (
    <div className="dark:bg-black min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-white mb-4">Task Not Found</h2>
        <p className="text-zinc-400 mb-8">
          The task you are looking for does not exist.
        </p>
        <Link
          href="/tasks"
          className="px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium transition-all"
        >
          Back to Tasks
        </Link>
      </div>
    </div>
  );
}
