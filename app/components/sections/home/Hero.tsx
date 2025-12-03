import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative py-12 px-4 h-fit">
      {/* Background image */}
      <div className="absolute inset-0 z-1">
        <Image
          src="/bgimg.jpg" // or any image you choose
          alt="Background"
          fill
          className="object-cover object-center"
        />
      </div>

      {/* Soft overlay — keeps text readable */}
      <div className="absolute inset-0 bg-[#F5F2EB]/60 z-10"></div>

      <div className="max-w-7xl mx-auto grid items-center gap-4 sm:gap-8">
        {/* Image
        <div className="flex justify-center items-center order-2 md:order-1 lg:justify-start z-10">
          <div className="relative w-full max-w-xl mx-auto md:mx-0">
            <img
              src="/banner.png"
              alt="Banner"
              className="w-full h-auto max-h-80 md:max-h-none object-contain rounded-2xl opacity-95"
            />
          </div>
        </div> */}

        {/* Text */}
        <div className="flex flex-col justify-start items-center lg:text-left order-1 md:order-2 z-10">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
            <h1 className="text-4xl text-nowrap text-left font-light font-playfair-display text-[#5d56ac]">
              Al-Bayan Academy
            </h1>
            {/* <Image
    src="/albayan-no-text.png"
    alt="Al Bayan Academy Logo"
    width={40}
    height={40}
    className="object-contain"
  /> */}
          </div>
          <p
            className="text-slate-100 drop-shadow-xl font-light text-base mb-8 max-w-2xl bg-[#6861bd]/70 rounded-xl p-4 shadow-[0_8px_30px_rgba(0,0,0,0.15)]
"
          >
            Committed to nurturing a meaningful and authentic connection with
            the Qur'an through accessible, high-quality Islamic education. Take
            part in programs led by highly experienced and qualified teachers,
            including{" "}
            <Link
              href="/about"
              className="text-[#F6CB59] cursor-pointer font-semibold hover:text-[#d2b567] underline decoration-2 underline-offset-4 hover:decoration-[#d2b567] transition-colors"
            >
              Ustatha Bayan Hawwa,
            </Link>{" "}
            who hold authentic Ijazah (certification) with unbroken chains
            (sanad) tracing back to the Prophet Muhammad ﷺ. <br /> <br /> At
            Al-Bayan Academy, students benefit from{" "}
            <strong className="font-semibold text-[#F6CB59]">certified</strong>{" "}
            instructors, a{" "}
            <strong className="font-semibold text-[#F6CB59]">
              structured Tajweed{" "}
            </strong>
            curriculum, comprehensive{" "}
            <strong className="font-semibold text-[#F6CB59]">Hifz</strong>{" "}
            support, personalised{" "}
            <strong className="font-semibold text-[#F6CB59]">
              learning plans
            </strong>
            , and step-by-step guidance for those pursuing{" "}
            <strong className="font-semibold text-[#F6CB59]">Ijazah</strong> in
            recitation or memorisation. We are{" "}
            <strong className="font-semibold text-[#F6CB59]">
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
