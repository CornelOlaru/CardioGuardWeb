import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./registration.css";

export default function Registration() {

  const [formData, setFormData] = useState({
    name: "",
    firstName: "",
    cnp: "",
    username: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault(); 

  if (formData.password !== formData.confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  const formDataWithUserType = {
    ...formData,
    type_of_user: "medic" 
  };

  try {

    const postData = `last_name=${formDataWithUserType.name}&first_name=${formDataWithUserType.firstName}&cnp=${formDataWithUserType.cnp}&username=${formDataWithUserType.username}&password=${formDataWithUserType.password}&confirm_password=${formDataWithUserType.confirmPassword}&type_of_user=${formDataWithUserType.type_of_user}`;

    const response = await fetch("https://api.cardioguard.eu/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: postData
    });
    console.log("Raspuns de la server:", response);
    const responseData = await response.json();
    console.log("Raspuns de la server (date):", responseData);


    if (response.ok) {
      alert("Registration successful!");
      console.log("Registration successful!");
      navigate("/");

    } else {
      alert("Registration failed!");

      console.error("Esuat. Răspunsul HTTP:", response.status);
      console.error("Detalii răspuns server:", responseData); 
    }
  } catch (error) {
    
    alert("An error occurred during registration!");
  }
};



  return (
    <>
      <Navbar />
      <div className="registration-container">
        <div className="registration-sub-container">
          <h2 className="registration-title">Registration</h2>
          <p className="registration-sub-title">Register a new account</p>
          <form onSubmit={handleSubmit}>
            <input
              className="name-cont"
              type="text"
              name="name"
              placeholder="Name"
              required
              value={formData.name}
              onChange={handleChange}
            />
            <input
              className="name-cont"
              type="text"
              name="firstName"
              placeholder="First Name"
              required
              value={formData.firstName}
              onChange={handleChange}
            />
            <input
              className="name-cont"
              type="number"
              name="cnp"
              placeholder="CNP"
              required
              value={formData.cnp}
              onChange={handleChange}
            />
            <input
              className="name-cont"
              type="text"
              name="username"
              placeholder="Username"
              required
              value={formData.username}
              onChange={handleChange}
            />
            <input
              className="name-cont"
              type="password"
              name="password"
              placeholder="Password"
              required
              value={formData.password}
              onChange={handleChange}
            />
            <input
              className="name-cont"
              type="password"
              name="confirmPassword"
              placeholder="Retype Password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
            />

            <div className="registration-btn-container">
              <input className="red-btn" type="submit" value="Register" />

              <Link to="/" className="gray-btn">
                Log into an existing account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
