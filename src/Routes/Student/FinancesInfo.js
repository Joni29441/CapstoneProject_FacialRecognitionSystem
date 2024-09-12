import React from "react";
import { FaCreditCard, FaUser, FaCheckCircle } from "react-icons/fa";
import {Link} from "react-router-dom";

function FinancesInfo() {
    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-100 to-gray-200 py-12 px-6 flex justify-center items-center">
            <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-4xl font-extrabold text-center text-blue-800 mb-1">
                    Enter Your Information
                </h2>

                <div className="w-full flex justify-center items-center mt-8 mb-8">
                    <div className="relative flex items-center w-full max-w-2xl">
                        <div
                            className="absolute w-full h-1 bg-gray-300 left-0 right-0 top-6 transform -translate-y-1/2 z-0"></div>
                        <div className="absolute h-1 bg-blue-600 z-20 top-6" style={{width: "15%"}}></div>

                        <div className="relative z-10 flex flex-col items-center w-1/3">
                            <div
                                className="flex items-center justify-center w-12 h-12 bg-blue-600 rounded-full text-white">
                                <FaUser size={24}/>
                            </div>
                            <span className="text-sm font-medium text-blue-600 mt-2">Personal Info</span>
                        </div>

                        <div className="relative z-20 flex flex-col items-center w-1/3">
                            <div
                                className="flex items-center justify-center w-12 h-12 bg-gray-300 rounded-full text-gray-600">
                                <FaCreditCard size={24}/>
                            </div>
                            <span className="text-sm font-medium text-gray-600 mt-2">Card Details</span>
                        </div>
                        <div className="relative z-20 flex flex-col items-center w-1/3">
                            <div
                                className="flex items-center justify-center w-12 h-12 bg-gray-300 rounded-full text-gray-600">
                                <FaCheckCircle size={24}/>
                            </div>
                            <span className="text-sm font-medium text-gray-600 mt-2">Confirmation</span>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
                    <form>
                        <div className="grid gap-6 mb-6 md:grid-cols-2">
                            <div>
                                <label htmlFor="first_name" className="block mb-2 text-sm font-bold text-gray-900">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    id="first_name"
                                    className="py-2 px-4 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="John"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="last_name" className="block mb-2 text-sm font-bold text-gray-900">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    id="last_name"
                                    className="py-2 px-4 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Doe"
                                    required
                                />
                            </div>
                        </div>

                        <div className="mb-6">
                            <label htmlFor="email" className="block mb-2 text-sm font-bold text-gray-900">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="w-full py-2 px-4 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="john.doe@example.com"
                                required
                            />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="phone" className="block mb-2 text-sm font-bold text-gray-900">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                className="w-full py-2 px-4 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="+1234567890"
                                required
                            />
                        </div>

                        <Link to="/FinancesPayment"><button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition duration-300"
                        >
                            Next Step
                        </button></Link>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default FinancesInfo;
