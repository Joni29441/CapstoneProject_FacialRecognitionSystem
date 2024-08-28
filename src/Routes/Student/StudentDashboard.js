import React, {useContext, useEffect, useState} from 'react';
import {UserContext} from "../../Context/UserContext";
import { ListCollections } from "../../Services/Services";
import {Link} from "react-router-dom";

function StudentDashboard() {
    const [collectionRes, setCollectionRes] = useState([]);
    const { user } = useContext(UserContext);



    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await ListCollections();
                setCollectionRes(response.filter((item => item.name === "Computer Networks" || item.name === "Software Engineering ")));
                console.log('ers',collectionRes)
            }
            catch (e) {
                console.error("Something Went Wrong", e);
            }
        }
        fetchData();
    }, []);

    const displayName = user?.email ? user.email : 'Student';


    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-50 to-gray-100 py-10 px-8">
            <div className="max-w-5xl mx-auto">
                <h2 className="text-4xl font-semibold text-center text-gray-800 mb-4">Welcome, {displayName}</h2>
                <h4 className="text-xl font-medium text-center text-gray-600 mb-10">View Your Academic Progress</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {/* Classes Card */}
                    <div className="bg-white border border-gray-200 shadow-lg rounded-lg p-6 flex flex-col justify-between">
                        <h2 className="font-bold text-xl text-center text-blue-700 mb-4">Your Classes this Semester</h2>
                        <div className="flex-grow">
                            {collectionRes.map((it, index) => (
                                <div key={index} className="p-4 bg-gray-50 rounded-lg mb-3 shadow-sm hover:bg-gray-100">
                                    <h3 className="text-lg font-medium text-gray-800">{it.name}</h3>
                                </div>
                            ))}
                        </div>
                        <div className="text-center mt-4">
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">
                                View All Classes
                            </button>
                        </div>
                    </div>

                    {/* Something Else Card */}
                    <div className="bg-white border border-gray-200 shadow-lg rounded-lg p-6 flex flex-col justify-between">
                        <h2 className="font-bold text-xl text-center text-blue-700 mb-4">Academic Calendar</h2>
                        <p className="text-gray-600 text-center mb-6">
                            Keep track of important academic dates and deadlines.
                        </p>
                        <div className="text-center mt-4">
                            <button className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700">
                               <Link to="https://drive.google.com/file/d/1MHUI5h57LkNVac1NVBVvirj_t6XRrazo/view">View Calendar</Link>
                            </button>
                        </div>
                    </div>

                    {/* Additional Card */}
                    <div className="bg-white border border-gray-200 shadow-lg rounded-lg p-6 flex flex-col justify-between">
                        <h2 className="font-bold text-xl text-center text-blue-700 mb-4">Attendance Overview</h2>
                        <p className="text-gray-600 text-center mb-6">
                            Check your attendance status and view detailed reports.
                        </p>
                        <div className="text-center mt-4">
                            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700">
                               <Link to="/Attendance" >View Attendance</Link>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}
export default StudentDashboard;
