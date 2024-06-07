import { Link, useNavigate, useParams } from "react-router-dom";
import "./newPatientRegistration.css";
import DashboardNav from "../components/DashboardNav";
import { useEffect, useState } from "react";

export default function ModifyConsultationInfo() {
  const { id_patient, id_consultation } = useParams();
  const navigate = useNavigate();
  const [consultation_date, setConsultationDate] = useState("");
  const [recommendations, setRecommendations] = useState("");

  useEffect(() => {
    async function fetchData() {
      console.log("Sending request to server with consultation ID:", id_consultation);
      if (!id_consultation) {
        console.error("Consultation ID is undefined. Redirecting to dashboard.");
        navigate("/doctor-dashboard");
        return;
      }
     
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token not found. Redirecting to login.");
          navigate("/login");
          return;
        }

        const response = await fetch(
          `https://api.cardioguard.eu/medic/consultations/${id_consultation}`,
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

        if (data) {
          console.log("Data structure is as expected.");
          setConsultationDate(data.consultation_date);
          setRecommendations(data.recommendations);
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
  }, [navigate, id_consultation]);

  const saveModifiedConsultation = async (e) => {
    e.preventDefault();

    // Verificăm dacă consultation_date este definită și are o valoare validă
    if (!consultation_date) {
      console.error("Invalid consultation date: undefined or null.");
      alert("Invalid consultation date. Please provide a valid date and time.");
      return;
    }

    // Verificăm dacă consultation_date este o dată validă
    if (isNaN(new Date(consultation_date).getTime())) {
      console.error("Invalid consultation date:", consultation_date);
      alert("Invalid consultation date. Please provide a valid date and time.");
      return;
    }

    // Eliminăm UTC offset-ul și formatarea secundară
    const formattedDate = new Date(consultation_date).toISOString();

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token not found. Redirecting to login.");
      navigate("/login");
      return;
    }

    try {
      console.log("Sending PUT request to:", `https://api.cardioguard.eu/medic/consultation/${id_consultation}`);
      console.log("Request body:", { consultation_date: formattedDate, recommendations });

      const response = await fetch(
        `https://api.cardioguard.eu/medic/consultation/${id_consultation}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ consultation_date: formattedDate, recommendations }),
        }
      );

      if (response.ok) {
        console.log("Response status:", response.status);
        alert("Consultation updated successfully!");
        navigate(`/doctor-dashboard/${id_patient}/consultations`); // Redirect after successful update
      } else {
        const errorResponse = await response.text();
        console.error("Response status:", response.status);
        console.error("Response body:", errorResponse);
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Error fetching or parsing data:", error);
      alert("There was a problem updating the consultation.");
    }
  };

  return (
    <div className="patient-container">
      <DashboardNav />
      <div className="patient-sub-container">
        <h2 className="patient-title">Modify Consultation</h2>

        <form onSubmit={saveModifiedConsultation}>
          <input
            className="name-cont date-input"
            type="datetime-local"
            name="consultation_date"
            placeholder="Date"
            value={consultation_date}
            onChange={(e) => setConsultationDate(e.target.value)}
            required 
          />

          <input
            className="name-cont"
            type="text"
            name="recommendations"
            placeholder="Observations"
            value={recommendations}
            onChange={(e) => setRecommendations(e.target.value)}
            required 
          />
          
          <div className="patient-registration-btn-container">
            <input className="red-btn" type="submit" value="Save" />
            <Link to={`/doctor-dashboard/${id_patient}/consultations`} className="gray-btn">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
