"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { Pagination } from "@heroui/react";
import TaskCard from "@/components/card/TaskCard";
import TasksFilters from "./TasksFilter";

export default function TasksContainer({
  tasks,
  filters = {},
  total,
  showFilters,
}) {
  const [searchQuery, setSearchQuery] = useState(filters.search || "");
  const [selectedCategory, setSelectedCategory] = useState(
    filters.category || "all",
  );
  const [page, setPage] = useState(filters.page || 1);

  const router = useRouter();

  const itemsPerPage = 9;
  const totalPages = Math.ceil(total / itemsPerPage);
  const startItem = (page - 1) * itemsPerPage + 1;
  const endItem = Math.min(page * itemsPerPage, total);

  const getPageNumbers = () => {
    const pages = [];
    pages.push(1);
    if (page > 3) pages.push("ellipsis");
    const start = Math.max(2, page - 1);
    const end = Math.min(totalPages - 1, page + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (page < totalPages - 2) pages.push("ellipsis");
    if (totalPages > 1) pages.push(totalPages);
    return pages;
  };

  useEffect(() => {
    const sp = new URLSearchParams();
    if (searchQuery) sp.set("search", searchQuery);
    if (selectedCategory !== "all") sp.set("category", selectedCategory);
    if (page > 1) sp.set("page", page);
    router.push(`?${sp.toString()}`);
  }, [router, searchQuery, selectedCategory, page]);

  const handleSearchChange = (value) => {
    setSearchQuery(value);
    setPage(1);
  };

  const handleCategoryChange = (key) => {
    setSelectedCategory(key);
    setPage(1);
  };

  if (!tasks)
    return <p className="max-w-7xl mx-auto text-center"> No data found</p>;

  return (
    <>
      {showFilters && (
        <TasksFilters
          searchQuery={searchQuery}
          setSearchQuery={handleSearchChange}
          selectedCategory={selectedCategory}
          setSelectedCategory={handleCategoryChange}
        />
      )}

      {/* Result count */}
      <div className="max-w-7xl mx-auto mb-6 text-sm text-zinc-500">
        Showing {tasks.length} task{tasks.length !== 1 && "s"}
        {total > 0 && (
          <span className="ml-1 text-zinc-600">
            ({startItem}–{endItem} of {total})
          </span>
        )}
      </div>

      {tasks && tasks.length > 0 ? (
        <>
          {/* Tasks Grid */}
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {tasks.map((task, index) => (
              <motion.div
                key={task._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <TaskCard task={task} />
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination className="w-full max-w-7xl mx-auto mb-10">
              <Pagination.Summary>
                Showing {startItem}–{endItem} of {total} results
              </Pagination.Summary>
              <Pagination.Content>
                <Pagination.Item>
                  <Pagination.Previous
                    isDisabled={page === 1}
                    onPress={() => setPage((p) => p - 1)}
                  >
                    <Pagination.PreviousIcon />
                    <span>Previous</span>
                  </Pagination.Previous>
                </Pagination.Item>

                {getPageNumbers().map((p, i) =>
                  p === "ellipsis" ? (
                    <Pagination.Item key={`ellipsis-${i}`}>
                      <Pagination.Ellipsis />
                    </Pagination.Item>
                  ) : (
                    <Pagination.Item key={p}>
                      <Pagination.Link
                        isActive={p === page}
                        onPress={() => setPage(p)}
                      >
                        {p}
                      </Pagination.Link>
                    </Pagination.Item>
                  ),
                )}

                <Pagination.Item>
                  <Pagination.Next
                    isDisabled={page === totalPages}
                    onPress={() => setPage((p) => p + 1)}
                  >
                    <span>Next</span>
                    <Pagination.NextIcon />
                  </Pagination.Next>
                </Pagination.Item>
              </Pagination.Content>
            </Pagination>
          )}
        </>
      ) : (
        /* Empty State */
        <div className="text-center py-20 border border-dashed border-zinc-800 rounded-[32px] max-w-7xl mx-auto">
          <p className="text-zinc-500 text-lg">
            No tasks match your search criteria.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
              setPage(1);
            }}
            className="mt-4 text-sm text-violet-400 hover:text-violet-300 underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </>
  );
}
