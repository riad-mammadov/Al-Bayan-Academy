"use client";

import { useState } from "react";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import { Button } from "@/app/components/ui/button";

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

  function toggle(id: number) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  async function handleSubmit() {
    if (selected.length < 1) {
      alert("Please select at least one class.");
      return;
    }

    setLoading(true);

    const payload = {
      selectedClasses: selected,
      extraDetails: extra,
    };

    const res = await fetch("http://127.0.0.1:5000/classes/request", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setLoading(false);

    setSelected([]);
    setExtra("");
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
            className="focus-visible:ring-[#5b56a5] focus-visible:border-[#5b56a5]"
            style={{
              borderColor: "#E5E0D9",
            }}
          />
        </div>

        {/* SUBMIT BUTTON */}
        <Button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-3 text-white text-base font-light rounded-lg transition-all"
          style={{
            backgroundColor: loading ? "#a3a3a3" : "#5b56a5",
          }}
        >
          {loading
            ? "Submitting..."
            : `Submit ${selected.length > 0 ? `(${selected.length})` : ""}`}
        </Button>
      </div>
    </section>
  );
}
