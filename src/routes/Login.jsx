import { useEffect, useRef, useState } from "react";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import Navbar from "../components/Navbar";
import "./login.css";
import userIco from "../assets/user-ico.svg";
import passIco from "../assets/pass-ico.svg";
import { Link, useNavigate } from "react-router-dom";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//Validarea pentru user si parola
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%_]).{8,24}$/;

export default function Login() {

  const errRef = useRef();


  const [username, setUsername] = useState("");
  const [validName, setValidName] = useState(false);
 

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  
const showPasswordFunction = () => {
  setShowPassword(!showPassword);
}

  useEffect(() => {
    setValidName(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Trimite cererea de login pentru utilizatorul:", username);

    // Construcția datelor în format URL-encoded
    const loginData = `username=${encodeURIComponent(
      username
    )}&password=${encodeURIComponent(password)}`;

    try {
      const response = await fetch("https://api.cardioguard.eu/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded", // Schimbarea tipului de content
        },
        body: loginData, // Trimiterea datelor în format URL-encoded
      });
      console.log("Răspuns de la server:", response);

      const responseData = await response.json();
      console.log("Răspuns de la server (date):", responseData);

      if (response.ok) {
        console.log("Autentificare reușită pentru utilizatorul:", username);
        localStorage.setItem("token", responseData.token); // Salvează token-ul în localStorage
        navigate("/doctor-dashboard");
      } else {
        setErrMsg(responseData?.message || "Autentificare eșuată.");
        console.error("Autentificare eșuată. Răspunsul HTTP:", response.status);
        console.error("Detalii răspuns server:", responseData); // Adăugarea detaliilor răspunsului
      }
    } catch (error) {
     

        console.error("Failed to login:", error);

      errRef.current.focus();
    }
  };

  return (
    <>
      <Navbar />
      <div className="login-container">
        <div className="login-sub-container">
          <h2 className="login-title">Login</h2>
          <p className="login-sub-title">Log into your account</p>
          <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="name-cont">
              <img src={userIco} alt="Username Icon" />
              <input
                type="text"
                
                placeholder="Username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                
              /> <br />
            </div>
              <p
                id="uidnote"
                className={
                   username && !validName
                    ? "instructions"
                    : "offscreen"
                }
              >
                <FontAwesomeIcon style={{marginRight:"5px"}}  icon= { faInfoCircle }  />
                  4 to 24 characters.
                <br />
                Must begin with a letter.
                <br />
                Letters, numbers, underscores, hyphens allowed.
              </p>
            <div className="name-cont">
              <img src={passIco} alt="Password Icon" />
              <input
                type={showPassword?"password":"text"}
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
              /> 
              <span onClick={showPasswordFunction}>{showPassword ? <IoMdEye icon={IoMdEye}/> : <IoMdEyeOff icon={IoMdEyeOff}/>}</span>
            </div>
              <p
                id="pwdnote"
                className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
              >
                <FontAwesomeIcon style={{marginRight:"5px"}} icon={faInfoCircle} />
                8 to 24 characters.
                <br />
                Must include uppercase and lowercase letters, a number and a
                special character.
                <br />
                Allowed special characters:
                <span aria-label="exclamation mark">!</span>
                <span aria-label="at symbol">@</span>
                <span aria-label="hashtag">#</span>
                <span aria-label="dollar sign">$</span>
                <span aria-label="percent">%</span>
                <span aria-label="percent">_</span>
              </p>
            <div className="login-btn-container">
              <input className="login-btn" type="submit" value="Login" />
              <Link to="/registration" className="register-btn">
                Register new account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
