import React, { useState, useEffect } from 'react';
import request from '../Services/ApiService';
import { BaseURL, HttpHeaders, HttpMethods } from '../Services/Constants';
import useToastify from "../Hooks/useToastify";
import {ToastContainer} from "react-toastify";

function CheckIn() {
    const [rooms, setRooms] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [authorizedUser, setAuthorizedUser] = useState(null);
    const { success, error } = useToastify();


    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await request(HttpMethods.get, HttpHeaders.LuxandHeader, BaseURL.listRooms);
                setRooms(response);
            } catch (err) {
                error('Failed to fetch rooms:', err);
            }
        };

        fetchRooms();
    }, []);

    const handleRoomSelect = (room) => {
        setSelectedRoom(room);
        setAuthorizedUser(null);
    };

    const handleAuthorization = (event) => {
        if (event.origin === 'https://attendance.luxand.cloud' && event.data.status === 'authorized') {
            setAuthorizedUser(event.data); // Save authorized user's data including their photo URL
            performCheckIn(event.data.uuid, event.data.faces[0].url);
        }
    };

    const performCheckIn = async (userId, test) => {
        if (!selectedRoom) {
            console.error('No room selected');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('room', selectedRoom.uuid);
            formData.append('photo', test);

            const response = await request(HttpMethods.post, HttpHeaders.LuxandHeader, BaseURL.CheckIn, formData);

            if (response.status === 'success') {
                success("Successfully Checked-In");
            } else {
                error('Check-in failed:');
            }
        } catch (error) {
            console.error('An error occurred during check-in:', error);
        }
    };

    useEffect(() => {
        window.addEventListener('message', handleAuthorization);

        return () => {
            window.removeEventListener('message', handleAuthorization);
        };
    }, [selectedRoom]);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-12">
            <h1 className="text-4xl font-bold mb-10 text-center text-blue-900">Select a Room for Attendance Check-In</h1>

            <div className="w-full max-w-4xl mx-auto">
                {rooms.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                        {rooms.map((room) => (
                            <button
                                key={room.uuid}
                                onClick={() => handleRoomSelect(room)}
                                className={`p-6 bg-white shadow-lg rounded-lg border border-gray-200 text-center transition-transform transform hover:scale-105 ${
                                    selectedRoom && selectedRoom.uuid === room.uuid ? 'bg-blue-600 text-white' : 'text-gray-800'
                                }`}
                            >
                                <h3 className="text-xl font-semibold">{room.name || `Room ${room.uuid}`}</h3>
                            </button>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-700">Loading rooms...</p>
                )}
            </div>

            {selectedRoom && (
                <div className="w-full max-w-6xl mx-auto mt-8">
                    <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
                        Selected Room: <span className="text-blue-600">{selectedRoom.name || `Room ${selectedRoom.uuid}`}</span>
                    </h2>
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <iframe
                            src={`https://attendance.luxand.cloud/?token=f5254a76d321bf388a0f25a8cd47d810`}
                            style={{ width: '100%', height: '600px', border: 'none' }}
                            allow="camera"
                            title="Attendance Check-In"
                            className="rounded-lg"
                        ></iframe>
                    </div>
                </div>
            )}
            <ToastContainer/>
        </div>

    );
}

export default CheckIn;
