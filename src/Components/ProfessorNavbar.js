import React from 'react';
import {Link} from 'react-router-dom';
import {FaChalkboardTeacher, FaUserGraduate, FaCalendarAlt, FaSignOutAlt, FaBell} from 'react-icons/fa';

function ProfessorNavbar({handleLogout}) {
    return (
        <nav className="bg-gradient-to-r from-blue-900 to-blue-600 text-white shadow-lg fixed w-full z-10">
            <div className=" mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/ProfessorDashboard" className="text-2xl font-bold tracking-wide">
                            <FaChalkboardTeacher className="inline mr-2"/> Professor Dashboard
                        </Link>
                    </div>
                    <div className="flex space-x-4">
                        <Link to="/ViewClasses"
                              className="hover:bg-blue-700 px-3 py-2 rounded-md text-lg font-bold flex items-center">
                            <FaUserGraduate className="mr-2"/> View Classes
                        </Link>
                        <Link to="/ViewPresence"
                              className="hover:bg-blue-700 px-3 py-2 rounded-md text-lg font-bold flex items-center">
                            <FaBell className="mr-2"/> Attendance
                        </Link>
                        <Link to="/schedule"
                              className="hover:bg-blue-700 px-3 py-2 rounded-md text-lg font-bold flex items-center">
                            <FaCalendarAlt className="mr-2"/> Schedule
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="hover:bg-red-700 px-3 py-2 rounded-md text-lg font-bold flex items-center"
                        >
                            <FaSignOutAlt className="mr-2"/> Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default ProfessorNavbar;
