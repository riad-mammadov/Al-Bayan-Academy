"use client";

import { useState } from "react";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { Label } from "@/app/components/ui/label";
import { Button } from "@/app/components/ui/button";
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
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `New message from ${formData.name}`,
          from_name: "Al-Bayan Academy Website",
          to: "riad.mammadov@outlook.com",
          botcheck: "",
        }),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const handleChange = (e: any) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="min-h-screen bg-[#FAF9F7]">
      {/* ── HERO ── */}
      <section className="bg-gradient-to-b from-[#F5F3F0] to-[#FAF9F7] px-6 md:px-[6vw] pt-[16vh] pb-20">
        <p className="flex items-center gap-4 text-[#5b56a5] text-[0.65rem] tracking-[0.25em] uppercase mb-6 font-medium">
          <span className="w-8 h-px bg-[#5b56a5]" />
          Al Bayan Academy
        </p>
        <h1 className="font-['Cormorant_Garamond',serif] font-light text-[clamp(2.8rem,6vw,5rem)] leading-[1.05] text-[#0F3B56] mb-6 max-w-2xl">
          Get in <span className="italic text-[#5b56a5]">Touch</span>
        </h1>
        <p className="text-[0.95rem] leading-[1.85] text-gray-600 max-w-full">
          Whether you need help, have a question, or want to enquire about
          bookings, we'd love to hear from you.
        </p>
      </section>

      {/* ── MAIN CONTENT ── */}
      <section className="border-t border-[#E5E0D9] px-6 md:px-[6vw] py-20 grid md:grid-cols-2 gap-16 items-start">
        {/* LEFT — FORM */}
        <div>
          <p className="text-[0.6rem] tracking-[0.22em] uppercase text-gray-400 mb-6 font-medium">
            Send a message
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label className="text-[0.75rem] tracking-[0.1em] uppercase text-gray-500 font-medium">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="bg-[#F5F3F0] border-[#E5E0D9] rounded-none focus-visible:ring-[#5b56a5]/30"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-[0.75rem] tracking-[0.1em] uppercase text-gray-500 font-medium">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="bg-[#F5F3F0] border-[#E5E0D9] rounded-none focus-visible:ring-[#5b56a5]/30"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-[0.75rem] tracking-[0.1em] uppercase text-gray-500 font-medium">
                Message
              </Label>
              <Textarea
                id="message"
                name="message"
                rows={6}
                required
                value={formData.message}
                onChange={handleChange}
                className="bg-[#F5F3F0] border-[#E5E0D9] rounded-none focus-visible:ring-[#5b56a5]/30"
              />
            </div>

            {status === "success" && (
              <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 text-[0.85rem]">
                Thank you — your message has been sent.
              </div>
            )}
            {status === "error" && (
              <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 text-[0.85rem]">
                Something went wrong. Please try again.
              </div>
            )}

            <Button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-[#5b56a5] hover:bg-[#4f4a94] text-white rounded-none py-3 text-[0.75rem] tracking-[0.12em] uppercase disabled:opacity-50"
            >
              {status === "loading" ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>

        {/* RIGHT — CONTACT INFO */}
        <div className="md:top-28 space-y-10">
          <div>
            <p className="text-[0.6rem] tracking-[0.22em] uppercase text-gray-400 mb-6 font-medium">
              Other ways to reach us
            </p>
            <h2 className="font-['Cormorant_Garamond',serif] font-light text-[clamp(1.5rem,3vw,2.2rem)] leading-[1.2] text-[#0F3B56] mb-8">
              We're always{" "}
              <span className="italic text-[#5b56a5]">happy to help</span>
            </h2>

            <div className="space-y-4 border-t border-[#E5E0D9] pt-6">
              <div>
                <p className="text-[0.65rem] tracking-[0.15em] uppercase text-gray-400 font-medium mb-1">
                  Email
                </p>
                <p className="text-[0.9rem] text-gray-700">
                  info@albayanacademy.com
                </p>
              </div>
              <div>
                <p className="text-[0.65rem] tracking-[0.15em] uppercase text-gray-400 font-medium mb-1">
                  Phone
                </p>
                <p className="text-[0.9rem] text-gray-700">+44 7956 921 241</p>
              </div>
            </div>
          </div>

          <div className="border-t border-[#E5E0D9] pt-6">
            <p className="text-[0.6rem] tracking-[0.22em] uppercase text-gray-400 mb-4 font-medium">
              Follow us
            </p>
            <div className="flex items-center gap-5">
              <a
                href="#"
                className="text-[#5b56a5] hover:text-[#F6CB59] transition-colors duration-200"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-[#5b56a5] hover:text-[#F6CB59] transition-colors duration-200"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
