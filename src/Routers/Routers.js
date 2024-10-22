import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Header from '../components/Header/Header';
import Login from '../pages/Login';
import Registration from "../pages/Registration"
import Thankyou from '../pages/Thankyou';
import Congrats from '../pages/Congrats';
import ForgotPassword from '../pages/ForgotPassword';
function Routers() {
  return (
    <>
    {/* <Header/> */}
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/thankyou" element={<Thankyou />} />
        <Route path="/congrats" element={<Congrats />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
    </Routes>
    </>
  )
}

export default Routers