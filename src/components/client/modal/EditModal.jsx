"use client";
import { useState } from "react";
import { updateTask } from "@/lib/actions/tasks";
import {
  Button,
  Input,
  Modal,
  Select,
  TextArea,
  Label,
  ListBox
} from "@heroui/react";

const CATEGORIES = ["Design", "Writing", "Development", "Marketing", "Other"];

export function EditModal({ task, isOpen, onClose, onSave }) {


  
  const [form, setForm] = useState({
    title: task?.title || "",
    category: task?.category || "",
    description: task?.description || "",
    budget: String(task?.budget || ""),
    deadline: task?.deadline?.slice(0, 10) || "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const set = (key) => (e) =>
    setForm((p) => ({ ...p, [key]: e?.target ? e.target.value : e }));

  if (!isOpen) return null;

  const handleSave = async () => {
    setError("");
    if (!form.title.trim() || !form.budget || !form.deadline) {
      setError("Please fill all required fields.");
      return;
    }
    setSaving(true);
    try {
      const result = await updateTask(task._id, {
        ...form,
        budget: Number(form.budget),
      });
      if (result?.error) throw new Error(result.error);
      onSave({ ...task, ...form, budget: Number(form.budget) });
    } catch (err) {
      setError(err.message || "Update failed.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal isOpen={isOpen}>
      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-lg bg-zinc-900 border border-zinc-800 rounded-2xl">
            <Modal.CloseTrigger onClick={onClose} />

            <Modal.Header>
              <Modal.Heading className="text-white font-semibold">
                Edit Task
              </Modal.Heading>
              <p className="mt-1 text-sm text-zinc-400">
                Update your task details below.
              </p>
            </Modal.Header>

            <Modal.Body className="px-6 py-4">
              <div className="flex flex-col gap-4">
                <Input
                  label="Title"
                  value={form.title}
                  onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                  className={{
                    input: "bg-transparent text-white",
                    inputWrapper:
                      "bg-zinc-800 border border-zinc-700 hover:border-violet-500 data-[focus=true]:border-violet-500 rounded-xl",
                    label: "text-zinc-400 text-xs",
                  }}
                />

                <Select
  selectedKeys={form.category ? [form.category] : []}
  onSelectionChange={(keys) =>
    setForm((p) => ({
      ...p,
      category: Array.from(keys)[0] || "",
    }))
  }
>
  <Label>Category</Label>

  <Select.Trigger className="bg-zinc-800 border border-zinc-700 rounded-xl">
    <Select.Value />
    <Select.Indicator />
  </Select.Trigger>

  <Select.Popover>
    <ListBox>
      {CATEGORIES.map((c) => (
        <ListBox.Item key={c} id={c} textValue={c}>
          {c}
          <ListBox.ItemIndicator />
        </ListBox.Item>
      ))}
    </ListBox>
  </Select.Popover>
</Select>

                <TextArea
                  label="Description"
                  value={form.description}
                  onChange={set("description")}
                  rows={3}
                  className={{
                    input: "bg-transparent text-white",
                    inputWrapper:
                      "bg-zinc-800 border border-zinc-700 hover:border-violet-500 data-[focus=true]:border-violet-500 rounded-xl",
                    label: "text-zinc-400 text-xs",
                  }}
                />

                <div className="grid grid-cols-2 gap-3">
                  <Input
                    label="Budget (USD)"
                    type="number"
                    value={form.budget}
                    onChange={set("budget")}
                    startContent={
                      <span className="text-zinc-500 text-sm">$</span>
                    }
                    classNames={{
                      input: "bg-transparent text-white",
                      inputWrapper:
                        "bg-zinc-800 border border-zinc-700 hover:border-violet-500 data-[focus=true]:border-violet-500 rounded-xl",
                      label: "text-zinc-400 text-xs",
                    }}
                  />
                  <Input
                    label="Deadline"
                    type="date"
                    value={form.deadline}
                    onChange={set("deadline")}
                    classNames={{
                      input: "bg-transparent text-white",
                      inputWrapper:
                        "bg-zinc-800 border border-zinc-700 hover:border-violet-500 data-[focus=true]:border-violet-500 rounded-xl",
                      label: "text-zinc-400 text-xs",
                    }}
                  />
                </div>

                {error && (
                  <p className="text-red-400 text-xs bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">
                    {error}
                  </p>
                )}
              </div>
            </Modal.Body>

            <Modal.Footer>
              <Button
                slot="close"
                variant="secondary"
                onPress={onClose}
                className="text-zinc-400"
              >
                Cancel
              </Button>
              <Button
                onPress={handleSave}
                isLoading={saving}
                className="bg-violet-600 hover:bg-violet-500 text-white rounded-xl font-medium"
              >
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}