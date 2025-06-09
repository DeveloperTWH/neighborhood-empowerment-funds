"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Clock, Calendar, ChevronLeft, ChevronRight } from "lucide-react";

interface BlogCategory {
  _id: string;
  name: string;
}

interface BlogPost {
  _id: string;
  title: string;
  coverImage: string;
  readTime: number;
  createdAt: string;
  content: string;
  category?: BlogCategory | BlogCategory[] | string;
  popularity: number;
}

export default function BlogDetailPage() {
  const { blog_id } = useParams() as { blog_id: string };
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [relatedBlogs, setRelatedBlogs] = useState<BlogPost[]>([]);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/blog/${blog_id}`);
        const data = await res.json();
        console.log("Fetched blog data:", data);
        setBlog(data);
      } catch (err) {
        console.error("Error fetching blog:", err);
      }
    };

    const fetchRelated = async () => {
      try {
        const res = await fetch(`/api/blog/list`);
        const data = await res.json();
        const topThree = (data.posts || [])
          .filter((b: BlogPost) => b._id !== blog_id)
          .sort((a: BlogPost, b: BlogPost) => b.popularity - a.popularity)
          .slice(0, 3);
        setRelatedBlogs(topThree);
      } catch (err) {
        console.error("Error fetching related blogs:", err);
      }
    };

    if (blog_id) {
      fetchBlog();
      fetchRelated();
    }
  }, [blog_id]);

  if (!blog) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="bg-white text-black">
      <section className="max-w-screen-md mx-auto px-4 py-16">
        {/* COVER IMAGE */}
        <Image
          src={blog.coverImage}
          alt={blog.title}
          width={800}
          height={400}
          className="rounded-md w-full h-auto object-cover mb-4"
        />

        {/* CATEGORY (now after image) */}
        {blog.category && (
          <div className="text-xs text-yellow-600 font-medium mb-2 uppercase tracking-wide">
            {typeof blog.category === "string"
              ? blog.category
              : Array.isArray(blog.category)
              ? blog.category.map((c: BlogCategory) => c.name).join(", ")
              : blog.category.name}
          </div>
        )}

        {/* METADATA */}
        <div className="flex items-center text-xs text-gray-500 gap-4 mb-4">
          <span className="flex items-center gap-1"><Clock size={14} /> {blog.readTime} min read</span>
          <span className="flex items-center gap-1"><Calendar size={14} /> {new Date(blog.createdAt).toLocaleDateString()}</span>
        </div>

        {/* TITLE */}
        <h1 className="text-2xl font-bold mb-6 leading-snug">{blog.title}</h1>

        {/* CONTENT */}
        <div
          className="prose prose-sm sm:prose lg:prose-lg text-gray-800 max-w-none"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </section>

      {/* RELATED BLOGS */}
      {relatedBlogs.length > 0 && (
        <section className="max-w-screen-xl mx-auto px-4 pb-20">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Related Blogs</h2>
            <div className="flex gap-2">
              <button className="bg-yellow-400 rounded-full w-8 h-8 flex items-center justify-center">
                <ChevronLeft size={16} />
              </button>
              <button className="bg-yellow-400 rounded-full w-8 h-8 flex items-center justify-center">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {relatedBlogs.map((b) => (
              <div key={b._id} className="space-y-2">
                <Image
                  src={b.coverImage}
                  alt={b.title}
                  width={400}
                  height={250}
                  className="rounded-md w-full h-[220px] object-cover"
                />
                <div className="flex items-center text-xs text-gray-500 gap-4">
                  <span className="flex items-center gap-1"><Clock size={14} /> {b.readTime} min read</span>
                  <span className="flex items-center gap-1"><Calendar size={14} /> {new Date(b.createdAt).toLocaleDateString()}</span>
                </div>
                <h3 className="text-sm font-semibold leading-snug">{b.title}</h3>
                <Link href={`/blog/${b._id}`} className="text-xs text-yellow-600 font-medium hover:underline">
                  Read More →
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
