# Student Class API 🚀

A simple backend API built using **Node.js** and **Express.js** to manage and fetch student details.

## Features ✨
- Random student API
- Search by roll number
- Search by name
- Get CR details
- JSON-based data handling

---

## Tech Stack 🛠️
- Node.js
- Express.js
- dotenv

---

## API Routes 📌

### Home
```http
GET /
```

### Random Student
```http
GET /student/random
```

### Search by Roll
```http
GET /roll/:roll
```

### Search by Name
```http
GET /name/:name
```

### Get CR
```http
GET /cr
```

---

## Installation ⚡

```bash
npm install
```

---

## Create `.env`

```env
PORT=3000
```

---

## Run Server ▶️

```bash
node server.js
```

or

```bash
nodemon server.js
```

---
