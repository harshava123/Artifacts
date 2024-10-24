import React, { useState, useEffect } from "react";
import back from "../images/back.jpg"; // Background image
import logo from "../images/logo.jpg"; // Logo image
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [currentMessage, setCurrentMessage] = useState(0); // State to track which message is displayed
  const [hoveredField, setHoveredField] = useState(null); // State for hovering
  const navigate = useNavigate();

  const handleForgotPassword = () => {
    navigate('/forgotpassword', { state: { employeeIdentifier: inputValue } });
  };

  const messages = [
    "\"Welcome! Let's get started\"",
    "\"Hi! Let’s make great things happen.\"",
    "\"Hello! Excited to have you!\"",
    "\"Hi there! Let’s get you set up and started.\"",
  ];

  const tooltipMessages = {
    email: "Please enter your employee email or number.",
    password: "Your password must be at least 8 characters.",
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prevMessage) => (prevMessage + 1) % messages.length);
    }, 3000); // Change message every 3 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible); // Toggle the state
  };

  return (
    <div
      className="h-screen flex bg-cover bg-center"
      style={{ backgroundImage: `url(${back})` }}
    >
      {/* Left side: Form section */}
      <div className="flex-1 flex flex-col justify-center items-center bg-opacity-80">
        <div className="relative bg-white bg-opacity-10 p-8 -mt-10 rounded-lg shadow-lg w-full max-w-sm mr-[2px]">
          {/* Corner Borders */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Thicker and lighter orange borders */}
            <div className="absolute top-0 left-0 border-t-2 border-l-4 border-orange-300" style={{ width: '150px', height: '85px' }}></div>
            <div className="absolute top-0 right-0 border-t-2 border-r-4 border-orange-300" style={{ width: '150px', height: '160px' }}></div>
            <div className="absolute bottom-0 left-0 border-b-2 border-l-4 border-orange-300" style={{ width: '95px', height: '95px' }}></div>
            <div className="absolute bottom-0 right-0 border-b-2 border-r-4 border-orange-300" style={{ width: '70px', height: '45px' }}></div>
          </div>


          <div className="text-center mb-3 flex flex-col items-center">
            {/* Increased logo size, moved up by reducing margin-bottom */}
            <img src={logo} width={230} height={120} alt="logo" className="mb-8 mr-8" />

            {/* Animate the message with quotes */}
            <h1
              key={currentMessage}
              className="text-l text-orange-500 animate-pop opacity-100 transition-opacity duration-500 ease-in-out h-10"
            >
              {messages[currentMessage]}
            </h1>
          </div>
          <form className="w-full">
            <div className="grid gap-3"> {/* Reduced gap between input fields from 4 to 3 */}
              {/* Employee Email / Employee Number Field */}
              <div className="relative mb-4 text-orange-400">
                <input
                  type="text"
                  placeholder="Employee Email / Number"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onMouseEnter={() => setHoveredField("email")}
                  onMouseLeave={() => setHoveredField(null)}
                  className="w-full p-3 border-[1.4px] border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 text-black placeholder-orange-500 opacity-60" // Custom black border thickness
                />
                <div
                  className={`absolute top-1/2 left-full ml-4 transform -translate-y-1/2 bg-black text-white text-sm p-2 rounded shadow-lg transition-opacity duration-300 ${hoveredField === "email" ? "opacity-100" : "opacity-0"} w-48 max-w-sm`}
                >
                  {tooltipMessages.email}
                </div>
              </div>

              {/* Password Field */}
              <div className="relative mb-4">
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  placeholder="Enter Password"
                  onMouseEnter={() => setHoveredField("password")}
                  onMouseLeave={() => setHoveredField(null)}
                  className="w-full p-3 border-[1.4px] border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 text-black placeholder-orange-500 opacity-60"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-orange-400 z-10"
                >
                  {isPasswordVisible ? <FaRegEye /> : <FaEyeSlash />}
                </button>
                <div
                  className={`absolute top-1/2 left-full ml-4 transform -translate-y-1/2 bg-black text-white text-sm p-2 rounded shadow-lg transition-opacity duration-300 ${hoveredField === "password" ? "opacity-100" : "opacity-0"} w-48 max-w-sm`}
                >
                  {tooltipMessages.password}
                </div>
              </div>


            </div>

            {/* Remember Me and Forgot Password */}
            <div className="flex justify-between text-sm mb-6">
              <label className="flex items-center text-orange-400 ml-4">
                Remember Me
                <input type="checkbox" className="ml-2" />
              </label>
              <button
                type="button"
                onClick={handleForgotPassword}
                className="hover:underline text-orange-400 mr-4"
              >
                Forgot Password?
              </button>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button className="w-full md:w-60 h-8 bg-orange-400 hover:bg-orange-500 text-white font-medium text-sm rounded-full transition flex items-center justify-center">
                SIGN IN
              </button>
            </div>

          </form>
        </div>
      </div>

      {/* Right side: Welcome section */}
      <div className="mt-32 mr-[42.5px] text-center">
        <h2 className="text-5xl font-bold mb-4 font-oleo">Welcome</h2>
        <p className="flex flex-col font-bold text-blue-800 text-lg mb-6">
          <span className="animate-pulse">Hello! Thank you for choosing us.</span>
          <span className="animate-pulse">Let's get started.</span>
        </p>
        <div className="flex text-black gap-3 justify-center">
          <p className="font-bold">New to Artifacts?</p>
          <Link to="/register">
            <button className="rounded-lg w-32 underline bg-white text-blue-800">
              Create Account?
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;