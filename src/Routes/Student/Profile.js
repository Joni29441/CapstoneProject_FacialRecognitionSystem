import React, { useEffect, useState } from 'react';
import request from "../../Services/ApiService";
import { BaseURL, HttpHeaders, HttpMethods } from "../../Services/Constants";
import {OrbitProgress} from "react-loading-indicators";
import useToastify from "../../Hooks/useToastify";

function Profile() {
    const [response, setResponse] = useState("");
    const [degree, setDegree] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const {error} = useToastify();

    useEffect(() => {
        const fetchData = async () => {
            const uuid = "089e4ddf-600a-11ef-8dc5-0242ac120003";
            try {
                setIsLoading(true);
                const url = `${BaseURL.retrievePersonDetails}/${uuid}`;
                const infoResponse = await request(HttpMethods.get, HttpHeaders.LuxandHeader, url);
                setResponse(infoResponse);
                setDegree(infoResponse.collections?.filter(it => it.name === "Computer Sciences"));

            } catch (e) {
                console.error(e);
                error("Error fetching data, Try Again");
            }
            finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);
    let displayEmail = JSON.parse(localStorage.getItem('email'));
     const id = displayEmail.slice(2,7)

    return (
        <div className="min-h-screen flex flex-col items-center bg-gradient-to-r from-blue-50 to-gray-100 py-10">
            {isLoading ? (
                <div className="flex justify-center items-center h-screen">
                    <OrbitProgress color="#3161cc" size="medium" text="Loading..." textColor="#0b4ef9" />
                </div>
            ) : (
                <div className="w-full max-w-lg bg-white shadow-2xl rounded-lg p-8 flex flex-col justify-between items-center">
                    <h2 className="text-4xl font-extrabold text-center text-blue-800 mb-6">Your Profile</h2>

                    <div className="flex flex-col items-center mb-6">
                        <h3 className="text-lg font-semibold mb-2">Your Profile Picture</h3>
                        {response.faces && response.faces.length > 0 ? (
                            <img
                                src={response.faces[0].url}
                                alt="Profile"
                                className="w-28 h-28 shadow-md rounded-full object-cover mb-4 border-4 border-blue-500"
                            />
                        ) : (
                            <div className="w-28 h-28 rounded-full bg-gray-300 flex items-center justify-center mb-4 shadow-inner">
                                <span className="text-gray-500 text-lg">No Image</span>
                            </div>
                        )}
                    </div>

                    <div className="w-full space-y-4">
                        <div className="flex items-center justify-between text-lg">
                            <span className="font-bold text-gray-700">Name:</span>
                            <span className="text-gray-600">{response.name}</span>
                        </div>
                        <div className="flex items-center justify-between text-lg">
                            <span className="font-bold text-gray-700">UUID:</span>
                            <span className="text-gray-600">1{id}</span>
                        </div>
                        <div className="flex items-center justify-between text-lg">
                            <span className="font-bold text-gray-700">Email:</span>
                            <span className="text-gray-600">{displayEmail}</span>
                        </div>
                    </div>

                    <div className="mt-8 w-full">
                        <h3 className="text-xl font-semibold text-gray-700 mb-4">Degree Information</h3>
                        {degree.length > 0 ? (
                            degree.map((item) => (
                                <div
                                    key={item.uuid}
                                    className="p-4 bg-blue-50 rounded-lg shadow-md mb-2 flex items-center justify-between"
                                >
                                    <span className="text-blue-700 font-medium">{item.name}</span>
                                </div>
                            ))
                        ) : (
                            <div className="text-gray-500">No degree information available.</div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );

}

export default Profile;
