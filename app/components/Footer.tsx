import Link from "next/link";
import Image from "next/image";
import { Mail, Phone } from "lucide-react";

export default function Footer() {
  const quickLinks = [
    { label: "About", href: "/about" },
    { label: "Classes", href: "/classes" },
    { label: "Bookings", href: "/book" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <footer className="relative bg-[#0F3B56] text-white/80 overflow-hidden">
      {/* Top gold accent line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#F6CB59]/60 to-transparent" />

      {/* Subtle decorative glow */}
      <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[#F6CB59]/5 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-[3vw] py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3 group w-fit">
              <Image
                src="/albayan-no-text.png"
                alt="Al-Bayan Academy"
                width={40}
                height={40}
                className="object-contain opacity-90 group-hover:opacity-100 transition-opacity"
              />
              <span className="font-['Cormorant_Garamond',serif] font-light text-xl tracking-wide text-white group-hover:text-[#F6CB59] transition-colors">
                Al-Bayan Academy
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-white/60 max-w-xs">
              Excellence in Quranic learning and Islamic studies, guided by
              tradition and tailored to every student.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:justify-self-center">
            <h4 className="text-[0.7rem] tracking-[0.2em] uppercase font-medium text-[#F6CB59] mb-5">
              Explore
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm text-white/70 hover:text-[#F6CB59] transition-colors duration-200"
                  >
                    <span className="w-3 h-px bg-white/30 transition-all duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:justify-self-end">
            <h4 className="text-[0.7rem] tracking-[0.2em] uppercase font-medium text-[#F6CB59] mb-5">
              Get In Touch
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="mailto:info@albayanacademy.com"
                  className="flex items-center gap-3 text-white/70 hover:text-[#F6CB59] transition-colors"
                >
                  <Mail size={15} className="text-[#F6CB59]/80" />
                  info@albayanacademy.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+447956921241"
                  className="flex items-center gap-3 text-white/70 hover:text-[#F6CB59] transition-colors"
                >
                  <Phone size={15} className="text-[#F6CB59]/80" />
                  +44 7956 921 241
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs tracking-wide text-white/50">
            &copy; {new Date().getFullYear()} Al-Bayan Academy. All rights
            reserved.
          </p>
          <p className="font-['Cormorant_Garamond',serif] italic text-xs text-white/40">
            Knowledge · Tradition · Excellence
          </p>
        </div>
      </div>
    </footer>
  );
}
