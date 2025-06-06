"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";

interface Service {
  _id: string;
  title: string;
  image: string;
  description: string[];
  features: string[];
}

export default function AdminServicePage() {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    axios.get("/api/services").then((res) => {
      setServices(res.data);
    });
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Manage Services</h1>
        <Link
          href="/admin/services/new"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-md transition"
        >
          + Add New
        </Link>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div
            key={service._id}
            className="bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-lg transition p-4 flex flex-col"
          >
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-40 object-cover rounded-xl mb-4 border"
            />

            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {service.title}
            </h2>

            <div className="text-sm text-gray-600 space-y-1 mb-2">
              {service.description.slice(0, 2).map((para, i) => (
                <p key={i} className="line-clamp-2">{para}</p>
              ))}
            </div>

            <ul className="text-sm text-gray-500 list-disc list-inside mb-4">
              {service.features.slice(0, 3).map((feat, i) => (
                <li key={i}>{feat}</li>
              ))}
              {service.features.length > 3 && (
                <li className="text-gray-400 italic">+ more</li>
              )}
            </ul>

            <Link
              href={`/admin/services/edit/${service._id}`}
              className="mt-auto text-blue-600 text-sm font-medium hover:underline"
            >
              Edit Service →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
