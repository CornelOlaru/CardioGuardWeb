import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import DashboardNav from "../components/DashboardNav";
import "./patientInfo.css";
import "./doctorDashboard.css";
import "./patientInfo.css";
import "./doctorDashboard.css";

export default function PatientInfo() {
  const { id_patient } = useParams();
  const [patient, setPatient] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      console.log("Sending request to server with patient ID:", id_patient);
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token not found. Redirecting to login.");
          navigate("/login");
          return;
        }

        const response = await fetch(
          `https://api.cardioguard.eu/medic/patient/${id_patient}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          console.error(`Error: ${response.status} ${response.statusText}`);
          throw new Error(`Network response was not ok: ${response.status}`);
        }

        const data = await response.json();
        console.log("Full response received:", data);

        if (data && data.first_name) {
          console.log("Data structure is as expected.");

          const patientData = {
            name: `${data.first_name} ${data.last_name}`,
            age: calculateAge(data.date_of_birth),
            cnp: data.cnp,
            email: data.e_mail,
            address: `${data.street_adress}, ${data.city}`,
            telephone: data.phone_number,
            occupation: data.profession,
          };

          setPatient(patientData);
        } else {
          console.error("Data format is not as expected:", data);
          throw new Error("Data format is not as expected.");
        }
      } catch (error) {
        console.error("Error fetching or parsing data:", error);
        navigate("/doctor-dashboard");
      }
    }

    fetchData();
  }, [navigate, id_patient]);

  // Function to calculate age based on date of birth
  function calculateAge(dateOfBirth) {
    const dob = new Date(dateOfBirth);
    const diff = Date.now() - dob.getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  const { id_patient } = useParams();
  const [patient, setPatient] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      console.log("Sending request to server with patient ID:", id_patient);
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token not found. Redirecting to login.");
          navigate("/login");
          return;
        }

        const response = await fetch(
          `https://api.cardioguard.eu/medic/patient/${id_patient}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          console.error(`Error: ${response.status} ${response.statusText}`);
          throw new Error(`Network response was not ok: ${response.status}`);
        }

        const data = await response.json();
        console.log("Full response received:", data);

        if (data && data.first_name) {
          console.log("Data structure is as expected.");

          const patientData = {
            name: `${data.first_name} ${data.last_name}`,
            age: calculateAge(data.date_of_birth),
            cnp: data.cnp,
            email: data.e_mail,
            address: `${data.street_adress}, ${data.city}`,
            telephone: data.phone_number,
            occupation: data.profession,
          };

          setPatient(patientData);
        } else {
          console.error("Data format is not as expected:", data);
          throw new Error("Data format is not as expected.");
        }
      } catch (error) {
        console.error("Error fetching or parsing data:", error);
        navigate("/doctor-dashboard");
      }
    }

    fetchData();
  }, [navigate, id_patient]);

  // Function to calculate age based on date of birth
  function calculateAge(dateOfBirth) {
    const dob = new Date(dateOfBirth);
    const diff = Date.now() - dob.getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  return (
    <>
      <DashboardNav />
      <div className="patient-container">
        <div className="patient-sub-container">
          {patient ? (
            <form>
              <h2 className="patient-title">
                Patient <br /> Information
              </h2>
              <p className="name-cont">
                <strong>Name:</strong> {patient.name}
              </p>

              <p className="name-cont">
                <strong>Age:</strong> {patient.age}
              </p>

              <p className="name-cont">
                <strong>CNP:</strong> {patient.cnp}
              </p>
              <p className="name-cont">
                <strong>Email:</strong> {patient.email}
              </p>
              <p className="name-cont">
                <strong>Address:</strong> {patient.address}
              </p>
              <p className="name-cont">
                <strong>Telephone:</strong> {patient.telephone}
              </p>
              <p className="name-cont">
                <strong>Occupation:</strong> {patient.occupation}
              </p>
              <Link to={`/doctor-dashboard/${id_patient}/consultations`} className="login-btn" style={{display:"block"}}>
                Consultations
              </Link>
              <div className="patient-info-btns">

              <Link to={`/doctor-dashboard/${id_patient}/modify-patient-info`} className="red-btn modify">
                Modify
              </Link>
              <Link to="/doctor-dashboard" className="gray-btn back">
                Back
              </Link>
              </div>
            </form>
          ) : (
            <p>Loading patient information...</p>
          )}
        </div>
      </div>
    </>
  );
}
