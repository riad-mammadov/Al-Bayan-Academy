'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-amber-600">
              Al Bayan Academy
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-amber-600 transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-amber-600 transition-colors">
              About
            </Link>
            <Link href="/courses" className="text-gray-700 hover:text-amber-600 transition-colors">
              Courses
            </Link>
            <Link href="/reviews" className="text-gray-700 hover:text-amber-600 transition-colors">
              Reviews
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-amber-600 transition-colors">
              Contact
            </Link>
            <Link href="/login" className="text-gray-700 hover:text-amber-600 transition-colors">
              Login
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-amber-600 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
            <Link href="/" className="block px-3 py-2 text-gray-700 hover:text-amber-600">
              Home
            </Link>
            <Link href="/about" className="block px-3 py-2 text-gray-700 hover:text-amber-600">
              About
            </Link>
            <Link href="/courses" className="block px-3 py-2 text-gray-700 hover:text-amber-600">
              Courses
            </Link>
            <Link href="/reviews" className="block px-3 py-2 text-gray-700 hover:text-amber-600">
              Reviews
            </Link>
            <Link href="/contact" className="block px-3 py-2 text-gray-700 hover:text-amber-600">
              Contact
            </Link>
            <Link href="/login" className="block px-3 py-2 text-gray-700 hover:text-amber-600">
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

