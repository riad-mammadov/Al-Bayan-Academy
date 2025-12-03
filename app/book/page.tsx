"use client";

import { useState } from "react";
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
  title: string;
  desc: string;
}

export default function BookingsPage() {
  const [selectedBooking, setSelectedBooking] = useState<Bookings | null>(null);

  const studentBookings = [
    {
      title: "One to One Lessons",
      desc: "Request personalised Qur’an or Arabic lessons with flexible scheduling.",
    },
    {
      title: "Consultations",
      desc: "Book a consultation for study plans, teaching guidance, or spiritual direction.",
    },
    {
      title: "Teacher Assessments",
      desc: "Request an evaluation, Ijazah testing, or teaching readiness assessment.",
    },
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

  const openForm = (booking: Bookings) => setSelectedBooking(booking);
  const closeForm = () => setSelectedBooking(null);

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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20">
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
                  onClick={() => openForm(item)}
                  className="mt-8 w-fit px-4 py-2 bg-[#5b56a5] text-white rounded-lg text-sm font-medium hover:bg-[#7a74cd] transition"
                >
                  Request Booking
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
        <DialogContent className="max-w-md border border-[#E5E0D9] bg-linear-to-br from-[#FDFDFB] to-[#F8F6F2] rounded-xl">
          <DialogHeader className="space-y-4">
            <DialogTitle className="text-lg font-playfair-display text-[#0F3B56]">
              Request Booking: {selectedBooking?.title}
            </DialogTitle>
            <DialogDescription className="font-roboto font-light text-xs">
              Submit your request and, if a space becomes available, the class
              will appear in your Portal. Once it does, please complete the
              payment via the portal to gain access.
            </DialogDescription>
          </DialogHeader>

          <form className="space-y-4 mt-2">
            <div>
              <Label
                htmlFor="name"
                className="text-gray-700 text-sm font-roboto"
              >
                Full Name
              </Label>
              <Input
                id="name"
                placeholder="Enter your name"
                className="mt-1 bg-[#F5F3F0] border-[#D6D2CC] focus-visible:ring-[#0F3B56] placeholder:text-xs"
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-gray-700">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="mt-2 bg-[#F5F3F0] border-[#D6D2CC] focus-visible:ring-[#0F3B56] placeholder:text-xs"
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-gray-700">
                Extra Details
              </Label>
              <Textarea
                id="description"
                placeholder="Please include helpful details such as your availability (days/times), your Qur’an level, and anything specific you would like to request."
                className="mt-2 bg-[#F5F3F0] border-[#D6D2CC] focus-visible:ring-[#0F3B56] placeholder:text-xs"
              />
            </div>

            <DialogFooter>
              <Button
                type="submit"
                className="w-full bg-[#0F3B56] hover:bg-[#134768] text-white"
              >
                Submit Request
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
}
