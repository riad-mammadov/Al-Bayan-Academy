import Link from "next/link";

export default function Review() {
  const reviews = [
    // Placeholders for now
    {
      id: 1,
      name: "John Doe",
      rating: 5,
      comment: "Placeholder for now - will get real reviews",
      date: "29-11-2025",
    },
    {
      id: 2,
      name: "...",
      rating: 5,
      comment: "Placeholder",
      date: "29-11-2025",
    },
    {
      id: 3,
      name: "Omar Ibrahim",
      rating: 5,
      comment: "Placeholder for now",
      date: "29-11-2025",
    },
  ];
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl text-[#5b56a5] font-playfair-display">
            Reviews
          </h2>
          <Link
            href="/reviews"
            className="text-[#5b56a5] font-semibold hover:text-[#F6CB59] underline decoration-2 underline-offset-4 transition-colors"
          >
            View all reviews →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-[#F5F3F0] p-6 rounded-lg shadow-md border border-[#E5E0D9]"
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
              <p className="text-gray-700 mb-4 text-sm">{review.comment}</p>
              <div className="flex justify-between items-center">
                <p className="font-semibold text-gray-900 text-sm">
                  {review.name}
                </p>
                <p className="text-xs text-gray-600">{review.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
