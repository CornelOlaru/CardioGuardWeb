import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"
import "./registration.css"

export default function Registration() {
  return (
    <div className="registration-container">
      <Navbar/>
    
        <div className="registration-sub-container">
        <h2 className="registration-title">Registration</h2>
        <p className="registration-sub-title">Register a new account</p>
        <form action="/doctor-dashboard">
          
          
         
          <input className="name-cont" type="text" placeholder="Name"            required/>
          <input className="name-cont" type="text" placeholder="First Name"      required/>
          <input className="name-cont" type="number" name="CNP" placeholder="CNP"required/>
          <input className="name-cont" type="text" placeholder="Username"        required/>
          <input className="name-cont" type="text" placeholder="Password"        required/>
          <input className="name-cont" type="text" placeholder="Retype Password" required/>
          <div className="radio">
        <span>  <input className="" type="radio" name="user" required/> Medic</span>          
        <span>  <input className="" type="radio" name="user" required/> Patient</span>          
          </div>
          
          <div className="registration-btn-container">

          <input className="red-btn" type="submit" value="Register" />
          


      

          <Link to="/" className="gray-btn">Log into an existing account</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
