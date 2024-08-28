import React, {useEffect, useState} from 'react';
import request from '../../Services/ApiService';
import {BaseURL, HttpHeaders, HttpMethods} from '../../Services/Constants';
import useToastify from '../../Hooks/useToastify';
import {ToastContainer} from 'react-toastify';

function CreateCollection() {
    const [name, setName] = useState("");
    const [collection, setCollection] = useState([]);
    const {success, error} = useToastify();

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const collectionsResponse = await request(HttpMethods.get, HttpHeaders.LuxandHeader, BaseURL.listCollections);
                setCollection(collectionsResponse);
                console.log("API Response:", collectionsResponse);
            } catch (e) {
                error("Error:", e);
            }
        }
        fetchRooms();
    }, [name]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            name: name
        };
        let params = {
            name: name
        }

        try {
            const response = await request(HttpMethods.post, HttpHeaders.LuxandHeader, BaseURL.addCollection, data, params);
            if (response) {
                success(`Collection "${response.name}" created successfully!`);

                setName('');
            } else {
                error(`Failed to create collection: ${response?.message}`);
                console.error('Unexpected API response:', response);
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
            } else {
                error('Failed to delete person. Please try again.');
                console.error('Unexpected API response:', response);
            }

        } catch (e) {
            error("Something went wrong", e);
        }
    }

    return (
        <section className="min-h-screen bg-gradient-to-r from-blue-50 to-gray-100 py-10 flex flex-col items-center">
            <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-8">
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
                            className="w-full py-2 px-4 bg-blue-600 text-white
                            rounded-lg shadow-md hover:bg-blue-700 focus:outline-none
                            focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Create Collection
                        </button>
                    </form>
                </div>
            </div>
            <div className="overflow-x-auto mt-12">
                <h3 className="text-2xl font-semibold text-gray-700 mb-4">Available Collections</h3>
                <table className="min-w-full bg-white shadow-md rounded-lg border-2">
                    <thead className="bg-blue-600 text-white">
                    <tr>
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">#</th>
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Name</th>
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Course Id</th>
                        <th className="text-left py-3 px-4 col-span-2 uppercase font-semibold text-sm">Action</th>
                    </tr>
                    </thead>
                    <tbody className="text-gray-700">
                    {collection.length > 0 ? (
                        collection.map((collection, index) => (
                            <tr key={index} className="hover:bg-gray-100">
                                <td className="py-3 font-bold px-4">{index + 1}</td>
                                <td className="py-3 font-bold px-4">{collection.name}</td>
                                <td className="py-3 px-4">{collection.uuid}</td>
                                <td className="py-3 px-4 col-span-2  ">
                                    <div className="flex gap-2">
                                        <button
                                            className="bg-red-600 rounded-lg text-white p-2"
                                            onClick={() => handleDelete(collection.uuid)}>Delete
                                        </button>
                                        <button
                                            className="bg-yellow-400 rounded-lg text-white p-2"
                                            >Update
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="2" className="text-center py-4">
                                No collections found.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
            <ToastContainer/>
        </section>

    );
}

export default CreateCollection;
