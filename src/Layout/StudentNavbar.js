import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {FaHome, FaCalendarAlt, FaSignOutAlt, FaBars, FaTimes, FaBell} from 'react-icons/fa';
import {CgProfile} from "react-icons/cg";

const StudentNavbar = ({ handleLogout }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-blue-800 text-white shadow-lg">
            <div className=" ml-2 py-4 flex justify-between ">
                <div className="flex">
                    <img src='/photos/SEEU.png' alt="SEEU Logo" className="h-12 " />
                </div>
                <div className="md:hidden" onClick={toggleMenu}>
                    {isOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
                </div>
                <div className={`w-full  md:flex md:items-center text-xl md:w-auto ${isOpen ? 'block' : 'hidden'}`}>
                    <ul className="md:flex md:space-x-6">
                        <li>
                            <Link to="/StudentDashboard" className="block px-3 py-2 rounded-md text-white hover:bg-blue-700 transition duration-300">
                                <FaHome className="inline mr-2" />Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link to="/Attendance" className="block px-3 py-2 rounded-md text-white hover:bg-blue-700 transition duration-300">
                                <FaBell className="inline mr-2" />Attendance
                            </Link>
                        </li>
                        <li>
                            <Link to="/Classes" className="block px-3 py-2 rounded-md text-white hover:bg-blue-700 transition duration-300">
                                <FaCalendarAlt className="inline mr-2" />Classes
                            </Link>
                        </li>
                        <li>
                            <Link to="/Profile" className="block px-3 py-2 rounded-md text-white hover:bg-blue-700 transition duration-300">
                                <CgProfile  className="inline mr-2 text-2xl" />Profile
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
