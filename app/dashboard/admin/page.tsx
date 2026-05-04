"use client";

import { useEffect, useState } from "react";
import { API_URL } from "@/lib/api";
import Link from "next/link";
import { Button } from "@/app/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import { Textarea } from "@/app/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";

const WEEK_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const isWeeklyClass = (cls: any) => WEEK_DAYS.includes(cls.day) && cls.time;
const dayIndex = (day?: string) => (day ? WEEK_DAYS.indexOf(day) : -1);
const formatTime = (time?: string) => (!time ? "N/A" : time.slice(0, 5));
const formatDate = (date?: string) => {
  if (!date) return "N/A";
  return new Date(date).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
const formatDateTime = (date?: string) => {
  if (!date) return "N/A";
  return new Date(date).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// ── SHARED ─────────────────────────────────────────────────────────────────

function SectionLabel({ label }: { label: string }) {
  return (
    <p className="text-[0.6rem] tracking-[0.22em] uppercase text-gray-400 mb-3 font-medium">
      {label}
    </p>
  );
}

function SectionHeading({ title }: { title: string }) {
  return (
    <h2 className="font-['Cormorant_Garamond',serif] font-light text-[clamp(1.6rem,3vw,2.2rem)] text-[#0F3B56] mb-8">
      {title}
    </h2>
  );
}

function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="p-8 bg-white hover:bg-[#F8F6F2] transition-colors duration-300 border-r border-b border-[#E5E0D9] last:border-r-0">
      <p className="text-[0.6rem] tracking-[0.22em] uppercase text-gray-400 mb-3 font-medium">
        {title}
      </p>
      <p className="font-['Cormorant_Garamond',serif] font-light text-4xl text-[#5b56a5]">
        {value}
      </p>
    </div>
  );
}

function MessageBanner({
  message,
}: {
  message: { type: "success" | "error"; text: string } | null;
}) {
  if (!message) return null;
  const isSuccess = message.type === "success";
  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 animate-[fadeSlide_0.3s_ease-out]">
      <div
        className={`flex items-center gap-3 pl-4 pr-6 py-3 border shadow-[0_8px_24px_rgba(15,59,86,0.08)] backdrop-blur-sm ${
          isSuccess
            ? "bg-white/95 border-l-2 border-l-[#5b56a5] border-y-[#E5E0D9] border-r-[#E5E0D9]"
            : "bg-white/95 border-l-2 border-l-red-500 border-y-[#E5E0D9] border-r-[#E5E0D9]"
        }`}
      >
        <span
          className={`flex items-center justify-center w-6 h-6 rounded-full ${
            isSuccess
              ? "bg-[#5b56a5]/10 text-[#5b56a5]"
              : "bg-red-50 text-red-500"
          }`}
        >
          {isSuccess ? (
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          )}
        </span>
        <div className="flex flex-col">
          <span
            className={`text-[0.6rem] tracking-[0.18em] uppercase font-medium ${
              isSuccess ? "text-[#5b56a5]" : "text-red-500"
            }`}
          >
            {isSuccess ? "Success" : "Error"}
          </span>
          <span className="text-[0.85rem] text-[#0F3B56]">{message.text}</span>
        </div>
      </div>
      <style jsx>{`
        @keyframes fadeSlide {
          from {
            opacity: 0;
            transform: translate(-50%, -12px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }
      `}</style>
    </div>
  );
}

// ── LOADING ─────────────────────────────────────────────────────────────────

function LoadingState() {
  return (
    <div className="min-h-screen bg-[#FAF9F7] animate-pulse">
      <div className="bg-gradient-to-b from-[#F5F3F0] to-[#FAF9F7] px-6 md:px-[6vw] pt-[16vh] pb-20">
        <div className="h-4 w-32 bg-[#E5E0D9] rounded mb-6" />
        <div className="h-16 w-80 bg-[#E5E0D9] rounded mb-4" />
        <div className="h-4 w-64 bg-[#E5E0D9] rounded" />
      </div>
      <div className="border-t border-[#E5E0D9] px-6 md:px-[6vw] py-20 space-y-8">
        <div className="grid grid-cols-4 border border-[#E5E0D9]">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="p-8 border-r border-[#E5E0D9] last:border-r-0"
            >
              <div className="h-3 w-20 bg-[#E5E0D9] rounded mb-4" />
              <div className="h-8 w-12 bg-[#E5E0D9] rounded" />
            </div>
          ))}
        </div>
        <div className="h-64 bg-[#E5E0D9] rounded" />
        <div className="h-64 bg-[#E5E0D9] rounded" />
      </div>
    </div>
  );
}

