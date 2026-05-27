import express from "express";
import dotenv from "dotenv";
import studentData from "./CSDS.json" with { type: "json" };

dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.use(express.json());


const students = Array.isArray(studentData)
    ? studentData
    : Object.values(studentData)[0];


app.get("/", (req, res) => {
    console.log("API Hit Detected");
    res.send("Students Details are Ready");
});


app.get("/student/random", (req, res) => {
    const randomIndex = Math.floor(Math.random() * students.length);
    res.json(students[randomIndex]);
    console.log("Random student data is sent");
});


app.get("/cr", (req, res) => {
    const cr = students.filter(child => child.isCR === true);
    if (!cr) {
        return res.json({message: "CR Not Found"});
    }
    console.log("CR data is sent");
    res.json(cr);
});

app.get("/roll/:roll", (req, res) => {
    const roll = req.params.roll;
    const stud = students.filter(child => child["Student Roll No."] == roll);

    if (!stud) {
        return res.json({message: "Student Not Found"});
    }
    console.log("Student Data is Sent");
    res.json(stud);
});


app.get("/name/:name", (req, res) => {

    const name = req.params.name.toLowerCase();

    const stud = students.filter(child => {

        if (!child["Student Name "]) {
            return false;
        }

        return child["Student Name "]
            .toLowerCase()
            .includes(name);
    });

    if (stud.length === 0) {
        return res.json({
            message: "Student Not Found"
        });
    }

    console.log("Student Name Search Data Sent");

    res.json(stud);
});



app.listen(PORT, () => {

    console.log(`Server Running on Port ${PORT}`);
});