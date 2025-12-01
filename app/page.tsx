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
      <section className="py-18 px-4 bg-[#F5F3F0]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl text-center text-[#0F3B56] mb-8 font-playfair-display">
            Latest News
          </h2>
          <div className="bg-white p-8 rounded-lg shadow-md border border-[#E5E0D9]">
            <div className="flex items-start gap-4 sm:gap-5">
              <div className="shrink-0">
                <div className="rounded-full flex items-center justify-center">
                  <img
                    src="/albayan.png"
                    alt="AlBayan Academy Logo"
                    className="h-30 w-20 mt-2"
                  />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  New Course: Advanced Tajweed
                </h3>
                <p className="text-gray-700 mb-4 font-roboto">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aenean non metus sed felis rhoncus molestie et cursus magna.
                  Nam luctus diam in ultricies rutrum. Sed non vehicula nisi,
                  tristique mollis libero. Nulla sollicitudin vulputate dolor ut
                  interdum.{" "}
                  <span className="font-extrabold">
                    TODO: Make it updateable via dashboard
                  </span>
                </p>
                <div className="flex items-center gap-4">
                  <Link
                    href="/courses"
                    className="text-[#2C5F7C] font-semibold hover:text-[#1E4155] underline decoration-2 underline-offset-4 transition-colors"
                  >
                    Learn more →
                  </Link>
                  <span className="text-sm text-gray-600">Nov 29, 2024</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-[#2C5F7C]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6 font-serif">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-xl text-gray-200 mb-8">
            View the courses we have to offer and take your first steps.
          </p>
          <Link
            href="/courses"
            className="inline-block bg-white text-[#2C5F7C] px-8 py-3 rounded-lg font-semibold hover:bg-[#F0EDE8] transition-colors"
          >
            View All Courses
          </Link>
        </div>
      </section>
    </div>
  );
}
