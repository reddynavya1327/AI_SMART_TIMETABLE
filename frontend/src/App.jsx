import { useState } from "react";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Subjects from "./pages/Subjects";
import Performance from "./pages/Performance";
import Timetable from "./pages/Timetable";

import "./App.css";


function App() {

    const [student, setStudent] = useState(() => {

        const savedStudent =
            localStorage.getItem("student");

        return savedStudent
            ? JSON.parse(savedStudent)
            : null;
    });


    const [page, setPage] =
        useState("dashboard");


    // =========================================================
    // LOGIN
    // =========================================================

    function handleLogin(studentData) {

        setStudent(studentData);

        setPage("dashboard");
    }


    // =========================================================
    // LOGOUT
    // =========================================================

    function handleLogout() {

        localStorage.removeItem("student");

        setStudent(null);

        setPage("dashboard");
    }


    // =========================================================
    // REGISTRATION SUCCESS
    // =========================================================

    function handleRegisterSuccess() {

        setPage("login");
    }


    // =========================================================
    // SHOW LOGIN / REGISTER
    // =========================================================

    if (!student) {

        if (page === "register") {

            return (
                <Register
                    onRegisterSuccess={
                        handleRegisterSuccess
                    }
                    onGoToLogin={() =>
                        setPage("login")
                    }
                />
            );
        }


        return (
            <Login
                onLogin={handleLogin}
                onGoToRegister={() =>
                    setPage("register")
                }
            />
        );
    }


    // =========================================================
    // MAIN APPLICATION
    // =========================================================

    return (

        <div>

            <nav className="app-nav">

                <div className="app-brand">
                    AI Smart Timetable
                </div>


                <div className="nav-links">

                    {/* DASHBOARD */}

                    <button
                        onClick={() =>
                            setPage("dashboard")
                        }
                        className={
                            page === "dashboard"
                                ? "active"
                                : ""
                        }
                    >
                        Dashboard
                    </button>


                    {/* SUBJECTS */}

                    <button
                        onClick={() =>
                            setPage("subjects")
                        }
                        className={
                            page === "subjects"
                                ? "active"
                                : ""
                        }
                    >
                        Subjects
                    </button>


                    {/* PERFORMANCE */}

                    <button
                        onClick={() =>
                            setPage("performance")
                        }
                        className={
                            page === "performance"
                                ? "active"
                                : ""
                        }
                    >
                        Performance
                    </button>


                    {/* TIMETABLE */}

                    <button
                        onClick={() =>
                            setPage("timetable")
                        }
                        className={
                            page === "timetable"
                                ? "active"
                                : ""
                        }
                    >
                        Timetable
                    </button>


                    {/* LOGOUT */}

                    <button
                        onClick={handleLogout}
                    >
                        Logout
                    </button>

                </div>

            </nav>


            {/* DASHBOARD */}

            {page === "dashboard" && (

                <Dashboard
                    student={student}
                    onLogout={handleLogout}
                />

            )}


            {/* SUBJECTS */}

            {page === "subjects" && (

                <Subjects
                    student={student}
                />

            )}


            {/* PERFORMANCE */}

            {page === "performance" && (

                <Performance
                    student={student}
                />

            )}


            {/* TIMETABLE */}

            {page === "timetable" && (

                <Timetable
                    student={student}
                />

            )}

        </div>
    );
}


export default App;