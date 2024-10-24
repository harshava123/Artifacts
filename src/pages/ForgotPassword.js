import React, { useState, useEffect } from 'react';
import back from '../images/back.jpg';
import logo from '../images/logo.jpg';
import { Link, useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate
import { FaRegEye, FaEyeSlash } from "react-icons/fa";

function ForgotPassword() {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize useNavigate
  const [employeeIdentifier, setEmployeeIdentifier] = useState('');
  const [message, setMessage] = useState('');
  const [isMobileOTPEnabled, setIsMobileOTPEnabled] = useState(false);
  const [isEmailOTPEnabled, setIsEmailOTPEnabled] = useState(false);
  const [isPasswordEnabled, setIsPasswordEnabled] = useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [isEditable, setIsEditable] = useState(true);

  useEffect(() => {
    if (location.state && location.state.employeeIdentifier) {
      setEmployeeIdentifier(location.state.employeeIdentifier);
      setIsEditable(false);
    }
  }, [location.state]);

  const handleNumericInput = (e) => {
    e.target.value = e.target.value.replace(/\D/g, ""); // Replace any non-numeric characters
  };

  const handleSendOTP = async () => {
    // Check if employee exists in the database
    const response = await fetch('http://localhost:5000/check-employee', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ identifier: employeeIdentifier }),
    });

    const data = await response.json();
    if (data.exists) {
      setMessage(<span className="text-green-500">Email ID exists. Proceed.</span>);
      setIsMobileOTPEnabled(true);
      setIsEmailOTPEnabled(true);
    } else {
      setMessage(<span className="text-red-500">Email ID does not exist in the database.</span>);
      setIsMobileOTPEnabled(false);
      setIsEmailOTPEnabled(false);
    }
  };

  const verifyOTPs = () => {
    setIsPasswordEnabled(true);
  };

  const handleSubmit = () => {
    // Redirect to Congrats page after successful password reset
    navigate('/Congrats'); // Use navigate to redirect to Congrats page
  };

  return (
    <div className="h-screen flex bg-cover bg-center" style={{ backgroundImage: `url(${back})` }}>
      <div className="flex-1 flex items-center" style={{ marginLeft: '10%', maxWidth: '500px' }}>
        <div className="bg-white border-2 border-orange-400 rounded-3xl shadow-lg p-6 relative">
          <div className="flex justify-center mb-4">
            <img src={logo} alt="Logo" className="h-10" />
          </div>

          <Link to="/">
            <button className="absolute top-2 right-2 text-xl font-bold text-gray-600 hover:text-orange-500 hover:scale-110 transition duration-300 transform">
              &#x2715;
            </button>
          </Link>

          {/* Display message */}
          {message && <div className="mb-2">{message}</div>}

          <form className="mt-4">
            <div className="mb-2 flex items-center">
              <label className="w-1/3 mb-1 text">Employee Email / Number</label>
              <input
                className="w-2/3 p-2 border-2 rounded-3xl text-sm"
                placeholder="Enter Employee Email / Employee Number"
                type="text"
                value={employeeIdentifier}
                onChange={(e) => setEmployeeIdentifier(e.target.value)}
                readOnly={!isEditable}
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
                      {isNewPasswordVisible ? <FaRegEye /> : <FaEyeSlash />}
                    </button>
                  </div>
                </div>

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
                      {isConfirmPasswordVisible ? <FaRegEye /> : <FaEyeSlash />}
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
