import React from 'react';
import { FaReact, FaServer, FaCloud } from 'react-icons/fa';

const Homepage = () => {
    return (
        <div className="bg-gray-100 text-gray-800">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-24">
                <div className="container mx-auto px-6 md:px-12 lg:px-24 text-center">
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-6">Attendance System Using Facial
                        Recognition</h1>
                    <p className="text-lg md:text-xl font-light">Harnessing the power of modern technology for real-time
                        attendance tracking.</p>
                </div>
            </section>

            {/* Cards Section */}
            <section className="py-20">
                <div className="container mx-auto px-6 md:px-12 lg:px-24">
                    <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-16">Project Details</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        <div className="bg-white rounded-xl shadow-xl transform transition-all hover:scale-105">
                            <img src="/photos/attendance.jpg" alt="System Interface"
                                 className="w-full h-48 object-cover rounded-t-xl"/>
                            <div className="p-6">
                                <h3 className="text-2xl font-semibold mb-4">System Interface</h3>
                                <p className="text-gray-600">A user-friendly interface for seamless navigation and quick
                                    access to attendance records.</p>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl shadow-xl transform transition-all hover:scale-105">
                            <img src="/photos/facialrecognition.png" alt="Technology in Action"
                                 className="w-full h-48 object-cover rounded-t-xl"/>
                            <div className="p-6">
                                <h3 className="text-2xl font-semibold mb-4">Facial Recognition Technology</h3>
                                <p className="text-gray-600">Real-time identification of students using advanced facial
                                    recognition technology for accurate attendance marking.</p>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl shadow-xl transform transition-all hover:scale-105">
                            <img src="/photos/machinelearning.jpg" alt="Implementation Details"
                                 className="w-full h-48 object-cover rounded-t-xl"/>
                            <div className="p-6">
                                <h3 className="text-2xl font-semibold mb-4">Implementation Details</h3>
                                <p className="text-gray-600">Built with machine learning algorithms and cloud computing
                                    for scalability and reliability.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-white py-24 text-white">
                <div className="container mx-auto px-6 md:px-12 lg:px-24">
                    <h2 className="text-5xl font-bold text-center text-black mb-12">Technology Stack</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                        <div
                            className="bg-gradient-to-r from-blue-500 to-indigo-600 p-12 rounded-xl shadow-lg transform transition-all hover:scale-105">
                            <FaReact className="text-white text-9xl mb-6 mx-auto"/>
                            <h3 className="text-3xl font-semibold mb-4">Frontend/UI</h3>
                            <p>Built with React and Tailwind CSS for a sleek, modern, and responsive user interface.</p>
                        </div>
                        <div
                            className="bg-gradient-to-r from-green-600 to-lime-500 p-12 rounded-xl shadow-lg transform transition-all hover:scale-105">
                            <FaServer className="text-white text-9xl mb-6 mx-auto"/>
                            <h3 className="text-3xl font-semibold mb-4">Backend API</h3>
                            <p>Powered by ASP.NET for scalable and reliable backend services, handling authentication
                                and authorization.</p>
                        </div>
                        <div
                            className="bg-gradient-to-r from-purple-500 to-pink-500 p-12 rounded-xl shadow-lg transform transition-all hover:scale-105">
                            <FaCloud className="text-white text-9xl mb-6 mx-auto"/>
                            <h3 className="text-3xl font-semibold mb-4">Facial Recognition API</h3>
                            <p>Integrates a cloud-based API for accurate real-time facial recognition and attendance
                                marking.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );

};

export default Homepage;
