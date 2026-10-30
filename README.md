# AI Smart Timetable

An AI-powered personalized study planning platform that analyzes student academic information and performance to generate adaptive study priorities and personalized timetables.

The system combines a React frontend, Spring Boot backend, MySQL database, and an adaptive AI scoring mechanism to help students organize their study time based on subject difficulty, priority, previous marks, and recent performance.

---

## 🚀 Features

### 👤 Student Authentication

- Student registration
- Student login
- BCrypt password hashing
- Student-specific accounts
- Secure password verification
- Logout functionality

### 📚 Subject Management

Students can:

- Add subjects
- View their subjects
- Delete subjects
- Set subject difficulty
- Set subject priority
- Store previous marks

### 📊 Performance Tracking

Students can record:

- Test marks
- Study hours
- Completion percentage
- Performance date
- Notes

The system uses recent performance records to dynamically update subject priorities.

### 🤖 AI-Based Adaptive Scoring

The system calculates an adaptive score for each subject using:

- Subject difficulty
- Subject priority
- Previous marks
- Recent test performance
- Completion percentage

The resulting score is classified as:

```text
HIGH
MEDIUM
LOW
