import React from 'react';
import { Link } from 'react-router-dom';

function AdminNavbar() {
    const handleLogout = () => {
        // Clear user-related data
        localStorage.removeItem('authToken');
        localStorage.removeItem('roles');

    };

    return (
        <div className="h-screen w-60 bg-blue-900 text-white flex flex-col shadow-lg fixed">
            <div className="flex items-center justify-center h-16 bg-blue-900 ">
                <Link to="/admin-dashboard" className="text-2xl font-bold tracking-wide">Admin Dashboard</Link>
            </div>
            <div className="flex flex-col mt-10">
                <Link to="/EnrollStudent" className="px-6 py-3 hover:bg-blue-600 transition-colors duration-200">
                    Enroll Student
                </Link>
                <Link to="/retrieve-person" className="px-6 py-3 hover:bg-blue-600 transition-colors duration-200">
                    Retrieve Student Details
                </Link>
                <Link to="/RetrieveAllStudents" className="px-6 py-3 hover:bg-blue-600 transition-colors duration-200">
                    List All Students
                </Link>
                <Link to="/ListRooms" className="px-6 py-3 hover:bg-blue-600 transition-colors duration-200">
                    List Rooms
                </Link>

            </div>
            <button
                onClick={handleLogout}
                className="w-full text-left text-white hover:bg-red-700 px-4 py-2 rounded"
            >
                Logout
            </button>
        </div>
    );
}

export default AdminNavbar;
