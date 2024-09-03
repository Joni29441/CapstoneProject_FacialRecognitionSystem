import React from 'react';
import { FaReact, FaServer, FaCloud } from 'react-icons/fa';

const Homepage = () => {
    return (
        <div className="bg-background text-text">
            {/* Hero Section */}
            <section className="bg-primary text-white py-20">
                <div className="container mx-auto px-6 md:px-12 lg:px-24 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">Attendance System Using Facial Recognition</h1>
                </div>
            </section>

            {/* Cards Section */}
            <section className="py-20 border">
                <div className="container mx-auto px-6 md:px-12 lg:px-24">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Project Details</h2>
                    <div className="flex flex-wrap -mx-4">
                        <div className="w-full sm:w-1/2 md:w-1/3 px-4 mb-8">
                            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                                <img src="/photos/attendance.jpg" alt="System Interface" className="w-full h-48 object-cover" />
                                <div className="p-6 border-t-2">
                                    <h3 className="text-xl font-semibold mb-3">System Interface</h3>
                                    <p className="text-gray-700">
                                        A user-friendly interface is designed for seamless interaction and navigation. The system dashboard allows for easy navigation and quick access to attendance records.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="w-full sm:w-1/2 md:w-1/3 px-4 mb-8">
                            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                                <img src="/photos/facialrecognition.png" alt="Technology in Action" className="w-full h-48 object-cover" />
                                <div className="p-6 border-t-2">
                                    <h3 className="text-xl font-semibold mb-3">Technology</h3>
                                    <p className="text-gray-700 ">
                                        The facial recognition technology which is used in this project, captures and identifies students in real-time to mark their attendance accurately and efficiently.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="w-full sm:w-1/2 md:w-1/3 px-4 mb-8">
                            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                                <img src="/photos/machinelearning.jpg" alt="Implementation Details" className="w-full h-48 object-contain" />
                                <div className="p-6 border-t-2">
                                    <h3 className="text-xl font-semibold mb-3">Implementation Details</h3>
                                    <p className="text-gray-700">
                                        This project is built using advanced machine learning algorithms and modern web technologies. The system leverages cloud computing for scalability and reliability.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Enhanced Technology Stack Section */}
            <section className="py-20">
                <div className="container mx-auto px-6 md:px-12 lg:px-24">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Technology Stack</h2>
                    <div className="flex flex-wrap -mx-4">
                        <div className="w-full sm:w-1/2 md:w-1/3 px-4 mb-8">
                            <div className="bg-blue-100 rounded-lg overflow-hidden shadow-lg p-6 text-center">
                                <FaReact className="text-blue-600 text-6xl mx-auto mb-4" />
                                <h3 className="text-xl font-semibold mb-3">Frontend/UI</h3>
                                <p className="text-gray-700">Developed with React and Tailwind CSS for a modern, responsive user interface.</p>
                            </div>
                        </div>
                        <div className="w-full sm:w-1/2 md:w-1/3 px-4 mb-8">
                            <div className="bg-green-100 rounded-lg overflow-hidden shadow-lg p-6 text-center">
                                <FaServer className="text-green-600 text-6xl mx-auto mb-4" />
                                <h3 className="text-xl font-semibold mb-3">Backend API</h3>
                                <p className="text-gray-700">Built using ASP.NET for robust and scalable backend services, handling login and authentication.</p>
                            </div>
                        </div>
                        <div className="w-full sm:w-1/2 md:w-1/3 px-4 mb-8">
                            <div className="bg-purple-100 rounded-lg overflow-hidden shadow-lg p-6 text-center">
                                <FaCloud className="text-purple-600 text-6xl mx-auto mb-4" />
                                <h3 className="text-xl font-semibold mb-3">Facial Recognition API</h3>
                                <p className="text-gray-700">Utilizes a cloud-based facial recognition API for accurate and efficient student identification.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Homepage;
