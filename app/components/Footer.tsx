import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#2F2B66]/90 text-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
          <div className="">
            <h3 className="text-xl font-semibold text-white mb-3 text-center">
              Al Bayan Academy
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed text-center">
              Excellence in Quranic learning and Islamic studies.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-3 text-white text-center">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm flex flex-row justify-center space-x-2">
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-amber-400 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/courses"
                  className="text-gray-300 hover:text-amber-400 transition-colors"
                >
                  Courses
                </Link>
              </li>
              <li>
                <Link
                  href="/reviews"
                  className="text-gray-300 hover:text-amber-400 transition-colors"
                >
                  Reviews
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-300 hover:text-amber-400 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-3 text-white text-center">
              Contact Us
            </h4>
            <p className="text-gray-300 text-sm leading-relaxed text-center">
              Email: info@albayanacademy.com
              <br />
              Phone: +44 7956 921 241
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-gray-400 text-xs sm:text-sm">
            &copy; {new Date().getFullYear()} Al Bayan Academy. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
