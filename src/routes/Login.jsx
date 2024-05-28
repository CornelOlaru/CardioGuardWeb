import Navbar from "../components/Navbar"
import "./login.css"
import userIco from "../assets/user-ico.svg"
import passIco from "../assets/pass-ico.svg"
import { Link } from "react-router-dom"
export default function Login() {
  return (
    <div className="login-container">
      <Navbar/>
        <div className="login-sub-container">
        <h2 className="login-title">Login</h2>
        <p className="login-sub-title">Log into your account</p>
        <form className="login-form">
          
          <div className="name-cont">
          <img src={userIco} alt="Username Icon" />
          <input type="text" placeholder="Username" required/>
          </div>
          <div className="name-cont">
          <img src={passIco} alt="Username Icon" />
          <input type="password" placeholder="Password" required/>
          </div>
          <div className="login-btn-container">

          <Link to="/doctor-dashboard" className="red-btn">Register new account</Link>
          


          

          <Link to="/registration" className="register-btn">Register new account</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
