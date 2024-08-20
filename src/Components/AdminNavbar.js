import React from 'react';
import { Link } from 'react-router-dom';

function AdminNavbar({ handleLogout }) {

    return (
        <div className="h-screen w-64 bg-blue-800 text-white flex flex-col shadow-lg fixed">
            <div className="flex items-center justify-center h-20 bg-blue-900 border-b border-blue-700">
                <Link to="/Dashboard" className="text-2xl font-bold tracking-wide">Admin Dashboard</Link>
            </div>
            <div className="flex flex-col mt-12 space-y-2">
                <Link to="/Dashboard" className="px-6 py-3 hover:bg-blue-700 transition-colors duration-300 flex items-center">
                    <span className="ml-2">Dashboard</span>
                </Link>
                <Link to="/EnrollStudent" className="px-6 py-3 hover:bg-blue-700 transition-colors duration-300 flex items-center">
                    <span className="ml-2">Enroll Student</span>
                </Link>

                <Link to="/RetrieveAllStudents" className="px-6 py-3 hover:bg-blue-700 transition-colors duration-300 flex items-center">
                    <span className="ml-2">List All Students</span>
                </Link>
                <Link to="/ListRooms" className="px-6 py-3 hover:bg-blue-700 transition-colors duration-300 flex items-center">
                    <span className="ml-2">List Rooms</span>
                </Link>
            </div>
            <div className="mt-auto mb-6">
                <button
                    onClick={handleLogout}
                    className="w-full hover:bg-red-700 transition-colors duration-300 text-white px-6 py-3 rounded-lg flex items-center justify-center"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}

export default AdminNavbar;
