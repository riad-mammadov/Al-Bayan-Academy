export default function AboutPage() {
  return (
    <main className="bg-[#FAF9F7] text-[#1a1a2e] overflow-x-hidden">
      {/* ── HERO ── */}
      <section className="relative min-h-[80vh] flex flex-col justify-between px-6 md:px-[6vw] bg-gradient-to-b from-[#F5F3F0] to-[#FAF9F7] overflow-hidden">
        <div className="flex flex-col justify-center pt-[18vh] max-w-3xl">
          <p className="flex items-center gap-4 text-[#5b56a5] text-[0.65rem] tracking-[0.25em] uppercase mb-6 font-medium">
            <span className="w-8 h-px bg-[#5b56a5]" />
            Al Bayan Academy
          </p>

          <h1 className="font-['Cormorant_Garamond',serif] font-light text-[clamp(2.8rem,6vw,5rem)] leading-[1.05] tracking-tight text-[#0F3B56] mb-6">
            Rooted in <em className="italic text-[#5b56a5]">tradition.</em>
            <br />
            Built for <em className="italic text-[#5b56a5]">today.</em>
          </h1>

          <p className="text-[0.95rem] leading-[1.85] text-gray-600 max-w-lg">
            Guiding students toward a sincere and lasting connection with the
            Qur'an through authentic scholarship, structured learning and
            thoughtful Islamic education.
          </p>
        </div>

        <div className="flex items-center gap-4 pb-10 text-[0.6rem] tracking-[0.2em] uppercase text-gray-400">
          <span className="w-10 h-px bg-gray-300" />
          Scroll to explore
        </div>
      </section>

      {/* ── MISSION ── */}
      <section className="border-t border-[#E5E0D9] px-6 md:px-[6vw] py-20 grid md:grid-cols-2 gap-16 items-start">
        <div className="md:sticky md:top-28">
          <p className="text-[0.6rem] tracking-[0.22em] uppercase text-gray-400 mb-4 font-medium">
            Our Mission
          </p>
          <h2 className="font-['Cormorant_Garamond',serif] font-light text-[clamp(1.8rem,3.5vw,2.8rem)] leading-[1.2] text-[#0F3B56]">
            A path of <span className="italic text-[#5b56a5]">sincerity</span>
            <br />
            and <span className="italic text-[#5b56a5]">depth</span>
          </h2>
        </div>

        <div className="space-y-5 pt-1">
          {[
            "Al Bayan Academy was established to nurture a meaningful and lasting relationship with the Qur'an through careful instruction, authentic scholarship and a supportive learning environment.",
            "Our programmes guide students through Tajweed, memorisation, recitation refinement and Ijazah preparation. Each course follows traditional methodology while remaining accessible for students across the world studying in a modern setting.",
            "The academy emphasises consistency, discipline and sincerity in learning. Students receive personalised feedback and structured guidance that strengthens both understanding and confidence in recitation.",
          ].map((p, i) => (
            <p key={i} className="text-[0.9rem] leading-[1.85] text-gray-600">
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="border-t border-[#E5E0D9] px-6 md:px-[6vw] py-20">
        <div className="flex justify-between items-baseline mb-12 flex-wrap gap-3">
          <h2 className="font-['Cormorant_Garamond',serif] font-light text-[clamp(1.8rem,3vw,2.4rem)] text-[#0F3B56]">
            What we stand for
          </h2>
          <p className="text-[0.6rem] tracking-[0.2em] uppercase text-gray-400 font-medium">
            Core values
          </p>
        </div>

        <div className="grid md:grid-cols-3 border border-[#E5E0D9] divide-x divide-y md:divide-y-0 divide-[#E5E0D9]">
          {[
            {
              num: "01",
              title: "Authentic Scholarship",
              desc: "Our teaching is rooted in recognised chains of transmission connecting students directly to the classical tradition of Qur'anic recitation.",
            },
            {
              num: "02",
              title: "Structured Learning",
              desc: "Courses follow a carefully designed pathway that supports students from foundational Tajweed through advanced recitation and beyond.",
            },
            {
              num: "03",
              title: "Personal Guidance",
              desc: "Small class groups ensure each student receives correction, encouragement and individual attention throughout their journey.",
            },
          ].map((v) => (
            <div
              key={v.num}
              className="p-8 bg-white hover:bg-[#F8F6F2] transition-colors duration-300 group"
            >
              <span className="font-['Cormorant_Garamond',serif] text-4xl font-light text-[#5b56a5]/20 leading-none block mb-5 group-hover:text-[#5b56a5]/40 transition-colors duration-300">
                {v.num}
              </span>
              <h3 className="font-['Cormorant_Garamond',serif] text-[1.1rem] text-[#0F3B56] mb-2">
                {v.title}
              </h3>
              <p className="text-[0.85rem] leading-[1.8] text-gray-500">
                {v.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── QUOTE ── */}
      <section className="border-t border-[#E5E0D9] bg-gradient-to-br from-[#F5F3F0] to-[#FAF9F7] px-6 md:px-[6vw] py-20">
        <div className="max-w-2xl mx-auto text-center">
          <span className="font-['Cormorant_Garamond',serif] text-[5rem] leading-[0.6] text-[#5b56a5]/20 block mb-4 select-none">
            "
          </span>
          <p className="font-['Cormorant_Garamond',serif] font-light italic text-[clamp(1.2rem,2.5vw,1.7rem)] leading-[1.65] text-[#0F3B56]">
            Learning the Qur'an is not only about recitation, but about
            preserving a living tradition of knowledge, discipline and devotion.
          </p>
          <div className="flex justify-center items-center gap-3 mt-8">
            <div className="w-8 h-px bg-[#5b56a5]" />
            <div className="w-3 h-px bg-[#F6CB59]" />
            <div className="w-8 h-px bg-[#5b56a5]" />
          </div>
        </div>
      </section>

      {/* ── TEACHER ── */}
      <section className="border-t border-[#E5E0D9] px-6 md:px-[6vw] py-20 grid md:grid-cols-2 gap-16 items-start">
        <div className="md:sticky md:top-28 space-y-5">
          <p className="text-[0.6rem] tracking-[0.22em] uppercase text-gray-400 font-medium">
            Your Teacher
          </p>
          <h2 className="font-['Cormorant_Garamond',serif] font-light text-[clamp(1.8rem,3.5vw,2.8rem)] leading-[1.2] text-[#0F3B56]">
            Ustatha <span className="italic text-[#5b56a5]">Bayan Hawwa</span>
          </h2>

          <div className="flex flex-wrap gap-2 pt-1">
            {[
              "23+ Years Teaching",
              "Ijazah — Hafs 'an 'Asim",
              "MA Languages",
              "PhD Candidate",
            ].map((tag) => (
              <span
                key={tag}
                className="text-[0.6rem] tracking-wider uppercase border border-[#E5E0D9] text-gray-500 px-3 py-1.5 font-medium bg-white"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-5 pt-1">
          {[
            "Ustatha Bayan Hawwa has taught the Qur'an for over twenty three years through practical Tajweed instruction, theory courses and specialised teacher training programmes.",
            "During this time she has authorised nearly fifty students who completed their Ijazah under her supervision and have since gone on to teach Qur'an within their own communities.",
            "Originally from Syria and now based in London, she holds recognised Ijazah in the Riwayah of Hafs 'an 'Asim from both Makkah and Al Azhar Al Shareef.",
            "Academically she completed a BA in Islamic Law and later earned a Master's degree in the Art of Teaching Languages from London Metropolitan University.",
            "She is currently pursuing a PhD in Qur'anic Performance while continuing to teach students internationally.",
            "Her teaching style is known for clarity, patience and the ability to simplify complex Tajweed principles, helping students develop precision and confidence in their recitation.",
          ].map((p, i) => (
            <p key={i} className="text-[0.9rem] leading-[1.85] text-gray-600">
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* ── CLOSING ── */}
      <section className="border-t border-[#E5E0D9] px-6 md:px-[6vw] py-20">
        <div className="max-w-2xl">
          <p className="text-[0.6rem] tracking-[0.22em] uppercase text-gray-400 mb-5 font-medium">
            Our commitment
          </p>
          <p className="font-['Cormorant_Garamond',serif] font-light text-[clamp(1.1rem,2vw,1.5rem)] leading-[1.75] text-[#0F3B56]">
            Through sincere teaching, authentic scholarship and careful
            mentorship, Al Bayan Academy continues to guide students across the
            world on their journey toward confident recitation and a deeper
            connection with the Qur'an.
          </p>
        </div>
      </section>
    </main>
  );
}
