export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gradient-to-b from-[#F5F3F0] to-[#FAF9F7]">
      <div className="flex flex-col items-center gap-10">

        {/* Animated lines */}
        <div className="flex items-end gap-[5px]" style={{ height: "40px" }}>
          {[0, 80, 160, 240, 320].map((delay, i) => (
            <div
              key={i}
              className="w-[2px] bg-[#5b56a5] rounded-full"
              style={{
                animation: `loadBar 1.2s ease-in-out ${delay}ms infinite`,
              }}
            />
          ))}
        </div>


        {/* Text */}
        <div className="text-center space-y-2">
          <p className="text-[0.6rem] tracking-[0.25em] uppercase text-gray-400 font-medium">
            Al Bayan Academy
          </p>
          <p className="font-['Cormorant_Garamond',serif] font-light text-[1.4rem] text-[#0F3B56] italic">
            Loading...
          </p>
        </div>

      </div>

      <style>{`
        @keyframes loadBar {
          0%, 100% { height: 8px; opacity: 0.2; }
          50% { height: 36px; opacity: 1; }
        }
      `}</style>
    </div>
  );
}