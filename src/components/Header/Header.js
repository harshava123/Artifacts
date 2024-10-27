import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from "../../images/logo.jpg";
import { MdWbSunny, MdNightsStay } from 'react-icons/md'; // Using Material Design icons

function Header() {
    const [darkMode, setDarkMode] = useState(false);
    const [isHeaderVisible, setIsHeaderVisible] = useState(true);

    // Toggle dark mode
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        if (!darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    useEffect(() => {
        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDarkMode) {
            setDarkMode(true);
            document.documentElement.classList.add('dark');
        }
    }, []);

    // Handle scroll to hide and show the header
    useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            if (window.scrollY > lastScrollY) {
                // Scrolling down
                setIsHeaderVisible(false);
            } else {
                // Scrolling up
                setIsHeaderVisible(true);
            }
            lastScrollY = window.scrollY;
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div
            className={`fixed top-0 z-50 w-full transition-all duration-500 ease-in-out ${isHeaderVisible ? 'opacity-100' : 'opacity-0'} bg-white bg-opacity-50 backdrop-blur-lg shadow-md`}
        >
            <div className="max-w-full mx-auto flex items-center px-4 py-2 md:px-6 md:py-3 ">
                <Link to="/" className="flex items-center w-80 ">
                    <img src={logo} alt="logo" className="w-32 h-12 object-contain" />
                </Link>
                {/* Dark Mode Toggle Button */}
                {/* <button onClick={toggleDarkMode} className="ml-auto">
                    {darkMode ? <MdNightsStay /> : <MdWbSunny />}
                </button> */}
            </div>
        </div>
    );
}

export default Header;
