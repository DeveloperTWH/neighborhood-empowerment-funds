"use client";

import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState, useRef } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import toast from "react-hot-toast";
import { Bold, Italic, Heading2, List, ListOrdered } from "lucide-react";
import "./styles.css";



interface Category {
    _id: string;
    name: string;
}

export default function EditBlogPage() {
    const { id } = useParams();
    const router = useRouter();
    const { data: session } = useSession();

    const [title, setTitle] = useState("");
    const [coverImage, setCoverImage] = useState<File | null>(null);
    const [existingCover, setExistingCover] = useState("");
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [readTime, setReadTime] = useState<number>(0);
    const [showDropdown, setShowDropdown] = useState(false);
    const [featured, setFeatured] = useState(false);
    const uploadedInlineImages = useRef<string[]>([]);
    const blogSubmitted = useRef(false);

    const editor = useEditor({
        extensions: [StarterKit, Image],
        content: "",
    });

    // Cleanup unused inline images
    useEffect(() => {
        return () => {
            if (!blogSubmitted.current && uploadedInlineImages.current.length > 0) {
                fetch("/api/blog/cleanup-inline-images", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ images: uploadedInlineImages.current }),
                });
            }
        };
    }, []);

    // Fetch blog data and categories
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [blogRes, catRes] = await Promise.all([
                    fetch(`/api/blog/${id}`),
                    fetch("/api/category"),
                ]);

                const blogData = await blogRes.json();
                const catData = await catRes.json();

                setTitle(blogData.title);
                setExistingCover(blogData.coverImage);
                const categoryIds = Array.isArray(blogData.category)
                    ? blogData.category.map((cat: string | { _id: string }) =>
                        typeof cat === "string" ? cat : cat._id
                    )
                    : [];


                setSelectedCategories(categoryIds);

                setReadTime(blogData.readTime);
                setFeatured(blogData.featured);
                editor?.commands.setContent(blogData.content || "");

                if (Array.isArray(catData)) setCategories(catData);
            } catch (err) {
                console.error("Failed to load blog or categories", err);
                toast.error("Failed to load blog data");
            }
        };

        fetchData();
    }, [editor, id]);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!target.closest(".relative")) setShowDropdown(false);
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
            uploadedInlineImages.current.push(data.url);
            editor?.chain().focus().setImage({ src: data.url }).run();
        } catch (err) {
            console.error(err);
            toast.error("Failed to upload inline image");
        }
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        const content = editor?.getHTML();
        if (!selectedCategories.length) {
            toast.error("Please select at least one category");
            return;
        }

        try {
            let uploadedCover = existingCover;

            if (coverImage) {
                const formData = new FormData();
                formData.append("coverImage", coverImage);
                const res = await fetch("/api/blog/upload", {
                    method: "POST",
                    body: formData,
                });
                if (!res.ok) throw new Error("Cover upload failed");
                const data = await res.json();
                uploadedCover = data.url;
            }

            const updateRes = await fetch(`/api/blog/update/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title,
                    author: session?.user?.name || "Anonymous",
                    coverImage: uploadedCover,
                    content,
                    category: selectedCategories,
                    readTime,
                    featured,
                }),
            });

            if (!updateRes.ok) throw new Error("Update failed");

            blogSubmitted.current = true;
            toast.success("Blog updated successfully");
            router.push("/admin/blog");
        } catch (err) {
            console.error(err);
            toast.error("Failed to update blog");
        }
    };

    return (
        <div className="min-h-screen px-4 py-8 bg-gray-100 flex justify-center">
            <form
                onSubmit={handleUpdate}
                className="bg-white shadow-lg rounded-xl p-8 w-full max-w-3xl space-y-6"
            >
                <h1 className="text-3xl font-bold text-gray-800">Edit Blog Post</h1>

                <div className="space-y-2">
                    <label className="font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="w-full px-4 py-2 border rounded-lg bg-gray-50 focus:ring-indigo-400"
                    />
                </div>

                <div className="space-y-2">
                    <label className="font-medium text-gray-700">Cover Image</label>
                    {existingCover && (
                        <img
                            src={existingCover}
                            alt="Current Cover"
                            className="w-full h-40 object-cover rounded mb-2"
                        />
                    )}
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

                {/* Editor Toolbar */}
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

                {/* Featured Toggle */}
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
                    Update Blog Post
                </button>
            </form>
        </div>
    );
}
