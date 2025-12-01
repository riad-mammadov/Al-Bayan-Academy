import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-linear-to-br from-[#F5F3F0] via-[#FAF9F7] to-[#F0EDE8] py-6 px-8">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-center gap-8">
        {/* Image */}
        <div className="flex justify-center items-center order-2 md:order-1 lg:justify-start">
          <div className="relative w-full max-w-md h-64 md:h-96 rounded-lg overflow-hidden shadow-lg border border-[#E5E0D9] bg-gradient-to-br from-[#D4E3ED] to-[#E8E3DC]">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <svg
                  className="w-20 h-20 mx-auto text-[#2C5F7C] opacity-30 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                ></svg>
                <p className="text-gray-600 text-sm">Welcome Video/Image</p>
              </div>
            </div>
          </div>
        </div>

        {/* Text */}
        <div className="flex flex-col justify-center items-center lg:text-left order-1 md:order-2">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
            <h1 className="text-4xl text-nowrap text-center font-playfair-display text-[#0F3B56]">
              Al-Bayan Academy
            </h1>
            <Image
              src="/albayan-no-text.png"
              alt="Al Bayan Academy Logo"
              width={40}
              height={40}
              className="object-contain"
            />
          </div>
          <p className="text-md text-gray-700 font-light mb-8 max-w-xl">
            Committed to nurturing a meaningful and authentic connection with
            the Qur'an through accessible, high-quality Islamic education. Take
            part in programs led by highly experienced and qualified teachers,
            including{" "}
            <Link
              href="/about"
              className="text-[#2C5F7C] cursor-pointer font-semibold hover:text-[#1E4155] underline decoration-2 underline-offset-4 hover:decoration-[#1E4155] transition-colors"
            >
              Ustatha Bayan Hawwa,
            </Link>{" "}
            who hold authentic Ijazah (certification) with unbroken chains
            (sanad) tracing back to the Prophet Muhammad ﷺ. <br /> <br /> At
            Al-Bayan Academy, students benefit from{" "}
            <strong className="font-semibold text-[#2C5F7C]">certified</strong>{" "}
            instructors, a{" "}
            <strong className="font-semibold text-[#2C5F7C]">
              structured Tajweed{" "}
            </strong>
            curriculum, comprehensive{" "}
            <strong className="font-semibold text-[#2C5F7C]">Hifz</strong>{" "}
            support, personalised{" "}
            <strong className="font-semibold text-[#2C5F7C]">
              learning plans
            </strong>
            , and step-by-step guidance for those pursuing{" "}
            <strong className="font-semibold text-[#2C5F7C]">Ijazah</strong> in
            recitation or memorisation. We are{" "}
            <strong className="font-semibold text-[#2C5F7C]">
              more than just a school
            </strong>
            ; we are a home for spiritual growth, rooted tradition, and an
            enduring connection to the living legacy of the Qur'an.
          </p>

          {/* <div className="flex flex-row bg-black gap-4 sm:gap-6 justify-center lg:justify-center order-3 ">
            <Link
              href="/courses"
              className="px-6 py-3 bg-[#0F3B56] cursor-pointer text-white rounded-md font-medium hover:bg-[#0c2e42] transition"
            >
              View Courses
            </Link>
            <Link
              href="/about"
              className="px-6 py-3 bg-transparent cursor-pointer border border-[#0F3B56]! text-[#0F3B56] rounded-md font-medium hover:bg-[#E8E3DC] transition"
            >
              About Us
            </Link>
          </div> */}
        </div>
      </div>
    </section>
  );
}
