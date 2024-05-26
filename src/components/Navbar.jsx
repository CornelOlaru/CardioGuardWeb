import "./navbar.css"
import logo from "../assets/cardio-guard-logo.svg"
import { Link } from "react-router-dom"
import { useState } from "react"
export default function Navbar() {
    const [click, setClick] = useState(false)
    const loginHandle = () => {
        setClick (!click)
    }
  return (
    
    <nav className="navbar">
        <Link to="/">
        <img src={logo} alt="CardioGuard Logo" />
        </Link>
       {click ? <Link to="/registration" className="nav-btn" onClick={loginHandle}>
            Login
        </Link> : <Link to="/" className="nav-btn" onClick={loginHandle}>
              Register
        </Link>}
    </nav>
  )
}
