import { Link } from "react-router-dom";

import "./newPatientRegistration.css"
import DashboardNav from "../components/DashboardNav";

export default function NewPatientRegstration() {
  return (
    
       <div className="">
      <DashboardNav/>
    
        <div className="patient-container ">
        <h2 className="patient-title">New Patient Registration</h2>
       
        <form action="/doctor-dashboard">
          
          
         
          <input className="name-cont" type="text" placeholder="Full Name"            required/>
          <input className="name-cont date-input" type="date" placeholder="Date of Birth"      required/>
          <input className="name-cont" type="number" name="CNP" placeholder="CNP"   required/>
          <input className="name-cont" type="email" placeholder="Email"        required/>
          <input className="name-cont" type="tel" id="phone" name="phone" placeholder="123-456-789" pattern="[0-9]{3}[0-9]{3}[0-9]{3}" required/> 
  {/* <small>Format: 123-456-789</small> <br /> */}
          <select  className="occupation-select name-cont" name="Occupation" id="occupation" required>
            <option value="" disabled selected>Occupation</option>
            <option value="Employed">Employed</option>
            <option value="Unemployed">Unemployed</option>
            <option value="Student">Student</option>
            <option value="Pensioner">Pensioner</option>
            <option value="Other">Other</option>
          </select>
            
          
          <div className="patient-registration-btn-container">
          <input className="red-btn" type="submit" value="Register" />
          
          <Link to="/doctor-dashboard" className="gray-btn">Cancel</Link>
          </div>
        </form>
      </div>
    </div>
   
  )
}
