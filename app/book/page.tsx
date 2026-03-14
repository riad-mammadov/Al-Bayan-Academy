"use client";

import { useEffect, useState } from "react";
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

  const studentBookings = [
    {
      id: 1,
      title: "Weekly Classes",
      desc: "Request to join weekly Quran classes at specific weeks ",
    },
    {
      id: 2,
      title: "One to One Lessons",
      desc: "Please contact us with a date and time for personalised lessons with flexible scheduling.",
    },
    // {
    //   id: 8,
    //   title: "One to One Lessons",
    //   desc: "Request personalised Qur’an or Arabic lessons with flexible scheduling.",
    // },
    // {
    //   id: 9,
    //   title: "Consultations",
    //   desc: "Book a consultation for study plans, teaching guidance, or spiritual direction.",
    // },
  ];

  const eventBookings = [
    {
      title: "Qur’an Recitation at Events",
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
      desc: "Book her to judge Qur’an competitions and recitation events.",
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

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmitRequest = async () => {
    if (!selectedBooking || !date || !time) {
      setError("Please select a date and time");
      return;
    }

    setError(null);
    setSuccess(false);

    try {
      setSubmitting(true);

      const res = await fetch("http://127.0.0.1:5000/classes/request-lesson", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          class_id: selectedBooking.id,
          date,
          time,
          extra_details: extraDetails,
        }),
      });

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
    <section className="bg-white w-full min-h-screen">
      {/* Page header */}
      <section className="bg-linear-to-br from-[#F5F3F0] via-[#FAF9F7] to-[#F0EDE8] py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-playfair-display text-[#5b56a5] mb-4">
            Bookings
          </h1>
          <p className="text-gray-700 max-w-3xl mx-auto font-light text-md">
            Request lessons, workshops, event recitations, consultations, and
            more.
          </p>
        </div>
      </section>

      {/* Booking categories */}
      <section className="py-20 px-6 ">
        <div className="max-w-7xl mx-auto">
          {/* STUDENT BOOKINGS */}
          <h2 className="text-3xl text-center font-playfair-display text-[#5b56a5] mb-8">
            Student Bookings
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 mb-20">
            {studentBookings.map((item) => (
              <div
                key={item.title}
                className="p-8 bg-gradient-to-br from-[#FDFDFB] to-[#F8F6F2] border border-[#E5E0D9] rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-lg font-playfair-display text-[#0F3B56] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-700 text-sm font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <button
                  onClick={() =>
                    item.title === "Weekly Classes"
                      ? (window.location.href = "/book/classes") // change this to your page
                      : openForm(item)
                  }
                  className="mt-8 w-fit px-4 py-2 bg-[#5b56a5] text-white rounded-lg text-sm font-medium hover:bg-[#7a74cd] transition duration-200"
                >
                  {item.title === "Weekly Classes"
                    ? "Book Classes"
                    : "Request Booking"}{" "}
                </button>
              </div>
            ))}
          </div>

          {/* EVENT BOOKINGS */}
          <h2 className="text-3xl text-center font-playfair-display text-[#0F3B56] mb-8">
            Event Bookings
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {eventBookings.map((item) => (
              <div
                key={item.title}
                className="p-8 bg-linear-to-br from-[#FDFDFB] to-[#F8F6F2] border border-[#E5E0D9] rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-lg font-playfair-display text-[#0F3B56] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-700 text-sm font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <button className="mt-8 w-fit px-4 py-2 bg-[#0F3B56] text-white rounded-lg text-sm font-medium hover:bg-[#134768] transition">
                  <Link href="/contact">Contact</Link>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Dialog open={!!selectedBooking} onOpenChange={closeForm}>
        <DialogContent className="max-w-md border border-[#E5E0D9] bg-white rounded-xl ">
          <DialogHeader>
            <DialogTitle className="font-serif font-medium text-[#5b56a5]">
              Request Booking: {selectedBooking?.title}
            </DialogTitle>
            <DialogDescription className="text-xs text-gray-600">
              Enter the details below to make a request. Upon acceptance of the
              request, you will have to make the neccessary payment to recieve
              the link to the class.
            </DialogDescription>
          </DialogHeader>

          {/* FORM FIELDS */}
          <div className="space-y-6">
            {/* Date */}
            <div className="space-y-2">
              <Label>Date</Label>
              <Input
                type="date"
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                  setError(null);
                }}
                className="bg-[#F5F3F0] border-[#E5E0D9]"
                min={new Date().toISOString().split("T")[0]}
              />
            </div>
            {/* Time */}
            <div className="space-y-2">
              <Label>Time</Label>
              <Input
                type="time"
                value={time}
                onChange={(e) => {
                  setTime(e.target.value);
                  setError(null);
                }}
                className="bg-[#F5F3F0] border-[#E5E0D9]"
              />
            </div>

            {/* EXTRA DETAILS */}
            <div className="space-y-2">
              <Label>Extra details</Label>
              <Textarea
                value={extraDetails}
                onChange={(e) => setExtraDetails(e.target.value)}
                placeholder="Anything else you want to add"
                className="bg-[#F5F3F0] border-[#E5E0D9]"
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

            {/* Success Message */}
            {success && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-start gap-2">
                <svg
                  className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0"
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
                <p className="text-green-800 text-sm">
                  Request submitted successfully!
                </p>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              onClick={handleSubmitRequest}
              disabled={submitting || success}
              className="w-full bg-[#5b56a5] text-white hover:bg-[#7a74cd] disabled:opacity-50"
            >
              {submitting ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Submitting...
                </span>
              ) : success ? (
                "Submitted!"
              ) : (
                "Submit Request"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}
