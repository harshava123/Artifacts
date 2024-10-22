import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from "../../images/logo.jpg";
// import { MdWbSunny, MdNightsStay } from 'react-icons/md'; // Using Material Design icons
 
function Header() {
    const [darkMode, setDarkMode] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);
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
           // Use sticky to make the header sticky
        >
            <div className="flex justify-between mr-10 py-2">
                <Link to="/home">
                    <img src={logo} alt="logo" width={200} height={100} />
                </Link>
 
                {/* <button
                    onClick={toggleDarkMode}
                    className="flex text-2xl p-2 focus:outline-none justify-end"
                >
                    {darkMode ? (
                        <MdWbSunny className="text-yellow-400 transform transition-transform duration-300" style={{transform: 'rotate(180deg)'}} />
                    ) : (
                        <MdNightsStay className="text-gray-900 transform transition-transform duration-300" />
                    )}
                </button> */}
            </div>
            <hr className="absolute inset-0 h-1 bg-gray-50 shadow-black shadow-lg" />
        </div>
    );
}
 
export default Header;