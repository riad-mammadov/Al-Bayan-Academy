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

  const handleSubmit = async (e) => {
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

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <section className="bg-white w-full min-h-screen">
      {/* Header */}
      <section className="bg-linear-to-br from-[#F5F3F0] via-[#FAF9F7] to-[#F0EDE8] py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-playfair-display text-[#0F3B56] mb-4">
            Contact Us
          </h1>
          <p className="text-gray-700 max-w-2xl mx-auto font-light text-md">
            We would love to hear from you. Whether it’s a question, booking
            enquiry, or general message, feel free to reach out.
          </p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <Card className="border border-[#E5E0D9] bg-gradient-to-br from-[#FDFDFB] to-[#F8F6F2] shadow-sm rounded-xl">
            <CardHeader>
              <CardTitle className="font-playfair-display text-2xl font-light text-[#0F3B56]">
                Send Us a Message
              </CardTitle>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-gray-800">
                    Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-2 bg-[#F5F3F0] border-[#E5E0D9] rounded-lg focus-visible:ring-[#2C5F7C]"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-gray-800">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-2 bg-[#F5F3F0] border-[#E5E0D9] rounded-lg focus-visible:ring-[#2C5F7C]"
                  />
                </div>

                <div>
                  <Label htmlFor="message" className="text-gray-800">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="mt-2 bg-[#F5F3F0] border-[#E5E0D9] rounded-lg focus-visible:ring-[#2C5F7C]"
                  />
                </div>

                {/* Status messages */}
                {status === "success" && (
                  <p className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
                    Thank you! Your message has been sent.
                  </p>
                )}

                {status === "error" && (
                  <p className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
                    Something went wrong. Please try again.
                  </p>
                )}

                <Button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full bg-[#0F3B56] hover:bg-[#134768] text-white rounded-lg py-3 text-md transition"
                >
                  {status === "loading" ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Additional contact info */}
          <div className="mt-14 text-center">
            <h2 className="text-2xl font-playfair-display text-[#0F3B56] mb-4">
              Other Ways to Reach Us
            </h2>
            <p className="text-gray-700 font-light">
              Email: info@albayanacademy.com
            </p>
            <p className="text-gray-700 font-light">Phone: +44 7956 921 241</p>
            <div className="flex items-center justify-center mt-2 space-x-4">
              <Instagram />
              <FacebookIcon />
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
