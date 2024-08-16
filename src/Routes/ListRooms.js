import React, { useState, useEffect } from 'react';
import request from '../Services/ApiService';
import { BaseURL, HttpHeaders, HttpMethods } from '../Services/Constants';
import useToastify from '../Hooks/useToastify';
import { ToastContainer } from 'react-toastify';
import { listAllRooms } from '../Services/Services';

function ListRooms() {
    const [rooms, setRooms] = useState([]);
    const [name, setName] = useState(''); // For adding a room
    const [timezone, setTimezone] = useState(null); // For adding a room
    const { success, error } = useToastify();

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await listAllRooms();
                setRooms(response);
                success('Rooms retrieved successfully');
            } catch (err) {
                console.error('An error occurred while fetching rooms:', err);
                error('Failed to retrieve rooms. Please try again.');
            }
        };

        fetchRooms();
    }, []);

    const handleDelete = async (uuid) => {
        try {
            const deleteUrl = `${BaseURL.deleteRoom}/${uuid}`;
            const response = await request(HttpMethods.delete, HttpHeaders.LuxandHeader, deleteUrl);

            if (response) {
                success('Room deleted successfully!');
                setRooms((prevRooms) => prevRooms.filter((room) => room.uuid !== uuid));
            } else {
                error('Failed to delete room. Please try again.');
                console.error('Unexpected API response:', response);
            }
        } catch (err) {
            console.error('Request error:', err);
            error('An error occurred while deleting the room.');
        }
    };

    const handleAddRoom = async (e) => {
        e.preventDefault();

        if (!name) {
            error('Room name is required.');
            return;
        }

        const data = {
            name,
            timezone: timezone,
        };

        try {
            const response = await request(HttpMethods.post, HttpHeaders.LuxandHeader, BaseURL.addRoom, data);

            if (response && response.status === 'success') {
                success('Room added successfully!');
                setName('');
                setTimezone('US/Pacific');
            } else {
                error('Failed to add room. Please try again.');
                console.error('Unexpected API response:', response);
            }
        } catch (err) {
            console.error('Request error:', err);
            error('An error occurred while adding the room.');
        }
    };

    return (
        <div className="min-h-screen flex bg-gray-100">
            <div className="flex-grow py-10 px-8 ml-64">
                <div className="max-w-full mx-auto">
                    <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">All Available Rooms</h2>
                    <table className="w-1/2 mx-auto bg-white shadow-2xl rounded-lg">
                        <thead className="bg-blue-900 text-white">
                        <tr>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Room ID</th>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Room Name</th>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Actions</th>
                        </tr>
                        </thead>
                        <tbody className="text-gray-700">
                        {rooms.length > 0 ? (
                            rooms.map((room, index) => (
                                <tr key={index} className="hover:bg-gray-100">
                                    <td className="py-3 px-4">{index + 1}</td>
                                    <td className="py-3 px-4">{room.name}</td>
                                    <td className="py-3 px-4">
                                        <button
                                            onClick={() => handleDelete(room.uuid)}
                                            className="py-2 px-4 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="text-center py-4">
                                    No rooms found in the database.
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>

                    {/* Form for Adding a Room */}
                    <div className="bg-white shadow-md rounded-lg p-6 mt-10">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Add a New Room</h3>
                        <form onSubmit={handleAddRoom}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Room Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
                                    placeholder="Enter room name"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Timezone</label>
                                <input
                                    type="text"
                                    value={timezone}
                                    onChange={(e) => setTimezone(e.target.value)}
                                    className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
                                    placeholder="Enter timezone"
                                />
                            </div>
                            <button
                                type="submit"
                                className="py-2 px-4 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                                Add Room
                            </button>
                        </form>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </div>
    );
}

export default ListRooms;
