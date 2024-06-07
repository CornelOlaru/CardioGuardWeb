import { Link, useNavigate, useParams } from "react-router-dom";
import "./newPatientRegistration.css";
import DashboardNav from "../components/DashboardNav";
import { useEffect, useState } from "react";

export default function ModifyPatientInfo() {
  const { id_patient } = useParams();
  //   const [patients, setPatients] = useState(null);
  const navigate = useNavigate();
//   const [username, setUsername] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [cnp, setCnp] = useState("");
  const [adress, setAddress] = useState("");
  const [e_mail, setEmail] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [profession, setProfession] = useState("");
  const [date_of_birth, setDate] = useState("");

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

          setFirstName(data.first_name);
          setLastName(data.last_name);
          setCnp(data.cnp);
          setAddress(data.street_adress + ", " + data.city);
          setEmail(data.e_mail);
          setPhoneNumber(data.phone_number);
          setProfession(data.profession);
          setDate(data.date_of_birth);
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

  const saveModifiedPatient = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    // Construcția datelor în format URL-encoded
    let loginData = new FormData();
    loginData.append("first_name", first_name);
    loginData.append("last_name", last_name);
    loginData.append("date_of_birth", date_of_birth);
    loginData.append("cnp", cnp);
    loginData.append("adress", adress);
    loginData.append("e_mail", e_mail);
    loginData.append("phone_number", phone_number);
    loginData.append("profession", profession);
    try {
      const response = await fetch(
        `https://api.cardioguard.eu/medic/patient/${id_patient}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: loginData,
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
      alert("Pacient updated succesfully!");
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  //Function to calculate age based on date of birth
  //   function calculateAge(dateOfBirth) {
  //     const dob = new Date(dateOfBirth);
  //     const diff = Date.now() - dob.getTime();
  //     const ageDate = new Date(diff);
  //     return Math.abs(ageDate.getUTCFullYear() - 1970);
  //   }

  return (
    <>
      <div className="patient-container">
        <DashboardNav />

        <div className="patient-sub-container">
          <h2 className="patient-title">
            Modify Patient <br /> Information
          </h2>

          <form onSubmit={saveModifiedPatient}>
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
              value={date_of_birth}
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
            <small>Format: 123-456-789</small>
            <input
              type="text"
              className="occupation-select name-cont"
              name="profession"
              placeholder="Profession"
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
              required
            />

            <div className="patient-registration-btn-container">
              <input className="red-btn" type="submit" value="Save" />
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
