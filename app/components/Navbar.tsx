"use client";

import Link from "next/link";
import { API_URL } from "@/lib/api";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [authState, setAuthState] = useState<{
    auth: boolean;
    user: string | null;
  }>({
    auth: false,
    user: null,
  });
  const [scrolled, setScrolled] = useState(false);

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
        const res = await fetch(`${API_URL}/auth/me`, {
          credentials: "include",
        });
        const data = await res.json();
        setAuthState(
          data.authenticated
            ? { auth: true, user: data.user }
            : { auth: false, user: null },
        );
      } catch {
        setAuthState({ auth: false, user: null });
      }
    }
    checkAuth();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = async () => {
    await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    setAuthState({ auth: false, user: null });
    window.location.href = "/";
  };

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0F3B56]/95 backdrop-blur-md border-b border-white/10"
          : "bg-[#0F3B56] border-b border-white/10"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-[3vw]">
        <div className="flex items-center justify-between h-18 py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/albayan-no-text.png"
              alt="Logo"
              width={36}
              height={36}
              className="object-contain opacity-90 group-hover:opacity-100 transition-opacity"
            />
            <span className="font-['Cormorant_Garamond',serif] font-light text-[1.15rem] tracking-wide text-white group-hover:text-[#F6CB59] transition-colors duration-200">
              Al-Bayan Academy
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[0.7rem] tracking-[0.15em] uppercase font-medium text-white/70 hover:text-[#F6CB59] transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}

            {authState.auth && authState.user && (
              <Link
                href={`/dashboard/${authState.user}`}
                className="text-[0.7rem] tracking-[0.15em] uppercase font-medium text-white/70 hover:text-[#F6CB59] transition-colors duration-200"
              >
                Dashboard
              </Link>
            )}

            {/* Divider */}
            <span className="w-px h-4 bg-white/20" />

            {!authState.auth ? (
              <Link
                href="/login"
                className="text-[0.7rem] tracking-[0.15em] uppercase font-medium text-white hover:text-[#F6CB59] transition-colors duration-200 flex items-center gap-2"
              >
                Sign In
                <span className="w-4 h-px bg-current" />
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className="text-[0.7rem] tracking-[0.15em] uppercase font-medium text-white/70 hover:text-red-400 transition-colors duration-200"
              >
                Sign Out
              </button>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white/80 hover:text-[#F6CB59] transition-colors p-1"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-[500px]" : "max-h-0"
        }`}
      >
        <div className="border-t border-white/10 px-6 py-6 space-y-1">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="block py-3 text-[0.7rem] tracking-[0.15em] uppercase font-medium text-white/70 hover:text-[#F6CB59] transition-colors duration-200 border-b border-white/5"
            >
              {item.label}
            </Link>
          ))}

          {authState.auth && authState.user && (
            <Link
              href={`/dashboard/${authState.user}`}
              onClick={() => setIsOpen(false)}
              className="block py-3 text-[0.7rem] tracking-[0.15em] uppercase font-medium text-white/70 hover:text-[#F6CB59] transition-colors duration-200 border-b border-white/5"
            >
              Dashboard
            </Link>
          )}

          <div className="pt-4">
            {!authState.auth ? (
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="inline-flex items-center gap-2 text-[0.7rem] tracking-[0.15em] uppercase font-medium text-white hover:text-[#F6CB59] transition-colors duration-200"
              >
                Sign In
                <span className="w-4 h-px bg-current" />
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className="text-[0.7rem] tracking-[0.15em] uppercase font-medium text-red-400/80 hover:text-red-400 transition-colors duration-200"
              >
                Sign Out
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
