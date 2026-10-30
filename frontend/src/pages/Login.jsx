import { useState } from "react";

import {
    loginStudent
} from "../services/api";

function Login({
    onLogin,
    onGoToRegister
}) {

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");


    async function handleLogin(event) {

        event.preventDefault();

        setError("");
        setLoading(true);

        try {

            const data =
                await loginStudent(
                    email.trim(),
                    password
                );


            console.log(
                "Login response:",
                data
            );


            localStorage.setItem(
                "student",
                JSON.stringify(data)
            );


            onLogin(data);


        } catch (error) {

            console.error(
                "Login error:",
                error
            );

            setError(
                error.message ||
                "Unable to connect to server"
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
                    AI Smart Timetable
                </h1>


                <p className="login-subtitle">
                    Personalized learning powered by AI
                </p>


                <form onSubmit={handleLogin}>

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


                    <label>
                        Password
                    </label>

                    <input
                        type="password"
                        value={password}
                        placeholder="Enter your password"
                        onChange={
                            event =>
                                setPassword(
                                    event.target.value
                                )
                        }
                        required
                    />


                    {error && (

                        <div className="login-error">
                            {error}
                        </div>

                    )}


                    <button
                        type="submit"
                        disabled={loading}
                    >

                        {loading
                            ? "Signing in..."
                            : "Sign In"}

                    </button>

                </form>


                {/* REGISTER */}

                <p className="login-footer">

                    Don't have an account?

                    {" "}

                    <button
                        type="button"
                        className="text-button"
                        onClick={onGoToRegister}
                    >
                        Create Account
                    </button>

                </p>

            </div>

        </div>
    );
}

export default Login;