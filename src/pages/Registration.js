import React, { useState } from 'react';
import back from '../images/back.jpg'; // Background image
import { Link, useNavigate } from 'react-router-dom';
import logo from "../images/logo.jpg";

function Registration() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        employeeNo: '',
        employeeEmail: '',
        mobileNo: '',
        projectName: ''
    });
    // Function to handle numeric-only input
    const handleNumericInput = (e) => {
        e.target.value = e.target.value.replace(/\D/g, ""); // Replace any non-numeric characters
    };

    const navigate = useNavigate();

    // Handle form field changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Generate random username and password
    // Generate random username and password
    const generateRandomCredentials = () => {
        const { firstName, lastName, employeeNo } = formData;

        // Ensure values are present
        const firstPart = firstName.slice(0, 3).toLowerCase(); // First 3 letters of first name
        const middlePart = employeeNo.toString().slice(0, 2); // First 2 digits of employee number
        const lastPart = lastName.slice(-3).toLowerCase(); // Last 3 letters of last name

        // Define special characters
        const specialCharacters = '!@#$%^&*()_+[]{}|;:,.<>?';

        // Pick a random special character
        const specialChar = specialCharacters.charAt(Math.floor(Math.random() * specialCharacters.length));

        // Combine all parts to form the password
        const password = `${firstPart}${middlePart}${lastPart}${specialChar}`;

        // Generate a random username
        const username = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${Math.floor(Math.random() * 1000)}`;

        return { username, password };
    };


    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { username, password } = generateRandomCredentials();

        // Create a payload to send to the server
        const payload = {
            ...formData,
            username,
            password,
        };

        try {
            const response = await fetch('http://localhost:5000/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                // If the request is successful, redirect to the thank you page
                navigate('/thankyou');
            } else {
                console.error('Error submitting form');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="h-screen flex bg-cover bg-center" style={{ backgroundImage: `url(${back})` }}>
            {/* Left Side - Form */}
            <div className="flex-1 flex items-center" style={{ marginLeft: '10%', maxWidth: '500px' }}>
                <div className="bg-white border-2 border-orange-400 rounded-xl shadow-lg p-3 relative">
                    <img src={logo} width={150} height={100} alt="logo" className="mb-2 ml-20" />
                    <Link to="/">
                        <button className="absolute top-2 right-2 text-xl font-bold text-gray-600 hover:text-orange-500 hover:scale-110 transition duration-300 transform">
                            &#x2715;
                        </button>
                    </Link>

                    {/* Form Fields */}
                    <form className="mt-8" onSubmit={handleSubmit}>
                        {/* First Name Field */}
                        <div className="mb-2 flex items-center relative group">
                            <label className="w-1/3 mb-1">First Name</label>
                            <input
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                className="w-2/3 p-2 border rounded hover:border-orange-400"
                                placeholder="Enter Name"
                                type="text"
                            />
                            <div className="absolute left-full ml-2 w-48 bg-gray-800 text-white text-xs rounded-md p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                Enter your first name.
                            </div>
                        </div>

                        {/* Last Name Field */}
                        <div className="mb-2 flex items-center relative group">
                            <label className="w-1/3 mb-1">Last Name</label>
                            <input
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                className="w-2/3 p-2 border rounded hover:border-orange-400"
                                placeholder="Enter Name"
                                type="text"
                            />
                            <div className="absolute left-full ml-2 w-48 bg-gray-800 text-white text-xs rounded-md p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                Enter your last name.
                            </div>
                        </div>

                        {/* Employee No Field */}
                        <div className="mb-2 flex items-center relative group">
                            <label className="w-1/3 mb-1">Employee No</label>
                            <input
                                className="w-2/3 p-2 border rounded hover:border-orange-400"
                                placeholder="Enter Number"
                                type="text"
                                inputMode="numeric"
                                onInput={handleNumericInput} // Handle numeric-only input
                            />
                            <div className="absolute left-full ml-2 w-48 bg-gray-800 text-white text-xs rounded-md p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                Enter your employee number.
                            </div>
                        </div>

                        {/* Employee Email Field */}
                        <div className="mb-2 flex items-center relative group">
                            <label className="w-1/3 mb-1">Employee Email</label>
                            <input
                                name="employeeEmail"
                                value={formData.employeeEmail}
                                onChange={handleChange}
                                className="w-2/3 p-2 border rounded hover:border-orange-400"
                                placeholder="Enter Email"
                                type="email"
                            />
                            <div className="absolute left-full ml-2 w-48 bg-gray-800 text-white text-xs rounded-md p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                Enter your work email address.
                            </div>
                        </div>

                        {/* Mobile No Field */}
                        <div className="mb-2 flex items-center relative group">
                            <label className="w-1/3 mb-1">Mobile No</label>
                            <input
                                name="mobileNo"
                                value={formData.mobileNo}
                                onChange={handleChange}
                                className="w-2/3 p-2 border rounded hover:border-orange-400"
                                placeholder="Enter Number"
                                type="tel"
                                inputMode="numeric"
                                onInput={handleNumericInput}
                            // Handle numeric-only input
                            />
                            <div className="absolute left-full ml-2 w-48 bg-gray-800 text-white text-xs rounded-md p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                Enter your mobile number.
                            </div>
                        </div>

                        {/* Project Name Field */}
                        <div className="mb-2 flex items-center relative group">
                            <label className="w-1/3 mb-1">Project Name</label>
                            <input
                                name="projectName"
                                value={formData.projectName}
                                onChange={handleChange}
                                className="w-2/3 p-2 border rounded hover:border-orange-400"
                                placeholder="Enter Project Name"
                                type="text"
                            />
                            <div className="absolute left-full ml-2 w-48 bg-gray-800 text-white text-xs rounded-md p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                Enter the project name you are working on.
                            </div>
                        </div>

                        {/* Create Button */}
                        <div className="mb-2">
                            <button type="submit" className="w-48 p-1 bg-orange-400 text-white rounded hover:bg-orange-500 transition ml-36">
                                CREATE
                            </button>
                        </div>

                        {/* Mobile OTP Field */}
                        <div className="mb-2 flex items-center relative group">
                            <label className="w-1/3 mb-1">Mobile OTP</label>
                            <div className="w-2/3 flex items-center">
                                <input
                                    className="w-3/4 p-2 border rounded hover:border-orange-400"
                                    placeholder="Enter OTP"
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={6}
                                />
                                <a href="#" className="text-orange-400 text-sm ml-4 group-hover:underline">Resend OTP</a>
                            </div>
                            <div className="absolute left-full ml-2 w-48 bg-gray-800 text-white text-xs rounded-md p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                Enter the 6-digit OTP sent to your mobile.
                            </div>
                        </div>

                        {/* Email OTP Field */}
                        <div className="mb-2 flex items-center relative group">
                            <label className="w-1/3 mb-1">Email OTP</label>
                            <div className="w-2/3 flex items-center">
                                <input
                                    className="w-3/4 p-2 border rounded hover:border-orange-400"
                                    placeholder="Enter OTP"
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={6}
                                />
                                <a href="#" className="text-orange-400 text-sm ml-4 group-hover:underline">Resend OTP</a>
                            </div>
                            <div className="absolute left-full ml-2 w-48 bg-gray-800 text-white text-xs rounded-md p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                Enter the 6-digit OTP sent to your email.
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="mb-2">
                            <Link to="/thankyou">
                                <button className="w-48 p-1 bg-orange-400 text-white rounded hover:bg-orange-500 transition ml-36">SUBMIT</button>
                            </Link>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
}

export default Registration;
