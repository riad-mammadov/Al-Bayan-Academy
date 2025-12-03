import Image from "next/image";

export default function AboutPage() {
  return (
    <section className="bg-white w-full min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-b from-[#F5F2EB] to-[#FAF9F7] py-16 px-6 md:py-20">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-playfair-display text-[#5b56a5] mb-4">
            About Al Bayan Academy
          </h1>
          <p className="text-gray-700 max-w-2xl md:max-w-3xl mx-auto font-light text-base md:text-md">
            "Guiding students toward a sincere and lasting connection with the
            Qur’an through accessible, high-quality Islamic education."
          </p>
        </div>
      </section>

      {/* About the Academy */}
      <section className="py-10 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Text */}
          <div className="max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-playfair-display text-[#5b56a5] mb-4 md:mb-6">
              Our Mission
            </h2>

            <div className="space-y-4 text-gray-700 font-light leading-relaxed">
              <p>
                At Al-Bayan Academy, we are committed to nurturing a meaningful
                and authentic connection with the Qur'an through accessible,
                high-quality Islamic education. As a leading Qur'an academy, we
                specialize in guiding students through Tajweed, Qur’an
                memorization (Hifz), and the pursuit of Ijazah, rooted in
                traditional scholarship.
              </p>
              <p>
                Our programs are led by highly experienced and qualified
                teachers, including Ustatha Bayan Hawwa, who hold authentic
                Ijazah (certification) with unbroken chains (sanad) tracing back
                to the Prophet Muhammad ﷺ. With their deep knowledge and
                personal dedication, they ensure every student learns the Qur'an
                with precision, reverence, and a strong foundation in classical
                methodology.
              </p>
              <p>
                Whether you are just beginning your journey or seeking advanced
                certification, our courses offer flexible scheduling,
                personalised pathways, progress tracking, and an encouraging
                environment that helps students build a lifelong relationship
                with the Qur'an. . <br /> <br /> We believe that learning the
                Qur'an is a journey of both knowledge and transformation. Our
                curriculum is thoughtfully designed to support learners of all
                levels, offering personalised pathways for beginners,
                intermediate students, and those preparing for advanced
                recitation or Ijazah studies. We emphasise clarity, consistency,
                and spiritual growth, ensuring that each student progresses with
                confidence. Alongside structured weekly lessons, we provide
                revision support, progress tracking, interactive sessions, and
                an encouraging environment that helps students build a lifelong
                relationship with the Qur'an.
              </p>
            </div>
          </div>

          {/* Image Area */}
          <div className="relative h-64 sm:h-72 md:h-[360px] lg:h-[420px] rounded-xl overflow-hidden border border-[#E5E0D9]">
            {/* Background image */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('/purple-bg.png')" }}
            />
            {/* Foreground Image */}
            <div className="relative z-10 flex items-center justify-center h-full">
              <img
                src="/albayan.png"
                className="max-h-full max-w-full object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Ustatha Bayan */}
      <section className="py-16 px-6 bg-[#F8F6F2]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Image Placeholder */}
          <div className="relative h-64 sm:h-72 md:h-96 rounded-xl overflow-hidden shadow-lg border border-[#E5E0D9] bg-gradient-to-br from-[#D4E3ED] to-[#E8E3DC] order-2 md:order-1">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <svg
                  className="w-16 h-16 md:w-20 md:h-20 mx-auto text-[#2C5F7C] opacity-30 mb-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                ></svg>
                <p className="text-gray-600 text-sm font-light">
                  Another image here
                </p>
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="max-w-xl order-1 md:order-2">
            <h2 className="text-2xl md:text-3xl font-playfair-display text-[#5b56a5] mb-4 md:mb-6">
              Ustatha Bayan Hawwa
            </h2>

            <div className="space-y-4 text-gray-700 font-light leading-relaxed">
              <p>
                Ustatha Bayan Hawwa has been teaching the Qur'an for over 23
                years through practical Tajweed, theory courses, and specialised
                teacher-training programmes. During this time, she has
                authorised almost fifty sisters who completed their Ijazah under
                her supervision and have since gone on to teach and establish
                their own Qur'an classes.
              </p>
              <p>
                A mother of three originally from Syria and now based in London,
                she holds Ijazah in the Riwayah of Hafs ‘an ‘Asim from both
                Makkah and Al-Azhar Al-Shareef. She is also a published author
                of Arabic poetry and traditional works that highlight her deep
                connection to Qur’anic heritage.
              </p>
              <p>
                Academically, she completed her BA in Islamic Law and later
                earned a Master’s degree in the Art of Teaching Languages from
                London Metropolitan University. She is currently pursuing her
                PhD in Quranic Performance at the American Open University, USA,
                Her teaching is known for its clarity, structure, and ability to
                simplify complex Tajweed concepts.
                <br /> <br /> Ustatha Bayan welcomes sisters from all
                backgrounds who can independently read the Qur’an, regardless of
                their current level of Tajweed. The journey to obtaining Ijazah
                typically takes between two and five years depending on
                individual pace, dedication, and consistency. Her commitment,
                patience, and ability to simplify complex rules continue to
                support students across the world on their path to confident
                recitation and deep connection with the Qur’an.
              </p>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
