import React, { useState } from "react";
import Navbar from "../components/Navbar";
import "./login.css";
import userIco from "../assets/user-ico.svg";
import passIco from "../assets/pass-ico.svg";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Trimite cererea de login pentru utilizatorul:", username);

    // Construcția datelor în format URL-encoded
    const loginData = `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;

    try {
      const response = await fetch("https://api.cardioguard.eu/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded", // Schimbarea tipului de content
        },
        body: loginData, // Trimiterea datelor în format URL-encoded
      });
      console.log("Răspuns de la server:", response);

      const responseData = await response.json();
      console.log("Răspuns de la server (date):", responseData);

      if (response.ok) {
        console.log("Autentificare reușită pentru utilizatorul:", username);
        navigate("/doctor-dashboard");
      } else {
        console.error("Autentificare eșuată. Răspunsul HTTP:", response.status);
        console.error("Detalii răspuns server:", responseData); // Adăugarea detaliilor răspunsului
      }
    } catch (error) {
      console.error("Failed to login:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="login-container">
        <div className="login-sub-container">
          <h2 className="login-title">Login</h2>
          <p className="login-sub-title">Log into your account</p>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="name-cont">
              <img src={userIco} alt="Username Icon" />
              <input
                type="text"
                placeholder="Username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="name-cont">
              <img src={passIco} alt="Password Icon" />
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="login-btn-container">
              <input className="login-btn" type="submit" value="Login" />
              <Link to="/registration" className="register-btn">
                Register new account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
