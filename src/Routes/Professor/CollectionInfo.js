import React, { useState, useEffect } from 'react';
import request from '../../Services/ApiService';
import { HttpMethods, HttpHeaders, BaseURL } from '../../Services/Constants';
import useToastify from '../../Hooks/useToastify';
import {ToastContainer} from "react-toastify";

const CollectionInfo = () => {
    const [collectionInfo, setCollectionInfo] = useState(null);
    const { success, error } = useToastify();

    useEffect(() => {
        const handleGetCollectionInfo = async (uuid) => {
            try {
                const response = await request(HttpMethods.get, HttpHeaders.LuxandHeader, `${BaseURL.listCollections}/${uuid}`);
                if (response) {
                    success('Collection info retrieved successfully!');
                    setCollectionInfo(response);
                } else {
                    error('Failed to retrieve collection info.');
                    console.error('API response:', response);
                }
            } catch (err) {
                console.error('An error occurred while retrieving collection info:', err);
                error('Failed to retrieve collection info. Please try again.');
            }
        };
        handleGetCollectionInfo();
    }, []);

    if (!collectionInfo) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 py-10 flex justify-center items-center">
            <div className="max-w-md w-full bg-white shadow-lg mx-auto rounded-lg p-8">
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Collection Info</h2>
                <p className="text-lg text-gray-700 mb-4">Name: {collectionInfo.name}</p>
                <p className="text-lg text-gray-700">UUID: {collectionInfo.uuid}</p>
                <p className="text-lg text-gray-700">Student: {collectionInfo.persons[0]}</p>
            </div>
            <ToastContainer />
        </div>
    );
};

export default CollectionInfo;
