import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AdminNavbar = ({ onLogout }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        onLogout();
        navigate('/Login');
    };

    return (
        <nav className="bg-gray-800 p-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Link to="/admin/dashboard" className="text-white">Dashboard</Link>
                    <Link to="/admin/users" className="text-white">Users</Link>
                    <Link to="/admin/settings" className="text-white">Settings</Link>
                </div>
                <button onClick={handleLogout} className="text-white">Logout</button>
            </div>
        </nav>
    );
};

export default AdminNavbar;
