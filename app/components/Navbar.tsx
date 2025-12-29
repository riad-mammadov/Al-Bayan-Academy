"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [authState, setAuthState] = useState({
    auth: false,
    user: null,
  });
  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Classes", href: "/classes" },
    { label: "Bookings", href: "/book" },
    { label: "Contact", href: "/contact" },
  ];

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("http://127.0.0.1:5000/auth/me", {
          credentials: "include",
        });

        const data = await res.json();
        console.log(data);
        if (data.authenticated) {
          setAuthState({
            auth: true,
            user: data.user,
          });
        } else {
          setAuthState({
            auth: false,
            user: null,
          });
        }
      } catch (err) {
        setAuthState({ auth: false, user: null });
      }
    }

    checkAuth();
  }, []);

  const handleLogout = async () => {
    await fetch("http://127.0.0.1:5000/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    setAuthState({ auth: false, user: null });

    window.location.href = "/";
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#2F2B66]/80 border-b-4 border-[#D9B14C]! backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/albayan-no-text.png"
              alt="Logo"
              width={45}
              height={45}
              className="object-contain"
            />
            <span
              className="font-playfair-display tracking-wide text-xl text-[#ffffff] relative
                 transition-all hover:text-[#F6CB59] cursor-pointer 
                 "
            >
              Al-Bayan Academy
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-5">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative text-[#ffffff] text-md font-playfair-display
                 transition-all hover:text-[#F6CB59] 
                 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0
                 after:bg-[#F6CB59] after:transition-all after:duration-300
                 hover:after:w-full`}
              >
                {item.label}
              </Link>
            ))}
            {authState.auth && authState.user && (
              <Link
                href={`/dashboard/${authState.user}`}
                className="relative text-[#ffffff] text-md font-playfair-display
                 transition-all hover:text-[#F6CB59] 
                 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0
                 after:bg-[#F6CB59] after:transition-all after:duration-300
                 hover:after:w-full"
              >
                Dashboard
              </Link>
            )}

            {/* Login OR Logout */}
            {!authState.auth ? (
              <Link
                href="/login"
                className="relative text-[#ffffff] text-md font-playfair-display
                 transition-all hover:text-[#F6CB59] 
                 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0
                 after:bg-[#F6CB59] after:transition-all after:duration-300
                 hover:after:w-full"
              >
                Login
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className="relative text-[#ffffff] text-md font-playfair-display
                 transition-all hover:text-[#F6CB59] 
                 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0
                 after:bg-[#F6CB59] after:transition-all after:duration-300
                 hover:after:w-full"
              >
                Logout
              </button>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white hover:text-[#0F3B56] p-2 transition"
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 
        ${isOpen ? "max-h-[600px]" : "max-h-0"}`}
      >
        <div className="bg-white px-6 py-4 border-t border-[#E5E0D9]/60 space-y-2">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 rounded-md bg-[#F8F6F2]/70 text-white font-serif
                         hover:bg-[#E8E3DC] hover:text-[#0F3B56] transition-all text-lg"
            >
              {item.label}
            </Link>
          ))}

          <Link
            href="/login"
            onClick={() => setIsOpen(false)}
            className="block px-4 py-3 rounded-md bg-[#0F3B56] text-white font-serif text-center
                       hover:bg-[#0c2e42] transition-all"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}
