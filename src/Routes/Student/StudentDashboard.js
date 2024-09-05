import React, { useEffect, useState} from 'react';
import { ListCollections } from "../../Services/Services";
import {Link} from "react-router-dom";
import { SiGoogleclassroom } from "react-icons/si";
import { LuCalendarClock } from "react-icons/lu";
import { IoCalendarSharp } from "react-icons/io5";

function StudentDashboard() {
    const [collectionRes, setCollectionRes] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await ListCollections();
                setCollectionRes(response.filter((item => item.name === "Computer Networks" || item.name === "Software Engineering " || item.name ==="Discrete Structures" || item.name === "Distributed Systems")));
            }
            catch (e) {
                console.error("Something Went Wrong", e);
            }
        }
        fetchData();
    }, []);

    const displayName = JSON.parse(localStorage.getItem('email'));



    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-50 to-gray-100 py-10 px-8 flex items-center justify-center">
            <div className="max-w-7xl w-full bg-white shadow-2xl rounded-lg p-10">
                <h2 className="lg:text-4xl font-extrabold text-center text-blue-800 mb-6 sm:text-md">Welcome, {displayName}</h2>
                <h4 className="text-xl font-medium text-center text-gray-600 mb-10">View Your Academic Progress</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="bg-gradient-to-br from-blue-50 to-white border border-gray-200 shadow-lg rounded-xl p-6 flex flex-col justify-between">
                        <h2 className="font-extrabold text-xl text-center text-blue-700 mb-4">Your Classes this Semester</h2>
                        <div className="flex-grow">
                            {collectionRes.map((it, index) => (
                                <div key={index} className="p-4 bg-white rounded-lg mb-3 shadow-md hover:bg-blue-50 transition-all">
                                    <h3 className="text-lg font-medium text-gray-800">{it.name}</h3>
                                </div>
                            ))}
                        </div>
                        <div className="text-center mt-4">
                        <Link to="/Classes">
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all">
                                View All Classes
                            </button></Link>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-white border border-gray-200 shadow-lg rounded-xl p-6 flex flex-col justify-between">
                        <h2 className="font-extrabold text-xl text-center text-blue-700 mb-4">Academic Calendar</h2>
                        <IoCalendarSharp className="mx-auto text-blue-800 text-7xl mb-4"/>
                        <p className="text-gray-600 text-center mb-6">
                            Keep track of important academic dates and deadlines.
                        </p>
                        <div className="text-center mt-4">
                            <a href="https://drive.google.com/file/d/1MHUI5h57LkNVac1NVBVvirj_t6XRrazo/view" target="_blank" rel="noopener noreferrer">
                                <button className="px-4 py-2 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition-all">
                                    View Calendar
                                </button>
                            </a>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-white border border-gray-200 shadow-lg rounded-xl p-6 flex flex-col justify-between">
                        <h2 className="font-extrabold text-xl text-center text-blue-700 mb-4">Attendance Overview</h2>
                        <LuCalendarClock className="mx-auto text-blue-800 text-7xl mb-4"/>
                        <p className="text-gray-600 text-center mb-6">
                            Check your attendance status and view detailed reports.
                        </p>
                        <div className="text-center mt-4">
                            <Link to="/Attendance">
                                <button className="px-4 py-2 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 transition-all">
                                    View Attendance
                                </button>
                            </Link>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-white border border-gray-200 shadow-lg rounded-xl p-6 flex flex-col justify-between">
                        <h2 className="font-extrabold text-xl text-center text-blue-700 mb-4">Google Classroom</h2>
                        <SiGoogleclassroom className="mx-auto text-blue-800 text-7xl mb-4" />
                        <p className="text-gray-600 text-center mb-6">
                            Check your assignments and other related academic progress in your Google Classroom account.
                        </p>
                        <div className="text-center mt-4">
                            <Link to="/Attendance">
                                <button className="px-4 py-2 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-all">
                                    Google Classroom
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default StudentDashboard;
