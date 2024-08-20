import React, { useState, useEffect } from 'react';
import request from '../Services/ApiService';
import { BaseURL, HttpHeaders, HttpMethods } from '../Services/Constants';
import useToastify from '../Hooks/useToastify';
import { listAllRooms } from "../Services/Services";
import { FaUser, FaDoorOpen, FaClipboardList, FaCheckCircle } from 'react-icons/fa';

function AdminDashboard() {
    const [totalPersons, setTotalPersons] = useState(0);
    const [totalRooms, setTotalRooms] = useState(0);
    const [totalCollections, setTotalCollections] = useState(0);
    const [checkInsTotal, setCheckInsTotal] = useState(0);
    const { error } = useToastify();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch total persons
                const personsResponse = await request(HttpMethods.get, HttpHeaders.LuxandHeader, BaseURL.ListAllPersons);
                setTotalPersons(personsResponse.length || 0);

                // Fetch total rooms
                const roomsResponse = await listAllRooms();
                setTotalRooms(roomsResponse.length || 0);


                // Fetch total collections
                const collectionsResponse = await request(HttpMethods.get, HttpHeaders.LuxandHeader, BaseURL.listCollections);
                setTotalCollections(collectionsResponse.length || 0);

                let totalCheckIns = 0;

                for (const room of roomsResponse) {
                    const checkInsResponse = await request(HttpMethods.get, HttpHeaders.LuxandHeader, `${BaseURL.viewPresence}/${room.uuid}/presence`);
                    totalCheckIns += checkInsResponse.presence.length;
                }

                setCheckInsTotal(totalCheckIns);


            } catch (err) {
                console.error('An error occurred while fetching dashboard data:', err);
                error('Failed to load dashboard data. Please try again.');
            }
        };

        fetchData();
    }, []);

    return (
        <div className="min-h-screen flex bg-gradient-to-r from-blue-50 to-gray-100">
            <div className="flex-grow py-10 px-8 ml-64 mx-auto p-8">
                <header className="mb-10">
                    <h2 className="text-4xl font-bold text-gray-800">Welcome, Admin!</h2>
                    <p className="text-lg text-gray-600 mt-2">Here’s what’s happening with your system today.</p>
                </header>

                {/* Dashboard Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="bg-white shadow-xl rounded-lg p-6 transform hover:scale-105 transition-transform">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-800">Total Persons</h3>
                            <FaUser className="text-blue-600 text-2xl" />
                        </div>
                        <p className="text-3xl font-bold text-blue-600 mt-2">{totalPersons}</p>
                        <p className="text-gray-600 mt-1">Registered in the system</p>
                    </div>
                    <div className="bg-white shadow-xl rounded-lg p-6 transform hover:scale-105 transition-transform">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-800">Total Rooms</h3>
                            <FaDoorOpen className="text-blue-600 text-2xl" />
                        </div>
                        <p className="text-3xl font-bold text-blue-600 mt-2">{totalRooms}</p>
                        <p className="text-gray-600 mt-1">Active rooms</p>
                    </div>
                    <div className="bg-white shadow-xl rounded-lg p-6 transform hover:scale-105 transition-transform">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-800">Total Collections</h3>
                            <FaClipboardList className="text-blue-600 text-2xl" />
                        </div>
                        <p className="text-3xl font-bold text-blue-600 mt-2">{totalCollections}</p>
                        <p className="text-gray-600 mt-1">Collections in use</p>
                    </div>
                    <div className="bg-white shadow-xl rounded-lg p-6 transform hover:scale-105 transition-transform">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-800">Check-ins Total</h3>
                            <FaCheckCircle className="text-blue-600 text-2xl" />
                        </div>
                        <p className="text-3xl font-bold text-blue-600 mt-2">{checkInsTotal}</p>
                        <p className="text-gray-600 mt-1">Successful check-ins</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
