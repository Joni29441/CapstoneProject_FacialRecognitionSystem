import React, {useEffect, useState} from "react";
import { FaCheckCircle } from "react-icons/fa";
import {Link} from "react-router-dom";
import {OrbitProgress} from "react-loading-indicators";

function Confirmation() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-50 to-gray-100">

            {isLoading ?
                (
                    <div className="fixed inset-0 bg-gray-100 flex justify-center items-center z-50">
                        <div className="text-center">
                            <OrbitProgress color="#3161cc" size="medium" text="Loading..." textColor="#0b4ef9"/>
                            <p className="text-blue-800 text-center text-2xl mt-4">Processing your payment...</p>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white p-10 rounded-lg shadow-lg max-w-lg w-full text-center">
                        <FaCheckCircle className="text-green-500 mx-auto mb-6" size={72}/>

                        <h2 className="text-3xl font-bold text-gray-800 mb-4">
                        Payment Successful!
                        </h2>

                        <p className="text-gray-600 mb-8">
                            Your payment has been processed successfully. A confirmation has been sent to your email.
                        </p>

                        <div className="bg-gray-100 p-4 rounded-lg mb-6">
                            <p className="text-gray-500 text-sm">Transaction ID</p>
                            <p className="text-xl font-semibold text-gray-800">#123456789</p>
                        </div>

                        <Link to="/StudentDashboard">
                            <button
                                className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                            >
                                Back to Home
                            </button>
                        </Link>
                    </div>
                )}

        </div>
    );


}

export default Confirmation;