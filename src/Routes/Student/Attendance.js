import React, {useEffect, useState} from "react";
import request from "../../Services/ApiService";
import {BaseURL, HttpHeaders, HttpMethods} from "../../Services/Constants";
import moment from "moment/moment";
import {FaCheckCircle, FaMinusCircle} from "react-icons/fa";

function Attendance() {

    const [rooms, setRooms] = useState([]);
    const [persons, setPersons] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [selectedPerson, setSelectedPerson] = useState(null);
    const [attendanceData, setAttendanceData] = useState([]);

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await request(HttpMethods.get, HttpHeaders.LuxandHeader, BaseURL.listRooms);
                setRooms(response);

            } catch (err) {
                console.error('An error occurred while fetching rooms:', err);
            }
        };

        const fetchPersons = async () => {
            try {
                const response = await request(HttpMethods.get, HttpHeaders.LuxandHeader, BaseURL.ListAllPersons);
                setPersons(response);

            } catch (err) {
                console.error('An error occurred while fetching persons:', err);
            }
        };

        fetchRooms();
        fetchPersons();
    }, []);

    useEffect(() => {
        const fetchAttendanceData = async () => {
            if (!selectedRoom || !selectedPerson) return;

            const today = moment();
            const last7Days = Array.from({ length: 7 }, (_, i) => today.clone().subtract(i, 'days').format('YYYY-MM-DD'));

            try {
                const requests = last7Days.map(async (date) => {
                    const url = `${BaseURL.viewPresence}/${selectedRoom.uuid}/presence?from=${date}&till=${date}`;
                    const response = await request(HttpMethods.get, HttpHeaders.LuxandHeader, url);

                    return {
                        date,
                        isPresent: response && response.presence.some(person => person.uuid === selectedPerson.uuid)
                    };
                });

                const results = await Promise.all(requests);
                setAttendanceData(results);
                console.log(results);
            } catch (err) {
                console.error('An error occurred while fetching attendance data:', err);
            }
        };

        if (selectedRoom && selectedPerson) {
            fetchAttendanceData();
        }
    }, [selectedRoom, selectedPerson]);

    const handleRoomSelect = (room) => {
        setSelectedRoom(room);
    };

    const handlePersonSelect = (person) => {
        setSelectedPerson(person);
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-r from-blue-50 to-gray-100 py-10 px-6">
            <div className="max-w-4xl mx-auto w-full bg-white shadow-lg rounded-lg p-8">
                <h2 className="text-4xl font-semibold text-center text-blue-800 mb-10">Student Attendance</h2>

                <div className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-700 mb-3">Select a Room</h3>
                    <select
                        value={selectedRoom?.uuid || ''}
                        onChange={(e) => handleRoomSelect(rooms.find(room => room.uuid === e.target.value))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="" disabled>Select a room</option>
                        {rooms.map(room => (
                            <option key={room.uuid} value={room.uuid}>{room.name || room.uuid}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-700 mb-3">Select a Person</h3>
                    <select
                        value={selectedPerson?.uuid || ''}
                        onChange={(e) => handlePersonSelect(persons.find(person => person.uuid === e.target.value))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="" disabled>Select a person</option>
                        {persons.map(person => (
                            <option key={person.uuid} value={person.uuid}>{person.name || person.uuid}</option>
                        ))}
                    </select>
                </div>

                {attendanceData.length > 0 && (
                    <div className="overflow-x-auto">
                        <h3 className="text-xl font-semibold text-gray-700 mb-4">Attendance for the Last 7 Days</h3>
                        <table className="min-w-full bg-white shadow-md rounded-lg border">
                            <thead className="bg-blue-900 text-white">
                            <tr>
                                <th className="py-3 px-4 uppercase font-semibold text-sm">Date</th>
                                {attendanceData.map((entry) => (
                                    <th key={entry.date} className="py-3 px-4 uppercase font-semibold text-sm">{entry.date}</th>
                                ))}
                            </tr>
                            </thead>
                            <tbody className="text-gray-700">
                            <tr className="hover:bg-gray-100">
                                <td className="py-3 px-4 font-semibold">Attendance</td>
                                {attendanceData.map(({ date, isPresent }) => (
                                    <td key={date} className="py-3 px-4 text-center">{isPresent ? <FaCheckCircle className="text-green-600 text-3xl mx-auto" /> : <FaMinusCircle className="text-red-500 mx-auto text-3xl"/>}</td>
                                ))}
                            </tr>
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
export default Attendance;