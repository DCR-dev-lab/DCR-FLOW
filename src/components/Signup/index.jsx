import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from 'next/link';

import bcrypt from "bcryptjs"; // Import bcrypt

// Import CSS as a module for correct usage
import styles from '../../styles/components/Signin.module.css';

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errrorMsg, setErrorMsg] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  // Check login status on the client-side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const loggedInStatus = localStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(loggedInStatus);
    }
  }, []);

  // Validation functions
  const validateUsername = (username) => {
    if (!username.trim()) {
      return "*Username is required";
    }
    if (username.length < 3) {
      return "*Username must be at least 3 characters long";
    }
    if (username.length > 20) {
      return "*Username cannot exceed 20 characters";
    }
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      return "*Username can only contain letters, numbers, and underscores";
    }
    return null;
  };

  const validateEmail = (email) => {
    if (!email.trim()) {
      return "*Email is required";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "*Please enter a valid email address";
    }
    return null;
  };

  const validatePassword = (password) => {
    if (!password.trim()) {
      return "*Password is required";
    }
    if (password.length < 8) {
      return "*Password must be at least 8 characters long";
    }
    if (!/(?=.*[a-z])/.test(password)) {
      return "*Password must contain at least one lowercase letter";
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      return "*Password must contain at least one uppercase letter";
    }
    if (!/(?=.*\d)/.test(password)) {
      return "*Password must contain at least one number";
    }
    if (!/(?=.*[@$!%*?&])/.test(password)) {
      return "*Password must contain at least one special character (@$!%*?&)";
    }
    return null;
  };

  const checkExistingUser = (username, email) => {
    const existingUser = JSON.parse(localStorage.getItem("userDetails"));
    if (existingUser) {
      if (existingUser.username.toLowerCase() === username.toLowerCase()) {
        return "*Username already exists. Please choose another.";
      }
      if (existingUser.email && existingUser.email.toLowerCase() === email.toLowerCase()) {
        return "*Email already registered. Please use another email.";
      }
    }
    return null;
  };

  // Form submit handler
  const onSignupSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    const cleanUsername = username.trim();
    const cleanEmail = email.trim();

    // Validate all fields
    const usernameError = validateUsername(cleanUsername);
    if (usernameError) {
      setErrorMsg(usernameError);
      setIsLoading(false);
      return;
    }

    const emailError = validateEmail(cleanEmail);
    if (emailError) {
      setErrorMsg(emailError);
      setIsLoading(false);
      return;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      setErrorMsg(passwordError);
      setIsLoading(false);
      return;
    }

    if (!confirmPassword.trim()) {
      setErrorMsg("*Please confirm your password");
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg("*Passwords do not match");
      setIsLoading(false);
      return;
    }

    // Check for existing user
    const existingUserError = checkExistingUser(cleanUsername, cleanEmail);
    if (existingUserError) {
      setErrorMsg(existingUserError);
      setIsLoading(false);
      return;
    }

    try {
      // Generate a salt and hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const userDetails = {
        username: cleanUsername,
        email: cleanEmail,
        password: hashedPassword
      };

      localStorage.setItem("userDetails", JSON.stringify(userDetails));
      setErrorMsg("");
      router.push("/signin");
    } catch (error) {
      console.error("Hashing error:", error);
      setErrorMsg("An error occurred during signup.");
    }

    setIsLoading(false);
  };

  if (isLoggedIn) {
    router.replace("/");
    return null;
  }

  // Render the sign-up form if not logged in
  return (
    <div className={styles.loginWrapper}>
      <div className={styles.loginContainer}>
        <div className={styles.loginLogo}>
          <img src="/logo.png" alt="Logo" />
          <h2>DCR FLOW</h2>
        </div>
        <form onSubmit={onSignupSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          <div className={styles.formGroup}>
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
              Sign Up
            </button>
          )}
        </form>
        {errrorMsg && <p className={styles.errorMessage}>{errrorMsg}</p>}
        <p className={styles.signupLink}>
          Already have an account? <Link href="/signin">Sign In</Link>
        </p>
      </div>
    </div>
  );
};
export default Signup;