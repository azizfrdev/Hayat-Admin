import React, { useState } from "react";
import authProvider from "../../providers/authProvider";

const CustomLogin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await authProvider.login(username, password);
            window.location.href = "/"; 
        } catch (err) {
            setError("Invalid username or password.");
        }
    };

    return (
        <div style={styles.container}>
            <style>
                {`
                @keyframes boxShadowPulse {
                    0% {
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    }
                    50% {
                        box-shadow: 0 8px 16px rgba(0, 123, 255, 0.3);
                    }
                    100% {
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    }
                }
                `}
            </style>
            <div style={{ ...styles.card, animation: "boxShadowPulse 2s infinite" }}>
                <h1 style={styles.heading}>Welcome to <span style={styles.logo}>Hayat-Admin</span></h1>
                <p style={styles.subtitle}>Please log in to continue</p>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={styles.input}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={styles.input}
                    />
                    <button type="submit" style={styles.button}>Log In</button>
                </form>
                {error && <p style={styles.error}>{error}</p>}
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f0f8ff", // Light blue background
        overflow: "hidden",
    },
    logo: {
      color: "#bc1111",
    },
    card: {
        width: "400px",
        padding: "30px",
        backgroundColor: "#ffffff", // White card
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
    },
    heading: {
        fontSize: "24px",
        color: "#007BFF", // Blue heading
        marginBottom: "10px",
    },
    subtitle: {
        fontSize: "16px",
        color: "#6c757d", // Subtle gray text
        marginBottom: "20px",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    input: {
        width: "100%",
        padding: "10px",
        marginBottom: "15px",
        borderRadius: "5px",
        border: "1px solid #ced4da",
        fontSize: "14px",
    },
    button: {
        width: "100%",
        padding: "10px",
        backgroundColor: "#007BFF", // Primary blue button
        color: "#ffffff",
        border: "none",
        borderRadius: "5px",
        fontSize: "16px",
        cursor: "pointer",
        transition: "background-color 0.3s ease",
    },
    error: {
        color: "#dc3545", // Red error message
        marginTop: "10px",
    },
};

export default CustomLogin;
