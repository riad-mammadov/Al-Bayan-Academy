"use client";

import { useState } from "react";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import { Button } from "@/app/components/ui/button";
import Loading from "@/app/components/ui/loading";

const weeklyClasses = [
  { id: 1, day: "Monday", time: "10:00", capacity: "15" },
  { id: 2, day: "Wednesday", time: "10:00", capacity: "15" },
  { id: 3, day: "Wednesday", time: "19:00", capacity: "15" },
  { id: 4, day: "Thursday", time: "10:00", capacity: "15" },
  { id: 5, day: "Thursday", time: "19:00", capacity: "15" },
  { id: 6, day: "Friday", time: "10:00", capacity: "15" },
  { id: 7, day: "Friday", time: "19:00", capacity: "15" },
];

export default function BookClassesPage() {
  const [selected, setSelected] = useState<number[]>([]);
  const [extra, setExtra] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  function toggle(id: number) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  async function handleSubmit() {
    if (selected.length < 1) {
      setError("Please select at least one class.");
      return;
    }

    setError(null);
    setSuccess(false);
    setLoading(true);

    const payload = {
      selectedClasses: selected,
      extraDetails: extra,
    };

    try {
      const res = await fetch("http://127.0.0.1:5000/classes/request", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to submit request");
      }

      setSuccess(true);
      setSelected([]);
      setExtra("");
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      className="min-h-screen w-full py-16 px-6"
      style={{ backgroundColor: "#FAF9F7" }}
    >
      <div
        className="max-w-3xl mx-auto space-y-10 bg-white p-8 rounded-xl shadow-lg border"
        style={{ borderColor: "#E5E0D9" }}
      >
        {/* TITLE */}
        <div className="text-center">
          <h1
            className="text-4xl font-playfair-display mb-3"
            style={{ color: "#5b56a5" }}
          >
            Book Weekly Classes
          </h1>
          <p className="text-gray-700 font-light text-md">
            Select the class times you want to attend.
          </p>
        </div>

        <hr style={{ borderColor: "#E5E0D9" }} />

        {/* CLASS CARDS */}
        <div className="grid md:grid-cols-2 gap-4">
          {weeklyClasses.map((c) => {
            const active = selected.includes(c.id);

            return (
              <label
                key={c.id}
                onClick={() => toggle(c.id)}
                className={`
                  cursor-pointer p-5 rounded-xl border-2 transition-all duration-200 flex justify-between items-center group
                  ${active ? "scale-[1.01] shadow-md" : "hover:shadow-sm"}
                `}
                style={{
                  backgroundColor: active ? "#5b56a5" : "white",
                  borderColor: active ? "#5b56a5" : "#E5E0D9",
                  color: active ? "white" : "#1f2937",
                }}
              >
                <div>
                  <p className=" text-base">{c.day}</p>
                  <p
                    className="text-sm"
                    style={{
                      opacity: active ? 0.9 : 1,
                      color: active ? "white" : "#6b7280",
                    }}
                  >
                    {c.time}
                  </p>
                </div>

                {/* Tick */}
                <div
                  className={`
                    h-6 w-6 rounded-full border-2 flex items-center justify-center transition-all
                  `}
                  style={{
                    backgroundColor: active ? "white" : "#f9fafb",
                    borderColor: active ? "white" : "#d1d5db",
                    color: active ? "#16a34a" : "transparent",
                  }}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </label>
            );
          })}
        </div>

        {/* EXTRA DETAILS */}
        <div className="space-y-2">
          <Label className="font-medium">Extra Details</Label>
          <Textarea
            placeholder="Anything you want to add or request"
            value={extra}
            onChange={(e) => setExtra(e.target.value)}
            className="focus-visible:ring-[#5b56a5] focus-visible:border-[#5b56a5] bg-[#F5F3F0]"
            style={{
              borderColor: "#E5E0D9",
            }}
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
            <svg
              className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-start gap-2">
            <svg
              className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <p className="text-green-800 text-sm">
              Request submitted successfully!
            </p>
          </div>
        )}

        {/* SUBMIT BUTTON */}
        <Button
          onClick={handleSubmit}
          disabled={loading || success}
          className="w-full py-3 text-white text-base font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
          style={{
            backgroundColor: loading || success ? "#a3a3a3" : "#5b56a5",
          }}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Submitting...
            </span>
          ) : success ? (
            "Submitted!"
          ) : (
            `Submit ${selected.length > 0 ? `(${selected.length})` : ""}`
          )}
        </Button>
      </div>
    </section>
  );
}
