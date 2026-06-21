
import express from "express";
import dotenv from "dotenv";
import studentData from "./CSDS.json" with { type: "json" };

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Handle both array and object JSON formats
const students = Array.isArray(studentData)
    ? studentData
    : Object.values(studentData)[0];

// =======================
// Home Route
// =======================
app.get("/", (req, res) => {
    console.log("Home Route Hit");

    res.status(200).json({
        api: "Student Class API",
        version: "1.0.0",
        status: "Online",
        totalStudents: students.length,

        endpoints: {
            home: "GET /",
            randomStudent: "GET /student/random",
            searchByRoll: "GET /roll/:roll",
            searchByName: "GET /name/:name",
            getCR: "GET /cr"
        },

        examples: {
            randomStudent: "/student/random",
            searchByRoll: "/roll/101",
            searchByName: "/name/Sidharth",
            getCR: "/cr"
        }
    });
});

// =======================
// Random Student
// =======================
app.get("/student/random", (req, res) => {

    if (students.length === 0) {
        return res.status(404).json({
            success: false,
            message: "No students found"
        });
    }

    const randomIndex = Math.floor(
        Math.random() * students.length
    );

    console.log("Random Student Data Sent");

    res.status(200).json({
        success: true,
        student: students[randomIndex]
    });
});

// =======================
// Get CR
// =======================
app.get("/cr", (req, res) => {

    const cr = students.filter(
        student => student.isCR === true
    );

    if (cr.length === 0) {
        return res.status(404).json({
            success: false,
            message: "CR Not Found"
        });
    }

    console.log("CR Data Sent");

    res.status(200).json({
        success: true,
        count: cr.length,
        data: cr
    });
});

// =======================
// Search by Roll Number
// =======================
app.get("/roll/:roll", (req, res) => {

    const roll = req.params.roll;

    const student = students.find(
        child => child["Student Roll No."] == roll
    );

    if (!student) {
        return res.status(404).json({
            success: false,
            message: "Student Not Found"
        });
    }

    console.log(`Student Found: Roll ${roll}`);

    res.status(200).json({
        success: true,
        data: student
    });
});

// =======================
// Search by Name
// =======================
app.get("/name/:name", (req, res) => {

    const name = req.params.name.toLowerCase();

    const result = students.filter(student => {

        const studentName =
            student["Student Name "]?.toLowerCase();

        return studentName?.includes(name);
    });

    if (result.length === 0) {
        return res.status(404).json({
            success: false,
            message: "Student Not Found"
        });
    }

    console.log(`Name Search: ${name}`);

    res.status(200).json({
        success: true,
        count: result.length,
        data: result
    });
});

// =======================
// Invalid Routes
// =======================
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route Not Found"
    });
});

// =======================
// Server
// =======================
app.listen(PORT, () => {
    console.log(`🚀 Server Running on Port ${PORT}`);
});
