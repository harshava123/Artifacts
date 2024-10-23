import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import back from "../images/back.jpg"; // Background image
import logo from "../images/logo.jpg"; // Logo image
import { FaCheckCircle } from "react-icons/fa"; // You can use React Icons for the tick mark
 
function Thankyou() {
  return (
    <div
      className="h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${back})` }} // Correctly using template literals
    >
      {/* Logo in the top left corner */}
      <div className="absolute top-0 left-0 m-4">
        {/* <img src={logo} width={200} height={100} alt="logo" /> */}
      </div>
 
      {/* Centered box with green tick mark and Thanks message */}
      <div className="flex items-center justify-center h-full">
        <div className="relative bg-white bg-opacity-30 p-8 rounded-lg shadow-lg flex flex-col items-center border-2 border-orange-400">
          {/* Green Tick Icon positioned at the top center with blinking effect */}
          <FaCheckCircle className="text-green-500 text-6xl absolute top-[-30px] left-1/2 transform -translate-x-1/2 animate-blink" />
 
          {/* Thanks Message */}
          <h2 className="text-2xl font-bold text-gray-800">Thank You</h2>
          <h1 className="mt-4 text-center text-gray-800">
            Your account was submitted and is waiting for approval.
          </h1>
          <h1 className="text-center text-gray-800">
            Once approved, you will receive a message on your registered email
            or mobile.
          </h1>
 
          {/* Hyperlink button to go to the Congrats page */}
          <h1 className="mt-6 text-gray-800">
           
            <Link to="/" className="text-blue-500 hover:underline">
              Click here
            </Link>{" "}
            to go to the login page.
          </h1>
        </div>
      </div>
    </div>
  );
}
 
export default Thankyou;