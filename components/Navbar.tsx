'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { User, LogIn, Plus, Crown, Settings, CircleHelp, MessageCircle, FileText, MapPin } from 'lucide-react';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const menuItems = [
    { name: 'Login', icon: <LogIn size={18} />, href: '/login' },
    { name: 'New Trip', icon: <Plus size={18} />, href: '/new-trip' },
    { name: 'My Trips', icon: <MapPin size={18} />, href: '/my-trips' },
    { name: 'Manage Subscription', icon: <Crown size={18} />, href: '/subscription' },
    { name: 'Settings', icon: <Settings size={18} />, href: '/settings' },
    { name: 'About', icon: <CircleHelp size={18} />, href: '/about' },
    { name: 'Contact', icon: <MessageCircle size={18} />, href: '/contact' },
    { name: 'Terms of service', icon: <FileText size={18} />, href: '/terms' },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 z-50 w-full bg-white/80 backdrop-blur-lg shadow-sm pb-8 justify-center">
        <div className="max-w-7xl mx-auto flex h-20 items-center justify-between px-6">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <Image
                src="/newlogo.png"
                alt="Pearl Go Logo"
                width={200}
                height={60}
                priority
                className="w-36 sm:w-40 md:w-44 object-contain mt-8 cursor-pointer"
              />
            </Link>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4 mt-8">
            {/* Plan Trip Button */}
            <Link href="/new-trip">
              <button
                type="button"
                className="hidden sm:inline-flex items-center gap-2 rounded-full bg-[#004aad] px-5 py-2 text-sm font-semibold text-white shadow-md hover:bg-[#00337a] hover:shadow-lg transition-all duration-200"
              >
                ✈️ New Trip
              </button>
            </Link>

            {/* Profile Menu */}
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                aria-label="Open user menu"
                onClick={() => setOpen(!open)}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm hover:shadow-md hover:scale-105 transition-all duration-200"
              >
                <User size={20} className="text-gray-600" />
              </button>

              {/* Dropdown */}
              {open && (
                <div className="absolute right-0 mt-4 w-72 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl animate-fadeIn">
                  {/* Header */}
                  <div className="bg-gradient-to-r from-blue-50 to-slate-50 px-5 py-4">
                    <p className="text-sm font-semibold text-gray-800">Welcome to Pearl Go ✨</p>
                    <p className="text-xs text-gray-500">Your smart travel assistant</p>
                  </div>

                  {/* Menu Items */}
                  <div className="py-2">
                    {menuItems.map((item, index) => (
                      <div key={index}>
                        <Link href={item.href} onClick={() => setOpen(false)}>
                          <div className="flex w-full items-center gap-3 px-5 py-3 text-sm text-gray-700 hover:bg-blue-50 transition cursor-pointer">
                            <span className="text-blue-500">{item.icon}</span>
                            <span className="font-medium">{item.name}</span>
                          </div>
                        </Link>

                        {(index === 0 || index === 3) && <hr className="border-gray-100" />}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Space for fixed navbar */}
      <div className="h-20" />

      {/* Animation */}
      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-in-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}
