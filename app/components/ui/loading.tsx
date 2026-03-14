export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gradient-to-br from-[#F5F3F0] via-[#FAF9F7] to-[#F0EDE8]">
      <div className="flex flex-col items-center gap-6">
        {/* Animated Logo/Icon */}
        <div className="relative w-20 h-20">
          {/* Outer rotating ring */}
          <div className="absolute inset-0 border-4 border-[#5b56a5]/20 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-transparent border-t-[#5b56a5] rounded-full animate-spin"></div>
          
          {/* Inner pulsing circle */}
          <div className="absolute inset-3 bg-gradient-to-br from-[#5b56a5] to-[#7a76b8] rounded-full animate-pulse flex items-center justify-center">
            <svg 
              className="w-8 h-8 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" 
              />
            </svg>
          </div>
        </div>

        {/* Loading Text */}
        <div className="text-center">
          <p className="text-[#5b56a5] text-lg font-playfair-display mb-2">
            Loading...
          </p>
          <div className="flex gap-1 justify-center">
            <div className="w-2 h-2 bg-[#5b56a5] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-[#5b56a5] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-[#5b56a5] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
