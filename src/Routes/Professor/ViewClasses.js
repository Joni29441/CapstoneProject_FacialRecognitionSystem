import React, {useState, useEffect} from "react";
import request from '../../Services/ApiService';
import { BaseURL, HttpHeaders, HttpMethods } from '../../Services/Constants';
import { FaChalkboardTeacher } from 'react-icons/fa';
import { listAllRooms, ListCollections } from "../../Services/Services";
import moment from "moment/moment";
import useToastify from "../../Hooks/useToastify";
import { ToastContainer } from "react-toastify";
import StudentModal from '../../Components/StudentModal';

function ViewClasses() {
    const [rooms, setRooms] = useState([]);
    const [collection, setCollection] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [selectedDate, setSelectedDate] = useState('');
    const [presenceData, setPresenceData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCollectionId, setSelectedCollectionId] = useState(null);
    const { warning, error } = useToastify();

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const roomsResponse = await listAllRooms();
                setRooms(roomsResponse);

                const res = await ListCollections();
                setCollection(res.filter((it) => it.name === "Distributed Systems"));
            } catch (err) {
                console.error('An error occurred while fetching rooms:', err);
                error('Failed to load rooms. Please try again.');
            }
        };

        fetchRooms();
    }, []);

    const handleRoomSelect = (e) => {
        const selectedRoomId = e.target.value;
        const selected = rooms.find((room) => room.uuid === selectedRoomId);
        setSelectedRoom(selected);
    };

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };

    const handleFetchPresenceByDate = async () => {
        if (!selectedRoom || !selectedDate) {
            warning('Please select a room and a date.');
            return;
        }

        try {
            const response = await request(
                HttpMethods.get,
                HttpHeaders.LuxandHeader,
                `${BaseURL.viewPresence}/${selectedRoom.uuid}/presence?from=${selectedDate}&till=${selectedDate}`
            );
            setPresenceData(response.presence);
        } catch (error) {
            console.error('An error occurred while fetching presence data:', error);
            warning('Failed to retrieve presence data. Please try again.');
        }
    };




    const openModal = (collectionId) => {
        setSelectedCollectionId(collectionId);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedCollectionId(null);
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-50 to-gray-100">
            <div className="max-w-7xl mx-auto py-24 px-8">
                <header className="mb-12">
                    <h2 className="text-4xl font-bold text-center text-gray-800 mb-2">Your Classes!</h2>
                    <p className="text-lg text-center text-gray-600">Here’s an overview of your academic activities.</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    <div className="bg-white shadow-xl rounded-lg p-6 flex flex-col items-center justify-center">
                        <FaChalkboardTeacher className="text-blue-600 text-4xl mb-4" />
                        <h3 className="text-lg font-semibold text-gray-800">Total Rooms</h3>
                        <p className="text-3xl font-bold text-blue-600 mt-2">{rooms.length}</p>
                        <p className="text-gray-600 mt-1">Active rooms</p>
                    </div>
                    <div className="col-span-2 bg-white shadow-xl rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Classes</h3>
                        {collection.map((col, index) => (
                            <div
                                key={index}
                                className="flex flex-col md:flex-row justify-between items-center bg-gray-50 shadow-md rounded-lg p-4 mb-4"
                            >
                                <div className="flex items-center space-x-4">
                                    <div className="bg-blue-600 text-white rounded-full h-10 w-10 flex items-center justify-center">
                                        <span className="text-xl font-bold">{index + 1}</span>
                                    </div>
                                    <div>
                                        <p className="text-lg font-semibold text-gray-900">{col.name}</p>
                                        <p className="text-sm text-gray-500">UUID: {col.uuid}</p>
                                    </div>
                                </div>
                                <button
                                    className="mt-4 md:mt-0 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform hover:scale-105 transition-transform"
                                    onClick={() => openModal(col.uuid)}
                                >
                                    View
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="bg-white shadow-xl rounded-lg p-6 mb-12">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">View Presence by Date</h3>

                    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-6">
                        <select
                            value={selectedRoom?.uuid || ''}
                            onChange={handleRoomSelect}
                            className="p-2 rounded-lg border border-gray-300 w-full md:w-auto"
                        >
                            <option value="" disabled>Select Room</option>
                            {rooms.map((room) => (
                                <option key={room.uuid} value={room.uuid}>
                                    {room.name || room.uuid}
                                </option>
                            ))}
                        </select>
                        <input
                            type="date"
                            value={selectedDate}
                            onChange={handleDateChange}
                            className="p-2 rounded-lg border border-gray-300 w-full md:w-auto"
                        />
                        <button
                            onClick={handleFetchPresenceByDate}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Fetch Presence
                        </button>
                    </div>

                    {presenceData.length > 0 ? (
                        <div className="overflow-x-auto">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Attendance For {selectedDate}</h2>
                            <table className="min-w-full bg-white shadow-md rounded-lg border-2">
                                <thead className="bg-blue-900 text-white">
                                <tr>
                                    <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Face</th>
                                    <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Name</th>
                                    <th className="text-left py-3 px-4 uppercase font-semibold text-sm">UUID</th>
                                    <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Check-In Time</th>
                                </tr>
                                </thead>
                                <tbody className="text-gray-700">
                                {presenceData.map(person => (
                                    <tr key={person.uuid} className="hover:bg-gray-100">
                                        <td className="py-3 px-4">
                                            <img
                                                src={person.face_url || '/default-avatar.png'}
                                                alt="Face"
                                                className="w-12 h-12 rounded-full object-cover"
                                            />
                                        </td>
                                        <td className="py-3 px-4">{person.name}</td>
                                        <td className="py-3 px-4">{person.uuid}</td>
                                        <td className="py-3 px-8 ">{moment(person.entered_at).format("HH:mm A")}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        selectedRoom && selectedDate && (
                            <p className="text-center text-gray-600">No presence data found for the selected date and room.</p>
                        )
                    )}
                </div>
                <StudentModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    collectionId={selectedCollectionId}
                />
            </div>
            <ToastContainer />
        </div>
    );

}

export default ViewClasses;
