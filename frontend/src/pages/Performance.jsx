import { useEffect, useState } from "react";

import {
    getStudentSubjects,
    getStudentPerformance,
    recordPerformance
} from "../services/api";

function Performance({ student }) {

    const [subjects, setSubjects] = useState([]);
    const [performances, setPerformances] = useState([]);

    const [subjectId, setSubjectId] = useState("");

    const [date, setDate] = useState(
        new Date().toISOString().split("T")[0]
    );

    const [studyHours, setStudyHours] = useState("");
    const [testMarks, setTestMarks] = useState("");
    const [completionPercentage, setCompletionPercentage] =
        useState("");
    const [notes, setNotes] = useState("");

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");


    // =========================================================
    // LOAD DATA
    // =========================================================

    async function loadData() {

        try {

            setLoading(true);
            setError("");

            const subjectsData =
                await getStudentSubjects(
                    student.id
                );

            const performanceData =
                await getStudentPerformance(
                    student.id
                );

            setSubjects(subjectsData);
            setPerformances(performanceData);

            if (
                subjectsData.length > 0 &&
                !subjectId
            ) {

                setSubjectId(
                    subjectsData[0].id
                );
            }

        } catch (err) {

            console.error(err);

            setError(
                err.message ||
                "Unable to load performance data."
            );

        } finally {

            setLoading(false);
        }
    }


    useEffect(() => {

        loadData();

    }, [student.id]);


    // =========================================================
    // SAVE PERFORMANCE
    // =========================================================

    async function handleSubmit(event) {

        event.preventDefault();

        setError("");
        setSuccess("");
        setSaving(true);

        try {

            const performance = {

                date: date,

                studyHours:
                    Number(studyHours),

                testMarks:
                    Number(testMarks),

                completionPercentage:
                    Number(completionPercentage),

                notes:
                    notes.trim()
            };


            const saved =
                await recordPerformance(
                    student.id,
                    Number(subjectId),
                    performance
                );


            // Add latest record to beginning
            setPerformances(
                previous => [
                    saved,
                    ...previous
                ]
            );


            // Clear form
            setStudyHours("");
            setTestMarks("");
            setCompletionPercentage("");
            setNotes("");


            setSuccess(
                "Performance recorded successfully! Your AI recommendations have been updated."
            );

        } catch (err) {

            console.error(err);

            setError(
                err.message ||
                "Failed to save performance."
            );

        } finally {

            setSaving(false);
        }
    }


    // =========================================================
    // SUBJECT NAME
    // =========================================================

    function getSubjectName(subject) {

        if (!subject) {
            return "Unknown Subject";
        }

        return subject.name;
    }


    // =========================================================
    // AVERAGE MARKS
    // =========================================================

    function getAverageMarks() {

        if (performances.length === 0) {
            return 0;
        }

        const total =
            performances.reduce(
                (sum, item) =>
                    sum + Number(item.testMarks),
                0
            );

        return (
            total / performances.length
        ).toFixed(1);
    }


    // =========================================================
    // AVERAGE COMPLETION
    // =========================================================

    function getAverageCompletion() {

        if (performances.length === 0) {
            return 0;
        }

        const total =
            performances.reduce(
                (sum, item) =>
                    sum +
                    Number(
                        item.completionPercentage
                    ),
                0
            );

        return (
            total / performances.length
        ).toFixed(1);
    }


    // =========================================================
    // TOTAL STUDY HOURS
    // =========================================================

    function getTotalStudyHours() {

        const total =
            performances.reduce(
                (sum, item) =>
                    sum +
                    Number(item.studyHours),
                0
            );

        return total.toFixed(1);
    }


    // =========================================================
    // RENDER
    // =========================================================

    return (

        <div className="performance-page">

            {/* =================================================
                HEADER
                ================================================= */}

            <div className="page-header">

                <p className="page-label">
                    Learning Analytics
                </p>

                <h1>
                    Performance
                </h1>

                <p>
                    Track your learning progress and
                    help the AI adapt your study plan.
                </p>

            </div>


            {/* =================================================
                STATISTICS
                ================================================= */}

            <div className="performance-stats">

                <div className="performance-stat">

                    <span>
                        Records
                    </span>

                    <strong>
                        {performances.length}
                    </strong>

                </div>


                <div className="performance-stat">

                    <span>
                        Average Marks
                    </span>

                    <strong>
                        {getAverageMarks()}%
                    </strong>

                </div>


                <div className="performance-stat">

                    <span>
                        Average Completion
                    </span>

                    <strong>
                        {getAverageCompletion()}%
                    </strong>

                </div>


                <div className="performance-stat">

                    <span>
                        Total Study Hours
                    </span>

                    <strong>
                        {getTotalStudyHours()}
                    </strong>

                </div>

            </div>


            {/* =================================================
                AI INFORMATION
                ================================================= */}

            <div className="ai-performance-info">

                <div className="ai-performance-icon">
                    🤖
                </div>

                <div>

                    <strong>
                        Adaptive AI is learning from you
                    </strong>

                    <p>
                        Your performance records influence
                        subject priority, recommended study
                        hours, and your AI-generated timetable.
                    </p>

                </div>

            </div>


            {/* =================================================
                MAIN LAYOUT
                ================================================= */}

            <div className="performance-layout">

                {/* =================================================
                    PERFORMANCE FORM
                    ================================================= */}

                <div className="performance-form-card">

                    <h2>
                        Record Performance
                    </h2>

                    <p className="form-description">
                        Enter your latest study or test
                        performance.
                    </p>


                    <form onSubmit={handleSubmit}>

                        {/* SUBJECT */}

                        <label>
                            Subject
                        </label>

                        <select
                            value={subjectId}
                            onChange={
                                event =>
                                    setSubjectId(
                                        event.target.value
                                    )
                            }
                            required
                        >

                            <option value="">
                                Select Subject
                            </option>

                            {subjects.map(
                                subject => (

                                    <option
                                        key={subject.id}
                                        value={subject.id}
                                    >
                                        {subject.name}
                                    </option>

                                )
                            )}

                        </select>


                        {/* DATE */}

                        <label>
                            Date
                        </label>

                        <input
                            type="date"
                            value={date}
                            onChange={
                                event =>
                                    setDate(
                                        event.target.value
                                    )
                            }
                            required
                        />


                        {/* STUDY HOURS */}

                        <label>
                            Study Hours
                        </label>

                        <input
                            type="number"
                            min="0"
                            max="24"
                            step="0.5"
                            placeholder="e.g. 2.5"
                            value={studyHours}
                            onChange={
                                event =>
                                    setStudyHours(
                                        event.target.value
                                    )
                            }
                            required
                        />


                        {/* TEST MARKS */}

                        <label>
                            Test Marks
                        </label>

                        <input
                            type="number"
                            min="0"
                            max="100"
                            step="0.1"
                            placeholder="e.g. 75"
                            value={testMarks}
                            onChange={
                                event =>
                                    setTestMarks(
                                        event.target.value
                                    )
                            }
                            required
                        />


                        {/* COMPLETION */}

                        <label>
                            Completion Percentage
                        </label>

                        <input
                            type="number"
                            min="0"
                            max="100"
                            step="1"
                            placeholder="e.g. 85"
                            value={completionPercentage}
                            onChange={
                                event =>
                                    setCompletionPercentage(
                                        event.target.value
                                    )
                            }
                            required
                        />


                        {/* NOTES */}

                        <label>
                            Notes
                        </label>

                        <textarea
                            placeholder="How did your study session go?"
                            value={notes}
                            onChange={
                                event =>
                                    setNotes(
                                        event.target.value
                                    )
                            }
                            rows="4"
                        />


                        {/* ERROR */}

                        {error && (

                            <div className="form-error">
                                {error}
                            </div>

                        )}


                        {/* SUCCESS */}

                        {success && (

                            <div className="form-success">
                                {success}
                            </div>

                        )}


                        {/* SUBMIT */}

                        <button
                            type="submit"
                            disabled={
                                saving ||
                                subjects.length === 0
                            }
                        >

                            {saving
                                ? "Saving..."
                                : "Save Performance"}

                        </button>

                    </form>

                </div>


                {/* =================================================
                    HISTORY
                    ================================================= */}

                <div className="performance-history-card">

                    <div className="section-heading">

                        <div>

                            <h2>
                                Performance History
                            </h2>

                            <p>
                                Your recent learning records
                            </p>

                        </div>

                    </div>


                    {loading ? (

                        <div className="empty">
                            Loading performance...
                        </div>

                    ) : performances.length === 0 ? (

                        <div className="empty">

                            <div className="empty-icon">
                                📊
                            </div>

                            <h3>
                                No performance records
                            </h3>

                            <p>
                                Record your first
                                performance to start
                                tracking progress.
                            </p>

                        </div>

                    ) : (

                        <div className="performance-list">

                            {performances.map(
                                performance => (

                                    <div
                                        className="performance-item"
                                        key={performance.id}
                                    >

                                        {/* SUBJECT */}

                                        <div className="performance-subject">

                                            <h3>
                                                {
                                                    getSubjectName(
                                                        performance.subject
                                                    )
                                                }
                                            </h3>

                                            <span>
                                                {performance.date}
                                            </span>

                                        </div>


                                        {/* VALUES */}

                                        <div className="performance-values">

                                            <div>

                                                <span>
                                                    Marks
                                                </span>

                                                <strong>
                                                    {
                                                        performance.testMarks
                                                    }%
                                                </strong>

                                            </div>


                                            <div>

                                                <span>
                                                    Study
                                                </span>

                                                <strong>
                                                    {
                                                        performance.studyHours
                                                    } hrs
                                                </strong>

                                            </div>


                                            <div>

                                                <span>
                                                    Completion
                                                </span>

                                                <strong>
                                                    {
                                                        performance.completionPercentage
                                                    }%
                                                </strong>

                                            </div>

                                        </div>


                                        {/* NOTES */}

                                        {performance.notes && (

                                            <p className="performance-notes">

                                                "{performance.notes}"

                                            </p>

                                        )}

                                    </div>

                                )
                            )}

                        </div>

                    )}

                </div>

            </div>

        </div>
    );
}

export default Performance;