import "./navbar.css";
import logo from "../assets/cardio-guard-logo.svg";
import { Link } from "react-router-dom";

export default function DashboardNav() {
//   const [click, setClick] = useState(false);
//   const loginHandle = () => {
//     setClick(!click);
//   };
  return (
    <nav className="dashboard-nav">
      <Link to="/">
        <img src={logo} alt="CardioGuard Logo" />
      </Link>
      <Link to="/" className="nav-btn">
        Logout
      </Link>
    </nav>
  );
}
