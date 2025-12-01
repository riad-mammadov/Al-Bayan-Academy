import Image from "next/image";

export default function AboutPage() {
  return (
    <section className="bg-white w-full min-h-screen">
      <section className="bg-linear-to-br from-[#F5F3F0] via-[#FAF9F7] to-[#F0EDE8] py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-playfair-display text-[#0F3B56] mb-4">
            About Al Bayan Academy
          </h1>
          <p className="text-gray-700 max-w-3xl mx-auto font-light text-md">
            Dedicated to providing authentic, high-quality Quranic and Islamic
            education with a personalised and spiritually uplifting approach.
          </p>
        </div>
      </section>

      {/* About the Academy */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div className="max-w-xl">
            <h2 className="text-3xl font-playfair-display text-[#0F3B56] mb-6">
              Our Mission
            </h2>
            <p className="text-gray-700 font-light leading-relaxed mb-4">
              At Al-Bayan Academy, we are committed to nurturing a meaningful
              and authentic connection with the Qur'an through accessible,
              high-quality Islamic education. As a leading Qur'an academy, we
              specialize in guiding students through Tajweed, Qur’an
              memorization (Hifz), and the pursuit of Ijazah, rooted in
              traditional scholarship.
            </p>
            <p className="text-gray-700 font-light leading-relaxed mb-4">
              Our programs are led by highly experienced and qualified teachers,
              including Ustatha Bayan Hawwa, who hold authentic Ijazah
              (certification) with unbroken chains (sanad) tracing back to the
              Prophet Muhammad ﷺ. With their deep knowledge and personal
              dedication, they ensure every student learns the Qur'an with
              precision, reverence, and a strong foundation in classical
              methodology.
            </p>
            <p className="text-gray-700 font-light leading-relaxed">
              Whether you are just beginning your journey or seeking advanced
              certification, our courses are designed to meet you at your level,
              with flexible scheduling and one-on-one attention. At Al-Bayan
              Academy, you will find: Certified instructors with sanad linking
              directly to the Prophet ﷺ A structured curriculum in Tajweed for
              accurate and beautiful recitation Comprehensive Hifz programs
              tailored for long-term retention Step-by-step guidance to earn
              Ijazah in recitation or memorization Personalized learning plans
              and global access to classes More than just a school, Al-Bayan
              Academy is a trusted place of spiritual growth, traditional
              learning, and connection to the living legacy of the Qur'an.
            </p>
          </div>

          {/* Image Placeholder */}
          <div className="relative h-20 md:h-96 rounded-xl overflow-hidden shadow-lg border border-[#E5E0D9] bg-gradient-to-br from-[#D4E3ED] to-[#E8E3DC]">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center object-scale-down">
                <img src="/albayan.png" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Ustatha Bayan */}
      <section className="py-20 px-6 bg-[#F8F6F2]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Image Placeholder */}
          <div className="relative h-72 md:h-96 rounded-xl overflow-hidden shadow-lg border border-[#E5E0D9] bg-gradient-to-br from-[#D4E3ED] to-[#E8E3DC] order-2 md:order-1">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <svg
                  className="w-20 h-20 mx-auto text-[#2C5F7C] opacity-30 mb-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                ></svg>
                <p className="text-gray-600 text-sm font-light">
                  Sheikha Bayan image placeholder
                </p>
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="max-w-xl order-1 md:order-2">
            <h2 className="text-3xl font-playfair-display text-[#0F3B56] mb-6">
              About Ustatha Bayan Hawwa
            </h2>
            <p className="text-gray-700 font-light leading-relaxed mb-4">
              For over 23 years, Ustatha Bayan Hawwa has been teaching the
              Qur'an and Tajweed with passion and excellence. Through Al Bayan
              Academy, she offers a wide range of Qur'an and Tajweed courses,
              delivers inspiring lectures across the UK, and has guided hundreds
              of sisters – many of whom have gone on to achieve Ijaza and teach
              themselves. Join our growing community and share your experience –
              your feedback inspires us to keep serving the Qur'an.”
            </p>
            <p className="text-gray-700 font-light leading-relaxed mb-4">
              Over the years, she has taught students of all levels — beginners
              to advanced — helping them improve their recitation, memorisation,
              and understanding with confidence.
            </p>
            <p className="text-gray-700 font-light leading-relaxed">
              She is known for her calm teaching style, ability to simplify
              complex rules, and her commitment to every student’s spiritual and
              academic growth.
            </p>
          </div>
        </div>
      </section>
    </section>
  );
}
