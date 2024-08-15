import React, { useState } from 'react';
import request from '../Services/ApiService';
import { BaseURL, HttpHeaders, HttpMethods } from '../Services/Constants';
import useToastify from '../Hooks/useToastify';
import { ToastContainer } from 'react-toastify';

function CreateCollection() {
    const [collectionName, setCollectionName] = useState('');
    const [urlParameter, setUrlParameter] = useState(''); // New state for the URL parameter
    const { success, error } = useToastify();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            name: collectionName,
        };

        // If you're providing a full URL


        try {
            const response = await request(HttpMethods.post, HttpHeaders.LuxandHeader, BaseURL.addCollection, payload);
            if (response.success) {
                success('Collection created successfully');
                setCollectionName(''); // Clear the input fields after successful creation
                setUrlParameter(''); // Clear the URL parameter field
            } else {
                error('Failed to create collection');
            }
        } catch (err) {
            console.error('An error occurred:', err);
            error('An error occurred while creating the collection');
        }
    };


    return (
        <div className="min-h-screen bg-gray-100 py-10 flex justify-center items-center">
            <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Create a New Collection</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="urlParameter">
                            URL Parameter
                        </label>
                        <input
                            type="text"
                            id="urlParameter"
                            value={urlParameter}
                            onChange={(e) => setUrlParameter(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter URL parameter (optional)"
                        />
                    </div>
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
