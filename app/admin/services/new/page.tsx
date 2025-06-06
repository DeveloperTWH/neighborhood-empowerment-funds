"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AddServicePage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [description, setDescription] = useState<string[]>([""]);
  const [features, setFeatures] = useState<string[]>([""]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!imageFile) return alert("Please select an image");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", imageFile);
    description.forEach((d) => formData.append("description", d));
    features.forEach((f) => formData.append("features", f));

    try {
      await axios.post("/api/services", formData);
      router.push("/admin/services");
    } catch (error) {
      alert("Failed to save service.");
      console.error(error);
    }
  };

  const handleArrayChange = (
    index: number,
    value: string,
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setter((prev) => {
      const copy = [...prev];
      copy[index] = value;
      return copy;
    });
  };

  const addField = (setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter((prev) => [...prev, ""]);
  };

  const removeField = (
    index: number,
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setter((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Add New Service</h1>

      <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
        <input
          type="text"
          placeholder="Service Title"
          className="w-full p-2 border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files?.[0] || null)}
          className="w-full p-2 border rounded"
          required
        />

        {/* Description Fields */}
        <div>
          <label className="font-medium">Description Paragraphs</label>
          {description.map((d, i) => (
            <div key={i} className="flex items-start gap-2 mt-2">
              <textarea
                placeholder={`Paragraph ${i + 1}`}
                className="w-full p-2 border rounded"
                value={d}
                onChange={(e) =>
                  handleArrayChange(i, e.target.value, setDescription)
                }
              />
              {description.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeField(i, setDescription)}
                  className="text-red-500 text-xs bg-red-100 px-2 py-1 rounded hover:bg-red-200 transition"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => addField(setDescription)}
            className="text-blue-600 text-sm mt-2"
          >
            + Add Paragraph
          </button>
        </div>

        {/* Feature Fields */}
        <div>
          <label className="font-medium">Key Features</label>
          {features.map((f, i) => (
            <div key={i} className="flex items-start gap-2 mt-2">
              <input
                type="text"
                placeholder={`Feature ${i + 1}`}
                className="w-full p-2 border rounded"
                value={f}
                onChange={(e) =>
                  handleArrayChange(i, e.target.value, setFeatures)
                }
              />
              {features.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeField(i, setFeatures)}
                  className="text-red-500 text-xs bg-red-100 px-2 py-1 rounded hover:bg-red-200 transition"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => addField(setFeatures)}
            className="text-blue-600 text-sm mt-2"
          >
            + Add Feature
          </button>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Save Service
        </button>
      </form>
    </div>
  );
}
