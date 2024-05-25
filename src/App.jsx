
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
// import Home from './routes/Home'
import Login from './routes/Login'
import Registration from './routes/Registration'

function App() {
 

  return (
    <>
      <BrowserRouter>
      <Routes>
       
        <Route path='/registration' element={<Registration/>}/>
        <Route path='/' element={<Login />}/>

        
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
