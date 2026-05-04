import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-[80vh] flex items-end px-6 md:px-[6vw] pb-20 pt-32 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/bgimg.jpg"
          alt="Background"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-[#0F3B56]/50 z-10" />

      {/* Content */}
      <div className="relative z-20 max-w-3xl">
        <p className="flex items-center gap-4 text-[#F6CB59] text-[0.65rem] tracking-[0.25em] uppercase mb-6 font-medium">
          <span className="w-8 h-px bg-[#F6CB59]" />
          Est. London
        </p>

        <h1 className="font-['Cormorant_Garamond',serif] font-light text-[clamp(3rem,7vw,5.5rem)] leading-[1.0] text-white mb-6">
          Al-Bayan
          <br />
          <span className="italic text-[#c9c5f0]">Academy</span>
        </h1>

        <p className="text-[0.95rem] leading-[1.85] text-white/75 max-w-lg mb-10">
          Nurturing a meaningful connection with the Qur'an through authentic
          scholarship and structured learning, led by Ustatha Bayan Hawwa —
          holder of Ijazah with an unbroken chain tracing back to the Prophet
          Muhammad ﷺ.
        </p>

        <div className="flex items-center gap-6 flex-wrap">
          <Link
            href="/classes"
            className="inline-flex items-center gap-2 text-[0.75rem] tracking-[0.15em] uppercase font-medium text-white hover:text-[#F6CB59] transition-colors duration-200"
          >
            View Classes
            <span className="w-5 h-px bg-current inline-block" />
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-[0.75rem] tracking-[0.15em] uppercase font-medium text-white/50 hover:text-[#F6CB59] transition-colors duration-200"
          >
            About Ustatha Bayan
            <span className="w-5 h-px bg-current inline-block" />
          </Link>
        </div>
      </div>
    </section>
  );
}
