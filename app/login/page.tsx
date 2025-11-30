"use client";

import { useState } from "react";
import Link from "next/link";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder for login logic
    console.log("Login attempt:", formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen py-20 px-4 flex items-center justify-center bg-[#F5F3F0]">
      <div className="max-w-md w-full">
        <div className="bg-[#F0EDE8] rounded-lg shadow-md p-8 border border-[#E5E0D9]">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
            Login
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-800 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-[#E5E0D9] bg-[#F5F3F0] rounded-lg focus:ring-2 focus:ring-[#2C5F7C] focus:border-transparent"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-800 mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-[#E5E0D9] bg-[#F5F3F0] rounded-lg focus:ring-2 focus:ring-[#2C5F7C] focus:border-transparent"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#2C5F7C] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#1E4155] transition-colors"
            >
              Login
            </button>
          </form>

          <p className="mt-6 text-center text-gray-700">
            Don't have an account?{" "}
            <Link
              href="/contact"
              className="text-[#2C5F7C] hover:text-[#1E4155] font-semibold"
            >
              Contact us
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
