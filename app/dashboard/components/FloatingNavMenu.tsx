'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, User, Megaphone, PlusCircle, Menu, X } from 'lucide-react';

export default function FloatingNavMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { label: 'Home', href: '/dashboard', icon: Home },
    { label: 'Profile', href: '/dashboard/profile', icon: User },
    { label: 'Campaigns', href: '/dashboard/campaigns', icon: Megaphone },
    { label: 'Add Campaign', href: '/dashboard/create', icon: PlusCircle },
  ];

  // Collapse menu immediately when clicking a nav item
  const onNavItemClick = () => {
    setOpen(false);
  };

  // Collapse menu immediately when clicking outside
  useEffect(() => {
    if (!open) return;

    const onClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('click', onClickOutside);

    return () => {
      document.removeEventListener('click', onClickOutside);
    };
  }, [open]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Menu Items */}
      <div
        ref={menuRef}
        className={`flex flex-col gap-2 transform transition-all duration-300 ${
          open
            ? 'opacity-100 translate-x-0'
            : 'opacity-0 translate-x-4 pointer-events-none'
        }`}
      >
        {navItems.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href;

          return (
            <Link
              key={label}
              href={href}
              onClick={onNavItemClick} // immediate collapse on click
              className={`flex items-center gap-2 px-4 py-2 rounded-full shadow-md text-sm transition-transform transform ${
                isActive
                  ? 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 hover:shadow-lg'
                  : 'bg-white text-gray-800 hover:bg-gray-100 hover:scale-105 hover:shadow-lg'
              }`}
            >
              <Icon size={20} color={isActive ? 'white' : 'black'} />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>

      {/* Floating Action Button (FAB) */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition"
        aria-label={open ? 'Close menu' : 'Open menu'}
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>
    </div>
  );
}
