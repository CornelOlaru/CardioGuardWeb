import { Link, useNavigate } from "react-router-dom";
import "./newPatientRegistration.css";
import DashboardNav from "../components/DashboardNav";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function NewConsultation() {

  const { id_patient } = useParams();
  const [consultation_date, setDate] = useState("");
  const [recommendations, setObservations] = useState("");
  const navigate = useNavigate();

  const saveConsultation = async (e) => {
    e.preventDefault();
   
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token not found");
      navigate("/login");
      return;
    }
    
    const consultationData = new URLSearchParams();
    consultationData.append('id_patient', id_patient);
    consultationData.append('consultation_date', consultation_date);
    consultationData.append('recommendations', recommendations);
    
    console.log("Consultation data to be sent:", consultationData.toString());

    try {
      const response = await fetch(
        "https://api.cardioguard.eu/medic/consultation",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${token}`,
          },
          body: consultationData.toString(),
        }
      );

      if (response.ok) {
        console.log("Consultation added successfully");
        alert("Consultation added successfully")
        navigate("/doctor-dashboard/:id_patient/consultations");
      } else {
        const errorResponse = await response.text();
        console.error("Response status:", response.status);
        console.error("Response body:", errorResponse);
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  return (
    <>
      <div className="patient-container">
        <DashboardNav />

        <div className="patient-sub-container">
          <h2 className="patient-title">New Consultation</h2>

          <form onSubmit={saveConsultation}>
            <input
              className="name-cont date-input"
              type="datetime-local"
              name="consultation_date"
              placeholder="Date"
              value={consultation_date}
              onChange={(e) => setDate(e.target.value)}
              required 
            />

            <input
              className="name-cont"
              type="text"
              name="recommendations"
              placeholder="Observations"
              value={recommendations}
              onChange={(e) => setObservations(e.target.value)}
              required 
            />
            
            <div className="patient-registration-btn-container">
              <input className="red-btn" type="submit" value="Save" />
              <Link to="/doctor-dashboard" className="gray-btn">Cancel</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
