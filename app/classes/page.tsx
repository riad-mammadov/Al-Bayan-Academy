import Link from "next/link";

export default function ClassesPage() {
  const classes = [
    {
      title: "Tajweed Level 1",
      desc: "Foundations of pronunciation and correct articulation.",
      num: "01",
    },
    {
      title: "Tajweed Level 2",
      desc: "Advanced rules with deeper application and practice.",
      num: "02",
    },
    {
      title: "Hifz Programme",
      desc: "Structured memorisation with weekly revision cycles.",
      num: "03",
    },
    {
      title: "Ijazah Preparation",
      desc: "Advanced study for students seeking sanad certification.",
      num: "04",
    },
    {
      title: "Surah Revision Circles",
      desc: "Weekly circles strengthening fluency and confidence.",
      num: "05",
    },
    {
      title: "Teacher Training",
      desc: "A structured programme for future Qur'an teachers.",
      num: "06",
    },
  ];

  const courses: {
    title: string;
    subtitle: string;
    duration: string;
    qrCode: string;
  }[] = [
    //   {
    //     title: "Surah Al-Waqi'ah",
    //     subtitle: "Correct Your Recitation",
    //     duration: "6-week programme",
    //     qrCode:
    //       "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://albayan.academy/courses/waqiah",
    //   },
    //   {
    //     title: "Surah Yaseen",
    //     subtitle: "Correct Your Recitation",
    //     duration: "6 weeks",
    //     qrCode:
    //       "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://albayan.academy/courses/yaseen",
    //   },
    //   {
    //     title: "Surah Al-Mulk",
    //     subtitle: "Intensive Tajweed Course",
    //     duration: "4-week programme",
    //     qrCode:
    //       "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://albayan.academy/courses/mulk",
    //   },
    //   {
    //     title: "Juz Amma",
    //     subtitle: "Parts 1 & 2",
    //     duration: "10-week course",
    //     qrCode:
    //       "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://albayan.academy/courses/juz-amma",
    //   },
    //   {
    //     title: "Juz Tabarak",
    //     subtitle: "Parts 1 & 2",
    //     duration: "10–12 week course",
    //     qrCode:
    //       "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://albayan.academy/courses/juz-tabarak",
    //   },
    //   {
    //     title: "Tajweed for Ramadan",
    //     subtitle: "Seasonal Refresher",
    //     duration: "Ramadan programme",
    //     qrCode:
    //       "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://albayan.academy/courses/ramadan",
    //   },
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F7]">
      {/* ── HERO ── */}
      <section className="bg-gradient-to-b from-[#F5F3F0] to-[#FAF9F7] px-6 md:px-[6vw] pt-[16vh] pb-20">
        <p className="flex items-center gap-4 text-[#5b56a5] text-[0.65rem] tracking-[0.25em] uppercase mb-6 font-medium">
          <span className="w-8 h-px bg-[#5b56a5]" />
          Al Bayan Academy
        </p>
        <h1 className="font-['Cormorant_Garamond',serif] font-light text-[clamp(2.8rem,6vw,5rem)] leading-[1.05] text-[#0F3B56] mb-6 max-w-2xl">
          Our <span className="italic text-[#5b56a5]">Classes</span>
        </h1>
        <p className="text-[0.95rem] leading-[1.85] text-gray-600 max-w-lg">
          Weekly Qur'an classes, structured memorisation programmes, and
          specialised courses taught by Ustatha Bayan Hawwa.
        </p>
      </section>

      {/* ── PROGRAMMES ── */}
      <section className="border-t border-[#E5E0D9] px-6 md:px-[6vw] py-20">
        <div className="flex justify-between items-baseline mb-12 flex-wrap gap-4">
          <div>
            <p className="text-[0.6rem] tracking-[0.22em] uppercase text-gray-400 mb-3 font-medium">
              Programmes
            </p>
            <h2 className="font-['Cormorant_Garamond',serif] font-light text-[clamp(1.8rem,3vw,2.4rem)] text-[#0F3B56]">
              Classes & Programmes
            </h2>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 border border-[#E5E0D9] divide-x divide-y divide-[#E5E0D9]">
          {classes.map((item) => (
            <div
              key={item.title}
              className="p-8 bg-white hover:bg-[#F8F6F2] transition-colors duration-300 group"
            >
              <span className="font-['Cormorant_Garamond',serif] text-4xl font-light text-[#5b56a5]/20 leading-none block mb-5 group-hover:text-[#5b56a5]/40 transition-colors duration-300">
                {item.num}
              </span>
              <h3 className="font-['Cormorant_Garamond',serif] text-[1.15rem] text-[#0F3B56] mb-2">
                {item.title}
              </h3>
              <p className="text-[0.85rem] leading-[1.8] text-gray-500">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── LESSON STRUCTURE ── */}
      <section className="border-t border-[#E5E0D9] bg-gradient-to-br from-[#F5F3F0] to-[#FAF9F7] px-6 md:px-[6vw] py-20">
        <div className="grid md:grid-cols-2 gap-16 items-start max-w-6xl">
          <div className="md:top-28">
            <p className="text-[0.6rem] tracking-[0.22em] uppercase text-gray-400 mb-4 font-medium">
              How it works
            </p>
            <h2 className="font-['Cormorant_Garamond',serif] font-light text-[clamp(1.8rem,3.5vw,2.8rem)] leading-[1.2] text-[#0F3B56]">
              Lesson <span className="italic text-[#5b56a5]">Structure</span>
            </h2>
          </div>

          <div className="space-y-5 pt-1">
            {[
              "Each class begins with the recitation of Surat Al-Fatiha followed by guided Qur'an recitation and correction. Lessons last between 1.5 and 2 hours and are taught in small groups of 10 to 15 students.",
              "Students recite directly to the teacher who provides correction on pronunciation, Tajweed rules, articulation, and fluency. Online class links are shared shortly before each session.",
              "Morning classes begin at 10am and evening classes at 7pm, running throughout the week.",
            ].map((p, i) => (
              <p key={i} className="text-[0.9rem] leading-[1.85] text-gray-600">
                {p}
              </p>
            ))}
            <p className="text-[0.9rem] leading-[1.85] text-gray-600">
              If you are interested in joining a class or arranging a private
              session, please visit the{" "}
              <Link
                href="/book"
                className="text-[#5b56a5] underline underline-offset-4 hover:text-[#F6CB59] transition-colors"
              >
                bookings page
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* ── COURSES ── */}
      <section className="border-t border-[#E5E0D9] bg-white px-6 md:px-[6vw] py-20">
        <div className="flex justify-between items-baseline mb-12 flex-wrap gap-4">
          <div>
            <p className="text-[0.6rem] tracking-[0.22em] uppercase text-gray-400 mb-3 font-medium">
              Enrol
            </p>
            <h2 className="font-['Cormorant_Garamond',serif] font-light text-[clamp(1.8rem,3vw,2.4rem)] text-[#0F3B56]">
              Featured Courses
            </h2>
          </div>
        </div>

        {courses.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 border border-[#E5E0D9] divide-x divide-y divide-[#E5E0D9]">
            {courses.map((course) => (
              <div
                key={course.title}
                className="p-8 bg-white hover:bg-[#F8F6F2] transition-colors duration-300 flex flex-col gap-4"
              >
                <div>
                  <h3 className="font-['Cormorant_Garamond',serif] font-light text-[1.3rem] text-[#0F3B56] mb-1">
                    {course.title}
                  </h3>
                  <p className="text-[0.8rem] text-gray-500">
                    {course.subtitle}
                  </p>
                  <p className="text-[0.75rem] tracking-[0.1em] uppercase text-[#5b56a5]/60 mt-1 font-medium">
                    {course.duration}
                  </p>
                </div>

                <div className="flex items-center gap-4 pt-2 border-t border-[#E5E0D9] mt-auto">
                  <div className="bg-[#FAF9F7] border border-[#E5E0D9] p-2 rounded">
                    <img
                      src={course.qrCode}
                      alt={`QR code for ${course.title}`}
                      className="w-16 h-16"
                    />
                  </div>
                  <p className="text-[0.75rem] text-gray-400 italic">
                    Scan to view details and register
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="border border-[#E5E0D9] bg-white px-6 py-20 flex flex-col items-center justify-center text-center">
            <span className="flex items-center gap-3 text-[#5b56a5] text-[0.6rem] tracking-[0.25em] uppercase mb-5 font-medium">
              <span className="w-6 h-px bg-[#5b56a5]" />
              Coming soon
              <span className="w-6 h-px bg-[#5b56a5]" />
            </span>
            <h3 className="font-['Cormorant_Garamond',serif] font-light text-[clamp(1.6rem,3vw,2.2rem)] text-[#0F3B56] mb-3">
              Stay tuned for{" "}
              <span className="italic text-[#5b56a5]">updates</span>
            </h3>
            <p className="text-[0.9rem] leading-[1.85] text-gray-500 max-w-md">
              New featured courses are being prepared. Check back soon, or get
              in touch to be notified when enrolment opens.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 text-[0.75rem] tracking-[0.12em] uppercase font-medium text-[#5b56a5] hover:text-[#F6CB59] transition-colors"
            >
              Contact us
              <span className="w-4 h-px bg-current" />
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
