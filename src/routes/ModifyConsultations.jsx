import { Link, useNavigate, useParams } from "react-router-dom";
import "./newPatientRegistration.css";
import DashboardNav from "../components/DashboardNav";
import { useEffect, useState } from "react";

export default function ModifyPatientInfo() {
  const { id_consultation } = useParams();
  //   const [patients, setPatients] = useState(null);
  {/*const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [cnp, setCnp] = useState("");
  const [adress, setAddress] = useState("");
  const [e_mail, setEmail] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [profession, setProfession] = useState("");
const [date_of_birth, setDate] = useState("");*/}

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [observations, setObservations] = useState("");

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
          `https://api.cardioguard.eu/medic/consultation/${id_consultation}`,
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

          {/*setFirstName(data.first_name);
          setLastName(data.last_name);
          setCnp(data.cnp);
          setAddress(data.street_adress + ", " + data.city);
          setEmail(data.e_mail);
          setPhoneNumber(data.phone_number);
          setProfession(data.profession);
        setDate(data.date_of_birth);*/}

          setDate(data.date);
          setTime(data.time);
          setObservations(data.observations);
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
    /*const loginData = `
     username=${encodeURIComponent(username)}&
    first_name=${encodeURIComponent(first_name)}&last_name=${encodeURIComponent(
      last_name
    )}&date=${encodeURIComponent(date_of_birth)}&cnp=${encodeURIComponent(
      cnp
    )}&adress=${encodeURIComponent(adress)}&e_mail=${encodeURIComponent(
      e_mail
    )}&phone_number=${encodeURIComponent(
      phone_number
    )}&profession=${encodeURIComponent(profession)}`;*/

    const consultationData = `date=${encodeURIComponent(date)}
    &time=${encodeURIComponent(time)}
    &observations=${encodeURIComponent(observations)}`;

    try {
      const response = await fetch(
        `https://api.cardioguard.eu/medic/consultation/${id_consultation}`,
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
                Modify Consultation
            </h2>

            <form onSubmit={saveModifiedConsultation}>
                <input
                    className="name-cont date-input"
                    type="date"
                    name="date"
                    placeholder="Date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required 
                />

                <input
                    className="name-cont"
                    type="time"
                    name="time"
                    placeholder="Time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required 
                />

                <input
                    className="name-cont"
                    type="text"
                    name="observations"
                    placeholder="Observations"
                    value={observations}
                    onChange={(e) => setObservations(e.target.value)}
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

{/*Divide*/}
 {/* return (
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
} */}
