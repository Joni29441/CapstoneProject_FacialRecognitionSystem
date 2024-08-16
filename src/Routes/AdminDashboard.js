import React from 'react';

function AdminDashboard() {
    return (
        <div className="min-h-screen flex bg-gray-100">
            {/* Sidebar */}
            <div className="w-64  text-white flex flex-col">

                <nav className="flex-grow px-4 py-6">
                    <ul className="space-y-4">
                        <li>
                            <a href="/enroll-person" className="block py-2 px-4 rounded-lg hover:bg-blue-800">Enroll Person</a>
                        </li>
                        <li>
                            <a href="/retrieve-person" className="block py-2 px-4 rounded-lg hover:bg-blue-800">Retrieve Person Details</a>
                        </li>
                        <li>
                            <a href="/delete-person" className="block py-2 px-4 rounded-lg hover:bg-blue-800">Delete Person</a>
                        </li>
                        <li>
                            <a href="/list-persons" className="block py-2 px-4 rounded-lg hover:bg-blue-800">List Persons</a>
                        </li>
                        <li>
                            <a href="/create-collection" className="block py-2 px-4 rounded-lg hover:bg-blue-800">Create Collection</a>
                        </li>
                        <li>
                            <a href="/list-collections" className="block py-2 px-4 rounded-lg hover:bg-blue-800">List Collections</a>
                        </li>
                        <li>
                            <a href="/add-room" className="block py-2 px-4 rounded-lg hover:bg-blue-800">Add Room</a>
                        </li>
                        <li>
                            <a href="/list-rooms" className="block py-2 px-4 rounded-lg hover:bg-blue-800">List Rooms</a>
                        </li>
                    </ul>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-grow p-8">
                <header className="mb-8">
                    <h2 className="text-3xl font-semibold text-gray-800">Welcome, Admin!</h2>
                    <p className="text-gray-600">Here’s what’s happening with your system today.</p>
                </header>

                {/* Dashboard Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-800">Total Persons</h3>
                        <p className="text-2xl font-bold text-blue-600">128</p>
                        <p className="text-gray-600">Registered in the system</p>
                    </div>
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-800">Total Rooms</h3>
                        <p className="text-2xl font-bold text-blue-600">24</p>
                        <p className="text-gray-600">Active rooms</p>
                    </div>
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-800">Total Collections</h3>
                        <p className="text-2xl font-bold text-blue-600">12</p>
                        <p className="text-gray-600">Collections in use</p>
                    </div>
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-800">Check-ins Today</h3>
                        <p className="text-2xl font-bold text-blue-600">56</p>
                        <p className="text-gray-600">Successful check-ins</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
