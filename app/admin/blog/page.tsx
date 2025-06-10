"use client";

import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import { Pencil, Trash2, Plus, ChevronLeft, ChevronRight } from "lucide-react";

interface BlogPost {
  _id: string;
  title: string;
  author: string;
  createdAt: string;
  featured: boolean;
  coverImage: string;
}

interface Category {
  _id: string;
  name: string;
}

export default function BlogAdminPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [updating, setUpdating] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const LIMIT = 9;

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (debouncedSearch) params.append("search", debouncedSearch);
      if (selectedCategory) params.append("category", selectedCategory);
      params.append("page", page.toString());
      params.append("limit", LIMIT.toString());

      const res = await fetch(`/api/blog/list?${params.toString()}`);
      const data = await res.json();
      setPosts(data.posts);
      setTotalPages(Math.ceil(data.total / LIMIT));
    } catch (err) {
      console.error("Failed to fetch blog posts", err);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, selectedCategory, page]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/category");
        const data = await res.json();
        if (Array.isArray(data)) setCategories(data);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };
    fetchCategories();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    try {
      const res = await fetch(`/api/blog/delete/${id}`, { method: "DELETE" });
      if (res.ok) {
        setPosts((prev) => prev.filter((post) => post._id !== id));
      } else {
        alert("Failed to delete post.");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting post.");
    }
  };

  const toggleFeatured = async (id: string, isCurrentlyFeatured: boolean) => {
    setUpdating(true);
    try {
      if (!isCurrentlyFeatured) {
        const currentFeaturedCount = posts.filter((post) => post.featured).length;
        if (currentFeaturedCount >= 6) {
          alert("You can only feature up to 6 blog posts.");
          return;
        }
      }

      const res = await fetch(`/api/blog/feature/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ featured: !isCurrentlyFeatured }),
      });

      if (!res.ok) {
        alert("Failed to update featured status.");
        return;
      }

      setPosts((prev) =>
        prev.map((post) =>
          post._id === id ? { ...post, featured: !isCurrentlyFeatured } : post
        )
      );
    } catch (err) {
      console.error("Feature toggle error:", err);
      alert("Something went wrong while updating.");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-8 bg-gray-100">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-gray-800">Manage Blog Posts</h1>
        <Link
          href="/admin/blog/new"
          className="inline-flex items-center bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          <Plus className="mr-2 h-5 w-5" />
          Add New Post
        </Link>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <select
          className="w-full sm:w-1/4 px-4 py-2 border rounded-lg"
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setPage(1); // reset page on filter
          }}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Search by title, author or content..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1); // reset page on search
          }}
          className="w-full sm:w-3/4 px-6 py-3 border rounded-lg"
        />
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-48">Loading...</div>
      ) : posts.length === 0 ? (
        <div className="text-center text-gray-500 py-12">No blog posts found.</div>
      ) : (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <div
                key={post._id}
                className="bg-white rounded shadow p-4 flex flex-col justify-between"
              >
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="rounded-md h-40 w-full object-cover mb-3"
                />
                <h2 className="text-xl font-semibold text-gray-800">{post.title}</h2>
                <p className="text-sm text-gray-500 mb-1">
                  By {post.author} • {new Date(post.createdAt).toLocaleDateString()}
                </p>
                <div className="mb-2">
                  <button
                    onClick={() => toggleFeatured(post._id, post.featured)}
                    disabled={updating}
                    className={`flex items-center justify-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition duration-200 shadow-sm ${post.featured
                        ? "bg-green-100 text-green-700 hover:bg-green-200"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                  >
                    {post.featured ? "★ Featured" : "☆ Mark as Featured"}
                  </button>
                </div>

                <div className="flex justify-end gap-3">
                  <Link
                    href={`/admin/blog/${post._id}`}
                    className="text-blue-600 hover:underline inline-flex items-center"
                  >
                    <Pencil className="w-4 h-4 mr-1" /> Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="text-red-600 hover:underline inline-flex items-center"
                  >
                    <Trash2 className="w-4 h-4 mr-1" /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1 border rounded hover:bg-gray-200 disabled:opacity-50"
            >
              <ChevronLeft />
            </button>
            <span className="font-medium text-gray-600">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 py-1 border rounded hover:bg-gray-200 disabled:opacity-50"
            >
              <ChevronRight />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
