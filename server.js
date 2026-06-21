import express from "express";
import dotenv from "dotenv";
import studentData from "./CSDS.json" with { type: "json" };

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const students = Array.isArray(studentData)
  ? studentData
  : Object.values(studentData)[0];

app.get("/", (req, res) => {
  res.json({
    api: "Student Class API",
    version: "1.0.0",
    status: "Online",
    totalStudents: students.length,
    endpoints: {
      randomStudent: "/student/random",
      searchByRoll: "/roll/:roll",
      searchByName: "/name/:name",
      getCR: "/cr",
    },
  });
});

app.get("/student/random", (req, res) => {
  if (!students.length) {
    return res.status(404).json({
      success: false,
      message: "No students found",
    });
  }

  const randomStudent =
    students[Math.floor(Math.random() * students.length)];

  res.json({
    success: true,
    student: randomStudent,
  });
});

app.get("/cr", (req, res) => {
  const cr = students.filter((student) => student.isCR);

  if (!cr.length) {
    return res.status(404).json({
      success: false,
      message: "CR Not Found",
    });
  }

  res.json({
    success: true,
    count: cr.length,
    data: cr,
  });
});

app.get("/roll/:roll", (req, res) => {
  const student = students.find(
    (s) => s["Student Roll No."] == req.params.roll
  );

  if (!student) {
    return res.status(404).json({
      success: false,
      message: "Student Not Found",
    });
  }

  res.json({
    success: true,
    data: student,
  });
});

app.get("/name/:name", (req, res) => {
  const name = req.params.name.toLowerCase();

  const result = students.filter((student) =>
    student["Student Name "]?.toLowerCase().includes(name)
  );

  if (!result.length) {
    return res.status(404).json({
      success: false,
      message: "Student Not Found",
    });
  }

  res.json({
    success: true,
    count: result.length,
    data: result,
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
