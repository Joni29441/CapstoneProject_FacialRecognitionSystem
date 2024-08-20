import React, { useState } from 'react';
import request from '../Services/ApiService';
import { BaseURL, HttpHeaders, HttpMethods } from '../Services/Constants';
import useToastify from '../Hooks/useToastify';
import { ToastContainer } from 'react-toastify';

function CreateCollection() {
    const [collectionName, setCollectionName] = useState('');
    const { success, error } = useToastify();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            name: collectionName.trim(),
        };

        console.log("Data being sent:", data);

        try {
            // Merging the BaseHeader and LuxandHeader
            const headers = {
                ...HttpHeaders.BaseHeader,
                ...HttpHeaders.LuxandHeader,
                'Content-Type': 'application/json',
            };

            console.log("Headers being sent:", headers);
            console.log("URL being hit:", BaseURL.addCollection);

            const response = await request(HttpMethods.post, headers, BaseURL.addCollection, data);

            console.log("API Response:", response);

            if (response && response.collection) {
                success('Collection created successfully!');
                setCollectionName(''); // Reset the form field
            } else {
                error(`Failed to create collection: ${response?.message || 'Unknown error'}`);
                console.error('Unexpected API response:', response);
            }
        } catch (err) {
            console.error('An error occurred while creating the collection:', err);
            error('Failed to create collection. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-10 flex justify-center items-center">
            <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Create a Collection</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="collectionName">
                            Collection Name
                        </label>
                        <input
                            type="text"
                            id="collectionName"
                            value={collectionName}
                            onChange={(e) => setCollectionName(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter collection name"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Create Collection
                    </button>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
}

export default CreateCollection;
