import React, { useState } from 'react';
import request from '../Services/ApiService';
import { BaseURL, HttpHeaders, HttpMethods } from '../Services/Constants';
import useToastify from '../Hooks/useToastify';
import { ToastContainer } from 'react-toastify';

function AddCollection() {
    const [collectionName, setCollectionName] = useState('');
    const { success, error } = useToastify();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!collectionName.trim()) {
            error('Please provide a valid collection name.');
            return;
        }

        const data = {
            name: collectionName.trim(),
        };

        console.log('Data being sent:', JSON.stringify(data)); // Log the request data

        try {
            const response = await request(HttpMethods.post, HttpHeaders.LuxandHeader, BaseURL.addCollection, data);

            if (response && response.status === 'success') {
                success('Collection added successfully!');
                setCollectionName(''); // Clear the input field
            } else {
                error('Failed to add collection. Please try again.');
                console.error('Unexpected API response:', response);
            }
        } catch (err) {
            console.error('An error occurred while adding the collection:', err);
            error('An error occurred. Please try again.');
        }
    };
    return (
        <div className="min-h-screen bg-gray-100 py-10 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">Add a New Collection</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="collectionName" className="block text-sm font-medium text-gray-700">
                            Collection Name
                        </label>
                        <input
                            type="text"
                            id="collectionName"
                            value={collectionName}
                            onChange={(e) => setCollectionName(e.target.value)}
                            className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
                            placeholder="Enter collection name"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Add Collection
                    </button>
                </form>
                <ToastContainer />
            </div>
        </div>
    );
}

export default AddCollection;
