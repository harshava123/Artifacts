import React, { useState, useEffect } from 'react';
import back from '../images/back.jpg'; // Import the background image
import { Link, useLocation } from 'react-router-dom';

function ForgotPassword() {
  const location = useLocation();
  const [employeeIdentifier, setEmployeeIdentifier] = useState('');
  const [message, setMessage] = useState('');
  const [isEmployeeVerified, setIsEmployeeVerified] = useState(false);
  const [isMobileOTPEnabled, setIsMobileOTPEnabled] = useState(false);
  const [isEmailOTPEnabled, setIsEmailOTPEnabled] = useState(false);
  const [isPasswordEnabled, setIsPasswordEnabled] = useState(false);

  useEffect(() => {
    if (location.state && location.state.employeeIdentifier) {
      setEmployeeIdentifier(location.state.employeeIdentifier);
      checkEmployeeExists(location.state.employeeIdentifier);
    }
  }, [location.state]);

  const checkEmployeeExists = async (identifier) => {
    try {
      const response = await fetch('http://localhost:5000/check-employee', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ identifier }),
      });
      const data = await response.json();
      if (data.exists) {
        setMessage('Employee found. Proceed with OTP verification.');
        setIsEmployeeVerified(true); // Enable next step (Mobile OTP)
        setIsMobileOTPEnabled(true);
      } else {
        setMessage('Employee does not exist. Please check the email/number.');
        setIsEmployeeVerified(false); // Reset if not found
        setIsMobileOTPEnabled(false);
      }
    } catch (error) {
      console.error('Error checking employee existence:', error);
      setMessage('Error occurred while checking employee existence.');
      setIsEmployeeVerified(false);
      setIsMobileOTPEnabled(false);
    }
  };

  // Function to simulate unlocking the next step after Mobile OTP is provided
  const verifyMobileOTP = () => {
    // Simulating the mobile OTP verification (Replace this with actual logic)
    setIsEmailOTPEnabled(true);
  };

  // Function to simulate unlocking the next step after Email OTP is provided
  const verifyEmailOTP = () => {
    // Simulating the email OTP verification (Replace this with actual logic)
    setIsPasswordEnabled(true);
  };

  const handleSubmit = () => {
    // Add your submission logic here
    alert('Form submitted!');
  };

  return (
    <div className="h-screen flex bg-cover bg-center" style={{ backgroundImage: `url(${back})` }}>
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center" style={{ marginLeft: '10%', maxWidth: '500px' }}>
        <div className="bg-white border-2 border-orange-400 rounded-xl shadow-lg p-6 relative">
          {/* Close Button */}
          <Link to="/">
            <button className="absolute top-2 right-2 text-xl font-bold text-gray-600 hover:text-gray-800">
              &#x2715;
            </button>
          </Link>

          {/* Form Fields */}
          <form className="mt-8">
            <div className="mb-4 flex items-center">
              <label className="w-1/3 mb-1">Employee Email / Employee Number</label>
              <input
                className="w-2/3 p-2 border rounded"
                placeholder="Enter Employee Email / Employee Number"
                type="text"
                value={employeeIdentifier}
                onChange={(e) => setEmployeeIdentifier(e.target.value)}
                onBlur={() => checkEmployeeExists(employeeIdentifier)}
              />
              <button className=" md:w-48 bg-orange-400 hover:bg-orange-600 text-white font-semibold py-2 rounded-full transition">
                Send OTP
              </button>
            </div>
            {message && (
              <div className={`mb-4 ${message.includes('not exist') ? 'text-red-500' : 'text-green-500'}`}>
                {message}
              </div>
            )}

            {/* Mobile OTP Field */}
            <div className="mb-4 flex items-center">
              <label className="w-1/3 mb-1">Mobile OTP</label>
              <div className="w-2/3 flex items-center">
                <input
                  className="w-3/4 p-2 border rounded"
                  placeholder="Enter OTP"
                  type="number"
                  disabled={!isMobileOTPEnabled}
                  onBlur={verifyMobileOTP} // Simulate OTP verification
                />
                <a href="#" className="text-orange-400 text-sm ml-4">Resend OTP</a>
              </div>
            </div>

            {/* Email OTP Field */}
            <div className="mb-4 flex items-center">
              <label className="w-1/3 mb-1">Email OTP</label>
              <div className="w-2/3 flex items-center">
                <input
                  className="w-3/4 p-2 border rounded"
                  placeholder="Enter OTP"
                  type="number"
                  disabled={!isEmailOTPEnabled}
                  onBlur={verifyEmailOTP} // Simulate OTP verification
                />
                <a href="#" className="text-orange-400 text-sm ml-4">Resend OTP</a>
              </div>
            </div>

            {/* New Password Field */}
            <div className="mb-4 flex items-center">
              <label className="w-1/3 mb-1">New Password</label>
              <input
                className="w-2/3 p-2 border rounded"
                placeholder="Enter Password"
                type="password"
                disabled={!isPasswordEnabled}
              />
            </div>

            {/* Confirm Password Field */}
            <div className="mb-4 flex items-center">
              <label className="w-1/3 mb-1">Confirm Password</label>
              <input
                className="w-2/3 p-2 border rounded"
                placeholder="Re-Enter Password"
                type="password"
                disabled={!isPasswordEnabled}
              />
            </div>

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full p-2 bg-orange-400 text-white rounded hover:bg-orange-500 transition"
              disabled={!isPasswordEnabled} // Only enable if password is enabled
            >
              SUBMIT
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
