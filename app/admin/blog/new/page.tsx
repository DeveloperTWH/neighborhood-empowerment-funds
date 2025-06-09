"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import toast from "react-hot-toast";
import {
  Bold,
  Italic,
  Heading2,
  List,
  ListOrdered,
} from "lucide-react";
import "./styles.css";

interface Category {
  _id: string;
  name: string;
}

export default function AddBlogPage() {
  const router = useRouter();
  const { data: session } = useSession();

  const [title, setTitle] = useState("");
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [readTime, setReadTime] = useState<number>(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const [featured, setFeatured] = useState(false);



  const editor = useEditor({
    extensions: [StarterKit, Image],
    content: "",
  });

  // Fetch categories on load
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/category");
        const data = await res.json();

        if (Array.isArray(data)) {
          setCategories(data);
        } else {
          setCategories([]);
          toast.error("No categories found");
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to load categories");
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".relative")) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);



  const insertImage = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("coverImage", file);

      const res = await fetch("/api/blog/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Image upload failed");

      const data = await res.json();
      editor?.chain().focus().setImage({ src: data.url }).run();
    } catch (err) {
      console.error(err);
      toast.error("Failed to upload inline image");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const content = editor?.getHTML();

    if (!selectedCategories.length) {
      toast.error("Please select at least one category");
      return;
    }

    try {
      let uploadedImageUrl = "";

      if (coverImage) {
        const formData = new FormData();
        formData.append("coverImage", coverImage);

        const res = await fetch("/api/blog/upload", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) throw new Error("Cover image upload failed");

        const data = await res.json();
        uploadedImageUrl = data.url;
      }

      const createRes = await fetch("/api/blog/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          author: session?.user?.name || "Anonymous",
          coverImage: uploadedImageUrl,
          content,
          category: selectedCategories,
          readTime,
          featured,
        }),
      });

      if (!createRes.ok) throw new Error("Blog creation failed");

      toast.success("Blog post submitted!");
      console.log({
        title,
        author: session?.user?.name || "Anonymous",
        coverImage: uploadedImageUrl,
        content,
        category: selectedCategories,
        readTime,
      });

      router.push("/admin/blog");
    } catch (err) {
      console.error(err);
      toast.error("Blog creation failed");
    }
  };

  return (
    <div className="min-h-screen px-4 py-8 bg-gray-100 flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-8 w-full max-w-3xl space-y-6"
      >
        <h1 className="text-3xl font-bold text-gray-800">Add New Blog Post</h1>

        <div className="space-y-2">
          <label className="font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <div className="space-y-2">
          <label className="font-medium text-gray-700">Cover Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setCoverImage(e.target.files?.[0] || null)}
            className="w-full px-4 py-2 border rounded-lg bg-gray-50"
          />
        </div>

        <div className="space-y-2">
          <label className="font-medium text-gray-700">Categories</label>
          <div className="relative">
            <button
              type="button"
              className="w-full text-left px-4 py-2 border rounded-lg bg-gray-50"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              {selectedCategories.length > 0
                ? categories
                  .filter((cat) => selectedCategories.includes(cat._id))
                  .map((cat) => cat.name)
                  .join(", ")
                : "Select categories"}
            </button>
            {showDropdown && (
              <div className="absolute z-10 mt-2 w-full bg-white border rounded-lg shadow-lg max-h-48 overflow-auto">
                {categories.map((cat) => (
                  <label
                    key={cat._id}
                    className="flex items-center px-4 py-2 hover:bg-gray-100"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat._id)}
                      onChange={() => {
                        setSelectedCategories((prev) =>
                          prev.includes(cat._id)
                            ? prev.filter((id) => id !== cat._id)
                            : [...prev, cat._id]
                        );
                      }}
                      className="mr-2"
                    />
                    {cat.name}
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>


        <div className="space-y-2">
          <label className="font-medium text-gray-700">Estimated Read Time (minutes)</label>
          <input
            type="number"
            value={readTime}
            onChange={(e) => setReadTime(Number(e.target.value))}
            min={1}
            required
            className="w-full px-4 py-2 border rounded-lg bg-gray-50"
          />
        </div>

        {/* Tiptap toolbar */}
        {editor && (
          <div className="flex flex-wrap gap-2 border p-3 rounded-lg bg-gray-50">
            <button
              type="button"
              title="Bold"
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={`toolbar-btn ${editor.isActive("bold") ? "active" : ""}`}
            >
              <Bold size={16} />
            </button>
            <button
              type="button"
              title="Italic"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={`toolbar-btn ${editor.isActive("italic") ? "active" : ""}`}
            >
              <Italic size={16} />
            </button>
            <button
              type="button"
              title="Heading"
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              className={`toolbar-btn ${editor.isActive("heading", { level: 2 }) ? "active" : ""}`}
            >
              <Heading2 size={16} />
            </button>
            <button
              type="button"
              title="Bullet List"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={`toolbar-btn ${editor.isActive("bulletList") ? "active" : ""}`}
            >
              <List size={16} />
            </button>
            <button
              type="button"
              title="Numbered List"
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={`toolbar-btn ${editor.isActive("orderedList") ? "active" : ""}`}
            >
              <ListOrdered size={16} />
            </button>
          </div>
        )}

        {/* Inline Image Upload */}
        <div className="space-y-2">
          <label className="font-medium text-gray-700">Insert Image into Blog Content</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) insertImage(file);
            }}
            className="w-full px-4 py-2 border rounded-lg bg-gray-50"
          />
        </div>

        <div className="border rounded-lg bg-white min-h-[200px] p-4">
          <EditorContent editor={editor} />
        </div>

        <div className="space-y-2">
          <label className="font-medium text-gray-700">Featured Post</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="featured"
                value="yes"
                checked={featured === true}
                onChange={() => setFeatured(true)}
                className="accent-indigo-600"
              />
              Yes
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="featured"
                value="no"
                checked={featured === false}
                onChange={() => setFeatured(false)}
                className="accent-indigo-600"
              />
              No
            </label>
          </div>
        </div>


        <button
          type="submit"
          className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700"
        >
          Submit Blog Post
        </button>
      </form>
    </div>
  );
}
