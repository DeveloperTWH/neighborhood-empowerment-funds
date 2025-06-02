"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { Search, Clock, Calendar } from "lucide-react";

const blogData = [
  {
    id: "1",
    title: "Learn everything there is to know about the",
    image: "/blog-1.jpg",
    date: "02 Sep 2024",
    readTime: "5 min read",
    category: "Technology",
    featured: true,
    popularity: 10
  },
  {
    id: "2",
    title: "Learn everything there is to know about the",
    image: "/blog-2.jpg",
    date: "02 Sep 2024",
    readTime: "6 min read",
    category: "Art",
    featured: true,
    popularity: 5
  },
  {
    id: "3",
    title: "Learn everything there is to know about the",
    image: "/blog-3.jpg",
    date: "01 Sep 2024",
    readTime: "5 min read",
    category: "AI",
    featured: true,
    popularity: 7
  },
  ...Array.from({ length: 12 }).map((_, i) => ({
    id: `${i + 4}`,
    title: "Learn everything there is to know about the",
    image: `/blog-${(i % 6) + 1}.jpg`,
    date: "02 Sep 2024",
    readTime: `${5 + (i % 3)} min read`,
    category: i % 2 === 0 ? "Tech" : "Design",
    featured: false,
    popularity: Math.floor(Math.random() * 10)
  }))
];

const categories = ["All Categories", "Technology", "Art", "AI", "Design", "Business"];

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [currentPage, setCurrentPage] = useState(1);
  const [featuredTab, setFeaturedTab] = useState("Popular");
  const blogsPerPage = 9;

  const featuredRef = useRef<HTMLDivElement>(null);
  const paginationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (featuredRef.current) {
      gsap.fromTo(
        featuredRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" }
      );
    }
  }, [featuredTab]);

  useEffect(() => {
    if (paginationRef.current) {
      gsap.fromTo(
        paginationRef.current.children,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.3, stagger: 0.05, ease: "back.out(1.7)" }
      );
    }
  }, [currentPage]);

  const filteredBlogs = blogData.filter(
    (blog) =>
      (selectedCategory === "All Categories" || blog.category === selectedCategory) &&
      blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLast = currentPage * blogsPerPage;
  const indexOfFirst = indexOfLast - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  const featuredSorted = blogData
    .filter((b) => b.featured)
    .sort((a, b) =>
      featuredTab === "Popular"
        ? b.popularity - a.popularity
        : new Date(b.date).getTime() - new Date(a.date).getTime()
    );

  return (
    <div className="bg-white text-black">
      <section className="max-w-screen-xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">
            OUR FEATURED <span className="underline decoration-yellow-400">CAMPAIGNS</span>
          </h1>
          <div className="flex gap-2">
            {["Popular", "Recent"].map((tab) => (
              <button
                key={tab}
                onClick={() => setFeaturedTab(tab)}
                className={`px-4 py-1 rounded-full text-sm border ${
                  featuredTab === tab ? "bg-yellow-400 text-black" : "bg-white text-gray-600 border-gray-300"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Blogs */}
        <div className="grid md:grid-cols-3 gap-6 mb-12" ref={featuredRef}>
          {featuredSorted.map((blog) => (
            <div key={blog.id} className="space-y-2">
              <Image src={blog.image} alt={blog.title} width={400} height={250} className="rounded-md w-full h-[220px] object-cover" />
              <div className="flex items-center text-xs text-gray-500 gap-4">
                <span className="flex items-center gap-1"><Clock size={14} /> {blog.readTime}</span>
                <span className="flex items-center gap-1"><Calendar size={14} /> {blog.date}</span>
              </div>
              <h3 className="text-sm font-semibold leading-snug">
                {blog.title}
              </h3>
              <Link href={`/blog/${blog.id}`} className="text-xs text-yellow-600 font-medium hover:underline">
                Read More →
              </Link>
            </div>
          ))}
        </div>

        {/* Search & Filters */}
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
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1 rounded-full border ${selectedCategory === cat ? "bg-yellow-400 text-black" : "bg-white text-gray-600 border-gray-300"}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentBlogs.map((blog) => (
            <div key={blog.id} className="space-y-2">
              <Image src={blog.image} alt={blog.title} width={400} height={250} className="rounded-md w-full h-[220px] object-cover" />
              <div className="flex items-center text-xs text-gray-500 gap-4">
                <span className="flex items-center gap-1"><Clock size={14} /> {blog.readTime}</span>
                <span className="flex items-center gap-1"><Calendar size={14} /> {blog.date}</span>
              </div>
              <h3 className="text-sm font-semibold leading-snug">
                {blog.title}
              </h3>
              <Link href={`/blog/${blog.id}`} className="text-xs text-yellow-600 font-medium hover:underline">
                Read More →
              </Link>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div ref={paginationRef} className="mt-10 flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => setCurrentPage(num)}
              className={`w-8 h-8 rounded-full text-sm font-medium ${currentPage === num ? "bg-black text-white" : "bg-gray-200 text-black"}`}
            >
              {num}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
