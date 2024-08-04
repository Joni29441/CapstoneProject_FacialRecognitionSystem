import React from 'react';
import {FaCloud, FaReact, FaServer} from "react-icons/fa";

const Homepage = () => {
    return (
        <div>
            {/* Hero Section */}
            <section className="bg-white text-blue-800  py-20">
                <div className="container mx-auto px-6 md:px-12 lg:px-24 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">Attendance System Using Facial Recognition</h1>
                    <p className="text-lg md:text-xl">Capstone Project for Computer Sciences</p>
                </div>
            </section>

            {/* Cards Section */}
            <section className="py-20 bg-gray-200">
                <div className="container mx-auto px-6 md:px-12 lg:px-24">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Project Details</h2>
                    <div className="flex flex-wrap -mx-4">
                        <div className="w-full sm:w-1/2 md:w-1/3 px-4 mb-8">
                            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                                <img src="/photos/attendance.jpg" alt="Facial Recognition"
                                     className="w-full h-48 object-cover"/>
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold mb-3">Facial Recognition System</h3>
                                    <p className="text-gray-600">
                                        This project is a Facial Recognition System used for automating the attendance
                                        process. The system captures the faces of students and matches them against the
                                        database to mark their attendance.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="w-full sm:w-1/2 md:w-1/3 px-4 mb-8">
                            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                                <img src="/photos/facialrecognition.png" alt="System Features"
                                     className="w-full h-48 object-cover"/>
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold mb-3">System Features</h3>
                                    <p className="text-gray-600">
                                        Our system offers real-time face detection, recognition accuracy, and secure
                                        data storage. It is designed to handle large databases and provide quick
                                        results.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="w-full sm:w-1/2 md:w-1/3 px-4 mb-8">
                            <div className="bg-white rounded-lg overflow-hidden shadow-lg ">
                                <img src="/photos/machinelearning.jpg" alt="Implementation Details"
                                     className="w-full h-48 object-center"/>
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold mb-3">Implementation Details</h3>
                                    <p className="text-gray-600">
                                        This project is built using advanced machine learning algorithms and modern web
                                        technologies. The system leverages cloud computing for scalability and
                                        reliability.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Technology Stack Section */}
            <section className="py-20 bg-gray-100">
                <div className="container mx-auto px-6 md:px-12 lg:px-24">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Technology Stack</h2>
                    <div className="flex flex-wrap -mx-4">
                        <div className="w-full sm:w-1/2 md:w-1/3 px-4 mb-8">
                            <div className="bg-blue-100 rounded-lg overflow-hidden shadow-lg p-6 text-center">
                                <FaReact className="text-blue-600 text-6xl mx-auto mb-4"/>
                                <h3 className="text-xl font-semibold mb-3">Frontend/UI</h3>
                                <p className="text-gray-700">Developed with React and Tailwind CSS for a modern,
                                    responsive user interface.</p>
                            </div>
                        </div>
                        <div className="w-full sm:w-1/2 md:w-1/3 px-4 mb-8">
                            <div className="bg-green-100 rounded-lg overflow-hidden shadow-lg p-6 text-center">
                                <FaServer className="text-green-600 text-6xl mx-auto mb-4"/>
                                <h3 className="text-xl font-semibold mb-3">Backend API</h3>
                                <p className="text-gray-700">Built using ASP.NET for robust and scalable backend
                                    services, handling login and authentication.</p>
                            </div>
                        </div>
                        <div className="w-full sm:w-1/2 md:w-1/3 px-4 mb-8">
                            <div className="bg-purple-100 rounded-lg overflow-hidden shadow-lg p-6 text-center">
                                <FaCloud className="text-purple-600 text-6xl mx-auto mb-4"/>
                                <h3 className="text-xl font-semibold mb-3">Facial Recognition API</h3>
                                <p className="text-gray-700">Utilizes a cloud-based facial recognition API for accurate
                                    and efficient student identification.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Homepage;
