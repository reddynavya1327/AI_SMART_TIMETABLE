import { useEffect, useState } from "react";

import {
    getStudentSubjects,
    getStudentTimetable,
    getStudentPerformance,
    getAiScore
} from "../services/api";

function Dashboard({ student, onLogout }) {

    const [subjects, setSubjects] = useState([]);
    const [timetable, setTimetable] = useState([]);
    const [performance, setPerformance] = useState([]);
    const [aiScores, setAiScores] = useState({});

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        async function loadDashboard() {

            try {

                const studentId = student.id;

                const subjectsData =
                    await getStudentSubjects(studentId);

                const timetableData =
                    await getStudentTimetable(studentId);

                const performanceData =
                    await getStudentPerformance(studentId);

                setSubjects(subjectsData);
                setTimetable(timetableData);
                setPerformance(performanceData);

                const scoreResults = {};

                await Promise.all(
                    subjectsData.map(
                        async (subject) => {

                            try {

                                const result =
                                    await getAiScore(
                                        subject.id
                                    );

                                scoreResults[subject.id] =
                                    result;

                            } catch (err) {

                                console.error(
                                    `AI score failed for subject ${subject.id}`,
                                    err
                                );

                            }
                        }
                    )
                );

                setAiScores(scoreResults);

            } catch (err) {

                console.error(err);

                setError(
                    "Unable to load dashboard data."
                );

            } finally {

                setLoading(false);
            }
        }

        loadDashboard();

    }, [student.id]);


    if (loading) {

        return (
            <div className="loading">
                Loading dashboard...
            </div>
        );
    }


    if (error) {

        return (
            <div className="error">
                {error}
            </div>
        );
    }


    const highPrioritySubjects =
        subjects.filter(
            subject =>
                aiScores[subject.id]?.priorityLevel ===
                "HIGH"
        );

    const mediumPrioritySubjects =
        subjects.filter(
            subject =>
                aiScores[subject.id]?.priorityLevel ===
                "MEDIUM"
        );

    const lowPrioritySubjects =
        subjects.filter(
            subject =>
                aiScores[subject.id]?.priorityLevel ===
                "LOW"
        );


    const totalRecommendedHours =
        subjects.reduce(
            (total, subject) => {

                const ai =
                    aiScores[subject.id];

                return (
                    total +
                    (ai?.recommendedStudyHours || 0)
                );

            },
            0
        );


    const averageMarks =
        performance.length === 0
            ? 0
            : performance.reduce(
                (total, item) =>
                    total + item.testMarks,
                0
            ) / performance.length;


    return (
        <div className="dashboard">

            {/* HEADER */}

            <header className="dashboard-header">

                <div>

                    <p className="welcome">
                        Welcome back 👋
                    </p>

                    <h1>
                        {student.name}
                    </h1>

                    <p>
                        Your AI-powered study dashboard
                    </p>

                </div>

                <div className="header-actions">

                    <div className="career">
                        🎯 {student.careerGoal}
                    </div>

                    <button
                        className="logout-button"
                        onClick={onLogout}
                    >
                        Logout
                    </button>

                </div>

            </header>


            {/* STATISTICS */}

            <section className="stats">

                <div className="stat-card">

                    <span>
                        📚 Subjects
                    </span>

                    <strong>
                        {subjects.length}
                    </strong>

                </div>


                <div className="stat-card">

                    <span>
                        ⏱ Daily Study Hours
                    </span>

                    <strong>
                        {student.dailyStudyHours}
                    </strong>

                </div>


                <div className="stat-card">

                    <span>
                        🔴 High Priority
                    </span>

                    <strong>
                        {highPrioritySubjects.length}
                    </strong>

                </div>


                <div className="stat-card">

                    <span>
                        📊 Average Marks
                    </span>

                    <strong>
                        {averageMarks.toFixed(1)}%
                    </strong>

                </div>

            </section>


            {/* AI SUMMARY */}

            <section className="dashboard-section">

                <h2>
                    🤖 AI Study Recommendation
                </h2>

                <div className="ai-summary">

                    <div className="stat-card">

                        <span>
                            🔴 High Priority
                        </span>

                        <strong>
                            {highPrioritySubjects.length}
                        </strong>

                    </div>


                    <div className="stat-card">

                        <span>
                            🟡 Medium Priority
                        </span>

                        <strong>
                            {mediumPrioritySubjects.length}
                        </strong>

                    </div>


                    <div className="stat-card">

                        <span>
                            🟢 Low Priority
                        </span>

                        <strong>
                            {lowPrioritySubjects.length}
                        </strong>

                    </div>


                    <div className="stat-card">

                        <span>
                            ⏱ Recommended Study Time
                        </span>

                        <strong>
                            {totalRecommendedHours.toFixed(1)}
                            {" "}
                            hrs
                        </strong>

                    </div>

                </div>

            </section>


            {/* TODAY'S TIMETABLE */}

            <section className="dashboard-section">

                <h2>
                    📅 Today's Timetable
                </h2>

                {timetable.length === 0 ? (

                    <div className="empty">

                        <p>
                            No timetable generated yet.
                        </p>

                        <p>
                            Generate your AI timetable
                            to see today's schedule.
                        </p>

                    </div>

                ) : (

                    <div className="timetable-list">

                        {timetable.map(item => (

                            <div
                                className="timetable-card"
                                key={item.id}
                            >

                                <div>

                                    <strong>
                                        {item.subjectName}
                                    </strong>

                                    <p>
                                        {item.activity}
                                    </p>

                                </div>


                                <div className="time">

                                    {item.startTime}
                                    {" - "}
                                    {item.endTime}

                                </div>


                                <span
                                    className={
                                        item.priorityLevel
                                            ?.toLowerCase()
                                    }
                                >
                                    {item.priorityLevel}
                                </span>

                            </div>

                        ))}

                    </div>

                )}

            </section>


            {/* SUBJECTS + AI */}

            <section className="dashboard-section">

                <h2>
                    📚 Your Subjects & AI Priority
                </h2>

                {subjects.length === 0 ? (

                    <div className="empty">
                        No subjects added yet.
                    </div>

                ) : (

                    <div className="subject-grid">

                        {subjects.map(subject => {

                            const ai =
                                aiScores[subject.id];

                            const priorityClass =
                                ai?.priorityLevel
                                    ?.toLowerCase() || "";

                            return (

                                <div
                                    className="subject-card"
                                    key={subject.id}
                                >

                                    <h3>
                                        {subject.name}
                                    </h3>


                                    <p>
                                        Difficulty:
                                        {" "}
                                        {subject.difficulty}/5
                                    </p>


                                    <p>
                                        Priority:
                                        {" "}
                                        {subject.priority}/5
                                    </p>


                                    <p>
                                        Previous Marks:
                                        {" "}
                                        {subject.previousMarks}%
                                    </p>


                                    {ai && (

                                        <div
                                            className={
                                                `ai-result ${priorityClass}`
                                            }
                                        >

                                            <p>
                                                <strong>
                                                    AI Score:
                                                </strong>
                                                {" "}
                                                {ai.score}
                                            </p>


                                            <p>
                                                <strong>
                                                    AI Priority:
                                                </strong>
                                                {" "}
                                                {ai.priorityLevel}
                                            </p>


                                            <p>
                                                <strong>
                                                    Recommended:
                                                </strong>
                                                {" "}
                                                {
                                                    ai.recommendedStudyHours
                                                }
                                                {" "}
                                                hrs
                                            </p>


                                            <p>
                                                <strong>
                                                    AI Recommendation:
                                                </strong>
                                                {" "}
                                                {
                                                    ai.recommendation
                                                }
                                            </p>

                                        </div>

                                    )}

                                </div>

                            );

                        })}

                    </div>

                )}

            </section>


            {/* PERFORMANCE */}

            <section className="dashboard-section">

                <h2>
                    📈 Recent Performance
                </h2>

                {performance.length === 0 ? (

                    <div className="empty">
                        No performance records yet.
                    </div>

                ) : (

                    <div className="performance-list">

                        {performance
                            .slice()
                            .reverse()
                            .slice(0, 5)
                            .map(item => (

                                <div
                                    className="performance-card"
                                    key={item.id}
                                >

                                    <strong>
                                        {
                                            item.subject?.name ||
                                            "Subject"
                                        }
                                    </strong>

                                    <p>
                                        Test Marks:
                                        {" "}
                                        {item.testMarks}%
                                    </p>

                                    <p>
                                        Completion:
                                        {" "}
                                        {
                                            item.completionPercentage
                                        }%
                                    </p>

                                    <p>
                                        Study Hours:
                                        {" "}
                                        {item.studyHours}
                                    </p>

                                    <small>
                                        {item.date}
                                    </small>

                                </div>

                            ))}

                    </div>

                )}

            </section>

        </div>
    );
}

export default Dashboard;