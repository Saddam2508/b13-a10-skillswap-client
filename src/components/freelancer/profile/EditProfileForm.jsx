"use client";
import { useState } from "react";
import { Button, Input, TextArea } from "@heroui/react";
import { updateUserProfile } from "@/lib/actions/users";

export default function EditProfileForm({ user }) {
  const [form, setForm] = useState({
    name: user?.name || "",
    image: user?.image || "",
    skills: user?.skills?.join(", ") || "",
    bio: user?.bio || "",
    hourlyRate: String(user?.hourlyRate || ""),
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const set = (key) => (e) =>
    setForm((p) => ({ ...p, [key]: e?.target ? e.target.value : e }));

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    try {
      const result = await updateUserProfile({
        email: user?.email,
        ...form,
        skills: form.skills.split(",").map((s) => s.trim()).filter(Boolean),
        hourlyRate: Number(form.hourlyRate),
      });
      if (result?.error) throw new Error(result.message);
      setMessage("Profile updated successfully!");
    } catch (err) {
      setMessage(err.message || "Update failed.");
    } finally {
      setSaving(false);
    }
  };

  // ✅ className (object) — Input/TextArea styling এর জন্য
  const inputClass = {
    input: "bg-transparent text-white",
    inputWrapper:
      "bg-zinc-800 border border-zinc-700 hover:border-violet-500 data-[focus=true]:border-violet-500 rounded-xl",
    label: "text-zinc-400 text-xs",
  };

  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-bold text-white mb-1">Edit Profile</h2>
      <p className="text-sm text-zinc-500 mb-6">Update your public freelancer profile.</p>

      <div className="flex flex-col gap-4">
        <Input
          label="Full Name"
          value={form.name}
          onChange={set("name")}
          className={inputClass}
        />
        <Input
          label="Profile Photo URL"
          value={form.image}
          onChange={set("image")}
          placeholder="https://..."
          className={inputClass}
        />
        <Input
          label="Skills (comma separated)"
          value={form.skills}
          onChange={set("skills")}
          placeholder="React, Node.js, Design..."
          className={inputClass}
        />
        <TextArea
          label="Bio"
          value={form.bio}
          onChange={set("bio")}
          rows={4}
          placeholder="Tell clients about yourself..."
          className={inputClass}
        />
        <Input
          label="Hourly Rate (USD)"
          type="number"
          value={form.hourlyRate}
          onChange={set("hourlyRate")}
          placeholder="e.g. 25"
          className={inputClass}
        />

        {message && (
          <p
            className={`text-xs rounded-lg px-3 py-2 border ${
              message.includes("success")
                ? "text-emerald-400 bg-emerald-400/10 border-emerald-400/20"
                : "text-red-400 bg-red-400/10 border-red-400/20"
            }`}
          >
            {message}
          </p>
        )}

        <Button
          onPress={handleSave}
          isLoading={saving}
          className="w-full bg-violet-600 hover:bg-violet-500 text-white font-medium rounded-xl py-3 mt-2"
        >
          Save Profile
        </Button>
      </div>
    </div>
  );
}