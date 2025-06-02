"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo / Brand */}
        <div className="text-xl font-bold leading-tight">
          Neighborhood Empowerment<br />Funds
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 items-center relative">
          <Link href="/">Home</Link>
          <Link href="#">About</Link>

          {/* Explore Dropdown */}
          <div className="group relative flex items-center space-x-1">
            <button className="flex items-center hover:text-yellow-500">
              Explore <ChevronDown className="w-4 h-4 ml-1" />
            </button>
            <div className="absolute top-full left-0 hidden group-hover:block bg-white shadow-md rounded mt-2 py-2 w-40 z-50">
              <Link href="#" className="block px-4 py-2 hover:bg-gray-100">All Campaigns</Link>
              <Link href="#" className="block px-4 py-2 hover:bg-gray-100">Categories</Link>
              <Link href="#" className="block px-4 py-2 hover:bg-gray-100">Success Stories</Link>
            </div>
          </div>

          {/* Fundraise Dropdown */}
          <div className="group relative flex items-center space-x-1">
            <button className="flex items-center hover:text-yellow-500">
              Fundraise <ChevronDown className="w-4 h-4 ml-1" />
            </button>
            <div className="absolute top-full left-0 hidden group-hover:block bg-white shadow-md rounded mt-2 py-2 w-40 z-50">
              <Link href="#" className="block px-4 py-2 hover:bg-gray-100">Start Campaign</Link>
              <Link href="#" className="block px-4 py-2 hover:bg-gray-100">How It Works</Link>
            </div>
          </div>

          <Link href="#">Help Center</Link>

          {/* Auth Buttons */}
          <div className="space-x-3 ml-4">
            <button className="bg-yellow-400 hover:bg-yellow-500 px-5 py-1 rounded-full text-sm">Join</button>
            <button className="px-5 py-1 text-sm rounded-full border">Sign in</button>
          </div>
        </nav>

        {/* Mobile Hamburger Icon */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3 bg-white shadow">
          <Link href="#" className="block">About</Link>

          <div>
            <p className="font-semibold text-gray-700">Explore</p>
            <div className="ml-3 space-y-1">
              <Link href="#" className="block">All Campaigns</Link>
              <Link href="#" className="block">Categories</Link>
              <Link href="#" className="block">Success Stories</Link>
            </div>
          </div>

          <div>
            <p className="font-semibold text-gray-700">Fundraise</p>
            <div className="ml-3 space-y-1">
              <Link href="#" className="block">Start Campaign</Link>
              <Link href="#" className="block">How It Works</Link>
            </div>
          </div>

          <Link href="#" className="block">Help Center</Link>

          <div className="pt-2 space-y-2">
            <button className="block w-full bg-yellow-400 hover:bg-yellow-500 px-5 py-2 rounded-full text-sm">Join</button>
            <button className="block w-full border px-5 py-2 text-sm rounded-full">Sign in</button>
          </div>
        </div>
      )}
    </header>
  );
}