// ── VIEW CLASS PAGE ─────────────────────────────────────────────────────────

function ViewClassPage({
  classItem,
  onBack,
}: {
  classItem: any;
  onBack: () => void;
}) {
  const [announcement, setAnnouncement] = useState("");
  const [classDetails, setClassDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState<string>("");
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const loadClassDetails = async () => {
    try {
      const res = await fetch(
        `${API_URL}/admin/classes/${classItem.id}`,
        { credentials: "include" },
      );
      if (res.ok) setClassDetails(await res.json());
    } catch (err) {
      console.error("Failed to load class details", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
    loadClassDetails();
  }, [classItem.id]);

  const showMessage = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  const handlePostAnnouncement = async () => {
    if (!announcement.trim())
      return showMessage("error", "Please enter an announcement");
    setSubmitting(true);
    try {
      const res = await fetch(
        `${API_URL}/teacher/class/announcement`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            class_id: classItem.id,
            message: announcement,
          }),
        },
      );
      if (res.ok) {
        setAnnouncement("");
        showMessage("success", "Announcement posted successfully");
        await loadClassDetails();
      } else {
        const data = await res.json();
        showMessage("error", data.error || "Failed to post announcement");
      }
    } catch {
      showMessage("error", "Error posting announcement");
    } finally {
      setSubmitting(false);
    }
  };

  const handleAddStudent = async () => {
    if (!selectedStudentId)
      return showMessage("error", "Please select a student");
    setSubmitting(true);
    try {
      const res = await fetch(
        `${API_URL}/admin/classes/${classItem.id}/add-student`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ student_id: parseInt(selectedStudentId) }),
        },
      );
      if (res.ok) {
        setShowAddStudent(false);
        setSelectedStudentId("");
        showMessage("success", "Student added successfully");
        await loadClassDetails();
      } else {
        const data = await res.json();
        showMessage("error", data.error || "Failed to add student");
      }
    } catch {
      showMessage("error", "Error adding student");
    } finally {
      setSubmitting(false);
    }
  };

  const handleRemoveStudent = async (studentId: number) => {
    if (!confirm("Remove this student from the class?")) return;
    try {
      const res = await fetch(
        `${API_URL}/admin/classes/${classItem.id}/remove-student`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ student_id: studentId }),
        },
      );
      if (res.ok) {
        showMessage("success", "Student removed successfully");
        await loadClassDetails();
      } else {
        const data = await res.json();
        showMessage("error", data.error || "Failed to remove student");
      }
    } catch {
      showMessage("error", "Error removing student");
    }
  };

  const students = classDetails?.students || [];
  const allStudents = classDetails?.all_students || [];
  const announcements = classDetails?.announcements || [];
  const enrolledIds = new Set(students.map((s: any) => s.id));
  const availableStudents = allStudents.filter(
    (s: any) => !enrolledIds.has(s.id),
  );

  if (loading) return <LoadingState />;

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
          {classItem.title || "Class Details"}
        </h1>
        {classItem.day && classItem.time && (
          <p className="text-[0.9rem] text-gray-500">
            {classItem.day} at {formatTime(classItem.time)}
          </p>
        )}
        {classItem.meeting_link && (
          <Link
            href={classItem.meeting_link}
            target="_blank"
            className="inline-flex items-center gap-2 mt-4 text-[0.75rem] tracking-[0.12em] uppercase font-medium text-[#5b56a5] hover:text-[#F6CB59] transition-colors"
          >
            Open Meeting Link
            <span className="w-4 h-px bg-current" />
          </Link>
        )}
      </section>

      <MessageBanner message={message} />

      {/* Content */}
      <section className="border-t border-[#E5E0D9] px-6 md:px-[6vw] py-16 grid lg:grid-cols-3 gap-10">
        {/* Left — announcements */}
        <div className="lg:col-span-2 space-y-10">
          {/* Post Announcement */}
          <div className="border border-[#E5E0D9] bg-white p-8">
            <SectionLabel label="Broadcast" />
            <h3 className="font-['Cormorant_Garamond',serif] font-light text-xl text-[#0F3B56] mb-5">
              Post Announcement
            </h3>
            <Textarea
              placeholder="Write a new announcement..."
              value={announcement}
              onChange={(e) => setAnnouncement(e.target.value)}
              className="bg-[#F5F3F0] border-[#E5E0D9] rounded-none focus-visible:ring-[#5b56a5]/30 mb-4 min-h-[120px]"
            />
            <button
              onClick={handlePostAnnouncement}
              disabled={submitting}
              className="text-[0.75rem] tracking-[0.12em] uppercase font-medium text-[#5b56a5] hover:text-[#F6CB59] transition-colors disabled:opacity-40 flex items-center gap-2"
            >
              {submitting ? "Posting..." : "Post Announcement"}
              <span className="w-4 h-px bg-current" />
            </button>
          </div>

          {/* Announcements list */}
          <div className="border border-[#E5E0D9]">
            <div className="px-8 py-5 border-b border-[#E5E0D9] flex justify-between items-baseline">
              <div>
                <SectionLabel label="History" />
                <h3 className="font-['Cormorant_Garamond',serif] font-light text-xl text-[#0F3B56]">
                  Announcements
                </h3>
              </div>
              {announcements.length > 0 && (
                <span className="font-['Cormorant_Garamond',serif] text-3xl font-light text-[#5b56a5]/30">
                  {announcements.length}
                </span>
              )}
            </div>

            {announcements.length > 0 ? (
              <div className="divide-y divide-[#E5E0D9]">
                {announcements.map((item: any) => (
                  <div
                    key={item.id}
                    className="px-8 py-6 bg-white hover:bg-[#F8F6F2] transition-colors"
                  >
                    <p className="text-[0.9rem] leading-[1.8] text-gray-700 whitespace-pre-wrap mb-3">
                      {item.message}
                    </p>
                    <p className="text-[0.7rem] tracking-[0.1em] uppercase text-gray-400 font-medium">
                      {formatDateTime(item.created_at)}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="px-8 py-16 text-center">
                <p className="text-[0.9rem] text-gray-400">
                  No announcements yet
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right — students */}
        <div className="space-y-6">
          <div className="border border-[#E5E0D9]">
            <div className="px-6 py-5 border-b border-[#E5E0D9] flex justify-between items-center">
              <div>
                <SectionLabel label="Enrolled" />
                <h3 className="font-['Cormorant_Garamond',serif] font-light text-xl text-[#0F3B56]">
                  Students ({students.length})
                </h3>
              </div>

              <Dialog open={showAddStudent} onOpenChange={setShowAddStudent}>
                <DialogTrigger asChild>
                  <button className="text-[0.65rem] tracking-[0.12em] uppercase font-medium text-[#5b56a5] hover:text-[#F6CB59] transition-colors flex items-center gap-2">
                    Add
                    <span className="w-3 h-px bg-current" />
                  </button>
                </DialogTrigger>
                <DialogContent className="border border-[#E5E0D9] bg-white rounded-none max-w-sm">
                  <DialogHeader>
                    <DialogTitle className="font-['Cormorant_Garamond',serif] font-light text-xl text-[#0F3B56]">
                      Add Student
                    </DialogTitle>
                    <DialogDescription className="text-[0.8rem] text-gray-500">
                      Select a student to add to this class.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                    <Label className="text-[0.7rem] tracking-[0.1em] uppercase text-gray-500 font-medium">
                      Student
                    </Label>
                    <select
                      value={selectedStudentId}
                      onChange={(e) => setSelectedStudentId(e.target.value)}
                      className="w-full mt-2 p-2.5 border border-[#E5E0D9] bg-[#F5F3F0] text-[0.9rem] focus:outline-none focus:ring-1 focus:ring-[#5b56a5]/30"
                    >
                      <option value="">Select a student</option>
                      {availableStudents.map((s: any) => (
                        <option key={s.id} value={s.id}>
                          {s.name} ({s.email})
                        </option>
                      ))}
                    </select>
                    {availableStudents.length === 0 && (
                      <p className="text-[0.8rem] text-gray-400 mt-2">
                        All students are already enrolled.
                      </p>
                    )}
                  </div>
                  <DialogFooter className="gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setShowAddStudent(false)}
                      className="rounded-none text-xs"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleAddStudent}
                      disabled={!selectedStudentId || submitting}
                      className="bg-[#5b56a5] text-white hover:bg-[#4f4a94] rounded-none disabled:opacity-50 text-xs"
                    >
                      {submitting ? "Adding..." : "Add Student"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            {students.length > 0 ? (
              <div className="divide-y divide-[#E5E0D9]">
                {students.map((s: any) => (
                  <div
                    key={s.id}
                    className="px-6 py-4 flex items-center justify-between bg-white hover:bg-[#F8F6F2] transition-colors"
                  >
                    <div>
                      <p className="text-[0.9rem] font-medium text-[#0F3B56]">
                        {s.name}
                      </p>
                      {s.email && (
                        <p className="text-[0.75rem] text-gray-400">
                          {s.email}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => handleRemoveStudent(s.id)}
                      className="text-[0.65rem] tracking-[0.1em] uppercase font-medium text-red-400 hover:text-red-600 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="px-6 py-12 text-center">
                <p className="text-[0.85rem] text-gray-400">
                  No students enrolled yet
                </p>
              </div>
            )}
          </div>

          {/* Quick info */}
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
                  {classItem.day && classItem.time
                    ? `${classItem.day} at ${formatTime(classItem.time)}`
                    : "Personalised scheduling"}
                </p>
              </div>
              <div className="px-6 py-4">
                <p className="text-[0.65rem] tracking-[0.12em] uppercase text-gray-400 mb-1 font-medium">
                  Students
                </p>
                <p className="font-['Cormorant_Garamond',serif] text-3xl font-light text-[#5b56a5]">
                  {students.length}
                </p>
              </div>
              <div className="px-6 py-4">
                <p className="text-[0.65rem] tracking-[0.12em] uppercase text-gray-400 mb-1 font-medium">
                  Announcements
                </p>
                <p className="font-['Cormorant_Garamond',serif] text-3xl font-light text-[#5b56a5]">
                  {announcements.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ── MAIN DASHBOARD ──────────────────────────────────────────────────────────

export default function AdminDashboard() {
  const [authLoading, setAuthLoading] = useState(true);
  const [dataLoading, setDataLoading] = useState(true);
  const [dashboard, setDashboard] = useState<any>(null);
  const [selectedClass, setSelectedClass] = useState<any>(null);
  const [scheduleClass, setScheduleClass] = useState<any>(null);
  const [studentSearch, setStudentSearch] = useState("");

  const loadData = async () => {
    try {
      const res = await fetch(`${API_URL}/admin/dashboard`, {
        credentials: "include",
      });
      setDashboard(await res.json());
    } catch (err) {
      console.error("Failed to fetch admin dashboard", err);
    } finally {
      setDataLoading(false);
    }
  };

  useEffect(() => {
    async function checkAdmin() {
      try {
        const res = await fetch(`${API_URL}/auth/me`, {
          credentials: "include",
        });
        if (!res.ok) {
          window.location.href = "/";
          return;
        }
        setAuthLoading(false);
      } catch {
        window.location.href = "/";
      }
    }
    checkAdmin();
    loadData();
  }, []);

  if (authLoading || dataLoading) return <LoadingState />;

  if (!dashboard) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF9F7]">
        <div className="text-center">
          <p className="text-gray-600 mb-4 text-[0.9rem]">
            Failed to load dashboard.
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

  if (selectedClass)
    return (
      <ViewClassPage
        classItem={selectedClass}
        onBack={() => setSelectedClass(null)}
      />
    );

  const { students, classes, requests } = dashboard;
  const studentsList = students || [];
  const classesList = classes || [];
  const requestsList = requests || [];

  const sortedClasses = [...classesList].sort((a: any, b: any) => {
    const aW = isWeeklyClass(a),
      bW = isWeeklyClass(b);
    if (aW && !bW) return -1;
    if (!aW && bW) return 1;
    if (aW && bW) return dayIndex(a.day) - dayIndex(b.day);
    return 0;
  });

  const classMap: Record<number, any> = {};
  classesList.forEach((c: any) => {
    classMap[c.id] = c;
  });

  const filteredStudents = studentsList.filter((s: any) =>
    s.name?.toLowerCase().includes(studentSearch.toLowerCase()),
  );

  const getUpcomingLessons = (classId: number) =>
    requestsList
      .filter(
        (r: any) =>
          Array.isArray(r.class_ids) &&
          r.class_ids.includes(classId) &&
          r.date &&
          r.time,
      )
      .sort(
        (a: any, b: any) =>
          new Date(`${a.date}T${a.time}`).getTime() -
          new Date(`${b.date}T${b.time}`).getTime(),
      );

  const approveRequest = async (id: number) => {
    const res = await fetch(`${API_URL}/admin/requests/approve`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ request_id: id }),
    });
    if (res.ok) window.location.reload();
    else {
      const d = await res.json();
      alert(d.error || "Failed to approve");
    }
  };

  const rejectRequest = async (id: number) => {
    if (!confirm("Reject this request?")) return;
    const res = await fetch(`${API_URL}/admin/requests/reject`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ request_id: id }),
    });
    if (res.ok) window.location.reload();
    else {
      const d = await res.json();
      alert(d.error || "Failed to reject");
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F7]">
      {/* ── HERO ── */}
      <section className="bg-gradient-to-b from-[#F5F3F0] to-[#FAF9F7] px-6 md:px-[6vw] pt-[16vh] pb-16">
        <SectionLabel label="Al Bayan Academy" />
        <h1 className="font-['Cormorant_Garamond',serif] font-light text-[clamp(2.8rem,6vw,5rem)] leading-[1.05] text-[#0F3B56] mb-3">
          Admin <span className="italic text-[#5b56a5]">Dashboard</span>
        </h1>
        <p className="text-[0.9rem] text-gray-500">
          Manage students, classes, announcements and requests.
        </p>
      </section>

      {/* ── STATS ── */}
      <section className="border-t border-[#E5E0D9] px-6 md:px-[6vw] py-0">
        <div className="grid grid-cols-2 md:grid-cols-3 border border-[#E5E0D9] -mt-px">
          <StatCard title="Total Students" value={studentsList.length} />
          <StatCard title="Active Classes" value={classesList.length} />
          <StatCard title="Pending Requests" value={requestsList.length} />
        </div>
      </section>

      {/* ── REQUESTS ── */}
      <section className="border-t border-[#E5E0D9] px-6 md:px-[6vw] py-16">
        <SectionLabel label="Pending" />
        <SectionHeading title="Lesson Requests" />

        <div className="border border-[#E5E0D9]">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#F8F6F2] hover:bg-[#F8F6F2]">
                <TableHead className="text-[0.65rem] tracking-[0.12em] uppercase text-gray-400 font-medium">
                  Student
                </TableHead>
                <TableHead className="text-[0.65rem] tracking-[0.12em] uppercase text-gray-400 font-medium">
                  Class
                </TableHead>
                <TableHead className="text-[0.65rem] tracking-[0.12em] uppercase text-gray-400 font-medium">
                  Date
                </TableHead>
                <TableHead className="text-[0.65rem] tracking-[0.12em] uppercase text-gray-400 font-medium text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requestsList.length > 0 ? (
                requestsList.map((req: any) => {
                  const student = req.users || {};
                  const classIds = req.class_ids || [];
                  return (
                    <TableRow
                      key={req.id}
                      className="bg-white hover:bg-[#F8F6F2] border-t border-[#E5E0D9]"
                    >
                      <TableCell>
                        <p className="text-[0.9rem] font-medium text-[#0F3B56]">
                          {student.name || `User ${req.student_id}`}
                        </p>
                        {student.email && (
                          <p className="text-[0.75rem] text-gray-400">
                            {student.email}
                          </p>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {classIds.map((id: number) => {
                            const c = classMap[id];
                            return (
                              <div key={id}>
                                <span className="text-[0.85rem] font-medium text-[#0F3B56]">
                                  {c?.title || `Class ${id}`}
                                </span>
                                <span className="text-[0.8rem] text-gray-400 ml-2">
                                  {req.time
                                    ? `· ${formatTime(req.time)}`
                                    : c?.time
                                      ? `· ${formatTime(c.time)}`
                                      : ""}
                                </span>
                              </div>
                            );
                          })}
                          {req.extra_details && (
                            <p className="text-[0.75rem] text-gray-400 italic">
                              {req.extra_details}
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-[0.85rem] text-gray-600">
                        {req.date
                          ? formatDate(req.date)
                          : classIds
                              .map((id: number) => classMap[id]?.day)
                              .filter(Boolean)
                              .join(", ") || "N/A"}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-3">
                          <button
                            onClick={() => approveRequest(req.id)}
                            className="text-[0.65rem] tracking-[0.1em] uppercase font-medium text-[#5b56a5] hover:text-[#0F3B56] transition-colors"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => rejectRequest(req.id)}
                            className="text-[0.65rem] tracking-[0.1em] uppercase font-medium text-red-400 hover:text-red-600 transition-colors"
                          >
                            Reject
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center text-gray-400 text-[0.85rem] py-12"
                  >
                    No pending requests
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </section>

      {/* ── STUDENTS ── */}
      <section className="border-t border-[#E5E0D9] px-6 md:px-[6vw] py-16">
        <SectionLabel label="Directory" />
        <SectionHeading title="Students" />

        <div className="mb-5">
          <Input
            type="text"
            placeholder="Search by name..."
            value={studentSearch}
            onChange={(e) => setStudentSearch(e.target.value)}
            className="bg-[#F5F3F0] border-[#E5E0D9] rounded-none focus-visible:ring-[#5b56a5]/30 max-w-sm text-[0.85rem]"
          />
        </div>

        <div className="border border-[#E5E0D9]">
          {/* Sticky header */}
          <table className="w-full">
            <thead>
              <tr className="bg-[#F8F6F2] border-b border-[#E5E0D9]">
                <th className="text-left px-4 py-3 text-[0.65rem] tracking-[0.12em] uppercase text-gray-400 font-medium w-1/2">
                  Name
                </th>
                <th className="text-left px-4 py-3 text-[0.65rem] tracking-[0.12em] uppercase text-gray-400 font-medium w-1/2">
                  Email
                </th>
              </tr>
            </thead>
          </table>
          {/* Scrollable body */}
          <div className="max-h-[320px] overflow-y-auto">
            <table className="w-full">
              <tbody>
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((s: any) => (
                    <tr
                      key={s.id}
                      className="bg-white hover:bg-[#F8F6F2] border-t border-[#E5E0D9] transition-colors"
                    >
                      <td className="px-4 py-3 text-[0.9rem] font-medium text-[#0F3B56] w-1/2">
                        {s.name || "N/A"}
                      </td>
                      <td className="px-4 py-3 text-[0.85rem] text-gray-500 w-1/2">
                        {s.email || "N/A"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={2}
                      className="text-center text-gray-400 text-[0.85rem] py-12"
                    >
                      No students found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── CLASSES ── */}
      <section className="border-t border-[#E5E0D9] px-6 md:px-[6vw] py-16">
        <SectionLabel label="Programmes" />
        <SectionHeading title="Classes" />

        {sortedClasses.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 border border-[#E5E0D9] divide-x divide-y divide-[#E5E0D9]">
            {sortedClasses.map((cls: any) => {
              const weekly = isWeeklyClass(cls);
              return (
                <div
                  key={cls.id}
                  className="p-8 bg-white hover:bg-[#F8F6F2] transition-colors duration-300 group flex flex-col justify-between gap-6"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <h3 className="font-['Cormorant_Garamond',serif] text-[1.2rem] text-[#0F3B56]">
                        {cls.title || `Class ${cls.id}`}
                      </h3>
                      <span className="text-[0.6rem] tracking-[0.1em] uppercase border border-[#E5E0D9] text-gray-400 px-2 py-1 font-medium whitespace-nowrap">
                        {weekly ? "Weekly" : "1 to 1"}
                      </span>
                    </div>
                    <p className="text-[0.85rem] text-gray-500">
                      {weekly
                        ? `${cls.day} at ${formatTime(cls.time)}`
                        : "Personalised scheduling"}
                    </p>
                  </div>

                  <div className="flex gap-4 pt-4 border-t border-[#E5E0D9]">
                    <button
                      onClick={() => setSelectedClass(cls)}
                      className="text-[0.7rem] tracking-[0.12em] uppercase font-medium text-[#5b56a5] hover:text-[#0F3B56] transition-colors flex items-center gap-2"
                    >
                      View Class
                      <span className="w-4 h-px bg-current" />
                    </button>
                    {!weekly && (
                      <button
                        onClick={() => setScheduleClass(cls)}
                        className="text-[0.7rem] tracking-[0.12em] uppercase font-medium text-gray-400 hover:text-[#0F3B56] transition-colors flex items-center gap-2"
                      >
                        Schedule
                        <span className="w-4 h-px bg-current" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-400 text-[0.9rem]">No classes found.</p>
        )}
      </section>

      {/* ── SCHEDULE DIALOG ── */}
      <Dialog
        open={!!scheduleClass}
        onOpenChange={() => setScheduleClass(null)}
      >
        <DialogContent className="w-[95vw] max-w-2xl max-h-[85vh] flex flex-col p-0 rounded-none border border-[#E5E0D9]">
          <div className="px-6 py-5 border-b border-[#E5E0D9] bg-[#F8F6F2]">
            <DialogHeader>
              <DialogTitle className="font-['Cormorant_Garamond',serif] font-light text-xl text-[#0F3B56]">
                Upcoming Lessons
              </DialogTitle>
              <DialogDescription className="text-[0.8rem] text-gray-500">
                {scheduleClass?.title} · One-to-one sessions
              </DialogDescription>
            </DialogHeader>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-5 space-y-3 bg-white">
            {scheduleClass &&
            getUpcomingLessons(scheduleClass.id).length > 0 ? (
              getUpcomingLessons(scheduleClass.id).map((r: any) => (
                <div
                  key={r.id}
                  className="grid grid-cols-3 gap-4 p-4 border border-[#E5E0D9] bg-[#F8F6F2]"
                >
                  <div>
                    <p className="text-[0.6rem] tracking-[0.1em] uppercase text-gray-400 font-medium mb-1">
                      Date
                    </p>
                    <p className="text-[0.9rem] text-[#0F3B56] font-medium">
                      {formatDate(r.date)}
                    </p>
                  </div>
                  <div>
                    <p className="text-[0.6rem] tracking-[0.1em] uppercase text-gray-400 font-medium mb-1">
                      Time
                    </p>
                    <p className="text-[0.9rem] text-[#0F3B56] font-medium">
                      {formatTime(r.time)}
                    </p>
                  </div>
                  <div>
                    <p className="text-[0.6rem] tracking-[0.1em] uppercase text-gray-400 font-medium mb-1">
                      Student
                    </p>
                    <p className="text-[0.9rem] text-gray-700 font-medium">
                      {r.users?.name || `User ${r.student_id}`}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-[0.85rem] text-gray-400">
                  No upcoming lessons scheduled.
                </p>
              </div>
            )}
          </div>

          <div className="px-6 py-4 border-t border-[#E5E0D9] bg-[#F8F6F2] flex justify-end">
            <button
              onClick={() => setScheduleClass(null)}
              className="text-[0.7rem] tracking-[0.12em] uppercase font-medium text-gray-500 hover:text-[#0F3B56] transition-colors"
            >
              Close
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
