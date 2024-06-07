
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
// import Home from './routes/Home'
import Login from './routes/Login'
import Registration from './routes/Registration'
import DoctorDashboard from './routes/DoctorDashboard'
import NewPatientRegstration from './routes/NewPatientRegstration'
import Footer from './components/Footer'
import PatientInfo from './routes/PatientInfo'
import ModifyPatientInfo from './routes/ModifyPatientInfo'
import Consultations from './routes/Consultations'
import NewConsultation from './routes/NewConsultation'
import ModifyConsultations from './routes/ModifyConsultations'

function App() {
 

  return (
    <>
      <BrowserRouter>
      <Routes>
       
        <Route path='/' element={<Login />}/>
        <Route path='/registration' element={<Registration/>}/>
        <Route path='/doctor-dashboard' element={<DoctorDashboard/>}/>
        <Route path='/patient-registration' element={<NewPatientRegstration/>}/>
        <Route path="/doctor-dashboard/:id_patient/patient-info" element={<PatientInfo />} />
        <Route path="/doctor-dashboard/:id_patient/modify-patient-info" element={<ModifyPatientInfo/>}/>
        <Route path="/doctor-dashboard/:id_patient/consultations" element={<Consultations/>}/>
        <Route path="/doctor-dashboard/:id_patient/new-consultation" element={<NewConsultation/>}/>
        <Route path="/doctor-dashboard/:id_patient/consultations/:id_consultation/modify-consultation" element={<ModifyConsultations/>}/>
        <Route path='/doctor-dashboard/modify-consultation' element={<ModifyConsultations/>}/> {/*Placeholder*/}
        


        

      </Routes>
      </BrowserRouter>
        <Footer/>
    </>
  )
}

export default App
