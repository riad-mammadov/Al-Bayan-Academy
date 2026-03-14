"use client";

import { useState } from "react";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { Label } from "@/app/components/ui/label";
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/app/components/ui/card";
import { FacebookIcon, Instagram } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("idle");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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

  const handleChange = (e: any) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <section className="min-h-screen w-full bg-gradient-to-b from-[#F5F2EB] to-[#FAF9F7] px-6 py-16">
      <div className="max-w-3xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-playfair-display text-[#5b56a5] mb-4">
            Contact Us
          </h1>
          <p className="text-gray-700 max-w-2xl mx-auto font-light text-base md:text-md">
            Whether you need help, have a question, or want to enquire about our
            programmes, we’d love to hear from you.
          </p>
        </div>

        {/* Contact Form Card */}
        <Card className="border border-[#E5E0D9] bg-white shadow-sm rounded-xl">
          <CardHeader>
            <CardTitle className="font-playfair-display text-2xl text-[#5b56a5] font-light text-center">
              Send Us a Message
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <Label htmlFor="name" className="text-gray-800 font-light">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-2 bg-[#F5F3F0] border-[#E5E0D9] rounded-lg focus-visible:ring-[#5b56a5]/40"
                />
              </div>

              {/* Email */}
              <div>
                <Label htmlFor="email" className="text-gray-800 font-light">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-2 bg-[#F5F3F0] border-[#E5E0D9] rounded-lg focus-visible:ring-[#5b56a5]/40"
                />
              </div>

              {/* Message */}
              <div>
                <Label htmlFor="message" className="text-gray-800 font-light">
                  Message
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="mt-2 bg-[#F5F3F0] border-[#E5E0D9] rounded-lg focus-visible:ring-[#5b56a5]/40"
                />
              </div>

              {/* Status */}
              {status === "success" && (
                <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg flex items-center gap-2">
                  <svg
                    className="w-5 h-5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <p>Thank you! Your message has been sent.</p>
                </div>
              )}

              {status === "error" && (
                <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-center gap-2">
                  <svg
                    className="w-5 h-5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  <p>Something went wrong. Please try again.</p>
                </div>
              )}

              {/* Button */}
              <Button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-[#5b56a5] hover:bg-[#4f4a94] text-white rounded-lg py-3 text-md transition"
              >
                {status === "loading" ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Additional Contact Info */}
        <div className="text-center mt-12">
          <h2 className="text-2xl font-playfair-display text-[#5b56a5] mb-4">
            Other Ways to Reach Us
          </h2>

          <p className="text-gray-700 font-light">
            Email: info@albayanacademy.com
          </p>
          <p className="text-gray-700 font-light">Phone: +44 7956 921 241</p>

          <div className="flex items-center justify-center mt-6 space-x-6">
            <a
              href="#"
              className="text-[#5b56a5] hover:text-[#7a74cd] transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-6 h-6" />
            </a>
            <a
              href="#"
              className="text-[#5b56a5] hover:text-[#7a74cd] transition-colors"
              aria-label="Facebook"
            >
              <FacebookIcon className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
