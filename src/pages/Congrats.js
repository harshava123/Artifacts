import React from 'react';
import back from '../images/back.jpg'; // Background image
import logo from '../images/logo.jpg'; // Logo image
 
function Congrats() {
  return (
    <div
      className="h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${back})` }} // Correctly using template literals
    >
     
 
      {/* Centered box for Congrats message */}
      <div className="flex items-center justify-center h-full">
        <div className="bg-white bg-opacity-30 p-8 rounded-lg shadow-lg flex flex-col items-center border-2 border-orange-400">
          {/* Congrats Message */}
          <h2 className="text-2xl font-bold text-gray-800">Congratulations!</h2>
          <h1 className="text-center mt-4">
            Your New password has been successfully created.
            </h1>
            <h1>
          {/* Optional button or link to go back to the login page */}
          <a href="/" className=" mt-6 text-blue-500 hover:underline">
            Click here
          </a>
          {''} to go to the login page
          </h1>
        </div>
      </div>
    </div>
  );
}
 
export default Congrats;