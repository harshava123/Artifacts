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
            className={`sticky top-0 z-50 transition-all duration-500 ease-in-out ${isHeaderVisible ? 'opacity-100' : 'opacity-0'} bg-white bg-opacity-70 backdrop-blur-lg shadow-md`}
        >
            <div className="max-w-4xl max-auto flex justify-between items-center px-4 py-0.5 md:px-6 md:py-1.5"> {/* Reduced padding for height */}
                <Link to="/">
                    <img src={logo} alt="logo" className="w-32.5 h-12 object-contain" /> {/* Reduced logo size */}
                </Link>
 
                
            </div>
        </div>
    );
}
 
export default Header;
 
 