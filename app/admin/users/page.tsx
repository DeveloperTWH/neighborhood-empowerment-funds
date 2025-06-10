"use client";

import React, { useState } from "react";

export default function UserManagementPage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">User Management</h1>
        <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
          + Add User
        </button>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-3 py-2 rounded w-1/3"
        />
      </div>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Role</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Map users here */}
          <tr>
            <td className="px-4 py-2">John Doe</td>
            <td className="px-4 py-2">john@example.com</td>
            <td className="px-4 py-2">Admin</td>
            <td className="px-4 py-2 text-green-600 font-medium">Active</td>
            <td className="px-4 py-2">
              <button className="text-blue-600 hover:underline mr-2">Edit</button>
              <button className="text-red-600 hover:underline">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
