export default function Dashboard() {
  return (
    <div className="min-h-screen py-20 px-4 bg-[#F5F3F0]">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-gray-900 mb-8">Dashboard</h1>

        <div className="bg-[#F0EDE8] rounded-lg shadow-md p-8 border border-[#E5E0D9]">
          <p className="text-gray-700 mb-6">
            Welcome to your dashboard. This is a protected area where you can
            manage your courses, track your progress, and access your learning
            materials.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-[#D4E3ED] p-6 rounded-lg border border-[#B8D4E3]">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                My Courses
              </h2>
              <p className="text-gray-700">
                View and manage your enrolled courses
              </p>
            </div>

            <div className="bg-[#D4E3ED] p-6 rounded-lg border border-[#B8D4E3]">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Progress
              </h2>
              <p className="text-gray-700">Track your learning progress</p>
            </div>

            <div className="bg-[#D4E3ED] p-6 rounded-lg border border-[#B8D4E3]">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Applications
              </h2>
              <p className="text-gray-700">View your course applications</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
