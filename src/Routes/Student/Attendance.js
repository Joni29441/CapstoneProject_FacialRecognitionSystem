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
    const [percentage, setPercentage] = useState(0);

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
                const results = await Promise.all(
                    last7Days.map(async (date) => {
                        const url = `${BaseURL.viewPresence}/${selectedRoom.uuid}/presence?from=${date}&till=${date}`;
                        const response = await request(HttpMethods.get, HttpHeaders.LuxandHeader, url);

                        // Check for the exact match of person uuid and date
                        const isPresentForDate = response.presence.some(person =>
                            person.uuid === selectedPerson.uuid && moment(person.check_in_time).isSame(date, 'day')
                        );

                        return {
                            date,
                            isPresent: isPresentForDate,
                        };
                    })
                );

                setAttendanceData(results);

                const daysPresent = results.filter(result => result.isPresent).length;
                const attendancePercentage = (daysPresent / last7Days.length) * 100;
                setPercentage(attendancePercentage.toFixed(2));

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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-gray-100 ">
            <div className="max-w-5xl w-full bg-white shadow-2xl rounded-xl p-8">
                <h2 className="text-4xl font-extrabold text-center text-blue-800 mb-2">Student Attendance</h2>
                <h2 className="text-xl font-semibold text-center text-gray-400 mb-8">See your attendance for the past 7 days, </h2>
                <div className="mb-8">
                    <h3 className="text-lg font-bold text-gray-800 mb-3">Select a Room</h3>
                    <div className="relative">
                        <select
                            value={selectedRoom?.uuid || ''}
                            onChange={(e) => handleRoomSelect(rooms.find(room => room.uuid === e.target.value))}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="" disabled>Select a room</option>
                            {rooms.map(room => (
                                <option key={room.uuid} value={room.uuid}>{room.name || room.uuid}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="mb-8">
                    <h3 className="text-lg font-bold text-gray-800 mb-3">Select a Person</h3>
                    <div className="relative">
                        <select
                            value={selectedPerson?.uuid || ''}
                            onChange={(e) => handlePersonSelect(persons.find(person => person.uuid === e.target.value))}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="" disabled>Select a person</option>
                            {persons.map(person => (
                                <option key={person.uuid} value={person.uuid}>{person.name || person.uuid}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {attendanceData.length > 0 && (
                    <div className="overflow-x-auto bg-white rounded-lg shadow-md">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Attendance for the Last 7 Days</h3>
                        <table className="w-full text-center border-collapse">
                            <thead className="bg-blue-700 text-white">
                            <tr>
                                <th className="py-3 px-4 border-b font-semibold">Date</th>
                                {attendanceData.map((entry) => (
                                    <th key={entry.date} className="py-3 px-4 border-b font-semibold">{moment(entry.date).format("MMM DD")}</th>
                                ))}
                            </tr>
                            </thead>
                            <tbody>
                            <tr className="hover:bg-gray-50">
                                <td className="py-4 px-6 font-bold text-gray-700">Attendance</td>
                                {attendanceData.map(({ date, isPresent }) => (
                                    <td key={date} className="py-4 px-6 ">
                                        {isPresent ? <FaCheckCircle className="text-green-500 mx-auto text-2xl" /> : <FaMinusCircle className="text-red-500 mx-auto text-2xl" />}
                                    </td>
                                ))}
                            </tr>
                            </tbody>
                        </table>
                        <div className="flex justify-end p-4">
                            <h3 className="text-xl font-bold text-gray-700">Attendance Percentage: {percentage}%</h3>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Attendance;
