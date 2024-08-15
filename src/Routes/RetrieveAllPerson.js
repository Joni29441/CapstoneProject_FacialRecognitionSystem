import React, { useState, useEffect } from 'react';
import request from '../Services/ApiService';
import { BaseURL, HttpHeaders, HttpMethods } from '../Services/Constants';
import useToastify from '../Hooks/useToastify';
import { ToastContainer } from 'react-toastify';

function RetrieveAllPersons() {
    const [persons, setPersons] = useState([]);
    const { success, error } = useToastify();

    useEffect(() => {
        const fetchPersons = async () => {
            try {
                const response = await request(HttpMethods.get, HttpHeaders.LuxandHeader, BaseURL.ListAllPersons);
                setPersons(response);
                success('Students retrieved successfully');
            } catch (err) {
                console.error('An error occurred while fetching persons:', err);
                error('Failed to retrieve Students. Please try again.');
            }
        };

        fetchPersons();
    }, []);

    const handleDelete = async (uuid) => {
        try {
            const response = await request(HttpMethods.delete, HttpHeaders.LuxandHeader, BaseURL.deletePerson, {uuid});

            console.log('Delete response:', response);

            if (response && response.success) {
                success('Person deleted successfully!');
                setPersons((prevPersons) => prevPersons.filter(person => person.uuid !== uuid));
            } else if (response && response.status === 204 || 200) {
                success('Person deleted successfully!');
                setPersons((prevPersons) => prevPersons.filter(person => person.uuid !== uuid));
            } else {
                error('Failed to delete person. Please try again.');
                console.error('Unexpected API response:', response);
            }
        } catch (err) {
            console.error('Request error:', err);
            error('An error occurred while deleting the person.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex">
            <div className="flex-grow py-10 px-8 ml-64"> {/* Adjusted for the sidebar width */}
                <div className="max-w-full mx-auto">
                    <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">All Registered Students</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white shadow-md rounded-lg">
                            <thead className="bg-blue-900 text-white">
                            <tr>
                                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Photo</th>
                                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Name</th>
                                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">UUID</th>
                                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Faces</th>
                                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Actions</th>
                            </tr>
                            </thead>
                            <tbody className="text-gray-700">
                            {persons.length > 0 ? (
                                persons.map(person => (
                                    <tr key={person.uuid} className="hover:bg-gray-100">
                                        <td className="py-3 px-4">
                                            <img
                                                src={person.faces[0]?.url || '/default-avatar.png'}
                                                alt={`${person.name}'s face`}
                                                className="w-12 h-12 rounded-full object-cover"
                                            />
                                        </td>
                                        <td className="py-3 px-4">{person.name}</td>
                                        <td className="py-3 px-4">{person.uuid}</td>
                                        <td className="py-3 px-4">
                                            {person.faces.length > 0 ? person.faces.length : 'No faces found'}
                                        </td>
                                        <td className="py-3 px-4">
                                            <button
                                                onClick={() => handleDelete(person.uuid)}
                                                className="py-2 px-4 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center py-4">
                                        No persons found in the database.
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </div>
    );
}

export default RetrieveAllPersons;
