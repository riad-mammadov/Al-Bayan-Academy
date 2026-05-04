import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function QuickLinks() {
  const items = [
    { title: "Get Started", href: "/login" },
    { title: "Bookings", href: "/book" },
    { title: "Classes", href: "/classes" },
    { title: "Contact", href: "/contact" },
  ];

  return (
    <section className="border-t border-[#E5E0D9] bg-gradient-to-br from-[#F5F3F0] to-[#FAF9F7] px-6 md:px-[6vw] py-16">
      <div className="max-w-4xl mx-auto">
        <p className="text-[0.6rem] tracking-[0.22em] uppercase text-gray-400 mb-8 font-medium text-center">
          Begin Your Journey
        </p>

        <div className="flex flex-wrap justify-center items-center gap-0">
          {items.map((item, index) => (
            <div key={item.title} className="flex items-center">
              <Link
                href={item.href}
                className="group px-8 py-3 text-[0.8rem] tracking-[0.12em] uppercase font-medium text-[#5b56a5] hover:text-[#0F3B56] transition-colors duration-200"
              >
                {item.title}
              </Link>
              {index < items.length - 1 && (
                <span className="hidden md:block w-px h-3 bg-[#E5E0D9]" />
              )}
            </div>
          ))}
        </div>

        {/* Decorative rule */}
        <div className="flex justify-center items-center gap-3 mt-10">
          <div className="w-8 h-px bg-[#5b56a5]" />
          <div className="w-3 h-px bg-[#F6CB59]" />
          <div className="w-8 h-px bg-[#5b56a5]" />
        </div>
      </div>
    </section>
  );
}
