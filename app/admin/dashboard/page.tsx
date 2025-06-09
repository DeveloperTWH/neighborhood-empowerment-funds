"use client";

import Link from "next/link";
import {
  Users,
  FileText,
  CreditCard,
  ShieldCheck,
  MessageCircle,
  Tag,
  BarChart3,
  NotebookPen,
  HelpCircle,
  Wrench,
} from "lucide-react";

export default function AdminDashboard() {
  const cards = [
    {
      title: "User Management",
      description: "View and manage platform users.",
      href: "/admin/users",
      icon: <Users className="h-6 w-6 text-indigo-600" />,
    },
    {
      title: "Campaign Management",
      description: "Approve, reject or edit campaigns.",
      href: "/admin/campaigns",
      icon: <FileText className="h-6 w-6 text-indigo-600" />,
    },
    {
      title: "Transactions",
      description: "Track donations and payouts.",
      href: "/admin/transactions",
      icon: <CreditCard className="h-6 w-6 text-indigo-600" />,
    },
    {
      title: "Verification Requests",
      description: "Verify campaign creator identities.",
      href: "/admin/verification",
      icon: <ShieldCheck className="h-6 w-6 text-indigo-600" />,
    },
    {
      title: "Services",
      description: "Manage offered service listings.",
      href: "/admin/services",
      icon: <Wrench className="h-6 w-6 text-indigo-600" />,
    },
    {
      title: "Testimonials",
      description: "Moderate public feedback.",
      href: "/admin/testimonials",
      icon: <MessageCircle className="h-6 w-6 text-indigo-600" />,
    },
    {
      title: "Categories & Tags",
      description: "Organize campaign filters.",
      href: "/admin/categories",
      icon: <Tag className="h-6 w-6 text-indigo-600" />,
    },
    {
      title: "Analytics",
      description: "View platform performance metrics.",
      href: "/admin/analytics",
      icon: <BarChart3 className="h-6 w-6 text-indigo-600" />,
    },
    {
      title: "Blog Manager",
      description: "Publish and manage blog posts.",
      href: "/admin/blog",
      icon: <NotebookPen className="h-6 w-6 text-indigo-600" />,
    },
    {
      title: "FAQs",
      description: "Edit frequently asked questions.",
      href: "/admin/faqs",
      icon: <HelpCircle className="h-6 w-6 text-indigo-600" />,
    },
  ];

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-4xl font-bold mb-10 text-gray-800">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <Link
            key={index}
            href={card.href}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition group"
          >
            <div className="flex items-center mb-4 space-x-4">
              {card.icon}
              <h2 className="text-lg font-semibold text-gray-800 group-hover:text-indigo-600">{card.title}</h2>
            </div>
            <p className="text-sm text-gray-600">{card.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
