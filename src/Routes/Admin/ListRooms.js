import React, { useState, useEffect } from 'react';
import request from '../../Services/ApiService';
import { BaseURL, HttpHeaders, HttpMethods } from '../../Services/Constants';
import useToastify from '../../Hooks/useToastify';
import { ToastContainer } from "react-toastify";
import {deleteRoom, getRooms} from "../../Services/Services";
import {OrbitProgress} from "react-loading-indicators";

function ListRooms() {
    const [rooms, setRooms] = useState([]);
    const [roomName, setRoomName] = useState('');
    const [timezone, setTimezone] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { success, error } = useToastify();

    const fetchRooms = async () => {
        try {
            setIsLoading(true);
            const response = await getRooms();
            setRooms(response);
        } catch (err) {
            console.error('An error occurred while fetching rooms:', err);
            error('Failed to retrieve rooms. Please try again.');
        }
        finally{
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchRooms();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', roomName);
        formData.append('timezone', timezone);

        try {
            const response = await request(HttpMethods.post, HttpHeaders.LuxandHeader, BaseURL.addRoom, formData);
            if (response && response.room) {
                success('Room added successfully!');
                setRoomName('');
                setTimezone('');
                fetchRooms();
            } else {
                error(`Failed to add room: ${response?.message || 'Unknown error'}`);
                console.error('Unexpected API response:', response);
            }
        } catch (err) {
            console.error('An error occurred while adding the room:', err);
            error('Failed to add room. Please try again.');
        }
    };

    const handleDelete = async (uuid) => {
        try {
            const response = await deleteRoom(uuid);
            if (response) {
                success('Room deleted successfully!');
                fetchRooms();
            } else {
                error('Failed to delete room. Please try again.');
                console.error('Unexpected API response:', response);
            }
        } catch (err) {
            console.error('An error occurred while deleting the room:', err);
            error('Failed to delete room. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 py-12 flex justify-center items-center">
            <div className="max-w-6xl w-full bg-white shadow-2xl rounded-xl p-8">
                <h2 className="text-5xl font-bold text-center text-blue-800 mb-10">Room Management</h2>

                {/* Form to Add Room */}
                <div className="flex flex-col md:flex-row items-center mb-12">
                    <div className="w-full md:w-1/2 p-6 bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg rounded-xl md:mr-6 mb-6 md:mb-0">
                        <h3 className="text-3xl font-bold mb-4">Add a New Room</h3>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-lg font-semibold">Room Name</label>
                                <input
                                    type="text"
                                    value={roomName}
                                    onChange={(e) => setRoomName(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 text-black rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                                    placeholder="Enter room name"
                                />
                            </div>
                            <div>
                                <label className="block text-lg font-semibold">Timezone</label>
                                <input
                                    type="text"
                                    value={timezone}
                                    onChange={(e) => setTimezone(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-black focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                                    placeholder="Enter timezone"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full px-6 py-3 bg-white text-blue-800 font-bold rounded-lg shadow-lg hover:bg-gray-100 focus:outline-none transition duration-150"
                            >
                                Add Room
                            </button>
                        </form>
                    </div>

                    <div className="w-full md:w-1/2 p-6 mb-32 bg-gray-100 shadow-lg rounded-xl">
                        <h3 className="text-3xl font-bold text-blue-800 mb-4">Instructions</h3>
                        <ul className="list-disc list-inside text-lg text-gray-700">
                            <li>Ensure the room name is unique and descriptive.</li>
                            <li>Provide a valid timezone to accurately track activities.</li>
                            <li>Click "Add Room" to create the room and add it to the list below.</li>
                        </ul>
                    </div>
                </div>

                {/* Available Rooms Table */}
                {isLoading ? (
                    <div className="flex justify-center">
                        <OrbitProgress color="#3161cc" size="medium" text="Loading" textColor="#0b4ef9" />
                    </div>
                ) : (
                    <div className="bg-white p-6 rounded-lg shadow-xl">
                        <h3 className="text-4xl font-semibold text-center text-blue-800 mb-6">Available Rooms</h3>
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-left bg-white shadow-lg rounded-lg">
                                <thead className="bg-gradient-to-r from-blue-600 to-blue-900 text-white">
                                <tr>
                                    <th className="px-6 py-3 font-semibold">Room ID</th>
                                    <th className="px-6 py-3 font-semibold">Room Name</th>
                                    <th className="px-6 py-3 font-semibold">Timezone</th>
                                    <th className="px-6 py-3 font-semibold">Actions</th>
                                </tr>
                                </thead>
                                <tbody className="text-gray-700">
                                {rooms.length > 0 ? (
                                    rooms.map((room, index) => (
                                        <tr key={index} className="hover:bg-gray-100 transition duration-150">
                                            <td className="px-6 py-4">{index + 1}</td>
                                            <td className="px-6 py-4">{room.name}</td>
                                            <td className="px-6 py-4">{room.timezone}</td>
                                            <td className="px-6 py-4">
                                                <button
                                                    onClick={() => handleDelete(room.uuid)}
                                                    className="px-4 py-2 bg-red-600 text-white font-bold rounded-lg shadow-lg hover:bg-red-700 transition ease-in-out"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="text-center py-6 text-gray-500">
                                            No rooms found in the database.
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
            <ToastContainer />
        </div>
    );

}

export default ListRooms;
