import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <section className="border-t border-[#E5E0D9] px-6 md:px-[6vw] py-20 grid md:grid-cols-2 gap-16 items-center bg-white">
      <div>
        <p className="text-[0.6rem] tracking-[0.22em] uppercase text-gray-400 mb-4 font-medium">
          About
        </p>
        <h2 className="font-['Cormorant_Garamond',serif] font-light text-[clamp(1.8rem,3.5vw,2.8rem)] leading-[1.2] text-[#0F3B56] mb-6">
          Ustatha <span className="italic text-[#5b56a5]">Bayan Hawwa</span>
        </h2>
        <p className="text-[0.9rem] leading-[1.85] text-gray-600 mb-4">
          Ustatha Bayan Hawwa has devoted her life to teaching the Qur'an and
          Tajweed with passion and excellence. Through Al-Bayan Academy, she has
          guided hundreds of students — many of whom went on to achieve Ijazah
          and become teachers themselves — while also delivering inspiring
          lectures and programs across the UK.
        </p>
        <p className="text-[0.9rem] leading-[1.85] text-gray-600 mb-8">
          Beyond teaching, she is an accomplished author in Arabic poetry, known
          for her eloquent nasheeds and heartfelt writings that inspire
          spiritual reflection. She has participated in many community events,
          webinars, and educational programmes, where her calm presence and
          depth of knowledge continue to benefit students across the globe.
        </p>
        <Link
          href="/about"
          className="inline-flex items-center gap-2 text-[0.8rem] tracking-[0.15em] uppercase font-medium text-[#5b56a5] hover:text-[#F6CB59] transition-colors duration-200"
        >
          Learn more
          <span className="w-6 h-px bg-current inline-block" />
        </Link>
      </div>

      <div className="flex justify-center md:justify-end">
        <Link href="https://www.amazon.co.uk/dp/B0DSCB139X" target="_blank">
          <div className="relative w-full max-w-sm overflow-hidden rounded-xl group">
            <img
              src="/book-bg.jpg"
              alt="Book"
              className="w-full max-h-72 object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-black/5" />
          </div>
        </Link>
      </div>
    </section>
  );
}
