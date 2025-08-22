// LoginPage.jsx
import React, { useState } from "react";
import { Mail, Lock, Loader, Eye, EyeOff } from "lucide-react";
import { useAuthStore } from "../../store/authStore";
import login_image from "../../assets/images/login.png";
import "./LoginPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading, error } = useAuthStore();

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="login-container">
      {/* Left section with 3D illustration */}
      <div className="login-illustration">
        <div className="login-illustration-content">
          <img
            style={{ width: "60%" }}
            src={login_image}
            alt="Analytics Dashboard"
            className="login-illustration-image"
          />
        </div>
      </div>

      {/* Right section with login form */}
      <div className="login-form-container">
        <div className="login-form-content">
          <div>
            <h1 className="login-title">Welcome Back! 👋</h1>
            <p className="login-subtitle">
              Please sign-in to your account and start the adventure
            </p>
          </div>

          <form onSubmit={handleLogin} className="login-form">
            <div className="login-input-group">
              <label className="login-label">Email or Username</label>
              <div className="login-input-wrapper">
                <Mail className="login-input-icon" />
                <input
                  type="email"
                  placeholder="Enter your email or username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="login-input"
                />
              </div>
            </div>

            <div className="login-input-group">
              <label className="login-label">Password</label>
              <div className="login-input-wrapper">
                <Lock className="login-input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="*********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="login-input"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="login-password-toggle"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* <div className="login-options">
              <label className="login-remember-me">
                <input
                  type="checkbox"
                  // checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="login-remember-me-checkbox"
                />
                <span className="login-remember-me-label">Remember me</span>
              </label>
              <a href="#" className="login-forgot-password">
                Forgot password?
              </a>
            </div> */}

            {error && <p className="login-error">{error}</p>}

            <button type="submit" disabled={isLoading} className="login-submit">
              {isLoading ? (
                <Loader className="mx-auto h-5 w-5 animate-spin" />
              ) : (
                "Login"
              )}
            </button>

            {/* <p className="login-create-account">
              New on our platform?{" "}
              <a href="#" className="login-create-account-link">
                Create an account
              </a>
            </p> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
