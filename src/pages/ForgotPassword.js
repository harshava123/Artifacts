import React, { useState, useEffect } from 'react';
import back from '../images/back.jpg'; // Import the background image
import logo from '../images/logo.jpg'; // Import the logo image
import { Link, useLocation } from 'react-router-dom';
import { FaRegEye, FaEyeSlash } from "react-icons/fa";

function ForgotPassword() {
  const location = useLocation();
  const [employeeIdentifier, setEmployeeIdentifier] = useState('');
  const [message, setMessage] = useState('');
  const [isMobileOTPEnabled, setIsMobileOTPEnabled] = useState(false);
  const [isEmailOTPEnabled, setIsEmailOTPEnabled] = useState(false);
  const [isPasswordEnabled, setIsPasswordEnabled] = useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false); // State for New Password visibility
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false); // State for Confirm Password visibility

  useEffect(() => {
    if (location.state && location.state.employeeIdentifier) {
      setEmployeeIdentifier(location.state.employeeIdentifier);
    }
  }, [location.state]);

  const handleNumericInput = (e) => {
    e.target.value = e.target.value.replace(/\D/g, ""); // Replace any non-numeric characters
  };

  const handleSendOTP = () => {
    // Show OTP fields after clicking Send OTP
    setIsMobileOTPEnabled(true);
    setIsEmailOTPEnabled(true);
  };

  const verifyOTPs = () => {
    // Show password fields after OTP verification
    setIsPasswordEnabled(true);
  };

  const handleSubmit = () => {
    // Add your submission logic here
    alert('Password reset successfully!');
  };

  return (
    <div className="h-screen flex bg-cover bg-center" style={{ backgroundImage: `url(${back})` }}>
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center" style={{ marginLeft: '10%', maxWidth: '500px' }}>
        <div className="bg-white border-2 border-orange-400 rounded-3xl shadow-lg p-6 relative">
          {/* Logo at the top center */}
          <div className="flex justify-center mb-4">
            <img src={logo} alt="Logo" className="h-10" /> {/* Adjust height as needed */}
          </div>

          {/* Close Button */}
          <Link to="/">
            <button className="absolute top-2 right-2 text-xl font-bold text-gray-600 hover:text-orange-500 hover:scale-110 transition duration-300 transform">
              &#x2715;
            </button>
          </Link>

          {/* Form Fields */}
          <form className="mt-4">
            {/* Employee Email / Employee Number */}
            <div className="mb-2 flex items-center">
              <label className="w-1/3 mb-1 text">Employee Email / Number</label>
              <input
                className="w-2/3 p-2 border-2 rounded-3xl text-sm"
                placeholder="Enter Employee Email / Employee Number"
                type="text"
                value={employeeIdentifier}
                onChange={(e) => setEmployeeIdentifier(e.target.value)}
              />
            </div>

            <div className="mb-4 flex justify-end">
              <button
                type="button"
                onClick={handleSendOTP}
                className="md:w-32 bg-orange-400 hover:bg-orange-600 text-white font-semibold py-2 rounded-full transition ml-80"
              >
                Send OTP
              </button>
            </div>

            {/* Mobile OTP Field */}
            {isMobileOTPEnabled && (
              <div className="mb-2 flex items-center relative group">
                <label className="w-1/3 mb-1">Mobile OTP</label>
                <div className="w-2/3 flex flex-col relative">
                  <input
                    className="w-full p-2 border-2 rounded-3xl hover:border-orange-400 text-sm"
                    placeholder="Enter OTP"
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    onInput={handleNumericInput}
                  />
                  <a href="#" className="text-blue-500 text-sm mt-1 text-right group-hover:underline">
                    Resend OTP
                  </a>
                </div>
              </div>
            )}

            {/* Email OTP Field */}
            {isEmailOTPEnabled && (
              <div className="mb-2 flex items-center relative group">
                <label className="w-1/3 mb-1">Email OTP</label>
                <div className="w-2/3 flex flex-col relative">
                  <input
                    className="w-full p-2 border-2 rounded-3xl hover:border-orange-400 text-sm"
                    placeholder="Enter OTP"
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    onInput={handleNumericInput}
                  />
                  <a href="#" className="text-blue-500 text-sm mt-1 text-right group-hover:underline">
                    Resend OTP
                  </a>
                </div>
              </div>
            )}

            {isEmailOTPEnabled && (
              <div className="mb-4 flex justify-end">
                <button
                  type="button"
                  onClick={verifyOTPs}
                  className="md:w-32 bg-orange-400 hover:bg-orange-600 text-white font-semibold py-2 rounded-full transition ml-80"
                >
                  Submit
                </button>
              </div>
            )}

            {/* New Password Field */}
            {isPasswordEnabled && (
              <>
                <div className="mb-2 flex items-center relative group">
                  <label className="w-1/3 mb-1">New Password</label>
                  <div className="relative w-2/3">
                    <input
                      className="w-full p-2 border-2 rounded-3xl hover:border-orange-400 pr-10 text-sm"
                      placeholder="Enter Password"
                      type={isNewPasswordVisible ? "text" : "password"}
                    />
                    <button
                      type="button"
                      onClick={() => setIsNewPasswordVisible(!isNewPasswordVisible)}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-orange-400"
                    >
                      {isNewPasswordVisible ? <FaRegEye /> : <FaEyeSlash />} {/* Toggle icon */}
                    </button>
                  </div>
                </div>

                {/* Confirm Password Field */}
                <div className="mb-2 flex items-center relative group">
                  <label className="w-1/3 mb-1">Confirm Password</label>
                  <div className="relative w-2/3">
                    <input
                      className="w-full p-2 border-2 rounded-3xl hover:border-orange-400 pr-10 text-sm"
                      placeholder="Re-Enter Password"
                      type={isConfirmPasswordVisible ? "text" : "password"}
                    />
                    <button
                      type="button"
                      onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-orange-400"
                    >
                      {isConfirmPasswordVisible ? <FaRegEye /> : <FaEyeSlash />} {/* Toggle icon */}
                    </button>
                  </div>
                </div>

                <div className="mb-4 flex justify-center">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="md:w-32 bg-orange-400 hover:bg-orange-600 text-white font-semibold py-2 rounded-full transition mt-6"
                  >
                    CREATE
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
