import Link from "next/link";

export default function Courses() {
  const courses = [
    {
      id: 1,
      title: "Quran Recitation (Tajweed)",
      slug: "quran-recitation-tajweed",
      description:
        "Learn proper Quran recitation with Tajweed rules from qualified instructors.",
      price: 99,
    },
    {
      id: 2,
      title: "Quran Memorization (Hifz)",
      slug: "quran-memorization-hifz",
      description:
        "Master the art of memorizing the Holy Quran with structured guidance.",
      price: 149,
    },
    {
      id: 3,
      title: "Arabic Language Fundamentals",
      slug: "arabic-language-fundamentals",
      description:
        "Build a strong foundation in Arabic language to better understand the Quran.",
      price: 79,
    },
    {
      id: 4,
      title: "Islamic Studies",
      slug: "islamic-studies",
      description:
        "Comprehensive study of Islamic principles, history, and jurisprudence.",
      price: 119,
    },
  ];

  return (
    <div className="min-h-screen py-20 px-4 bg-[#F5F3F0]">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-gray-900 mb-4 text-center">
          Our Courses
        </h1>
        <p className="text-xl text-gray-700 mb-12 text-center">
          Choose from our comprehensive selection of courses
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-[#F0EDE8] rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-[#E5E0D9]"
            >
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                  {course.title}
                </h2>
                <p className="text-gray-700 mb-4">{course.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-[#2C5F7C]">
                    ${course.price}
                  </span>
                  <Link
                    href={`/courses/${course.slug}`}
                    className="bg-[#2C5F7C] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#1E4155] transition-colors"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
