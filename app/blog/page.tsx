"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { Search, Clock, Calendar } from "lucide-react";

interface BlogPost {
  _id: string;
  title: string;
  coverImage: string;
  readTime: string;
  createdAt: string;
  category: string;
  featured: boolean;
  popularity: number;
}

interface Category {
  _id: string;
  name: string;
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [featuredBlogs, setFeaturedBlogs] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTermDebounced, setSearchTermDebounced] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [featuredTab, setFeaturedTab] = useState("Popular");
  const [loading, setLoading] = useState(false);
  const blogsPerPage = 9;

  const featuredRef = useRef<HTMLDivElement>(null);
  const paginationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchTermDebounced(searchTerm);
      setCurrentPage(1);
    }, 500);
    return () => clearTimeout(timeout);
  }, [searchTerm]);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (searchTermDebounced) params.append("search", searchTermDebounced);
        if (selectedCategory) params.append("category", selectedCategory);
        params.append("page", currentPage.toString());
        params.append("limit", blogsPerPage.toString());

        const res = await fetch(`/api/blog/list?${params.toString()}`);
        const data = await res.json();
        const allPosts = data.posts || [];
        setTotalPages(Math.ceil(data.total / blogsPerPage));
        setBlogs(allPosts); // Only non-featured blogs fetched here now

      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, [searchTermDebounced, selectedCategory, currentPage]);

  useEffect(() => {
    const fetchFeaturedBlogs = async () => {
      try {
        const res = await fetch("/api/blog/featured");
        const data = await res.json();
        console.log("just chceking");
        
        console.log(data.blogs);
        
        setFeaturedBlogs(data.blogs || []);
      } catch (error) {
        console.error("Failed to fetch featured blogs:", error);
      }
    };

    fetchFeaturedBlogs();
  }, []);


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/category");
        const data = await res.json();
        setCategories(data || []);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (featuredRef.current && featuredRef.current.children.length > 0) {
      requestAnimationFrame(() => {
        gsap.fromTo(
          featuredRef.current!.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out",
          }
        );
      });
    }
  }, [featuredTab, featuredBlogs]);

  useEffect(() => {
    if (paginationRef.current && paginationRef.current.children.length > 0) {
      requestAnimationFrame(() => {
        gsap.fromTo(
          paginationRef.current!.children,
          { scale: 0.8, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.3,
            stagger: 0.05,
            ease: "back.out(1.7)",
          }
        );
      });
    }
  }, [currentPage]);

  const featuredSorted = [...featuredBlogs].sort((a, b) =>
    featuredTab === "Popular"
      ? b.popularity - a.popularity
      : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="bg-white text-black">
      <section className="max-w-screen-xl mx-auto px-4 py-16">
        {/* Featured */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">
            OUR FEATURED <span className="underline decoration-yellow-400">BLOG</span>
          </h1>
          <div className="flex gap-2">
            {["Popular", "Recent"].map((tab) => (
              <button
                key={tab}
                onClick={() => setFeaturedTab(tab)}
                className={`px-4 py-1 rounded-full text-sm border ${featuredTab === tab
                    ? "bg-yellow-400 text-black"
                    : "bg-white text-gray-600 border-gray-300"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {featuredSorted.length > 0 && (
          <div className="grid md:grid-cols-3 gap-6 mb-12" ref={featuredRef}>
            {featuredSorted.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        )}

        {/* Filters */}
        <div className="bg-gray-50 p-4 rounded-md mb-8">
          <div className="flex items-center gap-2 border px-4 py-2 rounded-full bg-white mb-4">
            <Search size={16} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search Blogs"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="outline-none w-full bg-transparent text-sm"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto whitespace-nowrap text-sm">
            <button
              onClick={() => {
                setSelectedCategory("");
                setCurrentPage(1);
              }}
              className={`px-4 py-1 rounded-full border ${selectedCategory === ""
                  ? "bg-yellow-400 text-black"
                  : "bg-white text-gray-600 border-gray-300"
                }`}
            >
              All Categories
            </button>
            {categories.map((cat) => (
              <button
                key={cat._id}
                onClick={() => {
                  setSelectedCategory(cat._id);
                  setCurrentPage(1);
                }}
                className={`px-4 py-1 rounded-full border ${selectedCategory === cat._id
                    ? "bg-yellow-400 text-black"
                    : "bg-white text-gray-600 border-gray-300"
                  }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Blogs Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full text-center py-10">
              <span className="inline-block h-6 w-6 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></span>
            </div>
          ) : (
            blogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div ref={paginationRef} className="mt-10 flex justify-center gap-2 flex-wrap">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => setCurrentPage(num)}
                className={`w-8 h-8 rounded-full text-sm font-medium ${currentPage === num
                    ? "bg-black text-white"
                    : "bg-gray-200 text-black"
                  }`}
              >
                {num}
              </button>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

const BlogCard = ({ blog }: { blog: BlogPost }) => (
  <div className="space-y-2">
    <Image
      src={blog.coverImage}
      alt={blog.title}
      width={400}
      height={250}
      className="rounded-md w-full h-[220px] object-cover"
    />
    <div className="flex items-center text-xs text-gray-500 gap-4">
      <span className="flex items-center gap-1">
        <Clock size={14} /> {blog.readTime} min read
      </span>
      <span className="flex items-center gap-1">
        <Calendar size={14} /> {new Date(blog.createdAt).toLocaleDateString()}
      </span>
    </div>
    <h3 className="text-sm font-semibold leading-snug">{blog.title}</h3>
    <Link
      href={`/blog/${blog._id}`}
      className="text-xs text-yellow-600 font-medium hover:underline"
    >
      Read More →
    </Link>
  </div>
);
