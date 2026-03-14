"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
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

// ===========================================================================
// STATUS BADGE
// ===========================================================================
const StatusBadge = ({ status }: { status: "paid" | "unpaid" }) => {
  const styles =
    status === "paid"
      ? "bg-green-100 text-green-800 border-green-200"
      : "bg-red-100 text-red-800 border-red-200";

  return (
    <span
      className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full border ${styles}`}
    >
      {status === "paid" ? "Paid" : "Unpaid"}
    </span>
  );
};

// ===========================================================================
// OVERVIEW CARD
// ===========================================================================
const OverviewCard = ({ title, value }: { title: string; value: number }) => (
  <Card className="bg-gradient-to-br from-[#FDFDFB] to-[#F8F6F2] border border-[#E5E0D9] shadow-sm rounded-xl">
    <CardHeader>
      <CardTitle className="text-sm font-playfair-display text-[#0F3B56]">
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-3xl font-bold text-[#5b56a5]">{value}</p>
    </CardContent>
  </Card>
);

// ===========================================================================
// CLASS CARD
// ===========================================================================
const ClassCard = ({
  classItem,
  onSelect,
  onViewSchedule,
}: {
  classItem: any;
  onSelect: () => void;
  onViewSchedule: () => void;
}) => {
  const isWeekly = isWeeklyClass(classItem);

  return (
    <div
      className="p-8 bg-gradient-to-br from-[#FDFDFB] to-[#F8F6F2]
      border border-[#E5E0D9] rounded-xl shadow-sm hover:shadow-md transition"
    >
      <h3 className="text-lg font-playfair-display text-[#0F3B56] mb-2">
        {classItem.title || `Class ${classItem.id}`}
      </h3>

      {isWeekly ? (
        <p className="text-gray-700 text-sm mb-2">
          {classItem.day} at {classItem.time.slice(0, 5)}{" "}
          {classItem.time.slice(0, 3) >= "12" ? "PM" : "AM"}
        </p>
      ) : (
        <p className="text-gray-500 text-sm mb-2">Personalised scheduling</p>
      )}

      <div className="mt-4 flex gap-2">
        {isWeekly ? (
          <Button
            className="bg-[#5b56a5] text-white hover:bg-[#7a74cd] text-sm"
            onClick={onSelect}
          >
            View Class
          </Button>
        ) : (
          <Button
            variant="outline"
            className="text-sm"
            onClick={onViewSchedule}
          >
            View Schedule
          </Button>
        )}
      </div>
    </div>
  );
};

// ===========================================================================
// VIEW CLASS PAGE
// ===========================================================================
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

  useEffect(() => {
    async function loadClassDetails() {
      try {
        const res = await fetch(
          `http://127.0.0.1:5000/admin/classes/${classItem.id}`,
          {
            credentials: "include",
          }
        );

        if (res.ok) {
          const data = await res.json();
          setClassDetails(data);
        }
        setLoading(false);
      } catch (err) {
        console.error("Failed to load class details", err);
        setLoading(false);
      }
    }

    loadClassDetails();
  }, [classItem.id]);

  const handlePostAnnouncement = async () => {
    if (!announcement.trim()) {
      alert("Please enter an announcement");
      return;
    }

    try {
      const res = await fetch(
        "http://127.0.0.1:5000/teacher/class/announcement",
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            class_id: classItem.id,
            message: announcement,
          }),
        }
      );

      if (res.ok) {
        setAnnouncement("");
        alert("Announcement posted successfully");
        // Reload class details to show new announcement
        const detailsRes = await fetch(
          `http://127.0.0.1:5000/admin/classes/${classItem.id}`,
          { credentials: "include" }
        );
        if (detailsRes.ok) {
          const data = await detailsRes.json();
          setClassDetails(data);
        }
      } else {
        const data = await res.json();
        alert(data.error || "Failed to post announcement");
      }
    } catch (err) {
      console.error("Error posting announcement", err);
      alert("Error posting announcement");
    }
  };

  const handleAddStudent = async () => {
    if (!selectedStudentId) {
      alert("Please select a student");
      return;
    }

    try {
      const res = await fetch(
        `http://127.0.0.1:5000/admin/classes/${classItem.id}/add-student`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ student_id: parseInt(selectedStudentId) }),
        }
      );

      if (res.ok) {
        setShowAddStudent(false);
        setSelectedStudentId("");
        alert("Student added successfully");
        // Reload class details
        const detailsRes = await fetch(
          `http://127.0.0.1:5000/admin/classes/${classItem.id}`,
          { credentials: "include" }
        );
        if (detailsRes.ok) {
          const data = await detailsRes.json();
          setClassDetails(data);
        }
      } else {
        let errorMessage = "Failed to add student";
        try {
          const data = await res.json();
          errorMessage = data.error || errorMessage;
        } catch (jsonError) {
          // If response is not JSON, use status text
          errorMessage = `Server error: ${res.status} ${res.statusText}`;
          console.error("Response was not JSON:", await res.text());
        }
        alert(errorMessage);
      }
    } catch (err) {
      console.error("Error adding student", err);
      alert("Error adding student");
    }
  };

  const handleRemoveStudent = async (studentId: number) => {
    if (
      !confirm("Are you sure you want to remove this student from the class?")
    ) {
      return;
    }

    try {
      const res = await fetch(
        `http://127.0.0.1:5000/admin/classes/${classItem.id}/remove-student`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ student_id: studentId }),
        }
      );

      if (res.ok) {
        alert("Student removed successfully");
        // Reload class details
        const detailsRes = await fetch(
          `http://127.0.0.1:5000/admin/classes/${classItem.id}`,
          { credentials: "include" }
        );
        if (detailsRes.ok) {
          const data = await detailsRes.json();
          setClassDetails(data);
        }
      } else {
        const data = await res.json();
        alert(data.error || "Failed to remove student");
      }
    } catch (err) {
      console.error("Error removing student", err);
      alert("Error removing student");
    }
  };

  const students = classDetails?.students || [];
  const allStudents = classDetails?.all_students || [];
  const enrolledStudentIds = new Set(students.map((s: any) => s.id));
  const availableStudents = allStudents.filter(
    (s: any) => !enrolledStudentIds.has(s.id)
  );

  return (
    <section className="w-full py-16 px-6 bg-white">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-playfair-display text-[#5b56a5]">
            {classItem.title || "Class Details"}
          </h1>
          <Button
            onClick={onBack}
            className="bg-[#5b56a5] text-white hover:bg-[#7a74cd]"
          >
            ← Back
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-10">Loading class details...</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left column */}
            <div className="lg:col-span-2 p-8 bg-gradient-to-br from-[#FDFDFB] to-[#F8F6F2] border rounded-xl shadow space-y-6">
              <h2 className="text-2xl font-playfair-display text-[#0F3B56]">
                Class Info
              </h2>

              {classItem.day && classItem.time && (
                <p className="font-medium text-gray-700">
                  Schedule: {classItem.day} at {classItem.time.slice(0, 5)}
                </p>
              )}

              {classItem.meeting_link && (
                <p className="font-medium text-gray-700">
                  Meeting Link:{" "}
                  <Link
                    href={classItem.meeting_link}
                    target="_blank"
                    className="text-[#5b56a5] underline"
                  >
                    {classItem.meeting_link}
                  </Link>
                </p>
              )}

              {classItem.description && (
                <p className="text-gray-700">{classItem.description}</p>
              )}

              <div>
                <h3 className="text-lg font-playfair-display text-[#0F3B56] mb-3">
                  Post Announcement
                </h3>
                <Textarea
                  placeholder="Write a new announcement..."
                  value={announcement}
                  onChange={(e) => setAnnouncement(e.target.value)}
                  className="bg-[#F5F3F0] border"
                />

                <Button
                  className="bg-[#5b56a5] text-white hover:bg-[#7a74cd] w-full mt-3"
                  onClick={handlePostAnnouncement}
                >
                  Post Announcement
                </Button>
              </div>
            </div>

            {/* Right column */}
            <div className="p-8 bg-gradient-to-br from-[#FDFDFB] to-[#F8F6F2] border rounded-xl shadow">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-playfair-display text-[#5b56a5]">
                  Students ({students?.length})
                </h2>
                <Dialog open={showAddStudent} onOpenChange={setShowAddStudent}>
                  <DialogTrigger asChild>
                    <Button className="bg-[#5b56a5] text-white hover:bg-[#7a74cd] text-sm">
                      + Add Student
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Student to Class</DialogTitle>
                      <DialogDescription>
                        Select a student to add to this class.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <Label htmlFor="student-select">Select Student</Label>
                      <select
                        id="student-select"
                        value={selectedStudentId}
                        onChange={(e) => setSelectedStudentId(e.target.value)}
                        className="w-full mt-2 p-2 border border-[#E5E0D9] rounded-md bg-white"
                      >
                        <option value="">-- Select a student --</option>
                        {availableStudents.map((student: any) => (
                          <option key={student.id} value={student.id}>
                            {student.name} ({student.email})
                          </option>
                        ))}
                      </select>
                      {availableStudents.length === 0 && (
                        <p className="text-sm text-gray-500 mt-2">
                          All students are already enrolled in this class.
                        </p>
                      )}
                    </div>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setShowAddStudent(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        className="bg-[#5b56a5] text-white hover:bg-[#7a74cd]"
                        onClick={handleAddStudent}
                        disabled={!selectedStudentId}
                      >
                        Add Student
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              {students?.length > 0 ? (
                <ul className="space-y-2">
                  {students.map((s: any) => (
                    <li
                      key={s.id}
                      className="flex justify-between items-center border-b pb-2"
                    >
                      <div className="flex-1">
                        <span className="text-[#0F3B56]">{s.name}</span>
                        <StatusBadge status={s.payment_status} />
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveStudent(s.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        Remove
                      </Button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No students enrolled yet</p>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// ===========================================================================
// MAIN ADMIN DASHBOARD
// ===========================================================================

export default function AdminDashboard() {
  const [authLoading, setAuthLoading] = useState(true);
  const [dataLoading, setDataLoading] = useState(true);
  const [dashboard, setDashboard] = useState<any>(null);
  const [selectedClass, setSelectedClass] = useState<any | null>(null);
  const [scheduleClass, setScheduleClass] = useState<any | null>(null);
  const [studentSearch, setStudentSearch] = useState("");

  // ------------------------------------------------------------------------
  // FETCH DASHBOARD DATA
  // ------------------------------------------------------------------------
  useEffect(() => {
    async function checkAdmin() {
      try {
        const res = await fetch("http://127.0.0.1:5000/auth/me", {
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
    const loadData = async () => {
      try {
        const res = await fetch("http://127.0.0.1:5000/admin/dashboard", {
          credentials: "include",
        });

        const data = await res.json();
        setDashboard(data);
      } catch (err) {
        console.error("Failed to fetch admin dashboard", err);
      } finally {
        setDataLoading(false);
      }
    };

    checkAdmin();
    loadData();
  }, []);

  // ------------------------------------------------------------------------
  // LOADING SCREEN
  // ------------------------------------------------------------------------
  if (authLoading || dataLoading) {
    return (
      <section className="min-h-screen w-full bg-white flex items-center justify-center">
        <div className="w-full max-w-7xl px-6 py-20 space-y-12 animate-pulse">
          {/* Header */}
          <div className="space-y-3">
            <div className="h-10 w-64 rounded-lg bg-gradient-to-br from-[#EDE9E4] to-[#F5F3F0]" />
            <div className="h-4 w-96 rounded bg-[#EDE9E4]" />
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="p-6 rounded-xl border border-[#E5E0D9] bg-gradient-to-br from-[#FDFDFB] to-[#F8F6F2] space-y-4"
              >
                <div className="h-4 w-24 bg-[#EDE9E4] rounded" />
                <div className="h-8 w-16 bg-[#E0DAF4] rounded" />
              </div>
            ))}
          </div>

          {/* Content blocks */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="p-8 rounded-xl border border-[#E5E0D9] bg-gradient-to-br from-[#FDFDFB] to-[#F8F6F2] space-y-4">
              <div className="h-6 w-40 bg-[#EDE9E4] rounded" />
              <div className="space-y-3">
                <div className="h-4 w-full bg-[#EFEAE4] rounded" />
                <div className="h-4 w-5/6 bg-[#EFEAE4] rounded" />
                <div className="h-4 w-4/6 bg-[#EFEAE4] rounded" />
              </div>
            </div>

            <div className="p-8 rounded-xl border border-[#E5E0D9] bg-gradient-to-br from-[#FDFDFB] to-[#F8F6F2] space-y-4">
              <div className="h-6 w-40 bg-[#EDE9E4] rounded" />
              <div className="space-y-3">
                <div className="h-4 w-full bg-[#EFEAE4] rounded" />
                <div className="h-4 w-5/6 bg-[#EFEAE4] rounded" />
                <div className="h-4 w-4/6 bg-[#EFEAE4] rounded" />
              </div>
            </div>
          </div>

          {/* Footer hint */}
          <div className="text-sm text-gray-500 italic">
            Loading dashboard...
          </div>
        </div>
      </section>
    );
  }

  if (!dashboard) {
    return (
      <span className="w-full h-screen flex items-center justify-center flex-col gap-4">
        <p className="">
          Failed to load dashboard, please refresh and try again.
        </p>
      </span>
    );
  }

  // ------------------------------------------------------------------------
  // CLASS DETAIL VIEW
  // ------------------------------------------------------------------------
  if (selectedClass) {
    return (
      <ViewClassPage
        classItem={selectedClass}
        onBack={() => setSelectedClass(null)}
      />
    );
  }

  // ------------------------------------------------------------------------
  // MAIN ADMIN VIEW
  // ------------------------------------------------------------------------

  if (!dashboard) return <p>Loading...</p>;

  const { students, classes, requests, payments } = dashboard;

  // Ensure we have arrays with default empty arrays
  const studentsList = students || [];
  const classesList = classes || [];
  const requestsList = requests || [];
  const paymentsList = payments || [];

  const sortedClasses = [...classesList].sort((a: any, b: any) => {
    const aWeekly = isWeeklyClass(a);
    const bWeekly = isWeeklyClass(b);

    // Weekly classes first
    if (aWeekly && !bWeekly) return -1;
    if (!aWeekly && bWeekly) return 1;

    // Both weekly → sort by weekday order
    if (aWeekly && bWeekly) {
      return dayIndex(a.day) - dayIndex(b.day);
    }

    // Both non-weekly → keep DB order
    return 0;
  });

  const metrics = [
    { title: "Total Students", value: studentsList.length },
    { title: "Pending Requests", value: requestsList.length },
    { title: "Active Classes", value: classesList.length },
    {
      title: "Paid Students",
      value: paymentsList.filter((p: { status: string }) => p.status === "paid")
        .length,
    },
  ];

  const studentMap: Record<number, string> = {};
  studentsList.forEach(
    (s: { id: number; name: string }) => (studentMap[s.id] = s.name)
  );

  const classMap: Record<number, any> = {};
  classesList.forEach(
    (c: { id: number; title?: string; day?: string; time?: string }) => {
      classMap[c.id] = {
        title: c.title || `Class ${c.id}`,
        day: c.day,
        time: c.time,
      };
    }
  );

  const getUpcomingLessonsForClass = (classId: number) => {
    return requestsList
      .filter(
        (r: any) =>
          Array.isArray(r.class_ids) &&
          r.class_ids.includes(classId) &&
          r.date &&
          r.time
      )
      .sort(
        (a: any, b: any) =>
          new Date(`${a.date}T${a.time}`).getTime() -
          new Date(`${b.date}T${b.time}`).getTime()
      );
  };

  const filteredStudents = studentsList.filter((s: any) =>
    s.name?.toLowerCase().includes(studentSearch.toLowerCase())
  );

  return (
    <section className="bg-white min-h-screen w-full">
      {/* HEADER */}
      <section className="bg-gradient-to-br from-[#F5F3F0] via-[#FAF9F7] to-[#F0EDE8] py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-playfair-display text-[#0F3B56]">
            Admin Dashboard
          </h1>
          <p className="text-md text-gray-700 mt-2">
            Manage students, classes, payments and requests.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto space-y-16">
          {/* METRICS */}
          <div>
            <h2 className="text-3xl font-playfair-display text-[#5b56a5] mb-6">
              Overview
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {metrics.map((m) => (
                <OverviewCard key={m.title} title={m.title} value={m.value} />
              ))}
            </div>
          </div>

          {/* JOIN REQUESTS */}
          <h2 className="text-3xl font-playfair-display text-[#5b56a5] mb-6">
            Lesson Requests
          </h2>
          <div className="p-8 bg-gradient-to-br from-[#FDFDFB] to-[#F8F6F2] border rounded-xl shadow max-h-[400px] overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {requestsList.length > 0 ? (
                  requestsList.map((req: any) => {
                    const student = req.users || {};
                    const classIds = req.class_ids || [];
                    const classNames = classIds
                      .map((id: number) => classMap[id]?.title || `Class ${id}`)
                      .join(", ");

                    return (
                      <TableRow key={req.id}>
                        <TableCell>
                          {student.name || `User ${req.student_id}`}
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            {classIds.length > 0 ? (
                              classIds.map((id: number) => {
                                const classInfo = classMap[id];
                                const requestHasSchedule = req.date && req.time;
                                const classHasSchedule =
                                  classInfo?.day && classInfo?.time;
                                return (
                                  <div key={id} className="text-sm">
                                    <span className="font-medium">
                                      {classInfo?.title || `Class ${id}`}
                                    </span>

                                    {requestHasSchedule ? (
                                      <span className="text-gray-600 ml-2">
                                        ({req.time.slice(0, 5)})
                                      </span>
                                    ) : classHasSchedule ? (
                                      <span className="text-gray-600 ml-2">
                                        ({classInfo.time.slice(0, 5)})
                                      </span>
                                    ) : (
                                      <span className="text-gray-500 ml-2">
                                        (Schedule pending)
                                      </span>
                                    )}
                                  </div>
                                );
                              })
                            ) : (
                              <span>No classes selected</span>
                            )}
                            {req.extra_details && (
                              <p className="text-xs text-gray-500 italic mt-2">
                                Note: {req.extra_details}
                              </p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          {req.date ? (
                            new Date(req.date).toLocaleDateString()
                          ) : classIds.length > 0 ? (
                            <div className="space-y-1">
                              {classIds.map((id: number) => {
                                const classInfo = classMap[id];
                                return classInfo?.day ? (
                                  <div key={id} className="text-sm">
                                    {classInfo.day}
                                  </div>
                                ) : null;
                              })}
                            </div>
                          ) : (
                            "N/A"
                          )}
                        </TableCell>

                        <TableCell className="text-right space-x-2">
                          <Button
                            className="bg-[#5b56a5] text-white hover:bg-[#7a74cd] text-xs px-3"
                            onClick={async () => {
                              try {
                                const res = await fetch(
                                  "http://127.0.0.1:5000/admin/requests/approve",
                                  {
                                    method: "POST",
                                    credentials: "include",
                                    headers: {
                                      "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({
                                      request_id: req.id,
                                    }),
                                  }
                                );

                                if (res.ok) {
                                  window.location.reload();
                                } else {
                                  alert("Failed to approve request");
                                }
                              } catch (err) {
                                console.error("Error approving request", err);
                                alert("Error approving request");
                              }
                            }}
                          >
                            Approve
                          </Button>

                          <Button
                            className="border text-xs px-3"
                            variant="ghost"
                            onClick={async () => {
                              try {
                                const res = await fetch(
                                  "http://127.0.0.1:5000/admin/requests/reject",
                                  {
                                    method: "POST",
                                    credentials: "include",
                                    headers: {
                                      "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({
                                      request_id: req.id,
                                    }),
                                  }
                                );

                                if (res.ok) {
                                  window.location.reload();
                                } else {
                                  alert("Failed to reject request");
                                }
                              } catch (err) {
                                console.error("Error rejecting request", err);
                                alert("Error rejecting request");
                              }
                            }}
                          >
                            Reject
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="text-center text-gray-500"
                    >
                      No pending requests
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* STUDENTS */}
          <h2 className="text-3xl font-playfair-display text-[#5b56a5] mb-6">
            Students
          </h2>
          <div className="p-8 bg-gradient-to-br from-[#FDFDFB] to-[#F8F6F2] border rounded-xl shadow max-h-[400px] overflow-y-auto">
            <Input
              type="text"
              placeholder="Search students by name..."
              value={studentSearch}
              onChange={(e) => setStudentSearch(e.target.value)}
              className="mb-4"
            />

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Payment</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((s: any) => {
                    const paid = paymentsList.some(
                      (p: { user_id: number; status: string }) =>
                        p.user_id === s.id && p.status === "paid"
                    );

                    return (
                      <TableRow key={s.id}>
                        <TableCell>{s.name || "N/A"}</TableCell>
                        <TableCell>{s.email || "N/A"}</TableCell>
                        <TableCell>
                          <StatusBadge status={paid ? "paid" : "unpaid"} />
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={3}
                      className="text-center text-gray-500"
                    >
                      No students found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* CLASSES */}
          <div>
            <h2 className="text-3xl font-playfair-display text-[#0F3B56] mb-6">
              Classes
            </h2>

            {sortedClasses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sortedClasses.map(
                  (cls: {
                    id: number;
                    title?: string;
                    day?: string;
                    time?: string;
                    description?: string;
                  }) => (
                    <ClassCard
                      key={cls.id}
                      classItem={cls}
                      onSelect={() => setSelectedClass(cls)}
                      onViewSchedule={() => setScheduleClass(cls)}
                    />
                  )
                )}
              </div>
            ) : (
              <p className="text-gray-500">No classes found</p>
            )}
          </div>
        </div>
      </section>
      <Dialog
        open={!!scheduleClass}
        onOpenChange={() => setScheduleClass(null)}
      >
        <DialogContent className="w-[95vw] max-w-2xl max-h-[85vh] flex flex-col p-0">
          {/* HEADER */}
          <div className="p-6 border-b bg-gradient-to-br from-[#FDFDFB] to-[#F8F6F2]">
            <DialogHeader>
              <DialogTitle className="text-xl font-playfair-display text-[#0F3B56]">
                Upcoming lessons
              </DialogTitle>
              <DialogDescription className="text-sm text-gray-600">
                {scheduleClass?.title} · One-to-one and personalised sessions
              </DialogDescription>
            </DialogHeader>
          </div>

          {/* CONTENT */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
            {scheduleClass &&
            getUpcomingLessonsForClass(scheduleClass.id).length > 0 ? (
              getUpcomingLessonsForClass(scheduleClass.id).map((r: any) => (
                <div
                  key={r.id}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 border border-[#E5E0D9] rounded-lg bg-[#FDFDFB]"
                >
                  {/* Date */}
                  <div>
                    <p className="text-xs text-gray-500">Date</p>
                    <p className="font-medium text-[#0F3B56]">
                      {new Date(r.date).toLocaleDateString()}
                    </p>
                  </div>

                  {/* Time */}
                  <div>
                    <p className="text-xs text-gray-500">Time</p>
                    <p className="font-medium text-[#0F3B56]">
                      {r.time.slice(0, 5)}
                    </p>
                  </div>

                  {/* Student */}
                  <div>
                    <p className="text-xs text-gray-500">Student</p>
                    <p className="font-medium text-gray-700">
                      {r.users?.name || `User ${r.student_id}`}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-sm text-gray-500">
                  No upcoming lessons scheduled.
                </p>
              </div>
            )}
          </div>

          {/* FOOTER */}
          <div className="p-4 border-t bg-[#FAF9F7] flex justify-end">
            <Button variant="outline" onClick={() => setScheduleClass(null)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
