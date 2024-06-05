import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import DashboardNav from "../components/DashboardNav";
import "./consultations.css";
import deleteIco from "../assets/delete-icon.svg";
import modifyIco from "../assets/modify-icon.svg";

export default function Consultations(){
//Editing
        const { id_patient } = useParams();
        const [consultations, setConsultation] = useState(null);
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
                `https://api.cardioguard.eu/medic/consultations/${id_patient}`,
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
      
                const formattedConsultations = data.data.map(consultation => ({
                  date: consultation.date,
                  time: consultation.time,
                  observations: consultation.observations
                }));
      
                setConsultation(formattedConsultations);
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
    //Editing^^
    return (
        <>
          <DashboardNav />
          <div className="dashboard-container container">
                <table className="table-container">
                    <thead className="table-head">
                        <tr>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Observations</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className="table-body">
            {Array.isArray(consultations) && consultations.length > 0 ? (
              consultations.map((consultation) => (
                <tr key={consultation.id_consultation}>
                  <td>{consultation.date}</td>
                  <td>{consultation.time}</td>
                  <td>{consultation.observations}</td>
                  <td>
                    <Link to={`/doctor-dashboard/${id_patient}/modify-patient-info`}>
                    <img src={modifyIco} alt="modify icon" />
                    </Link>
                   <button className="delete-btn" type="button" /*onClick={(e) => deletePatient(e, consultation.id_patient)}*/ >
                    <img src={deleteIco} alt="delete icon" />
                    </button> 
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">No consultations found.</td>
              </tr>
            )}
              </tbody>

                </table>
                {/*Test buttons*/}
                <div className="new-consultation-btn-container">
                  <Link to={`/doctor-dashboard/${id_patient}/new-consultation`} className="new-patient-btn nav-btn">
                    New Consultation
                  </Link>
                </div>
                <div className="new-consultation-btn-container">
                  <Link to="/doctor-dashboard/modify-consultation" className="new-patient-btn nav-btn">
                    Modify Consultation
                  </Link>
                </div>
            </div>
        
        </>
    );
}