import  { useState, useEffect } from "react";
import DashboardNav from "../components/DashboardNav";
import deleteIco from "../assets/delete-icon.svg";
import openIco from "../assets/open-icon.svg";
import modifyIco from "../assets/modify-icon.svg";
import "./doctorDashboard.css";
import { Link, useNavigate } from "react-router-dom";

export default function DoctorDashboard() {
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();
// const openIcon = () => {
//   navigate("/doctor-dashboard/patient-info");
// }
  useEffect(() => {
    async function fetchData() {
      console.log("Sending request to server...");
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token not found. Redirecting to login.");
          navigate("/login");
          return;
        }
    
        const response = await fetch("https://api.cardioguard.eu/medic/patients", {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
    
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
    
        const data = await response.json();
        console.log("Response received:", data);
    
        if (data && data.data && Array.isArray(data.data)) {
          console.log("Data structure is as expected.");
    
          // Mapăm datele primite la structura așteptată în interfața web
          const formattedPatients = data.data.map(patient => ({
            id_patient: patient.id_patient,
            name: `${patient.first_name} ${patient.last_name}`,
            age: calculateAge(patient.date_of_birth),
            cnp: patient.cnp,
            email: patient.e_mail,
            address: patient.street_adress,
            // address: patient.street_adress + ', ' + patient.city,
            telephone: patient.phone_number,
            occupation: patient.profession
          }));

          // Afișează datele în tabel
          setPatients(formattedPatients);
        } else {
          console.error("Data format is not as expected.");
          throw new Error("Data format is not as expected.");
        }
      } catch (error) {
        console.error("Error fetching or parsing data:", error);
        navigate("/login");
      }
    }
  
    fetchData();
  }, [navigate]);

  // Funcție pentru calculul vârstei bazat pe dată de naștere

  function calculateAge(date) {
    const currentDate = new Date();
    const dateOfBirth = new Date(date);

    const daysPerYear = 365.2425;
    const diff = Math.abs(currentDate - dateOfBirth);
    const diffInDays = Math.floor(diff / (1000 * 60 * 60 * 24));

    return Math.floor(diffInDays / daysPerYear);
}
//Functia de stergere
const deletePatient = async (e, id_patient) => {
  e.preventDefault();
  const thisClicked = e.currentTarget;

  // Confirmarea stergerii pacientului
  const confirmDelete = confirm(`Are you sure you want to delete patient with ID ${id_patient}?`);
  
  if (!confirmDelete) {
    return; // pentru anularea stergerii
  }

  thisClicked.innerText = "Deleting...";

  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token not found. Redirecting to login.");
      navigate("/login");
      return;
    }

    // Delete patient
    const deleteResponse = await fetch(`https://api.cardioguard.eu/medic/patient/${id_patient}`, {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!deleteResponse.ok) {
      throw new Error("Network response was not ok");
    }

    console.log("Patient deleted successfully.");

    // Refetch patient data
    const response = await fetch("https://api.cardioguard.eu/medic/patients", {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log("Response received:", data);

    if (data && data.data && Array.isArray(data.data)) {
      console.log("Data structure is as expected.");

      // Mapăm datele primite la structura așteptată în interfața web
      const formattedPatients = data.data.map(patient => ({
        id_patient: patient.id_patient,
        name: `${patient.first_name} ${patient.last_name}`,
        age: calculateAge(patient.date_of_birth),
        cnp: patient.cnp,
        email: patient.e_mail,
        address: patient.street_adress + ', ' + patient.city,
        telephone: patient.phone_number,
        occupation: patient.profession
      }));

      //Afișează datele în tabel
      setPatients(formattedPatients);
    } else {
      console.error("Data format is not as expected.");
      throw new Error("Data format is not as expected.");
    }
  } catch (error) {
    console.error("Error fetching or parsing data:", error);
  }

  thisClicked.innerText = "Delete";
}
  return (
    <>
      <DashboardNav />
      <div className="dashboard-container container">
        <div className="new-patient-btn-container">
          <Link to="/patient-registration" className="new-patient-btn nav-btn">
            New Patient
          </Link>
        </div>
        <table className="table-container">
          <thead className="table-head">
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>CNP</th>
              <th>Email</th>
              <th>Address</th>
              <th>Telephone Nr.</th>
              <th>Occupation</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {Array.isArray(patients) && patients.length > 0 ? (
              patients.map((patient) => (
                <tr key={patient.id_patient}>
                  <td>{patient.name}</td>
                  <td>{patient.age}</td>
                  <td>{patient.cnp}</td>
                  <td>{patient.email}</td>
                  <td>{patient.address}</td>
                  <td>{patient.telephone}</td>
                  <td>{patient.occupation}</td>
                  <td>
                  <Link to={`/doctor-dashboard/${patient.id_patient}/patient-info`}>
                    <img  src={openIco} alt="open icon" />
                    </Link>
                    <Link to={`/doctor-dashboard/${patient.id_patient}/modify-patient-info`}>
                    <img src={modifyIco} alt="modify icon" />
                    </Link>
                   <button className="delete-btn" type="button" onClick={(e) => deletePatient(e, patient.id_patient)}>
                    <img src={deleteIco} alt="delete icon" />
                    </button> 
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">No patients found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
