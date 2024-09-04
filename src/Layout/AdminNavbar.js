import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserGraduate, FaList, FaPlus, FaChalkboardTeacher, FaUserPlus, FaSignOutAlt } from 'react-icons/fa';
import { ImUserPlus } from "react-icons/im";
import {IoPersonRemoveSharp} from "react-icons/io5";

function AdminNavbar({ handleLogout }) {
    return (
        <div className="h-screen w-64 bg-yale text-white flex flex-col fixed">
            <div className="flex items-center justify-center h-20 bg-blue-900 border-b border-blue-700">
                <Link to="/Dashboard" className="text-2xl font-bold tracking-wide">
                    Admin Dashboard
                </Link>
            </div>
            <div className="flex flex-col  space-y-2">
                <Link to="/Dashboard" className="flex items-center px-6 py-3 text-lg hover:bg-blue-700 transition-colors duration-300">
                    <FaChalkboardTeacher className="text-xl" />
                    <span className="ml-4">Dashboard</span>
                </Link>
                <Link to="/EnrollStudent" className="flex items-center px-6 py-3 text-lg hover:bg-blue-700 transition-colors duration-300">
                    <FaUserPlus  className="text-xl" />
                    <span className="ml-4">Register New Student</span>
                </Link>
                <Link to="/RetrieveAllStudents" className="flex items-center px-6 py-3 text-lg hover:bg-blue-700 transition-colors duration-300">
                    <FaList className="text-xl" />
                    <span className="ml-4">List All Students</span>
                </Link>
                <Link to="/CreateCollection" className="flex items-center px-6 py-3 text-lg hover:bg-blue-700 transition-colors duration-300">
                    <FaPlus className="text-xl" />
                    <span className="ml-4">Manage Collection</span>
                </Link>
                <Link to="/AddStudentToCollection" className="flex items-center px-6 py-3 text-lg hover:bg-blue-700 transition-colors duration-300">
                    <FaUserGraduate className="text-xl" />
                    <span className="ml-4">Add Student to Course</span>
                </Link>
                <Link to="/RemoveStudentFromCollection" className="flex items-center px-6 py-3 text-lg hover:bg-blue-700 transition-colors duration-300">
                    <IoPersonRemoveSharp  className="text-2xl" />
                    <span className="ml-4">Remove Student From Course</span>
                </Link>
                <Link to="/ListRooms" className="flex items-center px-6 py-3 text-lg hover:bg-blue-700 transition-colors duration-300">
                    <FaChalkboardTeacher className="text-xl" />
                    <span className="ml-4">List Rooms</span>
                </Link>
                <Link to="/RegisterUser" className="flex items-center px-6 py-3 text-lg hover:bg-blue-700 transition-colors duration-300">
                    <ImUserPlus className="text-xl" />
                    <span className="ml-4">Register User</span>
                </Link>
            </div>
            <div className="mt-auto mb-6">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center px-6 py-3 text-lg bg-red-600 hover:bg-red-700 transition-colors duration-300"
                >
                    <FaSignOutAlt className="text-xl" />
                    <span className="ml-4">Logout</span>
                </button>
            </div>
        </div>
    );
}

export default AdminNavbar;