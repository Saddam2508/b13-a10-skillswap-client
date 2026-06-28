import { updateTask } from "@/lib/actions/tasks";
import {
  Button,
 
  Modal,
  Input,
  Select,
  TextArea,
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

  const set = (key) => (e) =>
    setForm((p) => ({ ...p, [key]: e?.target ? e.target.value : e }));

  const handleSave = async () => {
    if (!form.title.trim() || !form.budget || !form.deadline) {
      addToast({ title: "Please fill all required fields.", color: "danger" });
      return;
    }
    setSaving(true);
    try {
      const result = await updateTask(task._id, {
        ...form,
        budget: Number(form.budget),
      });
      if (result?.error) throw new Error(result.error);
      addToast({ title: "Task updated!", color: "success" });
      onSave({ ...task, ...form, budget: Number(form.budget) });
    } catch (err) {
      addToast({ title: err.message || "Update failed.", color: "danger" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <Modal.Content className="bg-zinc-900 border border-zinc-800 rounded-2xl">
        <Modal.Header className="border-b border-zinc-800 pb-4">
          <span className="text-white font-semibold">Edit Task</span>
        </Modal.Header>

        <Modal.Body className="flex flex-col gap-4 py-5">
          <Input
            label="Title"
            value={form.title}
            onValueChange={(v) => setForm((p) => ({ ...p, title: v }))}
            classNames={{
              input: "bg-transparent text-white",
              inputWrapper:
                "bg-zinc-800 border border-zinc-700 hover:border-violet-500 data-[focus=true]:border-violet-500 rounded-xl",
              label: "text-zinc-400 text-xs",
            }}
          />

          <Select
            label="Category"
            selectedKeys={form.category ? [form.category] : []}
            onSelectionChange={(keys) =>
              setForm((p) => ({ ...p, category: [...keys][0] || "" }))
            }
            classNames={{
              trigger:
                "bg-zinc-800 border border-zinc-700 hover:border-violet-500 data-[focus=true]:border-violet-500 rounded-xl",
              label: "text-zinc-400 text-xs",
              value: "text-white",
              popoverContent: "bg-zinc-800 border border-zinc-700 rounded-xl",
            }}
          >
            {CATEGORIES.map((c) => (
              <Select.Item key={c} className="text-zinc-200 hover:bg-violet-600/30">
                {c}
              </Select.Item>
            ))}
          </Select>

          <TextArea
            label="Description"
            value={form.description}
            onChange={set("description")}
            minRows={3}
            classNames={{
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
              startContent={<span className="text-zinc-500 text-sm">$</span>}
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
        </Modal.Body>

        <Modal.Footer className="border-t border-zinc-800 pt-4 flex justify-end gap-2">
          <Button variant="flat" onPress={onClose} className="text-zinc-400">
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
      </Modal.Content>
    </Modal>
  );
}