export default function About() {
  return (
    <div className="min-h-screen py-20 px-4 bg-[#F5F3F0]">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-gray-900 mb-8 text-center">
          About Al Bayan Academy
        </h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-700 mb-6">
            Al Bayan Academy is dedicated to providing excellence in Quranic education and Islamic studies. 
            Our mission is to nurture a deep understanding and love for the Quran and Islamic knowledge.
          </p>
          
          <h2 className="text-3xl font-semibold text-gray-900 mt-12 mb-4">Our Mission</h2>
          <p className="text-gray-700 mb-6">
            To provide high-quality, accessible Quranic and Islamic education that empowers students 
            to connect with their faith and develop a strong foundation in Islamic knowledge.
          </p>
          
          <h2 className="text-3xl font-semibold text-gray-900 mt-12 mb-4">Our Values</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
            <li>Excellence in teaching and learning</li>
            <li>Respect for all students and their learning journey</li>
            <li>Commitment to authentic Islamic scholarship</li>
            <li>Building a supportive learning community</li>
          </ul>
          
          <h2 className="text-3xl font-semibold text-gray-900 mt-12 mb-4">Our Approach</h2>
          <p className="text-gray-700 mb-6">
            We combine traditional Islamic teaching methods with modern educational approaches to create 
            an engaging and effective learning experience. Our qualified instructors are passionate about 
            helping students achieve their goals.
          </p>
        </div>
      </div>
    </div>
  );
}


