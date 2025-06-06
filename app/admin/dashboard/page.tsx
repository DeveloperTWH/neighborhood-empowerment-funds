"use client";

import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/admin/services" className="block p-6 bg-white shadow-md rounded hover:bg-gray-50 transition">
          <h2 className="text-xl font-semibold mb-2">Manage Services</h2>
          <p className="text-sm text-gray-600">View, add, edit, or delete service listings.</p>
        </Link>

        <Link href="/admin/faqs" className="block p-6 bg-white shadow-md rounded hover:bg-gray-50 transition">
          <h2 className="text-xl font-semibold mb-2">Manage FAQs</h2>
          <p className="text-sm text-gray-600">Add or edit frequently asked questions.</p>
        </Link>

        <Link href="/admin/testimonials" className="block p-6 bg-white shadow-md rounded hover:bg-gray-50 transition">
          <h2 className="text-xl font-semibold mb-2">Manage Testimonials</h2>
          <p className="text-sm text-gray-600">Update client testimonials.</p>
        </Link>
      </div>
    </div>
  );
}
