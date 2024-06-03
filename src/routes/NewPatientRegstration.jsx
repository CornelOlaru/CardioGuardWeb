import { Link, useNavigate } from "react-router-dom";
import "./newPatientRegistration.css";
import DashboardNav from "../components/DashboardNav";
import { useState } from "react";


export default function NewPatientRegistration() {
  const [username, setUsername] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [cnp, setCnp] = useState("");
  const [adress, setAddress] = useState("");
  const [e_mail, setEmail] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [profession, setProfession] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();
 

  const savePatient = async (e) => {
    e.preventDefault();
   
    const token = localStorage.getItem("token");
    // Construcția datelor în format URL-encoded
    const loginData = `username=${encodeURIComponent(
      username
    )}&first_name=${encodeURIComponent(
      first_name
    )}&last_name=${encodeURIComponent(
      last_name
    )}&cnp=${encodeURIComponent(
      cnp
    )}&adress=${encodeURIComponent(
      adress
    )}&e_mail=${encodeURIComponent(
      e_mail
    )}&phone_number=${encodeURIComponent(
      phone_number
    )}&profession=${encodeURIComponent(profession)}`;
    try {
      const response = await fetch(
        "https://api.cardioguard.eu/medic/register-patient",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${token}`,
          },
          body: loginData,
        }
      );

      if (response.ok) {
        navigate("/doctor-dashboard");
      } else{
        const errorResponse = await response.text();
        console.error("Response status:", response.status);
        console.error("Response body:", errorResponse);
        throw new Error("Network response was not ok");
        
      }

      // const responseData = await response.json();
      alert("Pacient added succesfully!")
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  return (
    <>
      <div className="patient-container">
        <DashboardNav />

        <div className="patient-sub-container">
          <h2 className="patient-title">
            New Patient <br /> Registration
          </h2>

          <form onSubmit={savePatient}>
            <input
              className="name-cont"
              type="text"
              name="id_login"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              className="name-cont"
              type="text"
              name="first_name"
              placeholder="First Name"
              value={first_name}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <input
              className="name-cont"
              type="text"
              name="last_name"
              placeholder="Last Name"
              value={last_name}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            <input
              className="name-cont date-input"
              type="date"
              name="date_of_birth"
              placeholder="Date of Birth"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
            <input
              className="name-cont"
              type="number"
              name="cnp"
              placeholder="CNP"
              value={cnp}
              onChange={(e) => setCnp(e.target.value)}
              required
            />
            <input
              className="name-cont"
              type="text"
              name="address"
              placeholder="Address"
              value={adress}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            <input
              className="name-cont"
              type="email"
              name="e_mail"
              placeholder="Email"
              value={e_mail}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className="name-cont"
              type="number"
              name="phone_number"
              id="phone"
              placeholder="Phone Number"
              pattern="[0-9]{3}[0-9]{3}[0-9]{3}"
              value={phone_number}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
            <small>Format: 123-456-7890</small>
            <input
              type="text"
              className="occupation-select name-cont"
              name="profession"
              placeholder="Occupation"
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
              required
            />
            
            <div className="patient-registration-btn-container">
              <input className="red-btn" type="submit" value="Register" />
              <Link to="/doctor-dashboard" className="gray-btn">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
