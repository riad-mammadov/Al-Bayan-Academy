"use client";

import { useState } from "react";
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
      const res = await fetch(`http://127.0.0.1:5000/auth/register`, {
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
          // If response is not JSON, use status text
          errorMessage = `Server error: ${res.status} ${res.statusText}`;
        }
        setError(errorMessage);
        setLoading(false);
        return;
      }

      const data = await res.json();
      window.location.href = "/login";
    } catch (err) {
      console.error("Registration error:", err);
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <section className="min-h-screen w-full bg-gradient-to-b from-[#F5F2EB] to-[#FAF9F7] flex items-center justify-center px-6 py-10">
      <div className="max-w-md w-full bg-white rounded-xl border border-[#E5E0D9] shadow-sm p-8">
        {/* Heading */}
        <h1 className="text-3xl font-playfair-display text-center text-[#5b56a5] mb-4">
          Create Account
        </h1>
        <p className="text-gray-600 text-center text-sm mb-8">
          Join Al Bayan Academy and begin your journey
        </p>

        {/* Form */}
        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label className="text-gray-700 text-sm font-light">
              Full Name{" "}
            </label>
            <input
              type="text"
              className="w-full mt-1 px-4 py-3 border border-[#E5E0D9] bg-[#F5F3F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5b56a5]/40 focus:border-[#5b56a5]/40 transition-all"
              placeholder="Your Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="text-gray-700 text-sm font-light">
              Email Address
            </label>
            <input
              type="email"
              className="w-full mt-1 px-4 py-3 border border-[#E5E0D9] bg-[#F5F3F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5b56a5]/40 focus:border-[#5b56a5]/40 transition-all"
              placeholder="you@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {/* Email */}

          {/* Password */}
          <div>
            <label className="text-gray-700 text-sm font-light">Password</label>
            <input
              type="password"
              className="w-full mt-1 px-4 py-3 border border-[#E5E0D9] bg-[#F5F3F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5b56a5]/40 focus:border-[#5b56a5]/40 transition-all"
              placeholder="Create a password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
              <svg
                className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#5b56a5] hover:bg-[#4f4a94] text-white rounded-lg transition-all font-medium shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Creating account...
              </span>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        {/* Extra Links */}
        <div className="text-center mt-6">
          <a href="/login" className="text-sm text-[#5b56a5] hover:underline">
            Already have an account? Login
          </a>
        </div>
      </div>
    </section>
  );
}
