"use client";
import React, { useState } from "react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import {
  TextField,
  Select,
  ListBox,
  InputGroup,
  Button,
  TextArea,
} from "@heroui/react";
import { Calendar, CircleDollar } from "@gravity-ui/icons";
import { createTask } from "@/lib/actions/tasks";

const categories = [
  { id: "Design", label: "Design" },
  { id: "Writing", label: "Writing" },
  { id: "Development", label: "Development" },
  { id: "Marketing", label: "Marketing" },
  { id: "Other", label: "Other" },
];

export default function PostTaskForm() {
  const { data: session } = useSession();
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    budget: "",
    deadline: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");

    if (!formData.title.trim()) return setError("Task title is required.");
    if (!formData.category) return setError("Please select a category.");
    if (!formData.description.trim())
      return setError("Description is required.");
    if (
      !formData.budget ||
      isNaN(formData.budget) ||
      Number(formData.budget) <= 0
    )
      return setError("Enter a valid budget amount.");
    if (!formData.deadline) return setError("Deadline date is required.");

    setLoading(true);
    try {
      const result = await createTask({
        title: formData.title,
        category: formData.category,
        description: formData.description,
        budget: Number(formData.budget),
        deadline: formData.deadline,
        client_email: session?.user?.email,
        status: "open",
      });

      if (result?.error) throw new Error(result.error);

      router.push("/dashboard/client/tasks");
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-zinc-900/50 border border-zinc-800/80 rounded-[24px] p-8">
      <h2 className="text-2xl font-bold text-white mb-1">Post a New Task</h2>
      <p className="text-zinc-400 text-sm mb-8">
        Fill in the details and find the right freelancer.
      </p>

      <div className="flex flex-col gap-5">
        {/* Task Title */}
        <div>
          <span className="text-sm font-medium text-zinc-400 block mb-2">
            Task Title <span className="text-red-400">*</span>
          </span>
          <TextField
            value={formData.title}
            onChange={(value) => setFormData((p) => ({ ...p, title: value }))}
          >
            <InputGroup className="bg-zinc-800 border border-zinc-700 focus-within:border-purple-500 rounded-xl transition-all">
              <InputGroup.Input
                placeholder="e.g. Design a landing page"
                className="bg-transparent text-white placeholder-zinc-500 text-sm py-2.5 px-4 outline-none w-full"
              />
            </InputGroup>
          </TextField>
        </div>

        {/* Category */}
        <div>
          <span className="text-sm font-medium text-zinc-400 block mb-2">
            Category <span className="text-red-400">*</span>
          </span>
          <Select
            selectedKey={formData.category}
            onSelectionChange={(key) =>
              setFormData((p) => ({ ...p, category: key }))
            }
          >
            <Select.Trigger className="w-full flex items-center justify-between bg-zinc-800 text-white border border-zinc-700 hover:border-zinc-600 rounded-xl py-2.5 px-4 text-sm transition-all">
              <Select.Value>
                {formData.category || "Select a category"}
              </Select.Value>
            </Select.Trigger>
            <Select.Popover className="bg-zinc-800 border border-zinc-700 rounded-xl shadow-xl mt-1 overflow-hidden z-50">
              <ListBox className="p-1">
                {categories.map((cat) => (
                  <ListBox.Item
                    key={cat.id}
                    id={cat.id}
                    className="text-zinc-200 hover:bg-purple-600 hover:text-white rounded-lg px-3 py-2 text-sm cursor-pointer"
                  >
                    {cat.label}
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>
        </div>

        {/* Description */}
        <div>
          <span className="text-sm font-medium text-zinc-400 block mb-2">
            Description <span className="text-red-400">*</span>
          </span>
          <TextArea
            value={formData.description}
            onChange={(e) =>
              setFormData((p) => ({ ...p, description: e.target.value }))
            }
            placeholder="Describe the task in detail..."
            className="w-full bg-zinc-800 border border-zinc-700 focus:border-purple-500 rounded-xl text-white placeholder-zinc-500 text-sm px-4 py-2.5 outline-none resize-none transition-all min-h-[120px]"
          />
        </div>

        {/* Budget + Deadline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Budget */}
          <div>
            <span className="text-sm font-medium text-zinc-400 block mb-2">
              Budget (USD) <span className="text-red-400">*</span>
            </span>
            <TextField
              value={formData.budget}
              onChange={(value) =>
                setFormData((p) => ({ ...p, budget: value }))
              }
            >
              <InputGroup className="bg-zinc-800 border border-zinc-700 focus-within:border-purple-500 rounded-xl transition-all">
                <InputGroup.Prefix className="pl-3 text-zinc-500">
                  <CircleDollar className="w-4 h-4" />
                </InputGroup.Prefix>
                <InputGroup.Input
                  type="number"
                  placeholder="e.g. 150"
                  className="bg-transparent text-white placeholder-zinc-500 text-sm py-2.5 px-3 outline-none w-full"
                />
              </InputGroup>
            </TextField>
          </div>

          {/* Deadline */}
          <div>
            <span className="text-sm font-medium text-zinc-400 block mb-2">
              Deadline Date <span className="text-red-400">*</span>
            </span>
            <TextField
              value={formData.deadline}
              onChange={(value) =>
                setFormData((p) => ({ ...p, deadline: value }))
              }
            >
              <InputGroup className="bg-zinc-800 border border-zinc-700 focus-within:border-purple-500 rounded-xl transition-all">
                <InputGroup.Prefix className="pl-3 text-zinc-500">
                  <Calendar className="w-4 h-4" />
                </InputGroup.Prefix>
                <InputGroup.Input
                  type="date"
                  className="bg-transparent text-white text-sm py-2.5 px-3 outline-none w-full"
                />
              </InputGroup>
            </TextField>
          </div>
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-2.5">
            {error}
          </p>
        )}

        {/* Submit */}
        <Button
          onPress={handleSubmit}
          isLoading={loading}
          className="w-full bg-purple-600 hover:bg-purple-500 text-white font-medium rounded-xl py-3 text-sm transition-all mt-2"
        >
          {loading ? "Posting..." : "Post Task"}
        </Button>
      </div>
    </div>
  );
}
