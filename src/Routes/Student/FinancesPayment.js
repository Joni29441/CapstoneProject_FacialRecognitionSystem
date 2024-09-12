import React, {useEffect, useState} from "react"
import {FaCcMastercard, FaCcVisa, FaCheckCircle, FaCreditCard, FaUser} from "react-icons/fa";
import {Link} from "react-router-dom";
import {OrbitProgress} from "react-loading-indicators";

function FinancesPayment() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-50 to-gray-100 py-10 px-8">
            {isLoading ? (
                <div className="fixed inset-0 bg-gray-100 flex justify-center items-center z-50">
                    <div className="text-center">
                        <OrbitProgress color="#3161cc" size="medium" text="Loading..." textColor="#0b4ef9"/>
                    </div>
                </div>

            ) : (
                <div className="flex-grow py-1 px-1 mx-auto max-w-4xl shadow-xl rounded-xl bg-white">


                    <h2 className="text-4xl font-extrabold text-center text-blue-800 mb-10">Enter Your Card
                        Information</h2>
                    <div className="w-full flex justify-center items-center mt-8 mb-8">
                        <div className="relative flex items-center w-full max-w-2xl">
                            <div
                                className="absolute w-full h-1 bg-gray-300 left-0 right-0 top-6 transform -translate-y-1/2 z-0"></div>
                            <div className="absolute h-1 bg-blue-600 z-20 top-6" style={{width: "48%"}}></div>

                            <div className="relative z-10 flex flex-col items-center w-1/3">
                                <div
                                    className="flex items-center justify-center w-12 h-12 bg-blue-600 rounded-full text-white">
                                    <FaUser size={24}/>
                                </div>
                                <span className="text-sm font-medium text-blue-600 mt-2">Personal Info</span>
                            </div>

                            <div className="relative z-20 flex flex-col items-center w-1/3">
                                <div
                                    className="flex items-center justify-center w-12 h-12 bg-blue-600 rounded-full text-white">
                                    <FaCreditCard size={24}/>
                                </div>
                                <span className="text-sm font-medium text-blue-600 mt-2">Card Details</span>
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

                    <div className="flex justify-center items-center min-h-screen">
                        <div className="  w-full max-w-md">
                            <h2 className="text-2xl font-bold text-center mb-6">Card Payment</h2>
                            <form>
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-semibold mb-2" htmlFor="cardName">
                                        Cardholder Name
                                    </label>
                                    <input
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        type="text"
                                        id="cardName"
                                        placeholder="John Doe"
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 font-semibold mb-2" htmlFor="cardNumber">
                                        Card Number
                                    </label>
                                    <input
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        type="text"
                                        id="cardNumber"
                                        placeholder="1234 5678 9012 3456"
                                        maxLength="19"
                                        required
                                    />
                                </div>

                                <div className="flex justify-between mb-4">
                                    <div className="w-1/2 pr-2">
                                        <label className="block text-gray-700 font-semibold mb-2" htmlFor="expiryDate">
                                            Expiry Date
                                        </label>
                                        <input
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            type="text"
                                            id="expiryDate"
                                            placeholder="MM/YY"
                                            required
                                        />
                                    </div>

                                    <div className="w-1/2 pl-2">
                                        <label className="block text-gray-700 font-semibold mb-2" htmlFor="cvc">
                                            CVC
                                        </label>
                                        <input
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            type="text"
                                            id="cvc"
                                            placeholder="123"
                                            maxLength="3"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className=" p-4 mx-auto w-fit  mt-1">
                                    <h3 className="font-semibold pb-2">Supported Payments</h3>
                                    <div className="flex flex-row gap-2 text-blue-800">
                                        <FaCcVisa className="text-6xl"/>
                                        <FaCcMastercard className="text-6xl"/>
                                    </div>
                                </div>
                                <Link to="/Confirmation">
                                    <button
                                        className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
                                        type="submit"
                                    >
                                        Pay Now
                                    </button>
                                </Link>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default FinancesPayment;