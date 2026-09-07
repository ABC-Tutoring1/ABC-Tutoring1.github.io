// ---- Data model ----
// A "tutor" has: id, name, photo, subjects[], grades, rate, slots[]
// A "slot" has: day, time, booked (bool)
// A "booking" has: tutorId, tutorName, day, time, parentName, parentEmail,
//                   studentFirstName, studentGrade, subject, bookedAt

const DEFAULT_TUTORS = [
  {
    id: "t1",
    name: "Sarah Chen",
    photo: "https://i.pravatar.cc/300?img=47",
    subjects: ["Elementary Math", "Algebra I"],
    grades: "Grades 3–8",
    rate: 40,
    slots: [
      { day: "Mon", time: "4:00 PM", booked: false },
      { day: "Wed", time: "4:00 PM", booked: false },
      { day: "Thu", time: "5:30 PM", booked: false }
    ]
  },
  {
    id: "t2",
    name: "James Rodriguez",
    photo: "https://i.pravatar.cc/300?img=12",
    subjects: ["Algebra I", "Algebra II"],
    grades: "Grades 7–10",
    rate: 45,
    slots: [
      { day: "Tue", time: "4:30 PM", booked: false },
      { day: "Thu", time: "4:30 PM", booked: false },
      { day: "Sat", time: "10:00 AM", booked: false }
    ]
  },
  {
    id: "t3",
    name: "Priya Patel",
    photo: "https://i.pravatar.cc/300?img=32",
    subjects: ["Science (Bio & Chem)"],
    grades: "Grades 6–10",
    rate: 42,
    slots: [
      { day: "Mon", time: "5:00 PM", booked: false },
      { day: "Wed", time: "5:00 PM", booked: false },
      { day: "Fri", time: "3:30 PM", booked: false }
    ]
  },
  {
    id: "t4",
    name: "David Kim",
    photo: "https://i.pravatar.cc/300?img=33",
    subjects: ["Elementary Reading"],
    grades: "Grades K–5",
    rate: 35,
    slots: [
      { day: "Tue", time: "3:30 PM", booked: false },
      { day: "Thu", time: "3:30 PM", booked: false },
      { day: "Sat", time: "9:00 AM", booked: false }
    ]
  },
  {
    id: "t5",
    name: "Emily Johnson",
    photo: "https://i.pravatar.cc/300?img=45",
    subjects: ["Elementary Math", "Science"],
    grades: "Grades 3–6",
    rate: 38,
    slots: [
      { day: "Mon", time: "3:30 PM", booked: false },
      { day: "Wed", time: "3:30 PM", booked: false },
      { day: "Fri", time: "4:00 PM", booked: false }
    ]
  },
  {
    id: "t6",
    name: "Marcus Lee",
    photo: "https://i.pravatar.cc/300?img=14",
    subjects: ["Algebra II", "Science"],
    grades: "Grades 8–10",
    rate: 48,
    slots: [
      { day: "Tue", time: "5:30 PM", booked: false },
      { day: "Thu", time: "6:00 PM", booked: false },
      { day: "Sat", time: "11:00 AM", booked: false }
    ]
  }
];

function loadTutors() {
  const stored = localStorage.getItem("abc_tutors");
  if (stored) return JSON.parse(stored);
  localStorage.setItem("abc_tutors", JSON.stringify(DEFAULT_TUTORS));
  return DEFAULT_TUTORS;
}

function saveTutors(tutors) {
  localStorage.setItem("abc_tutors", JSON.stringify(tutors));
}

function getTutorById(id) {
  return loadTutors().find(t => t.id === id);
}

function loadBookings() {
  const stored = localStorage.getItem("abc_bookings");
  return stored ? JSON.parse(stored) : [];
}

function saveBooking(booking) {
  const bookings = loadBookings();
  bookings.push(booking);
  localStorage.setItem("abc_bookings", JSON.stringify(bookings));
}

// Marks a slot as booked for a given tutor
function markSlotBooked(tutorId, day, time) {
  const tutors = loadTutors();
  const tutor = tutors.find(t => t.id === tutorId);
  if (!tutor) return;
  const slot = tutor.slots.find(s => s.day === day && s.time === time);
  if (slot) slot.booked = true;
  saveTutors(tutors);
}

// Dev helper: reset all demo data (open console and run resetDemoData())
function resetDemoData() {
  localStorage.removeItem("abc_tutors");
  localStorage.removeItem("abc_bookings");
  location.reload();
}
