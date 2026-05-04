"use client";

import { useState, useEffect } from "react";
import { API_URL } from "@/lib/api";
import Link from "next/link";

// ── HELPERS ─────────────────────────────────────────────────────────────────

const formatTime = (time?: string) => (!time ? "" : time.slice(0, 5));
const formatDate = (date?: string) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

function SectionLabel({ label }: { label: string }) {
  return (
    <p className="text-[0.6rem] tracking-[0.22em] uppercase text-gray-400 mb-3 font-medium">
      {label}
    </p>
  );
}

// ── LOADING ──────────────────────────────────────────────────────────────────

function LoadingState() {
  return (
    <div className="min-h-screen bg-[#FAF9F7] animate-pulse">
      <div className="bg-gradient-to-b from-[#F5F3F0] to-[#FAF9F7] px-6 md:px-[6vw] pt-[16vh] pb-20">
        <div className="h-4 w-32 bg-[#E5E0D9] rounded mb-6" />
        <div className="h-14 w-72 bg-[#E5E0D9] rounded mb-4" />
        <div className="h-4 w-48 bg-[#E5E0D9] rounded" />
      </div>
      <div className="border-t border-[#E5E0D9] px-6 md:px-[6vw] py-16 space-y-6">
        <div className="grid md:grid-cols-3 border border-[#E5E0D9] divide-x divide-[#E5E0D9]">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="p-8">
              <div className="h-3 w-20 bg-[#E5E0D9] rounded mb-4" />
              <div className="h-8 w-10 bg-[#E5E0D9] rounded" />
            </div>
          ))}
        </div>
        <div className="h-48 bg-[#E5E0D9] rounded" />
        <div className="h-48 bg-[#E5E0D9] rounded" />
      </div>
    </div>
  );
}

// ── CLASS DETAILS VIEW ───────────────────────────────────────────────────────

