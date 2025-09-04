import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from 'next/link';
import bcrypt from "bcryptjs"; // Import bcrypt
import logo from '../../../public/logo.png';
import styles from '../../styles/components/Signin.module.css';

const Signin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errrorMsg, setErrorMsg] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    }, []);

    const router = useRouter();

    // Validation functions
    const validateUsername = (username) => {
        if (!username.trim()) {
            return "*Username or email is required";
        }
        if (username.length < 3) {
            return "*Username must be at least 3 characters";
        }
        return null;
    };

    const validatePassword = (password) => {
        if (!password.trim()) {
            return "*Password is required";
        }
        if (password.length < 8) {
            return "*Password must be at least 8 characters";
        }
        return null;
    };

    // Find user by username or email
    const findUser = (usernameOrEmail) => {
        const userDetails = JSON.parse(localStorage.getItem("userDetails"));
        if (userDetails) {
            const input = usernameOrEmail.toLowerCase();
            if (userDetails.username.toLowerCase() === input ||
                (userDetails.email && userDetails.email.toLowerCase() === input)) {
                return userDetails;
            }
        }
        return null;
    };

    const onLoginSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMsg("");

        const cleanUsername = username.trim();

        // Validate inputs
        const usernameError = validateUsername(cleanUsername);
        if (usernameError) {
            setErrorMsg(usernameError);
            setIsLoading(false);
            return;
        }

        const passwordError = validatePassword(password);
        if (passwordError) {
            setErrorMsg(passwordError);
            setIsLoading(false);
            return;
        }

        // Find user
        const userDetails = findUser(cleanUsername);

        if (userDetails) {
            try {
                // Compare the entered password with the stored hash
                const match = await bcrypt.compare(password, userDetails.password);

                if (match) {
                    setErrorMsg("");
                    localStorage.setItem("isLoggedIn", true);
                    setIsLoggedIn(true);
                } else {
                    setErrorMsg("*Invalid username or password");
                }
            } catch (error) {
                console.error("Comparison error:", error);
                setErrorMsg("*An error occurred. Please try again.");
            }
        } else {
            setErrorMsg("*No account found. Please check your credentials or sign up.");
        }

        setIsLoading(false);
    };

    if (isLoggedIn) {
        router.replace("/");
        return null;
    }

    // Render the sign-in form if not logged in
    return (
        <div className={styles.loginWrapper}>
            <div className={styles.loginContainer}>
                <div className={styles.loginLogo}>
                    <img src="/logo.png" alt="Logo" />
                    <h2>DCR FLOW</h2>
                </div>
                <form onSubmit={onLoginSubmit}>
                    <div className={styles.formGroup}>
                        <label htmlFor="username">Username or Email</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Username or Email"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {isLoading ? (
                        <div className={styles.btnLoaderContainer}>
                            <span className={styles.btnLoader}>
                                <span></span><span></span><span></span>
                            </span>
                        </div>
                    ) : (
                        <button className={styles.loginBtn} type="submit">
                            Sign In
                        </button>
                    )}
                </form>
                {errrorMsg && <p className={styles.errorMessage}>{errrorMsg}</p>}
                <p className={styles.signupLink}>
                    Don't have an account? <Link href="/signup">Sign Up</Link>
                </p>
            </div>
        </div>
    );
};

export default Signin;