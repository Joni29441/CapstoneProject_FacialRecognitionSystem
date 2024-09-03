import React, { useState, useEffect } from 'react';
import request from '../../Services/ApiService';
import { BaseURL, HttpHeaders, HttpMethods } from '../../Services/Constants';
import useToastify from '../../Hooks/useToastify';
import { ToastContainer } from 'react-toastify';
import moment from "moment/moment";

function ViewPresence() {
    const [rooms, setRooms] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [presenceData, setPresenceData] = useState([]);
    const { success, error, notify } = useToastify();

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

    useEffect(() => {
        const fetchPresenceData = async () => {
            if (!selectedRoom) return;

            try {
                const response = await request(HttpMethods.get, HttpHeaders.LuxandHeader, `${BaseURL.viewPresence}/${selectedRoom.uuid}/presence`);

                console.log('API response:', response);

                if (response && response.presence.length > 0) {
                    setPresenceData(response.presence);
                    success(`Presence data for ${selectedRoom.name} retrieved successfully.`);
                } else if (response && response.presence.length === 0) {
                    setPresenceData([]);
                    notify(`No presence data found for ${selectedRoom.name}.`);
                } else {
                    error('Failed to retrieve presence data. Please try again.');
                }
            } catch (err) {
                console.error('An error occurred while fetching presence data:', err);
                error('Failed to retrieve presence data. Please try again.');
            }
        };

        fetchPresenceData();
    }, [selectedRoom]);

    const handleRoomSelect = (room) => {
        setSelectedRoom(room);
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-50 to-gray-100 py-10 px-8">
            <div className="flex-grow py-10 px-8 mx-auto max-w-7xl">
                <h1 className="text-4xl font-extrabold text-center text-blue-900 mb-12">
                    Select a Room to View Presence
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {rooms.length > 0 ? (
                        rooms.map((room, index) => (
                            <div
                                key={index}
                                onClick={() => handleRoomSelect(room)}
                                className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-300 cursor-pointer"
                            >
                                <h3 className="text-2xl font-semibold text-blue-700">{room.name}</h3>
                                <p className="mt-2 text-gray-500">UUID: {room.uuid}</p>
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
                        <h2 className="text-3xl font-extrabold text-center text-blue-900 mb-8">
                            {presenceData.length > 0 ? `Current Presence in ${selectedRoom.name}` : `No Presence Data for ${selectedRoom.name}`}
                        </h2>
                        {presenceData.length > 0 ? (
                            <div className="overflow-x-auto rounded-lg shadow-lg">
                                <table className="min-w-full bg-white">
                                    <thead className="bg-blue-800 text-white rounded-lg">
                                    <tr>
                                        <th className="text-left py-3 px-4 uppercase font-bold text-sm">Name</th>
                                        <th className="text-left py-3 px-4 uppercase font-bold text-sm">Face</th>
                                        <th className="text-left py-3 px-4 uppercase font-bold text-sm">UUID</th>
                                        <th className="text-left py-3 px-4 uppercase font-bold text-sm">Check-In Time</th>
                                    </tr>
                                    </thead>
                                    <tbody className="text-gray-800">
                                    {presenceData.map((person, index) => (
                                        <tr key={index} className="hover:bg-gray-100">
                                            <td className="py-3 px-4">{person.name || 'Unknown'}</td>
                                            <td className="py-3 px-4">
                                                <img
                                                    src={person.face_url}
                                                    alt="Face"
                                                    className="w-12 h-12 rounded-full object-cover border-2 border-blue-200"
                                                />
                                            </td>
                                            <td className="py-3 px-4">{person.uuid}</td>
                                            <td className="py-3 px-4">{moment(person.entered_at).format("MMM Do YYYY , HH:MM A")}</td>
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
