import React, { useState, useEffect } from 'react';
import request from '../Services/ApiService';
import { BaseURL, HttpHeaders, HttpMethods } from '../Services/Constants';
import useToastify from '../Hooks/useToastify';
import { ToastContainer } from 'react-toastify';

function ViewPresence() {
    const [rooms, setRooms] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [presenceData, setPresenceData] = useState([]);
    const { success, error } = useToastify();

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await request(HttpMethods.get, HttpHeaders.LuxandHeader, BaseURL.listRooms);
                setRooms(response);
                success('Rooms retrieved successfully');
            } catch (err) {
                console.error('An error occurred while fetching rooms:', err);
                error('Failed to retrieve rooms. Please try again.');
            }
        };

        fetchRooms();
    }, []);

    const handleRoomSelect = async (room) => {
        setSelectedRoom(room);
        console.log(`Selected room: ${room.name} (UUID: ${room.uuid})`); // Log the selected room details

        try {
            const response = await request(HttpMethods.get, HttpHeaders.LuxandHeader, `${BaseURL.viewPresence}/${room.uuid}/presence`);

            console.log('API response:', response); // Log the response from the API

            if (response && response.length > 0) {
                setPresenceData(response);
                success(`Presence data for ${room.name} retrieved successfully.`);
            } else {
                setPresenceData([]);
                error('No presence data found for this room.');
            }
        } catch (err) {
            console.error('An error occurred while fetching presence data:', err);
            error('Failed to retrieve presence data. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-center text-blue-800 mb-12">Select a Room to View Presence</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {rooms.length > 0 ? (
                        rooms.map((room, index) => (
                            <div
                                key={index}
                                onClick={() => handleRoomSelect(room)}
                                className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-300 cursor-pointer"
                            >
                                <h3 className="text-2xl font-semibold text-blue-600">{room.name}</h3>
                                <p className="mt-2 text-gray-600">UUID: {room.uuid}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-700 col-span-full">
                            No rooms found in the database.
                        </p>
                    )}
                </div>

                {presenceData.length > 0 && (
                    <div className="mt-16">
                        <h2 className="text-3xl font-semibold text-center text-blue-800 mb-8">Current Presence in {selectedRoom.name}</h2>
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white shadow-md rounded-lg">
                                <thead className="bg-blue-900 text-white">
                                <tr>
                                    <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Name</th>
                                    <th className="text-left py-3 px-4 uppercase font-semibold text-sm">UUID</th>
                                    <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Check-In Time</th>
                                </tr>
                                </thead>
                                <tbody className="text-gray-700">
                                {presenceData.map(person => (
                                    <tr key={person.uuid} className="hover:bg-gray-100">
                                        <td className="py-3 px-4">{person.name}</td>
                                        <td className="py-3 px-4">{person.uuid}</td>
                                        <td className="py-3 px-4">{new Date(person.checkin_time).toLocaleString()}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                <ToastContainer />
            </div>
        </div>
    );
}

export default ViewPresence;
