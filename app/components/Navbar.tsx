'use client';

import { signOut, useSession } from "next-auth/react";
import { useState, useEffect, useRef } from "react";
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, Menu, X } from 'lucide-react';

export default function Navbar() {
  const { data: session } = useSession();
  const user = session?.user;

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Use a ref typed for an HTMLDivElement
  const dropdownRef = useRef<HTMLDivElement>(null);

  const getUserInitial = (name: string | null | undefined) => {
    if (!name) return '';
    return name?.charAt(0).toUpperCase() ?? '';
  };

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // Check if click target is inside dropdownRef element
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center text-xl font-bold leading-tight">
          <Image src="/index/logo.webp" alt="Lift and Lunch Logo" width={230} height={200} priority />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6 items-center relative">
          <Link href="/">Home</Link>
          <Link href="/process">Our Process</Link>

          {/* Explore Dropdown */}
          <div className="group relative flex items-center space-x-1">
            <button className="flex items-center hover:text-yellow-500" type="button">
              Results <ChevronDown className="w-4 h-4 ml-1" />
            </button>
            <div className="absolute top-full left-0 hidden group-hover:block bg-white shadow-md rounded mt-2 py-2 w-40 z-50">
              <Link href="#" className="block px-4 py-2 hover:bg-gray-100">Review</Link>
              <Link href="/campaigns" className="block px-4 py-2 hover:bg-gray-100">Campaigns</Link>
              <Link href="/blog" className="block px-4 py-2 hover:bg-gray-100">Blogs</Link>
            </div>
          </div>

          {/* Fundraise Dropdown */}
          <div className="group relative flex items-center space-x-1">
            <button className="flex items-center hover:text-yellow-500" type="button">
              About Us <ChevronDown className="w-4 h-4 ml-1" />
            </button>
            <div className="absolute top-full left-0 hidden group-hover:block bg-white shadow-md rounded mt-2 py-2 w-40 z-50">
              <Link href="#" className="block px-4 py-2 hover:bg-gray-100">Team</Link>
              <Link href="#" className="block px-4 py-2 hover:bg-gray-100">Tech</Link>
              <Link href="/faq" className="block px-4 py-2 hover:bg-gray-100">FAQs</Link>
            </div>
          </div>

          <Link href="/services">Our Service</Link>
          <Link href="/contact">Contact Us</Link>

          {/* Auth / Avatar */}
          <div className="ml-4 relative">
            {!user ? (
              <div className="space-x-3">
                <Link href="/signup">
                  <button className="bg-yellow-400 hover:bg-yellow-500 px-5 py-1 rounded-full text-sm border border-yellow-400 text-black" type="button">
                    Join
                  </button>
                </Link>
                <Link href="/signin">
                  <button className="hover:bg-yellow-500 px-5 py-1 rounded-full text-sm border hover:border-yellow-400 text-black" type="button">
                    Sign in
                  </button>
                </Link>
              </div>
            ) : (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center text-black font-semibold focus:outline-none"
                  type="button"
                  aria-haspopup="true"
                  aria-expanded={dropdownOpen}
                >
                  {user.avatar ? (
                    <Image
                      src={user.avatar}
                      alt="User Avatar"
                      width={40}
                      height={40}
                      className="rounded-full object-cover"
                    />
                  ) : (
                    getUserInitial(user.name)
                  )}
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md z-50" role="menu">
                    <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                      Profile
                    </Link>
                    <button
                      onClick={() => signOut()}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      type="button"
                      role="menuitem"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          type="button"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3 bg-white shadow" role="menu">
          <Link href="#" className="block" role="menuitem">About</Link>

          <div>
            <p className="font-semibold text-gray-700">Explore</p>
            <div className="ml-3 space-y-1">
              <Link href="#" className="block" role="menuitem">All Campaigns</Link>
              <Link href="#" className="block" role="menuitem">Categories</Link>
              <Link href="#" className="block" role="menuitem">Success Stories</Link>
            </div>
          </div>

          <div>
            <p className="font-semibold text-gray-700">Fundraise</p>
            <div className="ml-3 space-y-1">
              <Link href="#" className="block" role="menuitem">Start Campaign</Link>
              <Link href="#" className="block" role="menuitem">How It Works</Link>
            </div>
          </div>

          <Link href="#" className="block" role="menuitem">Help Center</Link>

          {!user ? (
            <div className="pt-2 space-y-2">
              <Link href="/signup">
                <button className="block w-full bg-yellow-400 hover:bg-yellow-500 px-5 py-2 rounded-full text-sm" type="button">
                  Join
                </button>
              </Link>
              <Link href="/signin">
                <button className="block w-full border px-5 py-2 text-sm rounded-full" type="button">
                  Sign in
                </button>
              </Link>
            </div>
          ) : (
            <div className="pt-4 space-y-2 border-t mt-3">
              <div className="flex items-center space-x-3">
                {user.avatar ? (
                  <Image
                    src={user.avatar}
                    alt="User Avatar"
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                ) : (
                  <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-black font-semibold">
                    {getUserInitial(user.name)}
                  </div>
                )}

                <p className="text-sm font-medium">{user.name}</p>
              </div>
              <Link href="/profile" className="block text-sm text-gray-700 hover:underline" role="menuitem">
                Profile
              </Link>
              <button
                onClick={() => signOut()}
                className="text-left text-sm text-red-600 hover:underline"
                type="button"
                role="menuitem"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
