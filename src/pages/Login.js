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
    "Welcome! Let's get started",
    "Hi! Let’s make great things happen.",
    "Hello! Excited to have you!",
    "Hi there! Let’s get you set up and started.",
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
      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Oleo+Script:wght@400;700&display=swap');
        .font-oleo {
          font-family: 'Oleo Script', cursive;
        }

        @keyframes pop {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }

        .pop-text {
          animation: pop 0.5s ease-out;
          opacity: 0;
          animation-fill-mode: forwards;
          transition: opacity 0.5s ease-in-out;
        }

        /* Tooltip styles */
        .tooltip {
position: absolute;
top: 50%; /* Center vertically */
left: calc(100% + 16px) ; /* Position it to the right of the input */
transform: translateY(-50%); /* Adjust to center vertically */
background-color: black; /* Dark background color */
color: #FFFFFF; /* White text color */
padding: px; /* Padding for the tooltip */
border-radius: 4px; /* Rounded corners */
box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Subtle shadow */
font-size: 0.875rem; /* Font size */
z-index: 10; /* Ensure it appears above other elements */
opacity: 0; /* Start hidden */
transition: opacity 0.3s ease-in-out; /* Fade effect */
max-width: 250px; /* Set a max-width for the tooltip */
width: 200px; /* Allow width to be dynamic */
}


        .relative:hover .tooltip {
          opacity: 1; /* Show on hover */
        }
      `}
      </style>

      {/* Left side: Form section */}
      <div className="flex-1 flex flex-col justify-center items-center bg-opacity-80">
        <div className="bg-white bg-opacity-10 p-8 -mt-10 rounded-lg shadow-lg border-2 border-orange-500 w-full max-w-sm">
          <div className="text-center mb-3 flex flex-col items-center">
            <img src={logo} width={200} height={100} alt="logo" className="mb-2 mr-8" />
            <h1
              key={currentMessage}
              className="text-sm text-orange-500 pop-text"
            >
              {messages[currentMessage]}
            </h1>
          </div>
          <form className="w-full">
            <div className="grid gap-6">
              {/* Employee Email / Employee Number Field */}
              <div className="relative mb-4 text-orange-400 ">
                <input
                  type="text"
                  placeholder="Employee Email /Number"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onMouseEnter={() => setHoveredField("email")} // Set hovered field
                  onMouseLeave={() => setHoveredField(null)} // Clear hovered field
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 text-black placeholder-orange-500 opacity-50"
                />
                <div
                  className={`tooltip ${hoveredField === "email" ? "opacity-100" : "opacity-0"
                    }`}
                >
                  {tooltipMessages.email}
                </div>
              </div>

              {/* Password Field */}
              <div className="relative mb-4">
                <input
                  type={isPasswordVisible ? "text" : "password"} // Toggle input type
                  placeholder="Enter Password"
                  onMouseEnter={() => setHoveredField("password")} // Set hovered field
                  onMouseLeave={() => setHoveredField(null)} // Clear hovered field
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 text-black placeholder-orange-500"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility} // Toggle visibility on click
                  className="absolute right-3 top-3 text-gray-500 mt-1"
                >
                  {isPasswordVisible ? <FaRegEye /> : <FaEyeSlash />} {/* Toggle icon */}
                </button>
                <div
                  className={`tooltip ${hoveredField === "password" ? "opacity-100" : "opacity-0"
                    }`}
                >
                  {tooltipMessages.password}
                </div>
              </div>
            </div>

            {/* Remember Me and Forgot Password */}
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

            {/* Submit Button */}
            <div className="flex justify-center">
              <button className="w-full md:w-48 bg-orange-400 hover:bg-orange-600 text-white font-semibold py-2 rounded-full transition">
                SIGN IN
              </button>
            </div>
          </form>

        </div>
      </div>

      {/* Right side: Welcome section */}
      <div className="mt-36 mr-36 text-center">
        <h2 className="text-5xl font-bold mb-4 font-oleo">Welcome</h2>
        <p className="flex flex-col font-bold text-blue-800 text-lg mb-6">
          <span>Hello! Thank you for choosing us.</span>
          <span>Let's get started.</span>
        </p>
        <div className="flex text-black gap-3 justify-center">
          <p className="font-bold">New to Artifacts?</p>
          <Link to="/register">
            <button className="rounded-lg w-32 underline bg-white text-blue-800">
              Create Account?
            </button>
          </Link>
          {/* Copyright Text */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-gray-500 text-sm">
        &copy; www.arthicus.com
      </div>
        </div>
      </div>
    </div>
  );
}
 
export default Login;
