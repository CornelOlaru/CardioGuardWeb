import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"
import "./registration.css"

export default function Registration() {
  return (
    <div>
      <Navbar/>
    
        <div className="registration-container">
        <h2 className="registration-title">Registration</h2>
        <p className="registration-sub-title">Log into your account</p>
        <form action="registration">
          
          
         
          <input className="name-cont" type="text" placeholder="Name"/>
          <input className="name-cont" type="text" placeholder="First Name"/>
          <input className="name-cont" type="text" placeholder="CNP"/>
          <input className="name-cont" type="text" placeholder="Username"/>
          <input className="name-cont" type="text" placeholder="Password"/>
          <input className="name-cont" type="text" placeholder="Retype Password"/>
          <div className="radio">
        <span>  <input className="" type="radio" name="user" /> Medic</span>          
        <span>  <input className="" type="radio" name="user" /> Patient</span>          
          </div>
          
          <div className="registration-btn-container">

          <Link to="/registration" className="red-btn">Register</Link>
          <Link to="/" className="gray-btn">Log into an existing account</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
