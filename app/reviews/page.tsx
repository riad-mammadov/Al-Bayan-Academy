export default function Reviews() {
  const reviews = [
    {
      id: 1,
      name: "Ahmed Hassan",
      rating: 5,
      comment:
        "Excellent teaching and very patient instructors. My understanding of the Quran has improved significantly.",
      date: "2024-01-15",
    },
    {
      id: 2,
      name: "Fatima Ali",
      rating: 5,
      comment:
        "The courses are well-structured and the teachers are knowledgeable. Highly recommend!",
      date: "2024-01-10",
    },
    {
      id: 3,
      name: "Omar Ibrahim",
      rating: 5,
      comment:
        "Great learning environment and supportive community. Thank you Al Bayan Academy!",
      date: "2024-01-05",
    },
    {
      id: 4,
      name: "Aisha Mohammed",
      rating: 5,
      comment:
        "The flexible scheduling works perfectly for my busy life. Quality education at its best.",
      date: "2023-12-28",
    },
  ];

  return (
    <div className="min-h-screen py-20 px-6 bg-gradient-to-b from-[#F5F3F0] to-[#FAF9F7]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-playfair-display text-[#5b56a5] mb-4">
            Student Reviews
          </h1>
          <p className="text-gray-700 max-w-2xl mx-auto font-light text-lg">
            Hear from our students about their journey with Al-Bayan Academy
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-gradient-to-br from-[#FDFDFB] to-[#F8F6F2] p-8 rounded-xl shadow-sm border border-[#E5E0D9] hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center mb-5">
                <div className="flex text-[#F6CB59] gap-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed font-light text-base">
                "{review.comment}"
              </p>
              <div className="flex justify-between items-center pt-4 border-t border-[#E5E0D9]">
                <p className="font-medium text-[#0F3B56]">{review.name}</p>
                <p className="text-sm text-gray-500">
                  {new Date(review.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
