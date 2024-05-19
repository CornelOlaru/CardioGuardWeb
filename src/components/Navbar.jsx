import "./navbar.css"
import logo from "../assets/cardio-guard-logo.svg"
import { Link } from "react-router-dom"
import { useState } from "react"
export default function Navbar() {
    const [click, setClick] = useState(true)
    const loginHandle = () => {
        setClick (!click)
    }
  return (
    
    <nav>
        <Link to="/">
        <img src={logo} alt="CardioGuard Logo" />
        </Link>
       {click ? <Link to="/" className="nav-btn" onClick={loginHandle}>
            Login
        </Link> : <Link to="/login" className="nav-btn" onClick={loginHandle}>
              Register
        </Link>}
    </nav>
  )
}
