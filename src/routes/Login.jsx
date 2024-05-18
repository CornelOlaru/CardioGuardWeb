import Navbar from "../components/Navbar"
import "./login.css"
import userIco from "../assets/user-ico.svg"
import passIco from "../assets/pass-ico.svg"
import { Link } from "react-router-dom"
export default function Login() {
  return (
    <>
      <Navbar/>
        <div className="login-container">
        <h2 className="login-title">Login</h2>
        <p className="login-sub-title">Log into your account</p>
        <form action="login">
          
          <div className="name-cont">
          <img src={userIco} alt="Username Icon" />
          <input type="text" placeholder="Username"/>
          </div>
          <div className="name-cont">
          <img src={passIco} alt="Username Icon" />
          <input type="password" placeholder="Password"/>
          </div>
          <div className="login-btn-container">

          <Link to="/login" className="login-btn">Login</Link>
          <Link to="/registration" className="register-btn">Register new account</Link>
          </div>
        </form>
      </div>
    </>
  )
}
