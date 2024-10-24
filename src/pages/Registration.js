import React, { useState } from 'react';
import back from '../images/back.jpg'; // Background image
import { Link, useNavigate } from 'react-router-dom';
import logo from "../images/logo.jpg";
import indiaFlag from '../images/india.jpg';
import usaFlag from '../images/afghanisthan.jpg';

// Country codes with flags
const countryCodes = [
    { code: '+91', name: 'India', flag: indiaFlag },
    { code: '+1', name: 'USA', flag: usaFlag },
    // Add other countries here
];

function Registration() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        employeeNo: '',
        employeeEmail: '',
        mobileNo: '',
        projectName: '',
        projectNameInput: '' // State for 'Others' project name input
    });

    const [emailError, setEmailError] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [otpVisible, setOtpVisible] = useState(false); // State to manage OTP fields visibility
    const [selectedCountryCode, setSelectedCountryCode] = useState(countryCodes[0].code); // Default to first country code

    const navigate = useNavigate();

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;

        // Validate email if it's the email field
        if (name === 'employeeEmail') {
            const valid = /^[a-zA-Z0-9._%+-]+@artihcus\.com$/.test(value);
            setIsEmailValid(valid);
            setEmailError(valid ? '' : 'Email must end with @artihcus.com');
        }

        if (name === 'mobileNo') {
            const mobileValue = value.replace(/\D/g, ''); // Keep only digits
            if (mobileValue.length <= 10) {
                setFormData({ ...formData, [name]: mobileValue });
            }
            return;
        }

        setFormData({ ...formData, [name]: value });
    };

    // Generate random username and password
    const generateRandomCredentials = () => {
        const { firstName, lastName, employeeNo } = formData;

        const firstPart = firstName.slice(0, 3).toLowerCase();
        const middlePart = employeeNo.toString().slice(0, 2);
        const lastPart = lastName.slice(-3).toLowerCase();

        const specialCharacters = '!@#$%^&*()_+[]{}|;:,.<>?';
        const specialChar = specialCharacters.charAt(Math.floor(Math.random() * specialCharacters.length));

        const password = `${firstPart}${middlePart}${lastPart}${specialChar}`;
        const username = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${Math.floor(Math.random() * 1000)}`;

        return { username, password };
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { username, password } = generateRandomCredentials();

        const payload = {
            ...formData,
            username,
            password,
        };

        if (!isEmailValid) {
            return; // Prevent submission if email is invalid
        }

        try {
            const response = await fetch('http://localhost:5000/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                setOtpVisible(true); // Show OTP fields after successful registration
            } else {
                console.error('Error submitting form');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="h-screen flex bg-cover bg-center" style={{ backgroundImage: `url(${back})` }}>
            <div className="flex-1 flex items-center" style={{ marginLeft: '20%', maxWidth: '500px' }}>
                <div className="bg-white border-2 border-orange-400 rounded-xl shadow-lg p-3 relative">
                    <img src={logo} width={150} height={100} alt="logo" className="mb-2 ml-36" />
                    <Link to="/">
                        <button className="absolute top-2 right-2 text-xl font-bold text-gray-600 hover:text-orange-500 hover:scale-110 transition duration-300 transform">
                            &#x2715;
                        </button>
                    </Link>

                    <form className="mt-8" onSubmit={handleSubmit}>
                        <div className="mb-2 flex items-center relative group">
                            <label className="w-1/3 mb-1">First Name</label>
                            <input
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                className="p-2 border rounded-full hover:border-orange-400 transition duration-300 w-2/3"
                                placeholder="Enter First Name"
                                required
                            />
                        </div>

                        <div className="mb-2 flex items-center relative group">
                            <label className="w-1/3 mb-1">Last Name</label>
                            <input
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                className="p-2 border rounded-full hover:border-orange-400 transition duration-300 w-2/3"
                                placeholder="Enter Last Name"
                                required
                            />
                        </div>

                        {/* Updated Employee No Input */}
                        <div className="mb-2 flex items-center relative group">
                            <label className="w-1/3 mb-1">Employee No</label>
                            <input
                                name="employeeNo"
                                type="text" // Changed to text
                                value={formData.employeeNo}
                                onChange={handleChange}
                                className="p-2 border rounded-full hover:border-orange-400 transition duration-300 w-2/3"
                                placeholder="Enter Employee No"
                                required
                                inputMode="numeric" // Ensures numeric keyboard on mobile devices
                                pattern="\d*" // Restrict input to digits only
                            />
                        </div>

                        <div className="mb-2 flex items-center relative group">
                            <label className="w-1/3 mb-1">Employee Email</label>
                            <input
                                name="employeeEmail"
                                type="email"
                                value={formData.employeeEmail}
                                onChange={handleChange}
                                className={`p-2 border rounded-full hover:border-orange-400 transition duration-300 w-2/3 ${isEmailValid ? '' : 'border-red-500'}`}
                                placeholder="Enter Employee Email"
                                required
                            />
                            {!isEmailValid && <span className="text-red-500 text-sm">{emailError}</span>}
                        </div>

                        {/* Mobile No Field */}
                        <div className="mb-2 flex items-center relative group">
                            <label className="w-1/3 mb-1">Mobile No</label>
                            <div className="w-2/3 flex items-center space-x-2">
                                <select
                                    className="p-2 border rounded-full hover:border-orange-400 transition duration-300"
                                    value={selectedCountryCode}
                                    onChange={(e) => setSelectedCountryCode(e.target.value)}
                                >
                                    {countryCodes.map((country) => (
                                        <option key={country.code} value={country.code}>
                                            {country.name} ({country.code})
                                        </option>
                                    ))}
                                </select>
                                <input
                                    name="mobileNo"
                                    type="text"
                                    value={formData.mobileNo}
                                    onChange={handleChange}
                                    className="p-2 border rounded-full hover:border-orange-400 transition duration-300 flex-1 w-full"
                                    placeholder="Enter Mobile No"
                                    maxLength={10}
                                    required
                                />
                            </div>
                        </div>


                        {/* Project Name Dropdown or Input */}
                        <div className="mb-2 flex items-center relative group">
                            <label className="w-1/3 mb-1">Project Name</label>

                            {/* Conditionally show either dropdown or input based on selection */}
                            {formData.projectName === 'Others' ? (
                                // Render the input field if "Others" is selected
                                <input
                                    name="projectName"
                                    value={formData.projectNameInput}  // Store custom project name
                                    onChange={(e) => setFormData({ ...formData, projectNameInput: e.target.value })}
                                    className="p-2 border rounded-full hover:border-orange-400 transition duration-300 w-2/3"
                                    placeholder="Enter Custom Project Name"
                                    required
                                />
                            ) : (
                                // Render the dropdown for predefined project options
                                <select
                                    name="projectName"
                                    value={formData.projectName}
                                    onChange={(e) => {
                                        // If "Others" is selected, switch to input mode
                                        if (e.target.value === 'Others') {
                                            setFormData({ ...formData, projectName: e.target.value, projectNameInput: '' });
                                        } else {
                                            // Store the selected project name
                                            setFormData({ ...formData, projectName: e.target.value, projectNameInput: '' });
                                        }
                                    }}
                                    className="p-2 border rounded-full hover:border-orange-400 transition duration-300 w-2/3"
                                >
                                    <option value="">Select Project</option>
                                    <option value="Daikin">Daikin</option>
                                    <option value="Somany">Somany</option>
                                    <option value="VMM">VMM</option>
                                    <option value="Others">Others</option>
                                </select>
                            )}
                        </div>


                        {/* Create Button */}
                        <div className='mb-2 flex items-center justify-center'>
                            <button
                                type="submit"
                                className="bg-orange-400 text-white rounded-full px-6 py-2 hover:bg-orange-500 transition duration-300 ml-60"
                            >
                                CREATE
                            </button>
                        </div>

                        {/* OTP Fields */}
                        {otpVisible && ( // Conditionally render OTP fields 
                            <>
                                {/* Mobile OTP Field */}
                                <div className="mb-2 flex items-center relative group">
                                    <label className="w-1/3 mb-1">Mobile OTP</label>
                                    <div className="w-2/3 flex flex-col">
                                        <input
                                            className="p-2 border rounded-full hover:border-orange-400 transition duration-300"
                                            placeholder="Enter OTP"
                                            type="text"
                                            inputMode="numeric"
                                            maxLength={6}
                                        />
                                        <a href="#" className="text-orange-400 text-sm mt-1 text-right group-hover:underline">Resend OTP</a>
                                    </div>
                                    <div className="absolute left-full ml-2 w-48 bg-gray-800 text-white text-xs rounded-md p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        Enter the OTP sent to your mobile number.
                                    </div>
                                </div>

                                {/* Email OTP Field */}
                                <div className="mb-2 flex items-center relative group">
                                    <label className="w-1/3 mb-1">Email OTP</label>
                                    <div className="w-2/3 flex flex-col">
                                        <input
                                            className="p-2 border rounded-full hover:border-orange-400 transition duration-300"
                                            placeholder="Enter OTP"
                                            type="text"
                                            inputMode="numeric"
                                            maxLength={6}
                                        />
                                        <a href="#" className="text-orange-400 text-sm mt-1 text-right group-hover:underline">Resend OTP</a>
                                    </div>
                                    <div className="absolute left-full ml-2 w-48 bg-gray-800 text-white text-xs rounded-md p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        Enter the OTP sent to your email.
                                    </div>
                                </div>

                                
                                    <div className="mb-4 flex justify-center">
                                        {/* Submit Button for OTP */}
                                        <button
                                            type="button"
                                            className="md:w-32 bg-orange-400 hover:bg-orange-600 text-white font-semibold py-2 rounded-full transition ml-10"
                                        >
                                            SUBMIT
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

export default Registration;
