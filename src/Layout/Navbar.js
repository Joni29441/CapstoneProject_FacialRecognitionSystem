import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import {FaBars, FaCheckCircle, FaClock, FaHome, FaSignInAlt, FaTimes} from 'react-icons/fa';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);


    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-gradient-to-r from-blue-800 to-blue-900 shadow-lg">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <Link to="/" className="text-white text-2xl font-bold tracking-wide">
                        Homepage
                    </Link>
                </div>
                <div className="md:hidden" onClick={toggleMenu}>
                    {isOpen ? (
                        <FaTimes className="text-white text-2xl"/>
                    ) : (
                        <FaBars className="text-white text-2xl"/>
                    )}
                </div>
                <div
                    className={`fixed inset-0 bg-white bg-opacity-90 z-20 md:bg-transparent md:static md:z-auto flex flex-col md:flex-row md:space-x-8 items-center justify-center md:justify-end ${isOpen ? 'flex' : 'hidden'} md:flex`}>
                    <Link to="/Homepage"
                          className="flex items-center space-x-2 text-white text-lg px-4 py-2 hover:text-blue-300 transition duration-300">
                        <FaHome className="text-xl"/>
                        <span>Home</span>
                    </Link>
                    <Link to="/CheckIn"
                          className="flex items-center space-x-2 text-white text-lg px-4 py-2 hover:text-blue-300 transition duration-300">
                        <FaCheckCircle className="text-xl"/>
                        <span>Check In</span>
                    </Link>
                    <Link to="/Login"
                          className="flex items-center space-x-2 text-white text-lg px-4 py-2 hover:text-blue-300 transition duration-300">
                        <FaSignInAlt className="text-xl"/>
                        <span>Login</span>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
