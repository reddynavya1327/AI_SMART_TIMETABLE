import { useEffect, useState } from "react";

import {
    getStudentSubjects,
    addSubject,
    deleteSubject,
    getAiScore
} from "../services/api";

function Subjects({ student }) {

    const [subjects, setSubjects] = useState([]);

    const [aiScores, setAiScores] = useState({});

    const [name, setName] = useState("");
    const [difficulty, setDifficulty] = useState(3);
    const [priority, setPriority] = useState(3);
    const [previousMarks, setPreviousMarks] = useState("");

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");


    async function loadSubjects() {

        try {

            setLoading(true);
            setError("");

            const data =
                await getStudentSubjects(student.id);

            setSubjects(data);

            // Get AI score for every subject
            const scoreResults = {};

            await Promise.all(

                data.map(async (subject) => {

                    try {

                        const result =
                            await getAiScore(
                                subject.id
                            );

                        scoreResults[subject.id] =
                            result;

                    } catch (error) {

                        console.error(
                            `AI score failed for subject ${subject.id}`,
                            error
                        );

                    }

                })

            );

            setAiScores(scoreResults);

        } catch (err) {

            setError(err.message);

        } finally {

            setLoading(false);
        }
    }


    useEffect(() => {

        loadSubjects();

    }, [student.id]);


    async function handleSubmit(event) {

        event.preventDefault();

        setError("");
        setSuccess("");
        setSaving(true);

        try {

            const subject = {

                name: name.trim(),

                difficulty:
                    Number(difficulty),

                priority:
                    Number(priority),

                previousMarks:
                    Number(previousMarks)

            };

            const createdSubject =
                await addSubject(
                    student.id,
                    subject
                );

            setSubjects(
                previous => [
                    ...previous,
                    createdSubject
                ]
            );

            // Calculate AI score for new subject
            try {

                const aiResult =
                    await getAiScore(
                        createdSubject.id
                    );

                setAiScores(
                    previous => ({
                        ...previous,
                        [createdSubject.id]:
                            aiResult
                    })
                );

            } catch (error) {

                console.error(
                    "Unable to calculate AI score",
                    error
                );

            }

            setName("");
            setDifficulty(3);
            setPriority(3);
            setPreviousMarks("");

            setSuccess(
                "Subject added successfully!"
            );

        } catch (err) {

            setError(err.message);

        } finally {

            setSaving(false);
        }
    }


    async function handleDelete(subjectId) {

        const confirmed =
            window.confirm(
                "Are you sure you want to delete this subject?"
            );

        if (!confirmed) {
            return;
        }

        try {

            await deleteSubject(
                student.id,
                subjectId
            );

            setSubjects(
                previous =>
                    previous.filter(
                        subject =>
                            subject.id !== subjectId
                    )
            );

            setAiScores(
                previous => {

                    const updated = {
                        ...previous
                    };

                    delete updated[subjectId];

                    return updated;
                }
            );

        } catch (err) {

            setError(err.message);
        }
    }


    function getPriorityClass(priorityLevel) {

        if (!priorityLevel) {
            return "";
        }

        const value =
            priorityLevel.toLowerCase();

        if (value.includes("high")) {
            return "ai-high";
        }

        if (value.includes("medium")) {
            return "ai-medium";
        }

        if (value.includes("low")) {
            return "ai-low";
        }

        return "";
    }


    return (

        <div className="subjects-page">

            <div className="page-header">

                <div>

                    <p className="page-label">
                        Academic Management
                    </p>

                    <h1>
                        My Subjects
                    </h1>

                    <p>
                        Add your subjects and let AI
                        personalize your study priorities.
                    </p>

                </div>

            </div>


            <div className="subject-layout">

                {/* ADD SUBJECT */}

                <div className="add-subject-card">

                    <h2>
                        Add Subject
                    </h2>

                    <form onSubmit={handleSubmit}>

                        <label>
                            Subject Name
                        </label>

                        <input
                            type="text"
                            placeholder="e.g. Data Structures"
                            value={name}
                            onChange={
                                event =>
                                    setName(
                                        event.target.value
                                    )
                            }
                            required
                        />


                        <label>
                            Difficulty
                        </label>

                        <select
                            value={difficulty}
                            onChange={
                                event =>
                                    setDifficulty(
                                        event.target.value
                                    )
                            }
                        >

                            <option value="1">
                                1 - Very Easy
                            </option>

                            <option value="2">
                                2 - Easy
                            </option>

                            <option value="3">
                                3 - Moderate
                            </option>

                            <option value="4">
                                4 - Difficult
                            </option>

                            <option value="5">
                                5 - Very Difficult
                            </option>

                        </select>


                        <label>
                            Priority
                        </label>

                        <select
                            value={priority}
                            onChange={
                                event =>
                                    setPriority(
                                        event.target.value
                                    )
                            }
                        >

                            <option value="1">
                                1 - Low
                            </option>

                            <option value="2">
                                2 - Normal
                            </option>

                            <option value="3">
                                3 - Medium
                            </option>

                            <option value="4">
                                4 - High
                            </option>

                            <option value="5">
                                5 - Critical
                            </option>

                        </select>


                        <label>
                            Previous Marks
                        </label>

                        <input
                            type="number"
                            min="0"
                            max="100"
                            placeholder="e.g. 65"
                            value={previousMarks}
                            onChange={
                                event =>
                                    setPreviousMarks(
                                        event.target.value
                                    )
                            }
                            required
                        />


                        {error && (
                            <div className="form-error">
                                {error}
                            </div>
                        )}


                        {success && (
                            <div className="form-success">
                                {success}
                            </div>
                        )}


                        <button
                            type="submit"
                            disabled={saving}
                        >

                            {saving
                                ? "Adding..."
                                : "Add Subject"}

                        </button>

                    </form>

                </div>


                {/* SUBJECT LIST */}

                <div className="subjects-list-card">

                    <div className="section-heading">

                        <div>

                            <h2>
                                Your Subjects
                            </h2>

                            <p>
                                {subjects.length} subject
                                {subjects.length !== 1
                                    ? "s"
                                    : ""}
                            </p>

                        </div>

                    </div>


                    {loading ? (

                        <div className="empty">
                            Loading subjects...
                        </div>

                    ) : subjects.length === 0 ? (

                        <div className="empty">

                            <div className="empty-icon">
                                📚
                            </div>

                            <h3>
                                No subjects yet
                            </h3>

                            <p>
                                Add your first subject
                                to get started.
                            </p>

                        </div>

                    ) : (

                        <div className="subjects-list">

                            {subjects.map(subject => {

                                const ai =
                                    aiScores[subject.id];

                                return (

                                    <div
                                        className="subject-item ai-subject-item"
                                        key={subject.id}
                                    >

                                        <div className="subject-main">

                                            <h3>
                                                {subject.name}
                                            </h3>

                                            <div className="subject-details">

                                                <span>
                                                    Difficulty:
                                                    {" "}
                                                    {subject.difficulty}/5
                                                </span>

                                                <span>
                                                    Priority:
                                                    {" "}
                                                    {subject.priority}/5
                                                </span>

                                                <span>
                                                    Marks:
                                                    {" "}
                                                    {subject.previousMarks}%
                                                </span>

                                            </div>

                                            {/* AI RESULT */}

                                            {ai ? (

                                                <div className="ai-result">

                                                    <div className="ai-result-title">
                                                        AI Analysis
                                                    </div>

                                                    <div className="ai-result-grid">

                                                        <div className="ai-score">

                                                            <span>
                                                                AI Score
                                                            </span>

                                                            <strong>
                                                                {Number(
                                                                    ai.score
                                                                ).toFixed(1)}
                                                            </strong>

                                                            <small>
                                                                / 100
                                                            </small>

                                                        </div>


                                                        <div className="ai-priority">

                                                            <span>
                                                                Priority
                                                            </span>

                                                            <strong
                                                                className={
                                                                    getPriorityClass(
                                                                        ai.priorityLevel
                                                                    )
                                                                }
                                                            >
                                                                {ai.priorityLevel}
                                                            </strong>

                                                        </div>


                                                        <div className="ai-hours">

                                                            <span>
                                                                Recommended Study
                                                            </span>

                                                            <strong>
                                                                {Number(
                                                                    ai.recommendedStudyHours
                                                                ).toFixed(1)}
                                                                {" "}
                                                                hrs
                                                            </strong>

                                                        </div>

                                                    </div>

                                                </div>

                                            ) : (

                                                <div className="ai-loading">
                                                    Calculating AI score...
                                                </div>

                                            )}

                                        </div>


                                        <button
                                            className="delete-button"
                                            onClick={() =>
                                                handleDelete(
                                                    subject.id
                                                )
                                            }
                                        >
                                            Delete
                                        </button>

                                    </div>

                                );

                            })}

                        </div>

                    )}

                </div>

            </div>

        </div>
    );
}

export default Subjects;