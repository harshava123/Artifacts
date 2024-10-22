import React, { useState } from 'react';
import back from '../images/back.jpg'; // Background image
import logo from "../images/logo.jpg"; // Logo image
import { FaRegEye } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();

  const handleForgotPassword = () => {
    navigate('/forgotpassword', { state: { employeeIdentifier: inputValue } });
  };

  return (
    <div className="h-screen flex flex-col md:flex-row bg-cover bg-center" style={{ backgroundImage: `url(${back})` }}>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Oleo+Script:wght@400;700&display=swap');
          .font-oleo {
            font-family: 'Oleo Script', cursive;
          }
        `}
      </style>

      {/* Left side: Form section */}
      <div className="flex-1 flex flex-col justify-center items-center bg-opacity-40 p-4 md:p-8">
        <div className="bg-white bg-opacity-90 p-6 md:p-8 rounded-lg shadow-lg border-orange-500 w-full max-w-sm">
          <div className="text-center mb-6 flex flex-col items-center">
            <img src={logo} width={200} height={100} alt="logo" className="mb-4" />
            <h1 className="text-lg md:text-2xl text-orange-500">Welcome! Let's get started</h1>
          </div>
          <form className="w-full">
            <div className='grid gap-4'>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Employee Email / Employee Number"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 text-black placeholder-orange-500"
                />
              </div>
              <div className="mb-4 relative">
                <input
                  type="password"
                  placeholder="Enter Password"
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 text-black placeholder-orange-500"
                />
                <button type="button" className="absolute right-3 top-3 text-gray-500">
                  <FaRegEye />
                </button>
              </div>
            </div>
            <div className="flex justify-between text-sm mb-6">
              <label className="flex items-center text-orange-500">
                Remember Me
                <input type="checkbox" className="ml-2" />
              </label>
              <button
                type="button"
                onClick={handleForgotPassword}
                className="hover:underline text-orange-500"
              >
                Forgot Password?
              </button>
            </div>
            <div className="flex justify-center">
              <button className="w-full md:w-48 bg-orange-400 hover:bg-orange-600 text-white font-semibold py-2 rounded-full transition">
                SIGN IN
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Right side: Welcome section */}
      <div className="">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 font-oleo text-black ">Welcome</h2>
        <p className="font-bold text-blue-800 text-base md:text-lg mb-6">
          <span>Hello! Thank you for choosing us.</span>
          <span>Let's get started.</span>
        </p>
        <div className="flex justify-center items-center gap-3">
          <p className='font-bold'>New to Artifacts?</p>
          <Link to="/register">
            <button className='rounded-lg w-32 underline bg-white text-blue-800'>
              Create Account?
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
