"use client";

import { useEffect, useState } from "react";
import { API_URL } from "@/lib/api";
import { useRouter } from "next/navigation";
import { Textarea } from "@/app/components/ui/textarea";
import Loading from "@/app/components/ui/loading";

const weeklyClasses = [
  { id: 1, day: "Monday", time: "10:00" },
  { id: 2, day: "Wednesday", time: "10:00" },
  { id: 3, day: "Wednesday", time: "19:00" },
  { id: 4, day: "Thursday", time: "10:00" },
  { id: 5, day: "Thursday", time: "19:00" },
  { id: 6, day: "Friday", time: "10:00" },
  { id: 7, day: "Friday", time: "19:00" },
];

function SectionLabel({ label }: { label: string }) {
  return (
    <p className="text-[0.6rem] tracking-[0.22em] uppercase text-gray-400 mb-3 font-medium">
      {label}
    </p>
  );
}

export default function BookClassesPage() {
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);
  const [selected, setSelected] = useState<number[]>([]);
  const [extra, setExtra] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/auth/me`, { credentials: "include" })
      .then((r) => r.json())
      .then((data) => {
        if (!data.authenticated) {
          router.replace("/login");
        } else {
          setAuthChecked(true);
        }
      })
      .catch(() => router.replace("/login"));
  }, [router]);

  function toggle(id: number) {
    setError(null);
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
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

    try {
      const res = await fetch(`${API_URL}/classes/request`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          selectedClasses: selected,
          extraDetails: extra,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to submit request");
      }

      setSuccess(true);
      setSelected([]);
      setExtra("");
      setTimeout(() => router.push("/dashboard"), 1200);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  if (!authChecked) return <Loading />;

  return (
    <div className="min-h-screen bg-[#FAF9F7]">
      {/* ── HERO ── */}
      <section className="bg-gradient-to-b from-[#F5F3F0] to-[#FAF9F7] px-6 md:px-[6vw] pt-[16vh] pb-16">
        <p className="flex items-center gap-4 text-[#5b56a5] text-[0.65rem] tracking-[0.25em] uppercase mb-6 font-medium">
          <span className="w-8 h-px bg-[#5b56a5]" />
          Al Bayan Academy
        </p>
        <h1 className="font-['Cormorant_Garamond',serif] font-light text-[clamp(2.8rem,6vw,5rem)] leading-[1.05] text-[#0F3B56] mb-4 max-w-2xl">
          Book <span className="italic text-[#5b56a5]">Weekly Classes</span>
        </h1>
        <p className="text-[0.95rem] leading-[1.85] text-gray-500 max-w-lg">
          Select the sessions you'd like to attend and submit your request.
          You'll be notified once it's approved.
        </p>
      </section>

      {/* ── CONTENT ── */}
      <section className="border-t border-[#E5E0D9] px-6 md:px-[6vw] py-16 grid lg:grid-cols-3 gap-12">
        {/* Left — class selection */}
        <div className="lg:col-span-2 space-y-10">
          <div>
            <SectionLabel label="Available sessions" />
            <h2 className="font-['Cormorant_Garamond',serif] font-light text-[clamp(1.5rem,3vw,2rem)] text-[#0F3B56] mb-8">
              Select your classes
            </h2>

            <div className="grid sm:grid-cols-2 border border-[#E5E0D9] divide-x divide-y divide-[#E5E0D9]">
              {weeklyClasses.map((c) => {
                const active = selected.includes(c.id);
                return (
                  <button
                    key={c.id}
                    onClick={() => toggle(c.id)}
                    className={`p-6 text-left transition-colors duration-200 flex items-center justify-between group ${
                      active ? "bg-[#5b56a5]" : "bg-white hover:bg-[#F8F6F2]"
                    }`}
                  >
                    <div>
                      <p
                        className={`font-['Cormorant_Garamond',serif] text-[1.1rem] mb-1 ${active ? "text-white" : "text-[#0F3B56]"}`}
                      >
                        {c.day}
                      </p>
                      <p
                        className={`text-[0.75rem] tracking-[0.1em] uppercase font-medium ${active ? "text-white/70" : "text-gray-400"}`}
                      >
                        {c.time}
                      </p>
                    </div>

                    {/* Checkbox */}
                    <div
                      className={`w-5 h-5 border flex items-center justify-center transition-colors ${
                        active
                          ? "bg-white border-white"
                          : "bg-[#F5F3F0] border-[#E5E0D9] group-hover:border-[#5b56a5]/40"
                      }`}
                    >
                      {active && (
                        <svg
                          className="w-3 h-3 text-[#5b56a5]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Extra details */}
          <div>
            <SectionLabel label="Optional" />
            <h2 className="font-['Cormorant_Garamond',serif] font-light text-[1.2rem] text-[#0F3B56] mb-4">
              Additional details
            </h2>
            <Textarea
              placeholder="Anything you'd like to add or request..."
              value={extra}
              onChange={(e) => setExtra(e.target.value)}
              className="bg-[#F5F3F0] border-[#E5E0D9] rounded-none focus-visible:ring-[#5b56a5]/30 min-h-[100px] text-[0.9rem]"
            />
          </div>
        </div>

        {/* Right — summary & submit */}
        <div className="space-y-6">
          <div className="border border-[#E5E0D9] bg-white top-24">
            <div className="px-6 py-5 border-b border-[#E5E0D9]">
              <SectionLabel label="Your request" />
              <h3 className="font-['Cormorant_Garamond',serif] font-light text-xl text-[#0F3B56]">
                Summary
              </h3>
            </div>

            <div className="divide-y divide-[#E5E0D9]">
              {/* Selected count */}
              <div className="px-6 py-4 flex justify-between items-center">
                <p className="text-[0.8rem] text-gray-500">Classes selected</p>
                <p className="font-['Cormorant_Garamond',serif] text-2xl font-light text-[#5b56a5]">
                  {selected.length}
                </p>
              </div>

              {/* Selected list */}
              {selected.length > 0 && (
                <div className="px-6 py-4 space-y-2">
                  {selected.map((id) => {
                    const c = weeklyClasses.find((x) => x.id === id);
                    if (!c) return null;
                    return (
                      <div
                        key={id}
                        className="flex items-center justify-between"
                      >
                        <p className="text-[0.85rem] text-[#0F3B56]">{c.day}</p>
                        <p className="text-[0.75rem] text-gray-400 tracking-wide">
                          {c.time}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Messages */}
              {error && (
                <div className="px-6 py-4 bg-red-50 text-[0.8rem] text-red-800 border-red-100">
                  {error}
                </div>
              )}
              {success && (
                <div className="px-6 py-4 bg-green-50 text-[0.8rem] text-green-800">
                  Request submitted successfully!
                </div>
              )}

              {/* Submit */}
              <div className="px-6 py-5">
                <button
                  onClick={handleSubmit}
                  disabled={loading || success}
                  className="w-full py-3 bg-[#5b56a5] text-white text-[0.75rem] tracking-[0.12em] uppercase font-medium hover:bg-[#4f4a94] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading
                    ? "Submitting..."
                    : success
                      ? "Submitted!"
                      : `Submit Request${selected.length > 0 ? ` (${selected.length})` : ""}`}
                </button>
              </div>
            </div>
          </div>

          {/* Info note */}
          <div className="border border-[#E5E0D9] bg-white px-6 py-5">
            <SectionLabel label="Note" />
            <p className="text-[0.8rem] text-gray-500 leading-relaxed">
              Your request will be reviewed by the admin. See student handbook
              for further information.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
