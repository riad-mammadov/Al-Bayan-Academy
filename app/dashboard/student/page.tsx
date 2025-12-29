"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

import { Button } from "@/app/components/ui/button";
import { Label } from "@/app/components/ui/label";

// --------------------------------------------------------------------------
// BADGE COMPONENT
// --------------------------------------------------------------------------
const StatusBadge = ({ status }: { status: "paid" | "unpaid" | "pending" }) => {
  const styles =
    status === "paid"
      ? "bg-green-100 text-green-800 border-green-200"
      : status === "pending"
      ? "bg-yellow-100 text-yellow-800 border-yellow-200"
      : "bg-red-100 text-red-800 border-red-200";

  const text =
    status === "paid"
      ? "Paid"
      : status === "pending"
      ? "Pending Approval"
      : "Payment Required";

  return (
    <span
      className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full border ${styles}`}
    >
      {text}
    </span>
  );
};

// --------------------------------------------------------------------------
// CLASS CARD
// --------------------------------------------------------------------------
const ClassCard = ({
  classItem,
  status,
  onRequest,
  onViewDetails,
}: {
  classItem: any;
  status?: string;
  onRequest?: (classId: number) => void;
  onViewDetails?: (classId: number) => void;
}) => {
  const displayStatus = status || classItem.status;
  const [requesting, setRequesting] = useState(false);

  const handleRequest = async () => {
    if (!onRequest) return;

    setRequesting(true);
    try {
      await onRequest(classItem.id);
    } finally {
      setRequesting(false);
    }
  };

  return (
    <div
      className="p-8 bg-gradient-to-br from-[#FDFDFB] to-[#F8F6F2]
        border border-[#E5E0D9] rounded-xl shadow-sm hover:shadow-md transition
        flex flex-col justify-between"
    >
      <div>
        <h3 className="text-lg font-playfair-display text-[#0F3B56] mb-3">
          {classItem.title}
        </h3>

        <div className="text-gray-700 text-sm mb-4 leading-relaxed">
          {displayStatus === "accepted" ? (
            <>
              {classItem.day && classItem.time && (
                <p className="mb-2">
                  {classItem.day}, {classItem.time}
                </p>
              )}

              {classItem.meeting_link && (
                <p>
                  Meeting Link:{" "}
                  <Link
                    href={classItem.meeting_link}
                    target="_blank"
                    className="text-[#5b56a5] underline hover:text-[#7a74cd]"
                  >
                    Join Class
                  </Link>
                </p>
              )}
              {classItem.description && (
                <p className="mt-2">{classItem.description}</p>
              )}
            </>
          ) : (
            <>
              {classItem.description && (
                <p className="mb-2">{classItem.description}</p>
              )}
              {classItem.day && classItem.time && (
                <p className="text-gray-600">
                  Schedule: {classItem.day} at {classItem.time}
                </p>
              )}
            </>
          )}
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        {displayStatus === "accepted" && onViewDetails && (
          <Button
            className="bg-[#0F3B56] text-white hover:bg-[#134768]"
            onClick={() => onViewDetails(classItem.id)}
          >
            View Details
          </Button>
        )}
        {displayStatus === "available" && (
          <Button
            className="bg-[#5b56a5] text-white hover:bg-[#7a74cd]"
            onClick={handleRequest}
            disabled={requesting}
          >
            {requesting ? "Requesting..." : "Request to Join"}
          </Button>
        )}
        {displayStatus === "pending" && <StatusBadge status="pending" />}
      </div>
    </div>
  );
};

// --------------------------------------------------------------------------
// CLASS DETAILS VIEW
// --------------------------------------------------------------------------
const ClassDetailsView = ({
  classId,
  onBack,
}: {
  classId: number;
  onBack: () => void;
}) => {
  const [loading, setLoading] = useState(true);
  const [classData, setClassData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadClassDetails() {
      try {
        const res = await fetch(
          `http://127.0.0.1:5000/student/classes/${classId}`,
          {
            credentials: "include",
          }
        );

        if (!res.ok) {
          if (res.status === 403) {
            setError("You are not enrolled in this class");
          } else {
            setError("Failed to load class details");
          }
          setLoading(false);
          return;
        }

        const data = await res.json();
        setClassData(data);
        setLoading(false);
      } catch (err) {
        console.error("Error loading class details", err);
        setError("Failed to load class details");
        setLoading(false);
      }
    }

    loadClassDetails();
  }, [classId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-gray-600">Loading class details...</p>
      </div>
    );
  }

  if (error || !classData) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || "Failed to load class"}</p>
          <Button onClick={onBack}>Go Back</Button>
        </div>
      </div>
    );
  }

  const { class: classInfo, announcements } = classData;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-playfair-display text-[#0F3B56] mb-2">
            {classInfo.title}
          </h2>
          {classInfo.day && classInfo.time && (
            <p className="text-gray-600 text-lg">
              {classInfo.day} at {classInfo.time}
            </p>
          )}
        </div>
        <Button
          onClick={onBack}
          className="bg-[#0F3B56] text-white hover:bg-[#134768]"
        >
          ← Back to Dashboard
        </Button>
      </div>

      {/* Class Information Card */}
      <div className="bg-gradient-to-br from-[#FDFDFB] to-[#F8F6F2] border border-[#E5E0D9] rounded-xl p-8 shadow-sm">
        <h3 className="text-2xl font-playfair-display text-[#0F3B56] mb-6 border-b border-[#E5E0D9] pb-3">
          Class Information
        </h3>

        <div className="space-y-4">
          {classInfo.description && (
            <div>
              <p className="text-gray-700 leading-relaxed">
                {classInfo.description}
              </p>
            </div>
          )}

          {classInfo.meeting_link && (
            <div className="pt-4 border-t border-[#E5E0D9]">
              <p className="text-sm font-medium text-gray-600 mb-2">
                Meeting Link
              </p>
              <Link
                href={classInfo.meeting_link}
                target="_blank"
                className="inline-flex items-center text-[#5b56a5] hover:text-[#7a74cd] underline font-medium"
              >
                {classInfo.meeting_link}
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Announcements Card */}
      <div className="bg-gradient-to-br from-[#FDFDFB] to-[#F8F6F2] border border-[#E5E0D9] rounded-xl p-8 shadow-sm">
        <h3 className="text-2xl font-playfair-display text-[#0F3B56] mb-6 border-b border-[#E5E0D9] pb-3">
          Announcements
        </h3>

        {announcements && announcements.length > 0 ? (
          <div className="space-y-5">
            {announcements.map((announcement: any) => (
              <div
                key={announcement.id}
                className="bg-white p-6 rounded-lg border border-[#E5E0D9] shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
                      {announcement.message}
                    </p>
                  </div>
                </div>
                <div className="pt-3 border-t border-[#E5E0D9]">
                  <p className="text-xs text-gray-500">
                    {new Date(announcement.created_at).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-sm italic">
              No announcements yet for this class.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// --------------------------------------------------------------------------
// STUDENT DASHBOARD
// --------------------------------------------------------------------------
export default function StudentDashboard() {
  const [loading, setLoading] = useState(true);
  const [dashboard, setDashboard] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedClassId, setSelectedClassId] = useState<number | null>(null);

  const loadDashboard = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/student/dashboard", {
        credentials: "include",
      });

      if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
          window.location.href = "/login";
          return;
        }

        // Try to get error message from response
        let errorMessage = "Failed to load dashboard";
        try {
          const errorData = await res.json();
          errorMessage = errorData.error || errorMessage;
        } catch {
          // If response is not JSON, use default message
        }
      }

      const data = await res.json();

      // Ensure all required fields exist with defaults
      setDashboard({
        profile: data.profile || {
          name: "",
          email: "",
          role: "student",
          joinedDate: "",
        },
        payment_status: data.payment_status || "unpaid",
        accepted_classes: data.accepted_classes || [],
        pending_classes: data.pending_classes || [],
        available_classes: data.available_classes || [],
      });
      setLoading(false);
    } catch (err: any) {
      console.error("Failed to fetch dashboard", err);
      setError(err.message || "Failed to load dashboard. Please try again.");
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const handleRequestClass = async (classId: number) => {
    try {
      const res = await fetch("http://127.0.0.1:5000/classes/request", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          selectedClasses: [classId],
          extraDetails: "",
        }),
      });

      if (res.ok) {
        alert("Class request submitted successfully!");
        // Reload dashboard to reflect changes
        await loadDashboard();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to submit request");
      }
    } catch (err) {
      console.error("Error requesting class", err);
      alert("Error submitting request. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen w-full text-xl">
        Loading dashboard...
      </div>
    );
  }

  if (error || !dashboard) {
    return (
      <div className="flex items-center justify-center min-h-screen w-full">
        <div className="text-center">
          <p className="text-red-600 mb-4">
            {error || "Failed to load dashboard"}
          </p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    );
  }

  // Show class details view if a class is selected
  if (selectedClassId) {
    return (
      <section className="bg-white min-h-screen w-full">
        <section className="bg-gradient-to-br from-[#F5F3F0] via-[#FAF9F7] to-[#F0EDE8] py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <ClassDetailsView
              classId={selectedClassId}
              onBack={() => setSelectedClassId(null)}
            />
          </div>
        </section>
      </section>
    );
  }

  const {
    profile,
    payment_status,
    accepted_classes,
    pending_classes,
    available_classes,
  } = dashboard;

  const accepted = accepted_classes || [];
  const available = available_classes || [];
  const pending = pending_classes || [];

  return (
    <section className="bg-white min-h-screen w-full">
      {/* HEADER */}
      <section
        className="bg-gradient-to-br from-[#F5F3F0] via-[#FAF9F7] to-[#F0EDE8] 
          py-16 px-6"
      >
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-playfair-display text-[#0F3B56]">
            Welcome back, <span className="text-[#5b56a5]">{profile.name}</span>
          </h1>

          <p className="text-gray-700 text-md mt-2">
            Your personal portal for classes and payments.
          </p>
        </div>
      </section>

      {/* BODY */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* LEFT COLUMN: Profile + Payment */}
          <div className="lg:col-span-1 space-y-10">
            {/* PROFILE */}
            <div
              className="p-8 bg-gradient-to-br from-[#FDFDFB] to-[#F8F6F2]
                border border-[#E5E0D9] rounded-xl shadow space-y-4"
            >
              <h2 className="text-xl font-playfair-display text-[#0F3B56] border-b pb-3">
                Profile
              </h2>

              <div>
                <Label className="text-gray-600 text-sm">Name</Label>
                <p className="text-[#0F3B56]">{profile.name}</p>
              </div>
              <div>
                <Label className="text-gray-600 text-sm">Email</Label>
                <p className="text-[#0F3B56]">{profile.email}</p>
              </div>
              <div>
                <Label className="text-gray-600 text-sm">Role</Label>
                <p className="text-[#0F3B56]">{profile.role}</p>
              </div>
              <div>
                <Label className="text-gray-600 text-sm">Joined</Label>
                <p className="text-[#0F3B56]">
                  {profile.joinedDate
                    ? new Date(profile.joinedDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "N/A"}
                </p>
              </div>
            </div>

            {/* PAYMENT */}
            <div
              className="p-8 bg-gradient-to-br from-[#FDFDFB] to-[#F8F6F2]
                border border-[#E5E0D9] rounded-xl shadow space-y-4"
            >
              <h2 className="text-xl font-playfair-display text-[#0F3B56]">
                Payment Status
              </h2>

              <StatusBadge status={payment_status as "paid" | "unpaid"} />

              <Button className="w-full bg-[#5b56a5] text-white hover:bg-[#7a74cd]">
                <Link href="/dashboard/payment">Make Payment</Link>
              </Button>
            </div>
          </div>

          {/* RIGHT COLUMN: Classes */}
          <div className="lg:col-span-3 space-y-16">
            {/* ACCEPTED CLASSES */}
            {accepted.length > 0 && (
              <div>
                <h2 className="text-3xl font-playfair-display text-[#5b56a5] mb-6">
                  Your Classes
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {accepted.map((cls: any) => (
                    <ClassCard
                      key={cls.id}
                      classItem={cls}
                      status="accepted"
                      onViewDetails={setSelectedClassId}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* AVAILABLE + PENDING */}
          </div>
        </div>
      </section>
    </section>
  );
}
