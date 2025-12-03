import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <section className="py-16 px-4 sm:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          <div className="max-w-2xl mx-auto text-left gap-0">
            <h2 className="text-3xl text-center md:text-left text-[#5b56a5] mb-4 font-playfair-display">
              About Ustatha Bayan Hawwa
            </h2>
            <p className="text-sm lg:text-base font-light text-gray-700 mb-4 ">
              Ustatha Bayan Hawwa has devoted her life to teaching the Qur’an
              and Tajweed with passion and excellence. Through Al-Bayan Academy,
              she has guided hundreds of students — many of whom went on to
              achieve Ijazah and become teachers themselves — while also
              delivering inspiring lectures and programs across the UK.
            </p>
            <p className="text-sm lg:text-base text-gray-700 font-light mb-6">
              Beyond teaching, she is an accomplished author in Arabic poetry,
              known for her eloquent nasheeds and heartfelt writings that
              inspire spiritual reflection. She has participated in many
              community events, webinars, and educational programmes, where her
              calm presence and depth of knowledge continue to benefit students
              across the globe.
            </p>
            <Link
              href="/about"
              className="inline-block text-[#5b56a5] font-semibold hover:text-[#F6CB59] underline decoration-2 underline-offset-4 transition-colors"
            >
              Learn more →
            </Link>
          </div>
          {/* Image Section */}
          <div className="flex justify-center md:justify-end">
            <div className="relative w-full max-w-sm md:max-w-md">
              <Link href="https://www.amazon.co.uk/dp/B0DSCB139X" target="tab">
                <img
                  src="/book-bg.jpg"
                  alt="Book"
                  className="w-full max-h-64 md:max-h-72 object-cover rounded-2xl bg-[#EFECE6]"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
