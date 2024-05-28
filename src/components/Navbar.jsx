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
    <div className="">

    <nav className="navbar">
        <Link to="/">
        <img src={logo} alt="CardioGuard Logo" />
        </Link>
       {click ? <Link to="/registration" className="nav-btn" onClick={loginHandle}>
            Register
        </Link> : <Link to="/" className="nav-btn" onClick={loginHandle}>
              Login
        </Link>}
    </nav>
    </div>
  )
}
