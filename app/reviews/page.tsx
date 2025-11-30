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
    <div className="min-h-screen py-20 px-4 bg-[#F5F3F0]">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-gray-900 mb-12 text-center">
          Student Reviews
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-[#F0EDE8] p-6 rounded-lg shadow-md border border-[#E5E0D9]"
            >
              <div className="flex items-center mb-4">
                <div className="flex text-[#6BA3C1]">
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
              <p className="text-gray-700 mb-4">{review.comment}</p>
              <div className="flex justify-between items-center">
                <p className="font-semibold text-gray-900">{review.name}</p>
                <p className="text-sm text-gray-600">{review.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
