import Link from "next/link";
import Hero from "./components/sections/home/Hero";
import About from "./components/sections/home/About";
import QuickLinks from "./components/sections/home/QuickLinks";
import Review from "./components/sections/home/Review";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-[#FAF9F7]">
      {/* HERO (unchanged) */}

      <Hero />
      <section className="border-t border-[#E5E0D9] bg-gradient-to-br from-[#F5F3F0] to-[#FAF9F7] px-6 md:px-[6vw] py-20">
        <div className="flex justify-between items-baseline mb-12 flex-wrap gap-4">
          <div>
            <p className="text-[0.6rem] tracking-[0.22em] uppercase text-gray-400 mb-3 font-medium">
              Why choose us
            </p>
            <h2 className="font-['Cormorant_Garamond',serif] font-light text-[clamp(1.8rem,3vw,2.4rem)] text-[#0F3B56]">
              Why Al Bayan Academy
            </h2>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 border border-[#E5E0D9] divide-x divide-y divide-[#E5E0D9]">
          {[
            {
              num: "01",
              title: "Authentic Scholarship",
              desc: "Every teacher holds a recognised Ijazah with an unbroken chain of transmission tracing back to the Prophet ﷺ.",
            },
            {
              num: "02",
              title: "25+ Years Experience",
              desc: "Ustatha Bayan Hawwa has spent over two decades teaching students of all levels, from complete beginners to those seeking Ijazah.",
            },
            {
              num: "03",
              title: "Flexible & Online",
              desc: "Classes run throughout the week with morning and evening sessions, accessible from anywhere in the world via Zoom.",
            },
            {
              num: "04",
              title: "Small Class Groups",
              desc: "Intimate group sizes of 10 to 15 students ensure every student receives individual correction and attention.",
            },
            {
              num: "05",
              title: "Structured Pathway",
              desc: "From foundational Tajweed through to Hifz and Ijazah preparation, every programme follows a clear and proven curriculum.",
            },
            {
              num: "06",
              title: "Proven Results",
              desc: "Nearly fifty students have completed their Ijazah under Ustatha Bayan's supervision and gone on to teach within their own communities.",
            },
          ].map((item) => (
            <div
              key={item.num}
              className="p-8 bg-white hover:bg-[#F8F6F2] transition-colors duration-300 group"
            >
              <span className="font-['Cormorant_Garamond',serif] text-4xl font-light text-[#5b56a5]/20 leading-none block mb-5 group-hover:text-[#5b56a5]/40 transition-colors duration-300">
                {item.num}
              </span>
              <h3 className="font-['Cormorant_Garamond',serif] text-[1.1rem] text-[#0F3B56] mb-2">
                {item.title}
              </h3>
              <p className="text-[0.85rem] leading-[1.8] text-gray-500">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <About />

      {/* QUICK LINKS */}
      <QuickLinks />

      {/* REVIEWS */}
      <Review />

      {/* CTA */}
      <section className="py-24 px-6 bg-gradient-to-br from-[#5b56a5] to-[#4f4a94]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-playfair-display text-white mb-6">
            Begin Your Qur’an Journey
          </h2>

          <p className="text-gray-100 mb-10 max-w-xl mx-auto">
            Explore our classes and take the next step toward strengthening your
            recitation and understanding.
          </p>

          <Link
            href="/classes"
            className="inline-flex items-center gap-2 bg-white text-[#5b56a5] px-8 py-4 rounded-lg font-medium hover:bg-[#F0EDE8] transition"
          >
            View Classes →
          </Link>
        </div>
      </section>
    </div>
  );
}
