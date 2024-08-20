import React, { useState } from 'react';
import request from '../Services/ApiService';
import { BaseURL, HttpHeaders, HttpMethods } from '../Services/Constants';
import useToastify from '../Hooks/useToastify';
import { ToastContainer } from 'react-toastify';

function EnrollPerson() {
    const [name, setName] = useState('');
    const [photo, setPhoto] = useState(null);
    const { success, error } = useToastify();

    const handlePhotoChange = (e) => {
        setPhoto(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !photo) {
            error('Please provide both a name and a photo.');
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('store', '1'); // Assuming '1' is the default store
        formData.append('collections', ''); // Empty collections
        formData.append('unique', '0'); // Not unique by default
        formData.append('photos', photo);

        try {
            const response = await request(HttpMethods.post, HttpHeaders.LuxandHeader, BaseURL.EnrollPerson,formData);

            if (response && response.uuid) {
                success('Person enrolled successfully!');
                setName(''); // Clear the input fields
                setPhoto(null);
            } else {
                error('Failed to enroll person. Please try again.');
                console.error('Unexpected API response:', response);
            }
        } catch (err) {
            console.error('Request error:', err);
            error('An error occurred while enrolling the person.');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-50 to-gray-100 py-10 flex justify-center items-center">
            <div className="max-w-lg w-full bg-white shadow-xl rounded-2xl p-10">
                <h2 className="text-3xl font-bold text-center text-blue-800 mb-8">Enroll a Person</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label className="block text-lg font-medium text-gray-700 mb-2" htmlFor="name">
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter full name"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-lg font-medium text-gray-700 mb-2" htmlFor="photo">
                            Upload Photo
                        </label>
                        <div className="flex items-center justify-center">
                            <input
                                type="file"
                                id="photo"
                                onChange={handlePhotoChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                accept="image/*"
                                required
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-transform transform hover:scale-105"
                    >
                        Enroll Person
                    </button>
                </form>
            </div>
            <ToastContainer />
        </div>
    );

}

export default EnrollPerson;
