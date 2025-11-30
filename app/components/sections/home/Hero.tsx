import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-linear-to-br from-[#F5F3F0] via-[#FAF9F7] to-[#F0EDE8] py-6 px-4">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
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
          <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
            <Image
              src="/albayan-no-text.png"
              alt="Al Bayan Academy Logo"
              width={70}
              height={70}
              className="object-contain"
            />
            <h1 className="text-3xl text-nowrap font-bold text-center font-serif text-[#0F3B56]">
              Al Bayan Academy
            </h1>
          </div>

          <p className="lg:text-lg text-md text-gray-700 font-serif mb-8 max-w-xl">
            Excellence in Quranic education and Islamic studies. Learn with{" "}
            <Link
              href="/about"
              className="text-[#2C5F7C] cursor-pointer font-semibold hover:text-[#1E4155] underline decoration-2 underline-offset-4 hover:decoration-[#1E4155] transition-colors"
            >
              Sheikha Bayan
            </Link>{" "}
            in lessons tailored to your pace, goals, and spiritual growth.
            Al-Bayan Academy strives to ensure students get the support that
            they need Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Aenean non metus sed felis rhoncus molestie et cursus magna. Nam
            luctus diam in ultricies rutrum. Sed non vehicula nisi, tristique
            mollis libero. Nulla sollicitudin vulputate dolor ut interdum.
            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
            posuere cubilia curae; Suspendisse lacinia, nisi dapibus vestibulum
            venenatis, neque nisl commodo dui, vitae sollicitudin tellus nulla
            lobortis mauris.
          </p>
        </div>
        {/* <div className="flex flex-row w-full gap-4 sm:gap-6 justify-center lg:justify-start order-3 ">
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
    </section>
  );
}
