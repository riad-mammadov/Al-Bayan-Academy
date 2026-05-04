"use client";

import Link from "next/link";
import { reviews, trustpilotSummary } from "@/app/components/reviews.js";
import { useState, useCallback, useEffect } from "react";

export default function Review() {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);

  const goTo = useCallback((index: number) => {
    setVisible(false);
    setTimeout(() => {
      setCurrent((index + reviews.length) % reviews.length);
      setVisible(true);
    }, 400);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => goTo(current + 1), 5000);
    return () => clearInterval(timer);
  }, [current, goTo]);

  const review = reviews[current];

  return (
    <div className="border-t border-[#E5E0D9] px-4 md:px-[7vw] py-10 bg-white">
      <div className="flex justify-between items-baseline mb-14 flex-wrap gap-4">
        <div>
          <p className="text-[0.6rem] tracking-[0.22em] uppercase text-gray-400 mb-3 font-medium">
            Testimonials
          </p>
          <h2 className="font-['Cormorant_Garamond',serif] font-light text-[clamp(1.8rem,3vw,2.4rem)] text-[#0F3B56]">
            Student Reviews
          </h2>
        </div>
        <a
          href="https://uk.trustpilot.com/review/albayanacademy.co.uk"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[0.75rem] tracking-[0.15em] uppercase font-medium text-[#5b56a5] hover:text-[#F6CB59] transition-colors duration-200"
        >
          View all →
        </a>
      </div>
      <div
        className="max-w-4xl mx-auto text-center"
        style={{
          minHeight: "200px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div
          className="transition-all duration-400"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(8px)",
          }}
        >
          {Array(5)
            .fill(null)
            .map((_, i) => (
              <span key={i} className="text-[#F6CB59] text-sm">
                ★
              </span>
            ))}
        </div>
        <p className="font-['Cormorant_Garamond',serif] italic text-[clamp(1rem,2vw,1.3rem)] leading-[1.7] text-[#0F3B56] mb-4">
          "{review.review}"
        </p>
        <p className="text-[0.75rem] tracking-[0.15em] uppercase text-gray-400 font-medium">
          {review.name} · {review.date}
        </p>
      </div>

      <div className="flex items-center justify-center gap-4 mt-8">
        <button
          onClick={() => goTo(current - 1)}
          className="text-gray-400 hover:text-[#5b56a5] transition-colors text-sm"
        >
          ←
        </button>
        <div className="flex gap-2">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="w-1.5 h-1.5 rounded-full transition-colors"
              style={{ background: i === current ? "#5b56a5" : "#E5E0D9" }}
            />
          ))}
        </div>
        <button
          onClick={() => goTo(current + 1)}
          className="text-gray-400 hover:text-[#5b56a5] transition-colors text-sm"
        >
          →
        </button>
      </div>
    </div>
  );
}
