import Link from "next/link";

export default function About() {
  return (
    <section className="py-16 px-4 sm:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="max-w-2xl mx-auto text-left">
            <h2 className="text-3xl text-center md:text-left text-[#0F3B56] mb-4 font-playfair-display">
              About Ustatha Bayan Hawwa
            </h2>
            <p className="text-md font-light text-gray-700 mb-4 ">
              Ustatha Bayan Hawwa is a dedicated and experienced teacher of
              Quranic studies and Islamic education. With years of expertise in
              teaching Tajweed, Hifz, and Islamic principles, she brings passion
              and personalized attention to every student.
            </p>
            <p className="text-gray-700 font-light mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              non metus sed felis rhoncus molestie et cursus magna. Nam luctus
              diam in ultricies rutrum. Sed non vehicula nisi, tristique mollis
              libero. Nulla sollicitudin vulputate dolor ut interdum.
            </p>
            <Link
              href="/about"
              className="inline-block text-[#2C5F7C] font-semibold hover:text-[#1E4155] underline decoration-2 underline-offset-4 transition-colors"
            >
              Learn more about Sheikha Bayan →
            </Link>
          </div>
          <div className="relative h-64 md:h-80 rounded-lg overflow-hidden shadow-lg border border-[#E5E0D9] bg-gradient-to-br from-[#D4E3ED] to-[#E8E3DC]">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <svg
                  className="w-20 h-20 mx-auto text-[#2C5F7C] opacity-30 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                ></svg>
                <p className="text-gray-600 text-sm">
                  some image here (maybe of a class)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
