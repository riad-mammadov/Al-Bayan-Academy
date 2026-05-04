"use client";

import { useState } from "react";
import { API_URL } from "@/lib/api";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Button } from "@/app/components/ui/button";
import { Textarea } from "../components/ui/textarea";
import Link from "next/link";

interface Bookings {
  id: number;
  title: string;
  desc: string;
}

export default function BookingsPage() {
  const [selectedBooking, setSelectedBooking] = useState<Bookings | null>(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [extraDetails, setExtraDetails] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const studentBookings = [
    {
      id: 1,
      title: "Weekly Classes",
      desc: "Request to join weekly Qur'an classes at specific weeks.",
    },
  ];

  const eventBookings = [
    {
      title: "Qur'an Recitation at Events",
      desc: "Book a formal recitation for weddings, gatherings, and ceremonies.",
    },
    {
      title: "Lectures and Speaking",
      desc: "Request a lecture or talk at mosques, seminars, and conferences.",
    },
    {
      title: "Nasheed and Poetry",
      desc: "Arrange a spiritual nasheed performance or poetry reading.",
    },
    {
      title: "Guest of Honour",
      desc: "Invite her to attend your event as a distinguished guest.",
    },
    {
      title: "Judging Competitions",
      desc: "Book her to judge Qur'an competitions and recitation events.",
    },
    {
      title: "Custom Workshops",
      desc: "Request a tailored programme or workshop for your centre.",
    },
  ];

  const openForm = (booking: Bookings) => {
    setSelectedBooking(booking);
    setDate("");
    setTime("");
    setExtraDetails("");
  };

  const closeForm = () => {
    setSelectedBooking(null);
    setSubmitting(false);
    setError(null);
    setSuccess(false);
  };

  const handleSubmitRequest = async () => {
    if (!selectedBooking || !date || !time) {
      setError("Please select a date and time");
      return;
    }
    setError(null);
    setSuccess(false);
    try {
      setSubmitting(true);
      const res = await fetch(`${API_URL}/classes/request-lesson`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          class_id: selectedBooking.id,
          date,
          time,
          extra_details: extraDetails,
        }),
      });
      if (res.status === 401) {
        window.location.href = "/login";
        return;
      }
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to submit request");
      }
      setSuccess(true);
      setTimeout(() => {
        closeForm();
        setSuccess(false);
      }, 2000);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F7]">
      {/* ── HERO ── */}
      <section className="bg-gradient-to-b from-[#F5F3F0] to-[#FAF9F7] px-6 md:px-[6vw] pt-[16vh] pb-20">
        <p className="flex items-center gap-4 text-[#5b56a5] text-[0.65rem] tracking-[0.25em] uppercase mb-6 font-medium">
          <span className="w-8 h-px bg-[#5b56a5]" />
          Al Bayan Academy
        </p>
        <h1 className="font-['Cormorant_Garamond',serif] font-light text-[clamp(2.8rem,6vw,5rem)] leading-[1.05] text-[#0F3B56] mb-6 max-w-2xl">
          <span className="italic text-[#5b56a5]">Bookings</span>
        </h1>
        <p className="text-[0.95rem] leading-[1.85] text-gray-600 max-w-lg">
          Request lessons, workshops, event recitations, consultations, and
          more.
        </p>
      </section>

      {/* ── STUDENT BOOKINGS ── */}
      <section className="border-t border-[#E5E0D9] px-6 md:px-[6vw] py-20">
        <div className="flex justify-between items-baseline mb-12 flex-wrap gap-4">
          <div>
            <p className="text-[0.6rem] tracking-[0.22em] uppercase text-gray-400 mb-3 font-medium">
              For students
            </p>
            <h2 className="font-['Cormorant_Garamond',serif] font-light text-[clamp(1.8rem,3vw,2.4rem)] text-[#0F3B56]">
              Student Bookings
            </h2>
          </div>
        </div>

        <div className="grid md:grid-cols-2 border border-[#E5E0D9] divide-x divide-[#E5E0D9]">
          {studentBookings.map((item) => (
            <div
              key={item.title}
              className="p-10 bg-white hover:bg-[#F8F6F2] transition-colors duration-300 flex flex-col justify-between gap-8"
            >
              <div>
                <h3 className="font-['Cormorant_Garamond',serif] text-[1.25rem] text-[#0F3B56] mb-3">
                  {item.title}
                </h3>
                <p className="text-[0.85rem] leading-[1.8] text-gray-500">
                  {item.desc}
                </p>
              </div>
              <button
                onClick={() =>
                  item.title === "Weekly Classes"
                    ? (window.location.href = "/book/classes")
                    : openForm(item)
                }
                className="w-fit text-[0.75rem] tracking-[0.12em] uppercase font-medium text-[#5b56a5] hover:text-[#F6CB59] transition-colors duration-200 flex items-center gap-2"
              >
                {item.title === "Weekly Classes"
                  ? "Book Classes"
                  : "Request Booking"}
                <span className="w-5 h-px bg-current inline-block" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ── EVENT BOOKINGS ── */}
      <section className="border-t border-[#E5E0D9] bg-gradient-to-br from-[#F5F3F0] to-[#FAF9F7] px-6 md:px-[6vw] py-20">
        <div className="flex justify-between items-baseline mb-12 flex-wrap gap-4">
          <div>
            <p className="text-[0.6rem] tracking-[0.22em] uppercase text-gray-400 mb-3 font-medium">
              For events
            </p>
            <h2 className="font-['Cormorant_Garamond',serif] font-light text-[clamp(1.8rem,3vw,2.4rem)] text-[#0F3B56]">
              Event Bookings
            </h2>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 border border-[#E5E0D9] divide-x divide-y divide-[#E5E0D9]">
          {eventBookings.map((item) => (
            <div
              key={item.title}
              className="p-8 bg-white hover:bg-[#F8F6F2] transition-colors duration-300 flex flex-col justify-between gap-6"
            >
              <div>
                <h3 className="font-['Cormorant_Garamond',serif] text-[1.1rem] text-[#0F3B56] mb-2">
                  {item.title}
                </h3>
                <p className="text-[0.85rem] leading-[1.8] text-gray-500">
                  {item.desc}
                </p>
              </div>
              <Link
                href="/contact"
                className="w-fit text-[0.75rem] tracking-[0.12em] uppercase font-medium text-[#5b56a5] hover:text-[#F6CB59] transition-colors duration-200 flex items-center gap-2"
              >
                Contact us
                <span className="w-5 h-px bg-current inline-block" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ── DIALOG ── */}
      <Dialog open={!!selectedBooking} onOpenChange={closeForm}>
        <DialogContent className="max-w-md border border-[#E5E0D9] bg-white rounded-none">
          <DialogHeader>
            <DialogTitle className="font-['Cormorant_Garamond',serif] font-light text-xl text-[#0F3B56]">
              {selectedBooking?.title}
            </DialogTitle>
            <DialogDescription className="text-[0.8rem] text-gray-500 leading-relaxed">
              Enter the details below to make a request. Upon acceptance, you
              will receive payment instructions and your class link.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5">
            <div className="space-y-2">
              <Label className="text-[0.75rem] tracking-[0.1em] uppercase text-gray-500 font-medium">
                Date
              </Label>
              <Input
                type="date"
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                  setError(null);
                }}
                className="bg-[#F5F3F0] border-[#E5E0D9] rounded-none focus-visible:ring-[#5b56a5]/30"
                min={new Date().toISOString().split("T")[0]}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-[0.75rem] tracking-[0.1em] uppercase text-gray-500 font-medium">
                Time
              </Label>
              <Input
                type="time"
                value={time}
                onChange={(e) => {
                  setTime(e.target.value);
                  setError(null);
                }}
                className="bg-[#F5F3F0] border-[#E5E0D9] rounded-none focus-visible:ring-[#5b56a5]/30"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-[0.75rem] tracking-[0.1em] uppercase text-gray-500 font-medium">
                Additional details
              </Label>
              <Textarea
                value={extraDetails}
                onChange={(e) => setExtraDetails(e.target.value)}
                placeholder="Anything else you'd like to add"
                className="bg-[#F5F3F0] border-[#E5E0D9] rounded-none focus-visible:ring-[#5b56a5]/30"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded p-3 text-[0.8rem] text-red-800">
                {error}
              </div>
            )}
            {success && (
              <div className="bg-green-50 border border-green-200 rounded p-3 text-[0.8rem] text-green-800">
                Request submitted successfully!
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              onClick={handleSubmitRequest}
              disabled={submitting || success}
              className="w-full bg-[#5b56a5] text-white hover:bg-[#4f4a94] rounded-none disabled:opacity-50 text-[0.75rem] tracking-[0.1em] uppercase"
            >
              {submitting
                ? "Submitting..."
                : success
                  ? "Submitted!"
                  : "Submit Request"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
