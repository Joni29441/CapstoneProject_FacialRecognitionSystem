import React, {useState, useEffect} from "react";
import {FaChalkboardTeacher, FaUser} from 'react-icons/fa';
import {listAllPersons, listAllRooms} from "../../Services/Services";
import useToastify from "../../Hooks/useToastify";
import {ToastContainer} from "react-toastify";

function ProfessorDashboard() {
    const [rooms, setRooms] = useState([]);
    const [students, setStudents] = useState([]);
    const { error } = useToastify();

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const roomsResponse = await listAllRooms();
                setRooms(roomsResponse);

                const listofStudents = await listAllPersons();
                setStudents(listofStudents)

            } catch (err) {
                console.error('An error occurred while fetching rooms:', err);
                error('Failed to load rooms. Please try again.');
            }
        };

        fetchRooms();
    }, []);

    const displayName = JSON.parse(localStorage.getItem('email'));

    return (
        <div className="min-h-screen flex bg-gradient-to-r from-blue-50 to-gray-100">
            <div className="flex-grow py-28 px-8 mx-auto">
                <header className="mb-8">
                    <h2 className="text-4xl font-semibold text-center text-gray-800 mb-4">Welcome, {displayName}</h2>
                    <p className="text-lg text-gray-600">Here’s an overview of your teaching activities.</p>
                </header>

                {/* Dashboard Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    <div className="bg-white shadow-xl rounded-lg p-6 transform hover:scale-105 transition-transform">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-800">Total Rooms</h3>
                            <FaChalkboardTeacher className="text-blue-600 text-2xl"/>
                        </div>
                        <p className="text-3xl font-bold text-blue-600 mt-2">{rooms.length}</p>
                        <p className="text-gray-600 mt-1">Active rooms</p>
                    </div>
                    <div className="bg-white shadow-xl rounded-lg p-6 transform hover:scale-105 transition-transform">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-800">Total Students</h3>
                            <FaUser className="text-blue-600 text-2xl"/>
                        </div>
                        <p className="text-3xl font-bold text-blue-600 mt-2">{students.length}</p>
                        <p className="text-gray-600 mt-1">Total Students Enrolled</p>
                    </div>
                </div>

            </div>
            <ToastContainer/>
        </div>
    );
}

export default ProfessorDashboard;
