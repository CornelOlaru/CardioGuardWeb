import DashboardNav from "../components/DashboardNav";
import deleteIco from "../assets/delete-icon.svg";
import openIco from "../assets/open-icon.svg";
import modifyIco from "../assets/modify-icon.svg";
import "./doctorDashboard.css";
import { Link } from "react-router-dom";
export default function DoctorDashboard() {
  return (
    <div className="dashboard-container">
      <DashboardNav/>
      <div className="new-patient-btn-container">

      <Link to="/patient-registration" className="new-patient-btn nav-btn">New Patient</Link>
      </div>
      <table className="table-container">   
        <tr className="table-head">
            <th><input type="checkbox" name="" id="" /></th>
            <th>Name</th>
            <th>Age</th>
            <th>CNP</th>
            <th>Email</th>
            <th>Address</th>
            <th>Telephone Nr.</th>
            <th>Occupation</th>
            <th>Action</th>
        </tr>
        <tr className="table-body">
            <td><input type="checkbox" name="" id="" /></td>
            <td>Lorem</td>
            <td>1</td>
            <td>000011112223</td>
            <td>lorem.ipsum@gmail.com</td>
            <td>Some address 123</td>
            <td>0123456789</td>
            <td>Employed</td>
            <td>
            <img src={openIco} alt="" />
            <img src={modifyIco} alt="" />
            <img src={deleteIco} alt="" />
            </td>
        </tr>
        <tr>
            <td><input type="checkbox" name="" id="" /></td>
            <td>Lorem</td>
            <td>1</td>
            <td>000011112223</td>
            <td>lorem.ipsum@gmail.com</td>
            <td>Some address 123</td>
            <td>0123456789</td>
            <td>Employed</td>
            <td>
            <img src={openIco} alt="" />
            <img src={modifyIco} alt="" />
            <img src={deleteIco} alt="" />
            </td>
        </tr>
        <tr>
            <td><input type="checkbox" name="" id="" /></td>
            <td>Lorem</td>
            <td>1</td>
            <td>000011112223</td>
            <td>lorem.ipsum@gmail.com</td>
            <td>Some address 123</td>
            <td>0123456789</td>
            <td>Employed</td>
            <td>
            <img src={openIco} alt="" />
            <img src={modifyIco} alt="" />
            <img src={deleteIco} alt="" />
            </td>
        </tr>
        <tr>
            <td><input type="checkbox" name="" id="" /></td>
            <td>Lorem</td>
            <td>1</td>
            <td>000011112223</td>
            <td>lorem.ipsum@gmail.com</td>
            <td>Some address 123</td>
            <td>0123456789</td>
            <td>Employed</td>
            <td>
            <img src={openIco} alt="" />
            <img src={modifyIco} alt="" />
            <img src={deleteIco} alt="" />
            </td>
        </tr>
        <tr>
            <td><input type="checkbox" name="" id="" /></td>
            <td>Lorem</td>
            <td>1</td>
            <td>000011112223</td>
            <td>lorem.ipsum@gmail.com</td>
            <td>Some address 123</td>
            <td>0123456789</td>
            <td>Employed</td>
            <td>
            <img src={openIco} alt="" />
            <img src={modifyIco} alt="" />
            <img src={deleteIco} alt="" />
            </td>
        </tr>
        
      </table>
    </div>
  )
}
