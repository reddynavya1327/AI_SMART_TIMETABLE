import { useEffect, useState } from "react";

import {
    getStudentTimetable,
    generateTimetable
} from "../services/api";

function Timetable({ student }) {

    const [timetable, setTimetable] = useState([]);

    const [loading, setLoading] = useState(true);
    const [generating, setGenerating] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");


    // =========================================================
    // LOAD TIMETABLE
    // =========================================================

    async function loadTimetable() {

        try {

            setLoading(true);
            setError("");

            const data =
                await getStudentTimetable(
                    student.id
                );

            setTimetable(data);

        } catch (err) {

            console.error(err);

            setError(
                err.message ||
                "Unable to load timetable."
            );

        } finally {

            setLoading(false);
        }
    }


    // =========================================================
    // INITIAL LOAD
    // =========================================================

    useEffect(() => {

        loadTimetable();

    }, [student.id]);


    // =========================================================
    // GENERATE AI TIMETABLE
    // =========================================================

    async function handleGenerate() {

        try {

            setGenerating(true);
            setError("");
            setSuccess("");

            const generated =
                await generateTimetable(
                    student.id
                );

            setTimetable(generated);

            setSuccess(
                "Your AI timetable has been generated successfully!"
            );

        } catch (err) {

            console.error(err);

            setError(
                err.message ||
                "Failed to generate timetable."
            );

        } finally {

            setGenerating(false);
        }
    }


    // =========================================================
    // FORMAT TIME
    // =========================================================

    function formatTime(time) {

        if (!time) {
            return "";
        }

        const [hour, minute] =
            time.split(":");

        const date =
            new Date();

        date.setHours(
            Number(hour),
            Number(minute),
            0,
            0
        );

        return date.toLocaleTimeString(
            [],
            {
                hour: "numeric",
                minute: "2-digit"
            }
        );
    }


    // =========================================================
    // PRIORITY CLASS
    // =========================================================

    function getPriorityClass(priority) {

        if (!priority) {
            return "priority-low";
        }

        const value =
            priority.toLowerCase();

        if (value.includes("high")) {
            return "priority-high";
        }

        if (value.includes("medium")) {
            return "priority-medium";
        }

        return "priority-low";
    }


    // =========================================================
    // RENDER
    // =========================================================

    return (

        <div className="timetable-page">

            {/* =================================================
                HEADER
                ================================================= */}

            <div className="timetable-header">

                <div>

                    <p className="page-label">
                        AI Planning
                    </p>

                    <h1>
                        My Timetable
                    </h1>

                    <p>
                        Your study schedule is generated
                        based on your subjects, performance
                        and AI priority scores.
                    </p>

                </div>


                <button
                    className="generate-button"
                    onClick={handleGenerate}
                    disabled={generating}
                >

                    {generating
                        ? "Generating..."
                        : "Generate AI Timetable"}

                </button>

            </div>


            {/* =================================================
                ERROR MESSAGE
                ================================================= */}

            {error && (

                <div className="form-error timetable-message">

                    {error}

                </div>

            )}


            {/* =================================================
                SUCCESS MESSAGE
                ================================================= */}

            {success && (

                <div className="form-success timetable-message">

                    {success}

                </div>

            )}


            {/* =================================================
                LOADING
                ================================================= */}

            {loading ? (

                <div className="empty">

                    Loading timetable...

                </div>

            ) : timetable.length === 0 ? (

                /* =============================================
                   EMPTY STATE
                   ============================================= */

                <div className="empty timetable-empty">

                    <div className="empty-icon">
                        🗓️
                    </div>

                    <h3>
                        No timetable generated yet
                    </h3>

                    <p>
                        Click "Generate AI Timetable"
                        to create your personalized
                        study schedule.
                    </p>

                </div>

            ) : (

                /* =============================================
                   TIMETABLE
                   ============================================= */

                <div className="timetable-list">

                    {timetable.map(
                        (item, index) => (

                            <div
                                className="timetable-card"
                                key={
                                    item.id ||
                                    index
                                }
                            >

                                {/* TIME */}

                                <div className="time-block">

                                    <strong>
                                        {formatTime(
                                            item.startTime
                                        )}
                                    </strong>

                                    <span>
                                        {formatTime(
                                            item.endTime
                                        )}
                                    </span>

                                </div>


                                {/* TIMELINE */}

                                <div className="timeline-line">

                                    <div className="timeline-dot">
                                    </div>

                                </div>


                                {/* CONTENT */}

                                <div className="timetable-content">

                                    <div className="timetable-title-row">

                                        <h2>
                                            {item.subjectName}
                                        </h2>

                                        <span
                                            className={
                                                getPriorityClass(
                                                    item.priorityLevel
                                                )
                                            }
                                        >
                                            {
                                                item.priorityLevel
                                            }
                                        </span>

                                    </div>


                                    <p>
                                        {item.activity}
                                    </p>


                                    {/* META */}

                                    <div className="timetable-meta">

                                        <span>
                                            🤖 AI Score:
                                            {" "}
                                            {Number(
                                                item.aiScore
                                            ).toFixed(2)}
                                        </span>


                                        <span>
                                            📅 {item.date}
                                        </span>

                                    </div>

                                </div>

                            </div>

                        )
                    )}

                </div>

            )}

        </div>
    );
}

export default Timetable;