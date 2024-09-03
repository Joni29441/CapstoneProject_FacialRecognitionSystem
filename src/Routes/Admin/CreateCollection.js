import React, { useEffect, useState } from 'react';
import request from '../../Services/ApiService';
import { BaseURL, HttpHeaders, HttpMethods } from '../../Services/Constants';
import useToastify from '../../Hooks/useToastify';
import { ToastContainer } from 'react-toastify';
import { FaTimes } from 'react-icons/fa';

function CreateCollection() {
    const [name, setName] = useState("");
    const [collection, setCollection] = useState([]);
    const [selectedCollection, setSelectedCollection] = useState("");
    const [newName, setNewName] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { success, error } = useToastify();

    useEffect(() => {
        const fetchCollections = async () => {
            try {
                const collectionsResponse = await request(HttpMethods.get, HttpHeaders.LuxandHeader, BaseURL.listCollections);
                setCollection(collectionsResponse);
            } catch (e) {
                error("Error fetching collections.");
            }
        };
        fetchCollections();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { name };
        try {
            const response = await request(HttpMethods.post, HttpHeaders.LuxandHeader, BaseURL.addCollection, data);
            if (response) {
                success(`Collection "${response.name}" created successfully!`);
                setCollection([...collection, response]);
                setName('');
            } else {
                error('Failed to create collection.');
            }
        } catch (err) {
            console.error('An error occurred while creating the collection:', err);
            error('Failed to create collection. Please try again.');
        }
    };

    const handleDelete = async (uuid) => {
        try {
            const response = await request(HttpMethods.delete, HttpHeaders.LuxandHeader, `${BaseURL.deleteCollection}/${uuid}`);
            if (response) {
                success('Collection deleted successfully!');
                setCollection(collection.filter((col) => col.uuid !== uuid));
            } else {
                error('Failed to delete collection. Please try again.');
            }
        } catch (e) {
            error('Something went wrong while deleting the collection.');
        }
    };

    const handleOpenModal = (collection) => {
        setSelectedCollection(collection);
        setNewName(collection.name);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedCollection(null);
        setNewName('');
    };

    const handleUpdate = async () => {
        if (!selectedCollection) return;

        const data = {
            name: newName
        };
        const url = `${BaseURL.UpdateCollection}/${selectedCollection.uuid}`;

        try {
            const updateResponse = await request(HttpMethods.put, HttpHeaders.LuxandHeader, url, data);

            if (updateResponse) {
                success(`Collection "${newName}" updated successfully!`);
                setCollection((prevCollections) =>
                    prevCollections.map((col) =>
                        col.uuid === selectedCollection.uuid ? { ...col, name: newName } : col
                    )
                );
                handleCloseModal();
            } else {
                error('Failed to update collection. Please try again.');
            }
        } catch (e) {
            error('Something went wrong while updating the collection.');
        }
    };

    return (
        <section className="min-h-screen bg-gradient-to-r from-blue-50 to-gray-100 py-10 flex flex-col items-center">
            <div className="max-w-4xl w-full bg-white shadow-xl rounded-lg p-8">
                <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">Manage Collections</h2>
                <div className="mb-10">
                    <h3 className="text-2xl font-semibold text-gray-700 mb-6">Create a New Collection</h3>
                    <form onSubmit={handleSubmit} className="mb-8">
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="collectionName">
                                Collection Name
                            </label>
                            <input
                                type="text"
                                id="collectionName"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter collection name"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Create Collection
                        </button>
                    </form>
                </div>
            </div>
            <div className="overflow-x-auto mt-12 w-full max-w-4xl">
                <h3 className="text-2xl font-semibold text-gray-700 mb-4">Available Collections</h3>
                <table className="min-w-full bg-white shadow-xl rounded-lg border-2">
                    <thead className="bg-blue-600 text-white">
                    <tr>
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">#</th>
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Name</th>
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Course Id</th>
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Action</th>
                    </tr>
                    </thead>
                    <tbody className="text-gray-700">
                    {collection.length > 0 ? (
                        collection.map((col, index) => (
                            <tr key={index} className="hover:bg-gray-100 odd:bg-gray-50 border-b transition-colors">
                                <td className="py-3 font-bold px-4">{index + 1}</td>
                                <td className="py-3 font-bold px-4">{col.name}</td>
                                <td className="py-3 px-4">{col.uuid}</td>
                                <td className="py-3 px-4">
                                    <div className="flex gap-2">
                                        <button
                                            className="bg-red-600 rounded-lg text-white px-4 py-2 shadow-lg hover:bg-red-700 transition-colors"
                                            onClick={() => handleDelete(col.uuid)}
                                        >
                                            Delete
                                        </button>
                                        <button
                                            className="bg-yellow-400 rounded-lg text-white px-4 py-2 shadow-lg hover:bg-yellow-500 transition-colors"
                                            onClick={() => handleOpenModal(col)}
                                        >
                                            Update
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center py-4">
                                No collections found.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
                        <div className="flex justify-between items-center border-b px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-t-lg">
                            <h2 className="text-xl font-semibold text-white">Edit Collection Name</h2>
                            <button onClick={handleCloseModal}>
                                <FaTimes className="text-white hover:text-gray-200" />
                            </button>
                        </div>
                        <div className="p-6">
                            <label className="block text-sm font-medium text-gray-700">New Collection Name</label>
                            <input
                                type="text"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                            <div className="mt-4 flex justify-end space-x-2">
                                <button
                                    onClick={handleCloseModal}
                                    className="py-2 px-4 bg-gray-600 text-white rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleUpdate}
                                    className="py-2 px-4 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <ToastContainer />
        </section>
    );
}

export default CreateCollection;
