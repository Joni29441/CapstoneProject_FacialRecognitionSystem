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
        console.log(`Selected room: ${room.name} (UUID: ${room.uuid})`);

        try {
            const response = await request(HttpMethods.get, HttpHeaders.LuxandHeader, `${BaseURL.viewPresence}/${room.uuid}/presence`);

            console.log('API response:', response);

            if (response && response.presence.length > 0) {
                setPresenceData(response.presence);
                success(`Presence data for ${room.name} retrieved successfully.`);

            } else if (response && response.presence.length === 0) {
                setPresenceData([]);
                success(`No presence data found for ${room.name}.`);

            } else {
                setPresenceData([]);
                error('Failed to retrieve presence data. Please try again.');
            }
        } catch (err) {
            console.error('An error occurred while fetching presence data:', err);
            error('Failed to retrieve presence data. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-8">
            <div className="flex-grow py-10 px-8 ml-64 mx-auto">
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

                {selectedRoom && (
                    <div className="mt-16">
                        <h2 className="text-3xl font-semibold text-center text-blue-800 mb-8">
                            {presenceData.length > 0 ? `Current Presence in ${selectedRoom.name}` : `No Presence Data for ${selectedRoom.name}`}
                        </h2>
                        {presenceData.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white shadow-md rounded-lg">
                                    <thead className="bg-blue-900 text-white">
                                    <tr>
                                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Name</th>
                                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Face</th>
                                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">UUID</th>
                                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Check-In Time</th>
                                    </tr>
                                    </thead>
                                    <tbody className="text-gray-700">
                                    {presenceData.map(person => (
                                        <tr key={person.uuid} className="hover:bg-gray-100">
                                            <td className="py-3 px-4">{person.name || 'Unknown'}</td>
                                            <td className="py-3 px-4">
                                                <img
                                                    src={person.face_url || '/default-avatar.png'}
                                                    alt="Face"
                                                    className="w-12 h-12 rounded-full object-cover"
                                                />
                                            </td>
                                            <td className="py-3 px-4">{person.uuid}</td>
                                            <td className="py-3 px-4">{new Date(person.entered_at).toLocaleString()}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p className="text-center text-gray-700">There is no presence data available for this room.</p>
                        )}
                    </div>
                )}

                <ToastContainer />
            </div>
        </div>
    );
}

export default ViewPresence;
