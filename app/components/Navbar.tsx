"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Menu,
  X,
  Calendar,
  BookOpen,
  Users,
  GraduationCap,
} from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import { Button } from "./ui/button";
import Image from "next/image";

interface NavLink {
  label: string;
  href: string;
}

const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Courses", href: "/courses" },
  { label: "Bookings", href: "/book" },
  { label: "Contact", href: "/contact" },
];
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white/80 shadow-sm sticky top-0 z-50 border-b border-[#E5E0D9] backdrop-blur-sm bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              key="/"
              href="/"
              className=" font-bold text-[#2C5F7C] hover:text-[#1E4155] transition-colors"
            >
              <Image
                src="/albayan-no-text.png"
                alt="AlBayan Academy Logo"
                width={45}
                height={10}
                className="mt-2"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-0.5">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={`${item.href}`}
                className="px-4 py-2 text-md font-serif text-gray-800 hover:text-[#2C5F7C] hover:bg-[#E8E3DC] rounded-md transition-colors"
              >
                {item.label}
              </Link>
            ))}

            <Link
              href="/login"
              className="px-4 py-2 text-md font-serif text-gray-800 hover:text-[#2C5F7C] hover:bg-[#E8E3DC] rounded-md transition-colors"
            >
              Login
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-800 hover:text-[#2C5F7C] focus:outline-none p-2"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white">
            <Link
              href="/"
              className="block px-3 py-2 text-gray-800 hover:text-[#2C5F7C] hover:bg-[#E8E3DC] rounded-md transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="block px-3 py-2 text-gray-800 hover:text-[#2C5F7C] hover:bg-[#E8E3DC] rounded-md transition-colors"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              href="/courses"
              className="block px-3 py-2 text-gray-800 hover:text-[#2C5F7C] hover:bg-[#E8E3DC] rounded-md transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Courses
            </Link>

            {/* Mobile Booking Dropdown */}
            <div className="px-3 py-2">
              <div className="text-sm font-semibold text-gray-900 mb-2">
                Booking
              </div>
              <div className="pl-4 space-y-1">
                <Link
                  href="/courses"
                  className="block px-3 py-2 text-sm text-gray-700 hover:text-[#2C5F7C] hover:bg-[#E8E3DC] rounded-md transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Course Consultation
                </Link>
                <Link
                  href="/contact"
                  className="block px-3 py-2 text-sm text-gray-700 hover:text-[#2C5F7C] hover:bg-[#E8E3DC] rounded-md transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Schedule a Trial
                </Link>
                <Link
                  href="/contact"
                  className="block px-3 py-2 text-sm text-gray-700 hover:text-[#2C5F7C] hover:bg-[#E8E3DC] rounded-md transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Group Classes
                </Link>
                <Link
                  href="/contact"
                  className="block px-3 py-2 text-sm text-gray-700 hover:text-[#2C5F7C] hover:bg-[#E8E3DC] rounded-md transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Private Tutoring
                </Link>
              </div>
            </div>

            <Link
              href="/reviews"
              className="block px-3 py-2 text-gray-800 hover:text-[#2C5F7C] hover:bg-[#E8E3DC] rounded-md transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Reviews
            </Link>
            <Link
              href="/contact"
              className="block px-3 py-2 text-gray-800 hover:text-[#2C5F7C] hover:bg-[#E8E3DC] rounded-md transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            <Link
              href="/login"
              className="block px-3 py-2 text-gray-800 hover:text-[#2C5F7C] hover:bg-[#E8E3DC] rounded-md transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
