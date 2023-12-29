import './App.css';
import Hero from './Components/Hero/Hero';
import { ServicesContainer } from './Components/ServicesComponent/ServicesContainer';
import { Routes, Route, useNavigate } from "react-router-dom";
import React, { useEffect } from 'react';
import FindDoctorPage from './Components/FindDoctor/FindDoctorPage';
import { DoctorDetailsPage } from './Components/DoctorDetails/DoctorDetails';
import {  LoginSignup } from './Components/Login/Login';
import { BookedAppointments } from './Components/BookedAppointments/BookedAppointments';
import { UserAndDoctor } from './Components/UserAndDoctor/UserAndDoctor';
import DoctorDashboard from './Components/Doctor/Dashboard/Dashboard';
import {DoctorLogin} from './Components/Doctor/DoctorLogin';
import { DoctorProfile } from './Components/Doctor/Profile/DoctorProfile';
import { AppointmentsSection } from './Components/Doctor/AppointmentsSection.js/AppointmentsSection';
import { SaveReportsSection } from './Components/SaveReports/SaveReportsSection';






function Home() {

const navigate = useNavigate();


useEffect(()=>{
        
  if(!localStorage.getItem("username")){
      navigate("/login");
  }

  },[])



  return <div>



    <Hero />
    <ServicesContainer />

  </div>}


function App() {
  return (
    <div className="App"  >


      <Routes>
        <Route path='/login' element={<LoginSignup />}> </Route>
        <Route path='/' element={<Home />}></Route>
        <Route path='/findDoctor' element={<FindDoctorPage />}> </Route>
        <Route path='/doctor' element={<DoctorDetailsPage />}> </Route>
        <Route path='/appointments' element={<BookedAppointments />}> </Route>
        <Route path='/options' element={<UserAndDoctor  />}> </Route>
        <Route path='/doctorLogin' element={<DoctorLogin  />}> </Route>
        <Route path='/reports' element={<SaveReportsSection  />}> </Route>

      {/* Doctor */}
        <Route path='/admin' element={<DoctorDashboard  />}>

        <Route path='appointments' element={<AppointmentsSection />}></Route>
        <Route path='profile' element={<DoctorProfile />}></Route>
        
         </Route>

       
       
      </Routes>



    </div>
  );
}

export default App;
