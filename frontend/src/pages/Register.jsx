import { useState } from "react";

import { registerStudent } from "../services/api";

function Register({ onRegisterSuccess, onGoToLogin }) {

    const [name, setName] = useState("");
    const [rollNumber, setRollNumber] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [dailyStudyHours, setDailyStudyHours] = useState("");
    const [careerGoal, setCareerGoal] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");


    async function handleRegister(event) {

        event.preventDefault();

        setError("");
        setSuccess("");
        setLoading(true);

        try {

            const student = {

                name: name.trim(),

                rollNumber:
                    rollNumber.trim(),

                email:
                    email.trim(),

                password:
                    password,

                dailyStudyHours:
                    Number(dailyStudyHours),

                careerGoal:
                    careerGoal.trim()
            };


            const data =
                await registerStudent(student);


            console.log(
                "Registration response:",
                data
            );


            setSuccess(
                "Account created successfully! You can now login."
            );


            // Clear form

            setName("");
            setRollNumber("");
            setEmail("");
            setPassword("");
            setDailyStudyHours("");
            setCareerGoal("");


            // Give user a moment to see success message

            setTimeout(() => {

                if (onRegisterSuccess) {
                    onRegisterSuccess();
                }

            }, 1200);


        } catch (error) {

            console.error(
                "Registration error:",
                error
            );

            setError(
                error.message ||
                "Unable to create account."
            );

        } finally {

            setLoading(false);
        }
    }


    return (

        <div className="login-page">

            <div className="login-card">

                <div className="login-logo">
                    AI
                </div>


                <h1>
                    Create Account
                </h1>


                <p className="login-subtitle">
                    Start your personalized AI learning journey
                </p>


                <form onSubmit={handleRegister}>

                    {/* NAME */}

                    <label>
                        Full Name
                    </label>

                    <input
                        type="text"
                        value={name}
                        placeholder="Enter your full name"
                        onChange={
                            event =>
                                setName(
                                    event.target.value
                                )
                        }
                        required
                    />


                    {/* ROLL NUMBER */}

                    <label>
                        Roll Number
                    </label>

                    <input
                        type="text"
                        value={rollNumber}
                        placeholder="Enter your roll number"
                        onChange={
                            event =>
                                setRollNumber(
                                    event.target.value
                                )
                        }
                        required
                    />


                    {/* EMAIL */}

                    <label>
                        Email
                    </label>

                    <input
                        type="email"
                        value={email}
                        placeholder="Enter your email"
                        onChange={
                            event =>
                                setEmail(
                                    event.target.value
                                )
                        }
                        required
                    />


                    {/* PASSWORD */}

                    <label>
                        Password
                    </label>

                    <input
                        type="password"
                        value={password}
                        placeholder="Create a password"
                        onChange={
                            event =>
                                setPassword(
                                    event.target.value
                                )
                        }
                        minLength="6"
                        required
                    />


                    {/* DAILY STUDY HOURS */}

                    <label>
                        Daily Study Hours
                    </label>

                    <input
                        type="number"
                        min="0.5"
                        max="24"
                        step="0.5"
                        value={dailyStudyHours}
                        placeholder="Example: 3"
                        onChange={
                            event =>
                                setDailyStudyHours(
                                    event.target.value
                                )
                        }
                        required
                    />


                    {/* CAREER GOAL */}

                    <label>
                        Career Goal
                    </label>

                    <input
                        type="text"
                        value={careerGoal}
                        placeholder="Example: Software Engineer"
                        onChange={
                            event =>
                                setCareerGoal(
                                    event.target.value
                                )
                        }
                        required
                    />


                    {/* ERROR */}

                    {error && (

                        <div className="login-error">
                            {error}
                        </div>

                    )}


                    {/* SUCCESS */}

                    {success && (

                        <div className="form-success">
                            {success}
                        </div>

                    )}


                    {/* REGISTER BUTTON */}

                    <button
                        type="submit"
                        disabled={loading}
                    >

                        {loading
                            ? "Creating Account..."
                            : "Create Account"}

                    </button>

                </form>


                {/* LOGIN LINK */}

                <p className="login-footer">

                    Already have an account?

                    {" "}

                    <button
                        type="button"
                        className="text-button"
                        onClick={onGoToLogin}
                    >
                        Sign In
                    </button>

                </p>

            </div>

        </div>
    );
}

export default Register;