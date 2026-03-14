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
            Our Classes & Programmes
          </h2>

          <p className="text-center text-gray-700 max-w-2xl mx-auto font-light mb-12">
            Explore our current and upcoming classes including Tajweed, Hifz,
            Ijazah preparation, and specialised programmes. Sign in to your
            portal to register your interest.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Tajweed Level 1",
                desc: "Foundations of pronunciation and correct articulation.",
                icon: "📖",
              },
              {
                title: "Tajweed Level 2",
                desc: "Advanced rules with detailed application and practice.",
                icon: "📚",
              },
              {
                title: "Hifz Programme",
                desc: "Structured memorisation with weekly revision cycles.",
                icon: "🕌",
              },
              {
                title: "Ijazah Preparation",
                desc: "For advanced students aiming for sanad certification.",
                icon: "✨",
              },
              {
                title: "Surah Revision Circles",
                desc: "Weekly circles focused on strengthening recitation.",
                icon: "🔄",
              },
              {
                title: "Teacher Training Course",
                desc: "A full programme designed for future Quran teachers.",
                icon: "👩‍🏫",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-gradient-to-br from-[#FDFDFB] to-[#F8F6F2] border border-[#E5E0D9] rounded-xl p-8 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 duration-200 group"
              >
                <div className="text-5xl mb-5 group-hover:scale-110 transition-transform duration-200">
                  {item.icon}
                </div>
                <h3 className="text-xl font-playfair-display text-[#5b56a5] mb-3 group-hover:text-[#7a74cd] transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-700 font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Structure of Lessons */}
      <section className="py-20 px-6 bg-[#F8F6F2]">
        <div className="max-w-7xl mx-auto flex justify-center items-center">
          {/* Text */}
          <div className="max-w-5xl text-left">
            <h2 className="text-3xl text-center font-playfair-display text-[#5b56a5] mb-6">
              Lesson Structure
            </h2>

            <p className="text-gray-700 font-light mb-4">
              All classes begin with a recitation of Surat Al-Fatiha, followed
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

          {/* <div className="relative h-72 md:h-96 rounded-xl overflow-hidden shadow-lg border border-[#E5E0D9] bg-gradient-to-br from-[#D4E3ED] to-[#E8E3DC]">
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
          </div> */}
        </div>
      </section>

      {/* Course Posters */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-playfair-display text-[#5b56a5] mb-4 text-center">
            Featured Courses
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Scan the QR code on each poster to learn more or register for our
            courses.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Surah Al-Waqi'ah",
                subtitle: "Correct Your Recitation",
                duration: "6-week programme",
                qrCode:
                  "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://albayan.academy/courses/waqiah",
              },
              {
                title: "Surah Yaseen",
                subtitle: "Correct Your Recitation",
                duration: "6 weeks",
                qrCode:
                  "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://albayan.academy/courses/yaseen",
              },
              {
                title: "Surah Al-Mulk",
                subtitle: "Intensive Tajweed Course",
                duration: "4-week programme",
                qrCode:
                  "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://albayan.academy/courses/mulk",
              },
              {
                title: "Juz Amma",
                subtitle: "Parts 1 & 2",
                duration: "10-week course",
                qrCode:
                  "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://albayan.academy/courses/juz-amma",
              },
              {
                title: "Juz Tabarak",
                subtitle: "Parts 1 & 2",
                duration: "10–12 week course",
                qrCode:
                  "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://albayan.academy/courses/juz-tabarak",
              },
              {
                title: "Tajweed for Ramadan",
                subtitle: "Seasonal Refresher",
                duration: "Ramadan programme",
                qrCode:
                  "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://albayan.academy/courses/ramadan",
              },
            ].map((course) => (
              <div
                key={course.title}
                className="bg-gradient-to-br from-[#FDFDFB] to-[#F8F6F2] border-2 border-[#E5E0D9] rounded-xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 duration-200"
              >
                <div className="text-center">
                  <h3 className="text-2xl font-playfair-display text-[#5b56a5] mb-1">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 font-light mb-2">
                    {course.subtitle}
                  </p>
                  <p className="text-sm text-gray-500 mb-6">
                    {course.duration}
                  </p>

                  {/* QR Code */}
                  <div className="flex justify-center mb-4">
                    <div className="bg-white p-4 rounded-lg border-2 border-[#E5E0D9] shadow-sm">
                      <img
                        src={course.qrCode}
                        alt={`QR Code for ${course.title}`}
                        className="w-32 h-32"
                      />
                    </div>
                  </div>

                  <p className="text-xs text-gray-500 italic">
                    Scan to learn more
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
