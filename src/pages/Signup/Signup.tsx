import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Signup.module.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = "http://localhost:5001/api/auth/register";
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        navigate("/login");
      } else {
        setAuthError(data.msg || data.errors[0].msg || "Failed to sign up");
      }
    } catch (err) {
      setAuthError("Server error, please try again later.");
    }
  };

  return (
    <div className={styles.signupContainer}>
      <form onSubmit={handleSubmit} className={styles.signupForm}>
        <h2>Sign-Up</h2>
        {authError && <p className={styles.error}>{authError}</p>}
        <label className={styles.label}>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className={styles.input}
          />
        </label>

        <label className={styles.label}>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.input}
          />
        </label>

        <label className={styles.label}>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.input}
          />
        </label>

        <button type="submit" className={styles.button}>
          Sign Up
        </button>

        <p className={styles.loginPrompt}>
          Already have an account?
          <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