function ClassDetailsView({
  classId,
  onBack,
}: {
  classId: number;
  onBack: () => void;
}) {
  const [loading, setLoading] = useState(true);
  const [classData, setClassData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(
          `${API_URL}/student/classes/${classId}`,
          {
            credentials: "include",
          }
        );
        if (!res.ok) {
          setError(
            res.status === 403
              ? "You are not enrolled in this class"
              : "Failed to load class"
          );
          setLoading(false);
          return;
        }
        setClassData(await res.json());
      } catch {
        setError("Failed to load class details");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [classId]);

  if (loading) return <LoadingState />;

  if (error || !classData) {
    return (
      <div className="min-h-screen bg-[#FAF9F7] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4 text-[0.9rem]">
            {error || "Failed to load class"}
          </p>
          <button
            onClick={onBack}
            className="text-[0.75rem] tracking-[0.12em] uppercase font-medium text-[#5b56a5] hover:text-[#0F3B56] transition-colors"
          >
            ← Go Back
          </button>
        </div>
      </div>
    );
  }

  const { class: cls, announcements } = classData;

  return (
    <div className="min-h-screen bg-[#FAF9F7]">
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#F5F3F0] to-[#FAF9F7] px-6 md:px-[6vw] pt-[14vh] pb-16">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[0.7rem] tracking-[0.15em] uppercase font-medium text-[#5b56a5] hover:text-[#0F3B56] transition-colors mb-8"
        >
          <span className="w-5 h-px bg-current" />
          Back to Dashboard
        </button>
        <SectionLabel label="Class Detail" />
        <h1 className="font-['Cormorant_Garamond',serif] font-light text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.05] text-[#0F3B56] mb-4">
          {cls.title}
        </h1>
        {cls.day && cls.time && (
          <p className="text-[0.9rem] text-gray-500 mb-2">
            {cls.day} at {formatTime(cls.time)}
          </p>
        )}
        {cls.meeting_link && (
          <Link
            href={cls.meeting_link}
            target="_blank"
            className="inline-flex items-center gap-2 mt-2 text-[0.75rem] tracking-[0.12em] uppercase font-medium text-[#5b56a5] hover:text-[#F6CB59] transition-colors"
          >
            Join Class
            <span className="w-4 h-px bg-current" />
          </Link>
        )}
      </section>

      {/* Content */}
      <section className="border-t border-[#E5E0D9] px-6 md:px-[6vw] py-16 grid lg:grid-cols-3 gap-10">
        {/* Announcements */}
        <div className="lg:col-span-2">
          <div className="border border-[#E5E0D9]">
            <div className="px-8 py-5 border-b border-[#E5E0D9] flex justify-between items-baseline">
              <div>
                <SectionLabel label="Updates" />
                <h2 className="font-['Cormorant_Garamond',serif] font-light text-xl text-[#0F3B56]">
                  Announcements
                </h2>
              </div>
              {announcements?.length > 0 && (
                <span className="font-['Cormorant_Garamond',serif] text-3xl font-light text-[#5b56a5]/30">
                  {announcements.length}
                </span>
              )}
            </div>

            {announcements?.length > 0 ? (
              <div className="divide-y divide-[#E5E0D9]">
                {announcements.map((a: any) => (
                  <div
                    key={a.id}
                    className="px-8 py-6 bg-white hover:bg-[#F8F6F2] transition-colors"
                  >
                    <p className="text-[0.9rem] leading-[1.8] text-gray-700 whitespace-pre-wrap mb-3">
                      {a.message}
                    </p>
                    <p className="text-[0.7rem] tracking-[0.1em] uppercase text-gray-400 font-medium">
                      {new Date(a.created_at).toLocaleDateString("en-GB", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="px-8 py-16 text-center">
                <p className="text-[0.9rem] text-gray-400">
                  No announcements yet
                </p>
                <p className="text-[0.8rem] text-gray-300 mt-1">
                  Check back later for updates
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Class info */}
          <div className="border border-[#E5E0D9] bg-white">
            <div className="px-6 py-5 border-b border-[#E5E0D9]">
              <SectionLabel label="Summary" />
            </div>
            <div className="divide-y divide-[#E5E0D9]">
              <div className="px-6 py-4">
                <p className="text-[0.65rem] tracking-[0.12em] uppercase text-gray-400 mb-1 font-medium">
                  Schedule
                </p>
                <p className="text-[0.9rem] text-[#0F3B56]">
                  {cls.day && cls.time
                    ? `${cls.day} at ${formatTime(cls.time)}`
                    : "Personalised scheduling"}
                </p>
              </div>
              {cls.meeting_link && (
                <div className="px-6 py-4">
                  <p className="text-[0.65rem] tracking-[0.12em] uppercase text-gray-400 mb-1 font-medium">
                    Meeting Link
                  </p>
                  <Link
                    href={cls.meeting_link}
                    target="_blank"
                    className="text-[0.85rem] text-[#5b56a5] underline underline-offset-2 hover:text-[#F6CB59] transition-colors break-all"
                  >
                    Click to join
                  </Link>
                </div>
              )}
              <div className="px-6 py-4">
                <p className="text-[0.65rem] tracking-[0.12em] uppercase text-gray-400 mb-1 font-medium">
                  Announcements
                </p>
                <p className="font-['Cormorant_Garamond',serif] text-3xl font-light text-[#5b56a5]">
                  {announcements?.length || 0}
                </p>
              </div>
            </div>
          </div>

          {/* Help */}
          <div className="border border-[#E5E0D9] bg-white px-6 py-6">
            <SectionLabel label="Support" />
            <p className="text-[0.85rem] text-gray-500 leading-relaxed mb-4">
              Questions about this class? Contact your instructor.
            </p>
            <Link
              href="/contact"
              className="text-[0.75rem] tracking-[0.12em] uppercase font-medium text-[#5b56a5] hover:text-[#F6CB59] transition-colors flex items-center gap-2"
            >
              Contact Support
              <span className="w-4 h-px bg-current" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// ── MAIN DASHBOARD ───────────────────────────────────────────────────────────

export default function StudentDashboard() {
  const [loading, setLoading] = useState(true);
  const [dashboard, setDashboard] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedClassId, setSelectedClassId] = useState<number | null>(null);
  const [requestingId, setRequestingId] = useState<number | null>(null);
  const [requestMessage, setRequestMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const loadDashboard = async () => {
    try {
      const res = await fetch(`${API_URL}/student/dashboard`, {
        credentials: "include",
      });
      if (res.status === 401 || res.status === 403) {
        window.location.href = "/login";
        return;
      }
      const data = await res.json();
      setDashboard({
        profile: data.profile || {},
        accepted_classes: data.accepted_classes || [],
        pending_classes: data.pending_classes || [],
        available_classes: data.available_classes || [],
      });
    } catch (err: any) {
      setError(err.message || "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const handleRequestClass = async (classId: number) => {
    setRequestingId(classId);
    setRequestMessage(null);
    try {
      const res = await fetch(`${API_URL}/classes/request`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ selectedClasses: [classId], extraDetails: "" }),
      });
      if (res.ok) {
        setRequestMessage({
          type: "success",
          text: "Request submitted successfully!",
        });
        await loadDashboard();
      } else {
        const data = await res.json();
        setRequestMessage({
          type: "error",
          text: data.error || "Failed to submit request",
        });
      }
    } catch {
      setRequestMessage({ type: "error", text: "Error submitting request" });
    } finally {
      setRequestingId(null);
      setTimeout(() => setRequestMessage(null), 4000);
    }
  };

  if (loading) return <LoadingState />;

  if (error || !dashboard) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF9F7]">
        <div className="text-center">
          <p className="text-gray-600 mb-4 text-[0.9rem]">
            {error || "Failed to load dashboard"}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="text-[0.75rem] tracking-[0.12em] uppercase font-medium text-[#5b56a5] hover:text-[#F6CB59] transition-colors"
          >
            Retry →
          </button>
        </div>
      </div>
    );
  }

  if (selectedClassId) {
    return (
      <ClassDetailsView
        classId={selectedClassId}
        onBack={() => setSelectedClassId(null)}
      />
    );
  }

  const { profile, accepted_classes, pending_classes, available_classes } =
    dashboard;
  const accepted: any[] = accepted_classes || [];
  const pending: any[] = pending_classes || [];
  const available: any[] = available_classes || [];

  return (
    <div className="min-h-screen bg-[#FAF9F7]">
      {/* ── HERO ── */}
      <section className="bg-gradient-to-b from-[#F5F3F0] to-[#FAF9F7] px-6 md:px-[6vw] pt-[16vh] pb-16">
        <SectionLabel label="Student Portal" />
        <h1 className="font-['Cormorant_Garamond',serif] font-light text-[clamp(2.8rem,6vw,5rem)] leading-[1.05] text-[#0F3B56] mb-3">
          Welcome, <span className="italic text-[#5b56a5]">{profile.name}</span>
        </h1>
        <p className="text-[0.9rem] text-gray-500">
          Your personal portal for classes and updates.
        </p>
      </section>

      {/* ── STATS ── */}
      <section className="border-t border-[#E5E0D9] px-6 md:px-[6vw] py-0">
        <div className="grid grid-cols-3 border border-[#E5E0D9]">
          {[
            { label: "Enrolled Classes", value: accepted.length },
            { label: "Pending Requests", value: pending.length },
            { label: "Available Classes", value: available.length },
          ].map((stat, i) => (
            <div
              key={i}
              className="p-8 bg-white hover:bg-[#F8F6F2] transition-colors duration-300 border-r border-[#E5E0D9] last:border-r-0"
            >
              <p className="text-[0.6rem] tracking-[0.22em] uppercase text-gray-400 mb-3 font-medium">
                {stat.label}
              </p>
              <p className="font-['Cormorant_Garamond',serif] font-light text-4xl text-[#5b56a5]">
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── REQUEST MESSAGE ── */}
      {requestMessage && (
        <div
          className={`mx-6 md:mx-[6vw] mt-6 px-4 py-3 text-[0.85rem] border ${
            requestMessage.type === "success"
              ? "bg-green-50 border-green-200 text-green-800"
              : "bg-red-50 border-red-200 text-red-800"
          }`}
        >
          {requestMessage.text}
        </div>
      )}

      {/* ── ENROLLED CLASSES ── */}
      {accepted.length > 0 && (
        <section className="border-t border-[#E5E0D9] px-6 md:px-[6vw] py-16">
          <SectionLabel label="Active" />
          <h2 className="font-['Cormorant_Garamond',serif] font-light text-[clamp(1.8rem,3vw,2.4rem)] text-[#0F3B56] mb-10">
            Your Classes
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 border border-[#E5E0D9] divide-x divide-y divide-[#E5E0D9]">
            {accepted.map((cls: any) => (
              <div
                key={cls.id}
                className="p-8 bg-white hover:bg-[#F8F6F2] transition-colors duration-300 flex flex-col justify-between gap-6"
              >
                <div>
                  <h3 className="font-['Cormorant_Garamond',serif] text-[1.2rem] text-[#0F3B56] mb-3">
                    {cls.title}
                  </h3>
                  {cls.day && cls.time ? (
                    <p className="text-[0.85rem] text-gray-500">
                      {cls.day} at {formatTime(cls.time)}
                    </p>
                  ) : (
                    <p className="text-[0.85rem] text-gray-400">
                      Personalised scheduling
                    </p>
                  )}
                  {cls.description && (
                    <p className="text-[0.85rem] text-gray-500 mt-2 line-clamp-2">
                      {cls.description}
                    </p>
                  )}
                </div>

                <div className="flex gap-4 pt-4 border-t border-[#E5E0D9]">
                  <button
                    onClick={() => setSelectedClassId(cls.id)}
                    className="text-[0.7rem] tracking-[0.12em] uppercase font-medium text-[#5b56a5] hover:text-[#0F3B56] transition-colors flex items-center gap-2"
                  >
                    View Details
                    <span className="w-4 h-px bg-current" />
                  </button>
                  {cls.meeting_link && (
                    <Link
                      href={cls.meeting_link}
                      target="_blank"
                      className="text-[0.7rem] tracking-[0.12em] uppercase font-medium text-gray-400 hover:text-[#0F3B56] transition-colors flex items-center gap-2"
                    >
                      Join
                      <span className="w-4 h-px bg-current" />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── PENDING REQUESTS ── */}
      {pending.length > 0 && (
        <section className="border-t border-[#E5E0D9] px-6 md:px-[6vw] py-16">
          <SectionLabel label="Awaiting approval" />
          <h2 className="font-['Cormorant_Garamond',serif] font-light text-[clamp(1.8rem,3vw,2.4rem)] text-[#0F3B56] mb-10">
            Pending Requests
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 border border-[#E5E0D9] divide-x divide-y divide-[#E5E0D9]">
            {pending.map((cls: any) => (
              <div key={cls.id} className="p-8 bg-white flex flex-col gap-4">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-['Cormorant_Garamond',serif] text-[1.2rem] text-[#0F3B56]">
                    {cls.title}
                  </h3>
                  <span className="text-[0.6rem] tracking-[0.1em] uppercase border border-[#F6CB59]/40 text-[#b8960a] bg-[#fefce8] px-2 py-1 font-medium whitespace-nowrap">
                    Pending
                  </span>
                </div>
                {/* Show date/time for 1-1 lessons, day/time for weekly */}
                {cls.date ? (
                  <p className="text-[0.85rem] text-gray-500">
                    {formatDate(cls.date)}
                    {cls.time ? ` at ${formatTime(cls.time)}` : ""}
                  </p>
                ) : cls.day && cls.time ? (
                  <p className="text-[0.85rem] text-gray-500">
                    {cls.day} at {formatTime(cls.time)}
                  </p>
                ) : (
                  <p className="text-[0.85rem] text-gray-400">
                    Awaiting schedule confirmation
                  </p>
                )}
                <p className="text-[0.8rem] text-gray-400">
                  Your request is being reviewed by the admin.
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── AVAILABLE CLASSES ── */}
      {available.length > 0 && (
        <section className="border-t border-[#E5E0D9] bg-gradient-to-br from-[#F5F3F0] to-[#FAF9F7] px-6 md:px-[6vw] py-16">
          <SectionLabel label="Open to join" />
          <h2 className="font-['Cormorant_Garamond',serif] font-light text-[clamp(1.8rem,3vw,2.4rem)] text-[#0F3B56] mb-10">
            Available Classes
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 border border-[#E5E0D9] divide-x divide-y divide-[#E5E0D9]">
            {available.map((cls: any) => (
              <div
                key={cls.id}
                className="p-8 bg-white hover:bg-[#F8F6F2] transition-colors duration-300 flex flex-col justify-between gap-6"
              >
                <div>
                  <h3 className="font-['Cormorant_Garamond',serif] text-[1.2rem] text-[#0F3B56] mb-3">
                    {cls.title}
                  </h3>
                  {cls.day && cls.time ? (
                    <p className="text-[0.85rem] text-gray-500">
                      {cls.day} at {formatTime(cls.time)}
                    </p>
                  ) : (
                    <p className="text-[0.85rem] text-gray-400">
                      Personalised scheduling
                    </p>
                  )}
                  {cls.description && (
                    <p className="text-[0.85rem] text-gray-500 mt-2 line-clamp-2">
                      {cls.description}
                    </p>
                  )}
                </div>

                <div className="pt-4 border-t border-[#E5E0D9]">
                  <button
                    onClick={() => handleRequestClass(cls.id)}
                    disabled={requestingId === cls.id}
                    className="text-[0.7rem] tracking-[0.12em] uppercase font-medium text-[#5b56a5] hover:text-[#0F3B56] transition-colors disabled:opacity-40 flex items-center gap-2"
                  >
                    {requestingId === cls.id
                      ? "Requesting..."
                      : "Request to Join"}
                    <span className="w-4 h-px bg-current" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── EMPTY STATE ── */}
      {accepted.length === 0 &&
        pending.length === 0 &&
        available.length === 0 && (
          <section className="border-t border-[#E5E0D9] px-6 md:px-[6vw] py-24 text-center">
            <SectionLabel label="Getting started" />
            <h2 className="font-['Cormorant_Garamond',serif] font-light text-[clamp(1.8rem,3vw,2.4rem)] text-[#0F3B56] mb-4">
              No Classes Yet
            </h2>
            <p className="text-[0.9rem] text-gray-500 mb-8 max-w-md mx-auto">
              You haven't enrolled in any classes. Browse our available
              programmes to get started.
            </p>
            <Link
              href="/classes"
              className="inline-flex items-center gap-2 text-[0.75rem] tracking-[0.12em] uppercase font-medium text-[#5b56a5] hover:text-[#F6CB59] transition-colors"
            >
              Browse Classes
              <span className="w-4 h-px bg-current" />
            </Link>
          </section>
        )}

      {/* ── PROFILE & PAYMENTS ── */}
      <section className="border-t border-[#E5E0D9] px-6 md:px-[6vw] py-16 grid md:grid-cols-3 gap-10">
        {/* Profile */}
        <div className="border border-[#E5E0D9] bg-white">
          <div className="px-6 py-5 border-b border-[#E5E0D9]">
            <SectionLabel label="Account" />
            <h3 className="font-['Cormorant_Garamond',serif] font-light text-xl text-[#0F3B56]">
              Profile
            </h3>
          </div>
          <div className="divide-y divide-[#E5E0D9]">
            {[
              { label: "Name", value: profile.name },
              { label: "Email", value: profile.email },
              { label: "Role", value: profile.role },
              {
                label: "Member Since",
                value: profile.joinedDate
                  ? new Date(profile.joinedDate).toLocaleDateString("en-GB", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })
                  : "N/A",
              },
            ].map((item) => (
              <div key={item.label} className="px-6 py-4">
                <p className="text-[0.65rem] tracking-[0.12em] uppercase text-gray-400 mb-1 font-medium">
                  {item.label}
                </p>
                <p className="text-[0.9rem] text-[#0F3B56] capitalize">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Payments */}
        <div className="border border-[#E5E0D9] bg-white">
          <div className="px-6 py-5 border-b border-[#E5E0D9]">
            <SectionLabel label="Billing" />
            <h3 className="font-['Cormorant_Garamond',serif] font-light text-xl text-[#0F3B56]">
              Payments
            </h3>
          </div>
          <div className="px-6 py-8 space-y-5">
            <p className="text-[0.85rem] text-gray-500 leading-relaxed">
              Payments are handled securely outside this portal. Use the link
              below to complete your payment.
            </p>
            <Link
              href="https://pay.gocardless.com/BRT0003T0X3P5G8"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[0.75rem] tracking-[0.12em] uppercase font-medium text-[#5b56a5] hover:text-[#F6CB59] transition-colors"
            >
              Open Payment Link
              <span className="w-4 h-px bg-current" />
            </Link>
          </div>
        </div>
        <div className="border border-[#E5E0D9] bg-white">
          <div className="px-6 py-5 border-b border-[#E5E0D9]">
            <SectionLabel label="Resources" />
            <h3 className="font-['Cormorant_Garamond',serif] font-light text-xl text-[#0F3B56]">
              Student Handbook
            </h3>
          </div>
          <div className="px-6 py-8 space-y-5">
            <p className="text-[0.85rem] text-gray-500 leading-relaxed">
              Download the student handbook for class guidelines, expectations
              and academy policies.
            </p>
            <a
              href="/albayanhb.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[0.75rem] tracking-[0.12em] uppercase font-medium text-[#5b56a5] hover:text-[#F6CB59] transition-colors"
            >
              Open Handbook
              <span className="w-4 h-px bg-current" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
