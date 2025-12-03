import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function QuickLinks() {
  const items = [
    {
      title: "Get Started",
      href: "/login",
      desc: "Create your account and request to join lessons and classes.",
    },
    {
      title: "Bookings",
      href: "/book",
      desc: "Schedule consultations or request Sheikha Bayan for an event.",
    },
    {
      title: "Classes",
      href: "/classes",
      desc: "View upcoming classes and the current schedule for the week.",
    },
    {
      title: "Contact",
      href: "/contact",
      desc: "Reach out directly for support or enquiries.",
    },
  ];

  return (
    <section className="py-20 px-6 bg-[#F5F2EB] relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h2 className="text-3xl text-center font-playfair-display text-[#5b56a5] mb-12">
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
              <h3 className="text-xl font-bold font-roboto text-[#5b56a5] mb-3 group-hover:text-[#7a74cd] transition-colors">
                {item.title}
              </h3>

              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                {item.desc}
              </p>

              {/* Arrow animation */}
              <div className="flex items-center text-[#5b56a5] font-medium group-hover:text-[#F6CB59] transition duration-300">
                <span className="mr-1">Learn more</span>
                <ArrowRight size={18} className="" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
