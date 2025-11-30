import { notFound } from "next/navigation";
import Link from "next/link";

interface Course {
  id: number;
  title: string;
  slug: string;
  description: string;
  price: number;
  fullDescription?: string;
}

const courses: Course[] = [
  {
    id: 1,
    title: "Quran Recitation (Tajweed)",
    slug: "quran-recitation-tajweed",
    description:
      "Learn proper Quran recitation with Tajweed rules from qualified instructors.",
    price: 99,
    fullDescription:
      "This comprehensive course covers all aspects of Tajweed, including proper pronunciation, articulation points, and rules of recitation. Students will learn to recite the Quran with proper rhythm and melody under the guidance of experienced instructors.",
  },
  {
    id: 2,
    title: "Quran Memorization (Hifz)",
    slug: "quran-memorization-hifz",
    description:
      "Master the art of memorizing the Holy Quran with structured guidance.",
    price: 149,
    fullDescription:
      "A structured program designed to help students memorize the entire Quran. Our experienced teachers use proven memorization techniques and provide regular revision schedules to ensure long-term retention.",
  },
  {
    id: 3,
    title: "Arabic Language Fundamentals",
    slug: "arabic-language-fundamentals",
    description:
      "Build a strong foundation in Arabic language to better understand the Quran.",
    price: 79,
    fullDescription:
      "Learn Arabic from the ground up with a focus on Quranic Arabic. This course covers grammar, vocabulary, and sentence structure to help students understand the Quran in its original language.",
  },
  {
    id: 4,
    title: "Islamic Studies",
    slug: "islamic-studies",
    description:
      "Comprehensive study of Islamic principles, history, and jurisprudence.",
    price: 119,
    fullDescription:
      "A comprehensive course covering Islamic theology, history, jurisprudence (Fiqh), and ethics. Students will gain a deeper understanding of Islamic principles and their application in daily life.",
  },
];

export default function CourseDetail({ params }: { params: { slug: string } }) {
  const course = courses.find((c) => c.slug === params.slug);

  if (!course) {
    notFound();
  }

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/courses"
          className="text-[#2C5F7C] hover:text-[#1E4155] mb-4 inline-block"
        >
          ← Back to Courses
        </Link>

        <div className="bg-[#F0EDE8] rounded-lg shadow-md p-8 border border-[#E5E0D9]">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {course.title}
          </h1>

          <div className="mb-6">
            <span className="text-3xl font-bold text-[#2C5F7C]">
              ${course.price}
            </span>
          </div>

          <p className="text-xl text-gray-700 mb-6">{course.description}</p>

          <div className="prose max-w-none mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Course Description
            </h2>
            <p className="text-gray-700">
              {course.fullDescription || course.description}
            </p>
          </div>

          <div className="border-t border-[#E5E0D9] pt-6">
            <button className="w-full bg-[#2C5F7C] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#1E4155] transition-colors">
              Enroll Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
