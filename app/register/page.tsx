"use client";

import { useState } from "react";
import { API_URL } from "@/lib/api";
import Link from "next/link";
import Loading from "../components/ui/loading";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });

      if (!res.ok) {
        let errorMessage = "Could not create account, please try again.";
        try {
          const errorData = await res.json();
          errorMessage = errorData.error || errorMessage;
        } catch {
          errorMessage = `Server error: ${res.status} ${res.statusText}`;
        }
        setError(errorMessage);
        setLoading(false);
        return;
      }

      window.location.href = "/login";
    } catch (err) {
      console.error("Registration error:", err);
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-[#FAF9F7] grid md:grid-cols-2">

      {/* ── LEFT — branding panel ── */}
      <div className="hidden md:flex flex-col justify-between bg-gradient-to-b from-[#F5F3F0] to-[#FAF9F7] border-r border-[#E5E0D9] px-[6vw] py-20">
        <div>
          <p className="flex items-center gap-4 text-[#5b56a5] text-[0.65rem] tracking-[0.25em] uppercase mb-16 font-medium">
            <span className="w-8 h-px bg-[#5b56a5]" />
            Al Bayan Academy
          </p>

          <h2 className="font-['Cormorant_Garamond',serif] font-light text-[clamp(2.5rem,4vw,3.5rem)] leading-[1.1] text-[#0F3B56] mb-6">
            Begin your
            <span className="italic text-[#5b56a5]"> journey</span>
          </h2>

          <p className="text-[0.9rem] leading-[1.85] text-gray-500 max-w-xs">
            Create an account to request classes, view announcements and manage your Qur'an learning journey.
          </p>
        </div>

        <div className="space-y-4">
          {[
            "Authentic Ijazah-certified teaching",
            "Small groups, personal attention",
            "Flexible online scheduling",
          ].map((item) => (
            <div key={item} className="flex items-center gap-3">
              <span className="w-1 h-1 rounded-full bg-[#F6CB59]" />
              <p className="text-[0.8rem] text-gray-500">{item}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── RIGHT — form ── */}
      <div className="flex items-center justify-center px-6 md:px-[6vw] py-20">
        <div className="w-full max-w-sm">

          {/* Mobile only label */}
          <p className="flex items-center gap-4 text-[#5b56a5] text-[0.65rem] tracking-[0.25em] uppercase mb-8 font-medium md:hidden">
            <span className="w-8 h-px bg-[#5b56a5]" />
            Al Bayan Academy
          </p>

          <p className="text-[0.6rem] tracking-[0.22em] uppercase text-gray-400 mb-3 font-medium">
            Student Portal
          </p>
          <h1 className="font-['Cormorant_Garamond',serif] font-light text-[2.2rem] text-[#0F3B56] mb-10">
            Create account
          </h1>

          <form onSubmit={handleRegister} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[0.7rem] tracking-[0.1em] uppercase text-gray-500 font-medium">
                Full Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-[#E5E0D9] bg-[#F5F3F0] text-[0.9rem] text-[#0F3B56] placeholder:text-gray-300 focus:outline-none focus:ring-1 focus:ring-[#5b56a5]/30 focus:border-[#5b56a5]/40 transition-all rounded-none"
                placeholder="Your name"
                required
                value={name}
                onChange={(e) => { setName(e.target.value); setError(null); }}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[0.7rem] tracking-[0.1em] uppercase text-gray-500 font-medium">
                Email Address
              </label>
              <input
                type="email"
                className="w-full px-4 py-3 border border-[#E5E0D9] bg-[#F5F3F0] text-[0.9rem] text-[#0F3B56] placeholder:text-gray-300 focus:outline-none focus:ring-1 focus:ring-[#5b56a5]/30 focus:border-[#5b56a5]/40 transition-all rounded-none"
                placeholder="you@example.com"
                required
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(null); }}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[0.7rem] tracking-[0.1em] uppercase text-gray-500 font-medium">
                Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-3 border border-[#E5E0D9] bg-[#F5F3F0] text-[0.9rem] text-[#0F3B56] placeholder:text-gray-300 focus:outline-none focus:ring-1 focus:ring-[#5b56a5]/30 focus:border-[#5b56a5]/40 transition-all rounded-none"
                placeholder="••••••••••"
                required
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(null); }}
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 px-4 py-3 text-[0.8rem] text-red-800">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#5b56a5] text-white text-[0.75rem] tracking-[0.12em] uppercase font-medium hover:bg-[#4f4a94] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-[#E5E0D9]">
            <p className="text-[0.8rem] text-gray-400">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-[#5b56a5] hover:text-[#F6CB59] transition-colors duration-200 font-medium"
              >
                Sign in
              </Link>
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}