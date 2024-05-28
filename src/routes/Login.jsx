import Navbar from "../components/Navbar"
import "./login.css"
import userIco from "../assets/user-ico.svg"
import passIco from "../assets/pass-ico.svg"
import { Link,  useNavigate } from "react-router-dom"
export default function Login() {

  let navigate = useNavigate();

  const handleSubmit = e => {
   e.preventDefault();
   e.stopPropagation();
                                   
   navigate("/doctor-dashboard");
  };
  return (
    <>
      <Navbar/>
    <div className="login-container">
        <div className="login-sub-container">
        <h2 className="login-title">Login</h2>
        <p className="login-sub-title">Log into your account</p>
        <form className="login-form" onSubmit={handleSubmit}>
          
          <div className="name-cont">
          <img src={userIco} alt="Username Icon" />
          <input type="text" placeholder="Username" required/>
          </div>
          <div className="name-cont">
          <img src={passIco} alt="Username Icon" />
          <input type="password" placeholder="Password" required/>
          </div>
          <div className="login-btn-container">

          
          {/* <button type="submit" className="red-btn">
            <Link to="/doctor-dashboard" className="red-btn">Login</Link>
          </button> */}

          <input className="login-btn" type="submit" value="Login" />
          

          <Link to="/registration" className="register-btn">Register new account</Link>
          </div>
        </form>
      </div>
      
    </div>
    </>
  )
}
