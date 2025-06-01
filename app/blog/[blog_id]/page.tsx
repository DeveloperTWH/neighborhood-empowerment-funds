"use client";

import React, { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, Calendar, ChevronLeft, ChevronRight } from "lucide-react";

const blogData = [
  {
    id: "1",
    title: "Learn Everything There Is To Know About The",
    image: "/blog-1.jpg",
    date: "02 Sep 2024",
    readTime: "5 min read",
    tags: ["Tag One", "Tag Two"],
    sections: [
      {
        heading: "",
        content: `Almost 2,500 years ago, the Greek philosopher Heraclitus expounded, “The only thing constant is change.”

This famous adage, particularly relevant in the ever-evolving world of finance and technology, exposes a pressing challenge in the Indian banking sector: a tendency towards technological stagnation.

The recent RBI directive for a leading private bank’s limitations due to outdated technology exposes a crucial truth: in today’s digital age, a one-time investment in tech simply isn’t enough. Much like any other sector, perhaps even more so, the fintech sector requires a steadfast commitment to continuous innovation.

This article delves into the technological advancements driving the modernisation of the fintech sector—cloud computing, big data analytics, and artificial intelligence (AI)—and emphasises the critical need for ongoing tech investments to overcome technological inertia and secure a prosperous and resilient future for the finance industry.`
      },
      {
        heading: "Elevating The Fintech Experience",
        content: `Furthermore, the formal banking system, while comprehensive, often falls short in providing an elevated, personalised experience. Fintechs, on the other hand, excel in customising products to meet specific needs. While a single fintech may not address all issues, a diverse ecosystem of fintechs can collectively solve many financial challenges, offering innovative, inclusive, and tailored services that traditional banks struggle to provide. This holistic approach not only expands access but also enhances the quality of financial services for all customers.

The Indian finance sector stands at a crossroads. Embracing a modern tech stack and fostering a culture of continuous innovation are no longer a matter of choice, but essential steps to navigate the future. Along with continual investment in infrastructure, it is equally key to ensure talent development.

As the fintech landscape evolves, banks and fintechs must continually upgrade their tech infrastructure and talent pool to stay competitive and meet customer expectations. To avoid falling prey to the pitfalls of underutilisation of technology, fintech institutions must fully harness the capabilities of advanced technologies to unlock a future of inclusivity, personalisation, and unparalleled customer service.`
      }
    ]
  }
];

const relatedBlogs = [
  {
    id: "2",
    title: "Learn everything there is to know about the",
    image: "/blog-4.jpg",
    date: "02 Sep 2024",
    readTime: "5 min read"
  },
  {
    id: "3",
    title: "Learn everything there is to know about the",
    image: "/blog-5.jpg",
    date: "02 Sep 2024",
    readTime: "5 min read"
  },
  {
    id: "4",
    title: "Learn everything there is to know about the",
    image: "/blog-6.jpg",
    date: "02 Sep 2024",
    readTime: "5 min read"
  }
];

export default function BlogDetailPage(props: { params: Promise<{ blog_id: string }> }) {
  const { blog_id } = use(props.params);
  const blog = blogData.find((b) => b.id === blog_id) || blogData[0];

  return (
    <div className="bg-white text-black">
      <section className="max-w-screen-md mx-auto px-4 py-16">
        <Image
          src={blog.image}
          alt={blog.title}
          width={800}
          height={400}
          className="rounded-md w-full h-auto object-cover mb-6"
        />

        <div className="flex gap-2 mb-4">
          {blog.tags.map((tag, i) => (
            <span key={i} className="px-3 py-1 text-xs rounded-full bg-gray-100">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center text-xs text-gray-500 gap-4 mb-4">
          <span className="flex items-center gap-1"><Clock size={14} /> {blog.readTime}</span>
          <span className="flex items-center gap-1"><Calendar size={14} /> {blog.date}</span>
        </div>

        <h1 className="text-2xl font-bold mb-6 leading-snug">{blog.title}</h1>

        <div className="text-gray-800 space-y-6 leading-relaxed">
          {blog.sections.map((section, i) => (
            <div key={i}>
              {section.heading && <h2 className="text-xl font-semibold mb-2">{section.heading}</h2>}
              <p className="whitespace-pre-line">{section.content}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Related Blogs */}
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
            <div key={b.id} className="space-y-2">
              <Image src={b.image} alt={b.title} width={400} height={250} className="rounded-md w-full h-[220px] object-cover" />
              <div className="flex items-center text-xs text-gray-500 gap-4">
                <span className="flex items-center gap-1"><Clock size={14} /> {b.readTime}</span>
                <span className="flex items-center gap-1"><Calendar size={14} /> {b.date}</span>
              </div>
              <h3 className="text-sm font-semibold leading-snug">
                {b.title}
              </h3>
              <Link href={`/blog/${b.id}`} className="text-xs text-yellow-600 font-medium hover:underline">
                Read More →
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
