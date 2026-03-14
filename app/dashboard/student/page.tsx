"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/app/components/ui/button";
import { Label } from "@/app/components/ui/label";
import Loading from "@/app/components/ui/loading";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";

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
    <Card className="bg-gradient-to-br from-[#FDFDFB] to-[#F8F6F2] border border-[#E5E0D9] shadow-sm hover:shadow-md transition-all duration-200 h-full flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-playfair-display text-[#0F3B56]">
          {classItem.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col justify-between">
        <div className="text-gray-700 text-sm mb-4 leading-relaxed space-y-2">
          {displayStatus === "accepted" ? (
            <>
              {classItem.day && classItem.time && (
                <div className="flex items-center gap-2 text-gray-600">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span>
                    {classItem.day}, {classItem.time}
                  </span>
                </div>
              )}

              {classItem.meeting_link && (
                <div className="flex items-start gap-2 text-gray-600">
                  <svg
                    className="w-4 h-4 mt-0.5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  <Link
                    href={classItem.meeting_link}
                    target="_blank"
                    className="text-[#5b56a5] underline hover:text-[#7a74cd] break-all"
                  >
                    Join Class
                  </Link>
                </div>
              )}
              {classItem.description && (
                <p className="text-gray-600 pt-2">{classItem.description}</p>
              )}
            </>
          ) : (
            <>
              {classItem.description && (
                <p className="text-gray-600">{classItem.description}</p>
              )}
              {classItem.day && classItem.time && (
                <div className="flex items-center gap-2 text-gray-600 pt-2">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span>
                    {classItem.day} at {classItem.time}
                  </span>
                </div>
              )}
            </>
          )}
        </div>

        <div className="flex gap-2 pt-4 border-t border-[#E5E0D9]">
          {displayStatus === "accepted" && onViewDetails && (
            <Button
              className="flex-1 bg-[#5b56a5] text-white hover:bg-[#7a74cd] text-sm"
              onClick={() => onViewDetails(classItem.id)}
            >
              View Details
            </Button>
          )}
          {displayStatus === "available" && (
            <Button
              className="flex-1 bg-[#5b56a5] text-white hover:bg-[#7a74cd] text-sm"
              onClick={handleRequest}
              disabled={requesting}
            >
              {requesting ? "Requesting..." : "Request to Join"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
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
      <div className="flex items-center justify-center w-full min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 border-4 border-[#5b56a5]/20 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-transparent border-t-[#5b56a5] rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-600 text-sm">Loading class details...</p>
        </div>
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
    <div className="min-h-screen bg-gradient-to-br from-[#F5F3F0] via-[#FAF9F7] to-[#F0EDE8] w-full">
      {/* Header Section */}
      <section className="bg-gradient-to-br from-[#5b56a5] to-[#7a76b8] py-8 sm:py-12 px-4 sm:px-6 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <Button
            onClick={onBack}
            variant="outline"
            className="mb-6 bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white backdrop-blur-sm"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Dashboard
          </Button>
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-playfair-display text-white mb-3">
                {classInfo.title}
              </h1>
              {classInfo.day && classInfo.time && (
                <div className="flex items-center gap-2 text-white/90 text-base sm:text-lg">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="font-medium">
                    {classInfo.day} at {classInfo.time}
                  </span>
                </div>
              )}
            </div>
            {classInfo.meeting_link && (
              <Link href={classInfo.meeting_link} target="_blank">
                <Button className="bg-white text-[#5b56a5] hover:bg-white/90 shadow-lg font-medium">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  Join Class
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Class Information Card */}
            <Card className="bg-gradient-to-br from-[#FDFDFB] to-[#F8F6F2] border border-[#E5E0D9] shadow-sm">
              <CardHeader className="border-b border-[#E5E0D9]">
                <CardTitle className="text-xl sm:text-2xl font-playfair-display text-[#0F3B56] flex items-center gap-2">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Class Information
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                {classInfo.description ? (
                  <p className="text-gray-700 leading-relaxed">
                    {classInfo.description}
                  </p>
                ) : (
                  <p className="text-gray-500 italic">
                    No description available for this class.
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Announcements Card */}
            <Card className="bg-gradient-to-br from-[#FDFDFB] to-[#F8F6F2] border border-[#E5E0D9] shadow-sm">
              <CardHeader className="border-b border-[#E5E0D9]">
                <CardTitle className="text-xl sm:text-2xl font-playfair-display text-[#0F3B56] flex items-center gap-2">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                    />
                  </svg>
                  Announcements
                  {announcements && announcements.length > 0 && (
                    <span className="ml-auto text-sm font-normal text-gray-500 bg-[#5b56a5]/10 px-3 py-1 rounded-full">
                      {announcements.length}
                    </span>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                {announcements && announcements.length > 0 ? (
                  <div className="space-y-4">
                    {announcements.map((announcement: any) => (
                      <div
                        key={announcement.id}
                        className="bg-white p-4 sm:p-5 rounded-lg border border-[#E5E0D9] shadow-sm hover:shadow-md transition-all duration-200"
                      >
                        <div className="flex items-start gap-3 mb-3">
                          <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-[#5b56a5] to-[#7a76b8] rounded-full flex items-center justify-center">
                            <svg
                              className="w-5 h-5 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                              />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
                              {announcement.message}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500 ml-13">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span>
                            {new Date(
                              announcement.created_at
                            ).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                      <svg
                        className="w-8 h-8 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-500 text-sm font-medium mb-1">
                      No announcements yet
                    </p>
                    <p className="text-gray-400 text-xs">
                      Check back later for updates from your instructor
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Info Card */}
            <Card className="bg-gradient-to-br from-[#5b56a5] to-[#7a76b8] border-0 shadow-lg text-white">
              <CardHeader>
                <CardTitle className="text-lg font-playfair-display text-white flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Quick Info
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {classInfo.day && classInfo.time && (
                  <div className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <div>
                      <p className="text-xs text-white/70 uppercase tracking-wide mb-1">
                        Schedule
                      </p>
                      <p className="text-white font-medium">{classInfo.day}</p>
                      <p className="text-white/90 text-sm">{classInfo.time}</p>
                    </div>
                  </div>
                )}
                {classInfo.meeting_link && (
                  <div className="flex items-start gap-3 pt-4 border-t border-white/20">
                    <svg
                      className="w-5 h-5 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-white/70 uppercase tracking-wide mb-1">
                        Meeting Link
                      </p>
                      <Link
                        href={classInfo.meeting_link}
                        target="_blank"
                        className="text-white hover:text-white/80 underline text-sm break-all"
                      >
                        Click to join
                      </Link>
                    </div>
                  </div>
                )}
                <div className="flex items-start gap-3 pt-4 border-t border-white/20">
                  <svg
                    className="w-5 h-5 mt-0.5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                    />
                  </svg>
                  <div>
                    <p className="text-xs text-white/70 uppercase tracking-wide mb-1">
                      Announcements
                    </p>
                    <p className="text-white font-medium text-lg">
                      {announcements?.length || 0}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Help Card */}
            <Card className="bg-gradient-to-br from-[#FDFDFB] to-[#F8F6F2] border border-[#E5E0D9] shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-playfair-display text-[#0F3B56] flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Need Help?
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-3 text-sm text-gray-700">
                <p>
                  If you have any questions about this class, please contact
                  your instructor or reach out to support.
                </p>
                <Link href="/contact">
                  <Button
                    variant="outline"
                    className="w-full border-[#E5E0D9] hover:bg-[#5b56a5] hover:text-white hover:border-[#5b56a5] transition-colors"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    Contact Support
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
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
    return <Loading />;
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
      <ClassDetailsView
        classId={selectedClassId}
        onBack={() => setSelectedClassId(null)}
      />
    );
  }

  const { profile, accepted_classes, pending_classes, available_classes } =
    dashboard;

  const accepted = accepted_classes || [];
  const available = available_classes || [];
  const pending = pending_classes || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F3F0] via-[#FAF9F7] to-[#F0EDE8] w-full">
      {/* HEADER */}
      <section className="bg-gradient-to-br from-[#5b56a5] to-[#7a76b8] py-12 sm:py-16 px-4 sm:px-6 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-playfair-display text-white mb-2">
            Welcome back, {profile.name}
          </h1>
          <p className="text-white/90 text-sm sm:text-base">
            Your personal portal for classes and updates
          </p>
        </div>
      </section>

      {/* BODY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          <div className="lg:col-span-4 xl:col-span-3 space-y-6">
            {/* PROFILE CARD */}
            <Card className="bg-gradient-to-br from-[#FDFDFB] to-[#F8F6F2] border border-[#E5E0D9] shadow-sm">
              <CardHeader className="border-b border-[#E5E0D9]">
                <CardTitle className="text-xl font-playfair-display text-[#0F3B56] flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="space-y-1">
                  <Label className="text-xs text-gray-500 uppercase tracking-wide">
                    Name
                  </Label>
                  <p className="text-[#0F3B56] font-medium">{profile.name}</p>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-gray-500 uppercase tracking-wide">
                    Email
                  </Label>
                  <p className="text-[#0F3B56] text-sm break-all">
                    {profile.email}
                  </p>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-gray-500 uppercase tracking-wide">
                    Role
                  </Label>
                  <p className="text-[#0F3B56] font-medium capitalize">
                    {profile.role}
                  </p>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-gray-500 uppercase tracking-wide">
                    Member Since
                  </Label>
                  <p className="text-[#0F3B56] text-sm">
                    {profile.joinedDate
                      ? new Date(profile.joinedDate).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )
                      : "N/A"}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* PAYMENT SUPPORT */}
            <Card className="bg-gradient-to-br from-[#FDFDFB] to-[#F8F6F2] border border-[#E5E0D9] shadow-sm">
              <CardHeader className="border-b border-[#E5E0D9]">
                <CardTitle className="text-xl font-playfair-display text-[#0F3B56] flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Payments
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-3">
                <p className="text-sm text-gray-700">
                  Payments are handled outside this app. Use the secure payment link below.
                </p>
                <Link
                  href="https://example.com/payments"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="w-full bg-[#5b56a5] text-white hover:bg-[#7a74cd] shadow-sm transition-all duration-200 py-6 text-base font-medium">
                    Open External Payment Link
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* QUICK STATS */}
            <Card className="bg-gradient-to-br from-[#5b56a5] to-[#7a76b8] border-0 shadow-sm text-white">
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-white/80">
                      Enrolled Classes
                    </span>
                    <span className="text-2xl font-bold">
                      {accepted.length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-white/80">
                      Pending Requests
                    </span>
                    <span className="text-2xl font-bold">{pending.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-white/80">
                      Available Classes
                    </span>
                    <span className="text-2xl font-bold">
                      {available.length}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* RIGHT CONTENT: Classes */}
          <div className="lg:col-span-8 xl:col-span-9 space-y-8 sm:space-y-12">
            {/* ENROLLED CLASSES */}
            {accepted.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-8 w-1 bg-[#5b56a5] rounded-full"></div>
                  <h2 className="text-2xl sm:text-3xl font-playfair-display text-[#0F3B56]">
                    Your Classes
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
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

            {/* PENDING REQUESTS */}
            {pending.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-8 w-1 bg-yellow-500 rounded-full"></div>
                  <h2 className="text-2xl sm:text-3xl font-playfair-display text-[#0F3B56]">
                    Pending Requests
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {pending.map((cls: any) => (
                    <ClassCard key={cls.id} classItem={cls} status="pending" />
                  ))}
                </div>
              </div>
            )}

            {/* AVAILABLE CLASSES */}
            {available.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-8 w-1 bg-green-500 rounded-full"></div>
                  <h2 className="text-2xl sm:text-3xl font-playfair-display text-[#0F3B56]">
                    Available Classes
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {available.map((cls: any) => (
                    <ClassCard
                      key={cls.id}
                      classItem={cls}
                      status="available"
                      onRequest={handleRequestClass}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* EMPTY STATE */}
            {accepted.length === 0 &&
              pending.length === 0 &&
              available.length === 0 && (
                <Card className="bg-gradient-to-br from-[#FDFDFB] to-[#F8F6F2] border border-[#E5E0D9] shadow-sm">
                  <CardContent className="py-16 text-center">
                    <svg
                      className="w-20 h-20 mx-auto text-gray-300 mb-4"
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
                    <h3 className="text-xl font-playfair-display text-[#0F3B56] mb-2">
                      No Classes Yet
                    </h3>
                    <p className="text-gray-600 mb-6">
                      You haven't enrolled in any classes. Browse available
                      classes to get started!
                    </p>
                    <Link href="/classes">
                      <Button className="bg-[#5b56a5] text-white hover:bg-[#7a74cd]">
                        Browse Classes
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )}
          </div>
        </div>
      </section>
    </div>
  );
}
