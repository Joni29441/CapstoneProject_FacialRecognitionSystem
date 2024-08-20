import React, { useState, useEffect } from 'react';
import request from '../Services/ApiService';  // Assuming this is the path to your request function
import { BaseURL, HttpHeaders, HttpMethods } from '../Services/Constants';
import useToastify from "../Hooks/useToastify"; // Assuming these constants are defined

function CheckIn() {
    const [rooms, setRooms] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [authorizedUser, setAuthorizedUser] = useState(null);
    const { success, error } = useToastify();


    useEffect(() => {
        // Fetch all available rooms
        const fetchRooms = async () => {
            try {
                const response = await request(HttpMethods.get, HttpHeaders.LuxandHeader, BaseURL.listRooms);
                console.log("Rooms fetched: ", response);
                setRooms(response); // Assuming the API returns an array of rooms
            } catch (error) {
                console.error('Failed to fetch rooms:', error);
            }
        };

        fetchRooms();
    }, []);

    const handleRoomSelect = (room) => {
        setSelectedRoom(room);
        console.log("Selected room: ", room);
        // Reset authorized user when a new room is selected
        setAuthorizedUser(null);
    };

    const handleAuthorization = (event) => {
        if (event.origin === 'https://attendance.luxand.cloud' && event.data.status === 'authorized') {
            console.log('User is authorized:', event.data);
            setAuthorizedUser(event.data); // Save authorized user's data including their photo URL
            // Proceed to check-in using the authorized user's data
            performCheckIn(event.data.uuid, event.data.faces[0].url);
        }
    };

    const performCheckIn = async (userId, photoUrl) => {
        if (!selectedRoom) {
            console.error('No room selected');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('room', selectedRoom.uuid);
            formData.append('photo', photoUrl); // If this needs to be a file, you'll have to convert it properly

            const response = await request(HttpMethods.post, HttpHeaders.LuxandHeader, BaseURL.CheckIn, formData);
            console.log('Check-in response:', response);

            if (response.status === 'success') {
                console.log('Check-in successful');
            } else {
                console.error('Check-in failed:', response.message);
            }
        } catch (error) {
            console.error('An error occurred during check-in:', error);
        }
    };

    useEffect(() => {
        window.addEventListener('message', handleAuthorization);

        // Clean up the event listener on component unmount
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
        </div>
    );
}

export default CheckIn;
