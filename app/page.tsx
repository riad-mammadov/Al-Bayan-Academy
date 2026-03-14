import Link from "next/link";
import Image from "next/image";
import { ArrowBigDown, ArrowBigDownDashIcon } from "lucide-react";
import QuickLinks from "./components/sections/home/QuickLinks";
import Hero from "./components/sections/home/Hero";
import About from "./components/sections/home/About";
import Review from "./components/sections/home/Review";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-[#FAF9F7]">
      {/* Hero Section */}
      <Hero />

      {/* About Sheikha Section */}
      <About />
      {/* Quick Links Section */}
      <QuickLinks />

      {/* Reviews Section */}
      <Review />
      {/* Latest News/Course Announcement */}
      <section className="py-20 px-6 bg-gradient-to-b from-[#F5F2EB] via-[#FAF9F7] to-[#F0EDE8]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl text-[#5b56a5] mb-4 font-playfair-display">
              Latest News
            </h2>
            <p className="text-gray-600 font-light">
              Stay updated with our latest courses and announcements
            </p>
          </div>
          <div className="bg-gradient-to-br from-[#FDFDFB] to-[#F8F6F2] p-8 md:p-10 rounded-xl shadow-lg border border-[#E5E0D9] hover:shadow-xl transition-all duration-200">
            <div className="flex items-start gap-6">
              <div className="shrink-0">
                <div className="rounded-lg bg-white p-3 shadow-sm border border-[#E5E0D9]">
                  <img
                    src="/albayan.png"
                    alt="AlBayan Academy Logo"
                    className="h-16 w-auto"
                  />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-playfair-display text-[#0F3B56] mb-3">
                  New Course: Advanced Tajweed
                </h3>
                <p className="text-gray-700 mb-6 font-light leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aenean non metus sed felis rhoncus molestie et cursus magna.
                  Nam luctus diam in ultricies rutrum. Sed non vehicula nisi,
                  tristique mollis libero. Nulla sollicitudin vulputate dolor ut
                  interdum.
                </p>
                <div className="flex items-center gap-6 pt-4 border-t border-[#E5E0D9]">
                  <Link
                    href="/classes"
                    className="text-[#5b56a5] font-medium hover:text-[#7a74cd] underline decoration-2 underline-offset-4 transition-colors flex items-center gap-2"
                  >
                    Learn more
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                  <span className="text-sm text-gray-500">
                    {new Date("2024-11-29").toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-[#5b56a5] via-[#4f4a94] to-[#2C5F7C]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-playfair-display text-white mb-6">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-xl text-gray-100 mb-10 font-light max-w-2xl mx-auto">
            View the classes we have to offer and take your first steps toward
            a deeper connection with the Qur'an.
          </p>
          <Link
            href="/classes"
            className="inline-flex items-center gap-2 bg-white text-[#5b56a5] px-10 py-4 rounded-lg font-medium hover:bg-[#F0EDE8] transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 duration-200"
          >
            View All Classes
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
