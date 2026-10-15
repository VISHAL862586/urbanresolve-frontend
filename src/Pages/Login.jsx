
import "./Account.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setMessage("");
    setMessageType("");

    if (!email.trim() || !password) {
      setMessage("Please enter email and password.");
      setMessageType("error");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        "https://urbanresolve-render-backend.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email: email.trim(),
            password,
          }),
        }
      );

      const responseText = await res.text();

      if (!res.ok) {
        setMessage(responseText || "Invalid email or password.");
        setMessageType("error");
        return;
      }

      let user;

      try {
        user = JSON.parse(responseText);
      } catch {
        user = null;
      }

      if (!user || !user.id || !user.email) {
        setMessage(
          "Login response is missing user details. Please check the backend response."
        );
        setMessageType("error");
        return;
      }

      // Never store the password in localStorage.
      const safeUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      };

      localStorage.setItem("user", JSON.stringify(safeUser));

      setMessage("Login successful!");
      setMessageType("success");

      navigate("/", { replace: true });
    } catch (error) {
      console.error("Login error:", error);
      setMessage("Unable to connect to server. Please try again.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="account-page">
      <div className="account-card">
        <div className="account-header">
          <h1 className="account-title">Welcome Back</h1>
          <p className="account-subtitle">
            Login to your UrbanResolve account
          </p>
        </div>

        {message && (
          <div className={`account-message ${messageType}`}>
            {message}
          </div>
        )}

        <form className="account-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              className="account-input"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-wrapper">
              <input
                id="password"
                className="account-input password-input"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="account-btn"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="account-divider">
          <span>Don't have an account?</span>
        </div>

        <button
          type="button"
          className="register-btn"
          onClick={() => navigate("/register")}
        >
          Create Account
        </button>
      </div>
    </div>
  );
}

export default Login;