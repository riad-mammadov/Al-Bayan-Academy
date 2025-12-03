import Image from "next/image";
import Link from "next/link";

export default function ClassesPage() {
  return (
    <div className="min-h-screen w-full bg-[#FAF9F7]">
      {/* Page Header */}
      <section className="bg-linear-to-br from-[#F5F3F0] via-[#FAF9F7] to-[#F0EDE8] py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-playfair-display text-[#5b56a5] mb-4">
            Classes at Al-Bayan Academy
          </h1>
          <p className="text-gray-700 max-w-3xl mx-auto font-light text-md">
            Explore our weekly Qur'an sessions, specialised programmes, and
            upcoming classes taught by Ustatha Bayan Hawwa.
          </p>
        </div>
      </section>

      {/* Featured Classes */}
      <section className="py-20 px-6 bg-[#FAF9F7]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-playfair-display text-[#5B56A5] mb-10 text-center">
            Current Classes & Programmes
          </h2>

          <p className="text-center text-gray-700 max-w-2xl mx-auto font-light mb-12">
            Explore our current and upcoming classes including Tajweed, Hifz,
            Ijazah preparation, and specialised programmes. Sign in to your
            portal to register your interest.
          </p>

          <div className="space-y-8 grid grid-cols-3">
            {[
              {
                title: "Tajweed Level 1",
                desc: "Foundations of pronunciation and correct articulation.",
              },
              {
                title: "Tajweed Level 2",
                desc: "Advanced rules with detailed application and practice.",
              },
              {
                title: "Hifz Programme",
                desc: "Structured memorisation with weekly revision cycles.",
              },
              {
                title: "Ijazah Preparation",
                desc: "For advanced students aiming for sanad certification.",
              },
              {
                title: "Surah Revision Circles",
                desc: "Weekly circles focused on strengthening recitation.",
              },
              {
                title: "Teacher Training Course",
                desc: "A full programme designed for future Quran teachers.",
              },
            ].map((item, index) => (
              <div key={item.title} className="pb-6 border-b border-[#E5E0D9]">
                <h3 className="text-2xl font-playfair-display text-[#0F3B56] mb-2">
                  {index + 1}. {item.title}
                </h3>
                <p className="text-gray-700 font-light max-w-2xl">
                  {item.desc}
                </p>

                {/* <Link
                  href="/classes"
                  className="inline-block mt-3 text-[#5B56A5] font-medium hover:text-[#463F87] underline decoration-2 underline-offset-4"
                >
                  View details
                </Link> */}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Structure of Lessons */}
      <section className="py-20 px-6 bg-[#F8F6F2]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div className="max-w-2xl">
            <h2 className="text-3xl font-playfair-display text-[#5b56a5] mb-6">
              Lesson Structure
            </h2>

            <p className="text-gray-700 font-light mb-4">
              All classes begin with a recitation of Surat Al-Fātiha, followed
              by guided recitation and correction. Each session lasts between
              1.5 and 2 hours and is taught in small groups of 10 to 15 sisters
              for personalised attention.
            </p>

            <p className="text-gray-700 font-light mb-4">
              Lessons focus on reciting the Qur'an from beginning to end with
              correction. The teacher provides feedback on pronunciation,
              Tajweed rules, articulation, and fluency. Links to online classes
              are sent a few minutes before the session begins.
            </p>

            <p className="text-gray-700 font-light">
              Morning classes begin at 10 a.m., and evening classes at 7 p.m.,
              running throughout the week.
              <br /> <br />
            </p>

            <p className="text-gray-700 font-light">
              If you are interested in joining a class, booking a 1-on-1
              session, or arranging an event, please see the{" "}
              <Link
                href="/book"
                className="text-[#5b56a5] cursor-pointer font-semibold hover:text-[#F6CB59] underline decoration-2 underline-offset-4 hover:decoration-[#F6CB59] transition-colors"
              >
                bookings
              </Link>{" "}
              page.
            </p>
          </div>

          {/* Image Placeholder */}
          <div className="relative h-72 md:h-96 rounded-xl overflow-hidden shadow-lg border border-[#E5E0D9] bg-gradient-to-br from-[#D4E3ED] to-[#E8E3DC]">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <svg
                  className="w-20 h-20 mx-auto text-[#2C5F7C] opacity-30 mb-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                ></svg>
                <p className="text-gray-600 text-sm font-light">
                  Class image placeholder
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Past Courses */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-playfair-display text-[#5b56a5] mb-10 text-center">
            Upcoming Classes & Programmes
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 bg-[#F0EDE8] p-6 rounded-xl border border-[#E5E0D9]">
            {[
              {
                title: "Surah Al-Waqi'ah – Correct Your Recitation",
                desc: "6-week Tajweed and recitation improvement programme.",
              },
              {
                title: "Surah Yaseen – Correct Your Recitation",
                desc: "6 weeks with twice-weekly live Zoom sessions.",
              },
              {
                title: "Surah Al-Mulk – Intensive Tajweed Course",
                desc: "4-week focused recitation programme.",
              },
              {
                title: "Juz Amma (Parts 1 & 2)",
                desc: "10-week course improving fluency and Tajweed.",
              },
              {
                title: "Juz Tabarak – Parts 1 & 2",
                desc: "10–12 week structured recitation course.",
              },

              {
                title: "Tajweed for Ramadan",
                desc: "A seasonal refresher course preparing for Ramadan.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-6 flex flex-col justify-between rounded-xl border border-[#E5E0D9] bg-white shadow-sm hover:shadow-md transition-all"
              >
                <h3 className="text-lg font-roboto text-[#5b56a5]">
                  {item.title}
                </h3>
                <p className="text-gray-700 text-sm font-light mt-1">
                  {item.desc}
                </p>
                <Link
                  href="/classes"
                  className="inline-block w-fit mt-3 text-[#5B56A5] font-medium hover:text-[#F6CB59] underline decoration-2 underline-offset-4 duration-100"
                >
                  Express Interest
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
