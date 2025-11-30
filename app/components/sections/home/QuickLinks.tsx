import Link from "next/link";

export default function QuickLinks() {
  return (
    <section className="py-20 px-4 bg-[#F5F3F0]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold font-serif text-[#0F3B56] text-center mb-12">
          Begin Your Journey
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { title: "Courses", href: "/courses" },
            { title: "Bookings", href: "/contact" },
            { title: "Programs", href: "/courses" },
            { title: "Contact", href: "/contact" },
          ].map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group block p-6 bg-white rounded-xl border border-[#E5E0D9] shadow-sm hover:shadow-md transition-all"
            >
              <h3 className="text-lg font-semibold text-[#0F3B56] mb-2 group-hover:text-[#2C5F7C] transition-colors">
                {item.title}
              </h3>

              <p className="text-sm text-gray-600 leading-relaxed">
                {item.title === "Courses" &&
                  "Browse our structured Quran and Islamic studies classes."}
                {item.title === "Bookings" &&
                  "Schedule a consultation or book a private session."}
                {item.title === "Programs" &&
                  "View specialised and ongoing learning pathways."}
                {item.title === "Contact" &&
                  "Reach our team for enquiries or support."}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
