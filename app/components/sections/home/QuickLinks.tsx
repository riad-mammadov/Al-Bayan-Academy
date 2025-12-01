import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function QuickLinks() {
  const items = [
    {
      title: "Get Started",
      href: "/login",
      desc: "Create your account and view ongoing lessons and courses.",
    },
    {
      title: "Bookings",
      href: "/bookings",
      desc: "Schedule consultations or request Sheikha Bayan for an event.",
    },
    {
      title: "Courses",
      href: "/courses",
      desc: "Explore Quranic and Islamic studies programmes.",
    },
    {
      title: "Contact",
      href: "/contact",
      desc: "Reach out directly for support or enquiries.",
    },
  ];

  return (
    <section className="py-20 px-6 bg-[#F8F6F2] relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h2 className="text-3xl text-center font-playfair-display text-[#0F3B56] mb-12">
          Begin Your Journey Now
        </h2>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {items.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group p-6 rounded-2xl bg-white border border-[#E8E3DC] shadow-sm
                         hover:shadow-lg hover:-translate-y-1 transition-all duration-300
                         relative overflow-hidden"
            >
              {/* glow on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-[#D4E3ED]/20 to-[#E8E3DC]/20 pointer-events-none" />

              <h3 className="text-xl font-bold font-roboto text-[#0F3B56] mb-3 group-hover:text-[#2C5F7C] transition-colors">
                {item.title}
              </h3>

              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                {item.desc}
              </p>

              {/* Arrow animation */}
              <div className="flex items-center text-[#0F3B56] font-medium group-hover:text-[#2C5F7C]">
                <span className="mr-1">Learn more</span>
                <ArrowRight
                  size={18}
                  className="transform group-hover:translate-x-1 transition-transform duration-300"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
