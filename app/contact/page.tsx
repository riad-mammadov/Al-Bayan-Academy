"use client";

import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-5xl font-bold text-gray-900 mb-8 text-center">
          Contact Us
        </h1>

        <div className="bg-[#F0EDE8] p-8 rounded-lg shadow-md border border-[#E5E0D9]">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-800 mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-[#E5E0D9] bg-[#F5F3F0] rounded-lg focus:ring-2 focus:ring-[#2C5F7C] focus:border-transparent"
              />
            </div>

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
                htmlFor="message"
                className="block text-sm font-medium text-gray-800 mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-[#E5E0D9] bg-[#F5F3F0] rounded-lg focus:ring-2 focus:ring-[#2C5F7C] focus:border-transparent"
              />
            </div>

            {status === "success" && (
              <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
                Thank you! Your message has been sent successfully.
              </div>
            )}

            {status === "error" && (
              <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
                There was an error sending your message. Please try again.
              </div>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-[#2C5F7C] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#1E4155] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "loading" ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Other Ways to Reach Us
          </h2>
          <div className="space-y-2 text-gray-700">
            <p>Email: info@albayanacademy.com</p>
            <p>Phone: +1 (555) 123-4567</p>
          </div>
        </div>
      </div>
    </div>
  );
}
