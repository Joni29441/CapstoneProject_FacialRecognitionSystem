import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {FaHome, FaCalendarAlt, FaSignOutAlt, FaBars, FaTimes, FaBell} from 'react-icons/fa';

const StudentNavbar = ({ handleLogout }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-blue-800 text-white shadow-lg">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <div className="flex items-center">
                    <img src='/photos/SEEU.png' alt="SEEU Logo" className="h-11" />
                </div>
                <div className="md:hidden" onClick={toggleMenu}>
                    {isOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
                </div>
                <div className={`w-full md:flex md:items-center md:w-auto ${isOpen ? 'block' : 'hidden'}`}>
                    <ul className="md:flex md:space-x-6">
                        <li>
                            <Link to="/StudentDashboard" className="block px-3 py-2 rounded-md text-white hover:bg-blue-700 transition duration-300">
                                <FaHome className="inline mr-2" />Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link to="/Attendance" className="block px-3 py-2 rounded-md text-white hover:bg-blue-700 transition duration-300">
                                <FaBell className="inline mr-2" /> Attendance
                            </Link>
                        </li>
                        <li>
                            <Link to="/Classes" className="block px-3 py-2 rounded-md text-white hover:bg-blue-700 transition duration-300">
                                <FaCalendarAlt className="inline mr-2" /> Classes
                            </Link>
                        </li>
                        <li>
                            <button
                                onClick={handleLogout}
                                className="block w-full text-left px-3 py-2 rounded-md text-white hover:bg-red-700 transition duration-300"
                            >
                                <FaSignOutAlt className="inline mr-2" /> Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default StudentNavbar;
