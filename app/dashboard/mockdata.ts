// Student Dashboard Mock Data
export const studentProfileMock = {
  name: "Layla Zaid",
  email: "layla.zaid@example.com",
  role: "Student",
  joinedDate: "October 12, 2024",
};

export const studentClassesMock = [
  {
    id: 101,
    title: "Advanced Tajweed: Hafs",
    description:
      "Deep dive into the rules of recitation according to the Hafs 'an 'Asim transmission.",
    status: "accepted",
    meetingLink: "https://zoom.us/j/123456789",
    nextSchedule: "Monday 7:00 PM GMT",
  },
  {
    id: 102,
    title: "Arabic Fundamentals I",
    description:
      "An introductory course to foundational Arabic grammar and morphology.",
    status: "pending",
  },
  {
    id: 103,
    title: "Qur'an Memorization Group",
    description:
      "A supportive group setting for students to revise and learn new surahs.",
    status: "available",
  },
  {
    id: 104,
    title: "Spiritual Consultation",
    description: "Request a personalised consultation for spiritual guidance.",
    status: "available",
  },
];

export const studentPaymentStatusMock: "paid" | "unpaid" = "unpaid"; // Change to "paid" to test the paid view

// Teacher/Admin Dashboard Mock Data
export const adminMetricsMock = [
  { title: "Total Students", value: 145, color: "#5b56a5" },
  { title: "Students Active (Paid)", value: 110, color: "#0F3B56" },
  { title: "Students Unpaid", value: 35, color: "#e34a4a" },
  { title: "New Requests", value: 4, color: "#5b56a5" },
];

export const adminJoinRequestsMock = [
  {
    id: 201,
    studentName: "Ahmed Khan",
    classRequested: "Qur'an Memorization Group",
    date: "Dec 5, 2025",
  },
  {
    id: 202,
    studentName: "Sara Ali",
    classRequested: "Advanced Tajweed: Warsh",
    date: "Dec 4, 2025",
  },
];

export const adminStudentsMock = [
  {
    id: 301,
    name: "Layla Zaid",
    email: "layla.zaid@example.com",
    paymentStatus: "unpaid" as const,
  },
  {
    id: 302,
    name: "Omar Hassan",
    email: "omar.h@example.com",
    paymentStatus: "paid" as const,
  },
  {
    id: 303,
    name: "Aisha Malik",
    email: "aisha.m@example.com",
    paymentStatus: "paid" as const,
  },
  {
    id: 304,
    name: "Nadia Farooq",
    email: "nadia.f@example.com",
    paymentStatus: "unpaid" as const,
  },
];

export const adminClassesMock = [
  {
    id: 401,
    title: "Advanced Tajweed: Hafs",
    enrolledStudents: 15,
    meetingLink: "https://zoom.us/j/123456789",
    students: [
      {
        id: 302,
        name: "Omar Hassan",
        email: "omar.h@example.com",
        paymentStatus: "paid" as const,
      },
      {
        id: 303,
        name: "Aisha Malik",
        email: "aisha.m@example.com",
        paymentStatus: "paid" as const,
      },
      {
        id: 301,
        name: "Layla Zaid",
        email: "layla.zaid@example.com",
        paymentStatus: "unpaid" as const,
      },
    ],
    announcements: [
      "The class will be delayed by 15 mins next week.",
      "Homework for chapter 3 is posted.",
    ],
  },
  {
    id: 402,
    title: "Arabic Fundamentals I",
    enrolledStudents: 22,
    meetingLink: "https://meet.google.com/abc-defg-hij",
    students: [
      {
        id: 304,
        name: "Nadia Farooq",
        email: "nadia.f@example.com",
        paymentStatus: "unpaid" as const,
      },
    ],
    announcements: ["Welcome to the new semester!"],
  },
  {
    id: 403,
    title: "Seerah Studies: Early Meccan Period",
    enrolledStudents: 8,
    meetingLink: "https://teams.microsoft.com/l/meetup-join",
    students: [],
    announcements: [],
  },
];
