import { Link, useNavigate, useParams } from "react-router-dom";
import "./newPatientRegistration.css";
import DashboardNav from "../components/DashboardNav";
import { useEffect, useState } from "react";

export default function ModifyPatientInfo() {
  const {id_patient} = useParams();
  const { id_consultation } = useParams();
  const navigate = useNavigate();
  const [consultation_date, setDate] = useState("");
  const [recommendations, setObservations] = useState("");


  useEffect(() => {
    async function fetchData() {
      console.log("Sending request to server with consultation ID:", id_consultation);
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
          setDate(data.consultation_date);
          setObservations(data.recommendations);
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

    const token = localStorage.getItem("token");
    // Construcția datelor în format URL-encoded
   
    const consultationData = `consultation_date=${encodeURIComponent(consultation_date)}
    &recommendations=${encodeURIComponent(recommendations)}`;

    try {
      const response = await fetch(
        `https://api.cardioguard.eu/medic/consultations/${id_consultation}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${token}`,
          },
          body: consultationData,
        }
      );

      if (response.ok) {
        navigate("/doctor-dashboard");
      } else {
        const errorResponse = await response.text();
        console.error("Response status:", response.status);
        console.error("Response body:", errorResponse);
        throw new Error("Network response was not ok");
      }

      // const responseData = await response.json();
      alert("Consultation updated succesfully!");
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
                Modify Consultation
            </h2>

            <form onSubmit={saveModifiedConsultation}>
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
                    <input className="red-btn" type="submit" value="Register" />
                        <Link to={`/doctor-dashboard/${id_patient}/consultations`} className="gray-btn">
                            Cancel
                        </Link>
                </div>
            </form>
        </div>
        </div>
    </>
  );
}
