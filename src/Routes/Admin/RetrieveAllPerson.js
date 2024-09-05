import React, {useState, useEffect} from 'react';
import request from '../../Services/ApiService';
import {BaseURL, HttpHeaders, HttpMethods} from '../../Services/Constants';
import useToastify from '../../Hooks/useToastify';
import {ToastContainer} from 'react-toastify';
import {deletePerson, listAllPersons} from "../../Services/Services";
import {OrbitProgress} from "react-loading-indicators";

function RetrieveAllPersons() {
    const [persons, setPersons] = useState([]);
    const [filteredPersons, setFilteredPersons] = useState([])
    const [selectedPerson, setSelectedPerson] = useState(null);
    const [newName, setNewName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [sortOrderByAlpha, setSortOrderByAlpha] = useState("");
    const {success, error} = useToastify();

    useEffect(() => {
        const fetchPersons = async () => {
            try {
                setIsLoading(true);
                const response = await listAllPersons();
                setPersons(response);
                setFilteredPersons(response);
                success('Students retrieved successfully');
            } catch (err) {
                console.error('An error occurred while fetching persons:', err);
                error('Failed to retrieve Students. Please try again.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchPersons();
    }, []);

    useEffect(() => {
        let sortedData = [...persons];
        if (searchValue !== "") {
            sortedData = sortedData.filter((it) => it.name.toLowerCase().includes(searchValue.toLowerCase()));
        }
        setFilteredPersons(sortedData);

    }, [searchValue]);



    // useEffect(() => {
    //     const sorted = filteredPersons.sort((a,b) => {
    //         if(sortOrderByAlpha === "A-Z"){
    //             return a.name.localeCompare(b.name);
    //         }
    //         return 0;
    //     });
    //     setTest(sorted);
    //     console.log('hello', filteredPersons);
    //
    // }, [filteredPersons, sortOrderByAlpha]);

    useEffect(() => {
        let sortedData = [...persons];
        if (searchValue !== "") {
            sortedData = sortedData.filter((it) => it.name.toLowerCase().includes(searchValue.toLowerCase()));
        }
        setFilteredPersons(sortedData);
    }, [searchValue, persons]);

    useEffect(() => {
            const sortedByAlpha = [...filteredPersons].sort((a, b) => {
                if (sortOrderByAlpha === "A-Z") {
                    return a.name.localeCompare(b.name);
                } else if (sortOrderByAlpha === "Z-A") {
                    return b.name.localeCompare(a.name);
                }
                return 0;
            });
            setFilteredPersons(sortedByAlpha);

    }, [sortOrderByAlpha]);



    const handleSortChange = (e) => {
        setSortOrderByAlpha(e.target.value);
    }



    const handleDelete = async (uuid) => {
        try {
            const response = await deletePerson(uuid);

            if (response) {
                success('Person deleted successfully!');
            } else {
                error('Failed to delete person. Please try again.');
                console.error('Unexpected API response:', response);
            }
        } catch (err) {
            console.error('Request error:', err);
            error('An error occurred while deleting the person.');
        }
    };


    const handleUpdate = async () => {
        if (!selectedPerson || !newName) return;

        try {
            const url = `${BaseURL.updatePerson}/${selectedPerson.uuid}`;
            const data = {
                name: newName
            };
            const response = await request(HttpMethods.put, HttpHeaders.LuxandHeader, url, data);

            if (response) {
                success('Person updated successfully!');
                setPersons((prevPersons) =>
                    prevPersons.map((person) =>
                        person.uuid === selectedPerson.uuid ? {...person, name: newName} : person
                    )
                );
                setSelectedPerson(null);
            } else {
                error('Failed to update person. Please try again.');
                console.error('Unexpected API response:', response);
            }
        } catch (err) {
            console.error('Request error:', err);
            error('An error occurred while updating the person.');
        }
    };



    return (
        <div className="min-h-screen bg-gray-100 flex">
            <div className="flex-grow py-10 px-8 ml-64">
                <div className="max-w-full mx-auto">
                    <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">All Registered Students</h2>
                    <div className="grid grid-cols-8">
                        <div className="flex p-5 col-span-7">
                            <form className="w-full">
                                <input
                                    type="text"
                                    id="default-search"
                                    className="block w-full p-4 text-lg font-bold text-gray-900 border-2 border-gray-300
                                rounded-lg shadow-md focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500"
                                    value={searchValue}
                                    onChange={(e) => setSearchValue(e.target.value)}
                                    placeholder="Filter Search"
                                />
                            </form>
                            <div className="pl-5 flex flex-wrap col-span-2 ">
                                <select className="bg-blue-900 text-white p-5 mb-6 rounded-lg"
                                        onClick={handleSortChange}
                                >
                                    <option value="A-Z">A-Z</option>
                                    <option value="Z-A">Z-A</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        {isLoading ? (
                            <div className="flex justify-center">
                                <OrbitProgress color="#3161cc" size="medium" text="Loading" textColor="#0b4ef9"/>
                            </div>
                        ) : (
                            <div className="bg-white p-6">
                                <table className="min-w-full bg-white shadow-md rounded-lg">
                                    <thead className="bg-blue-900 text-white">
                                    <tr>
                                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Photo</th>
                                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Name</th>
                                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">UUID</th>
                                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Degree</th>
                                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody className="text-gray-700">
                                    {filteredPersons.length > 0 ? (
                                        filteredPersons.map(person => (
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
                                                    {person.collections
                                                        .filter(collection => collection.name === "Computer Sciences")
                                                        .map(collection => collection.name)
                                                    }
                                                </td>
                                                <td className="py-3 px-4 space-x-2">
                                                    <button
                                                        onClick={() => handleDelete(person.uuid)}
                                                        className="py-2 px-4 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                                    >
                                                        Delete
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setSelectedPerson(person);
                                                            setNewName(person.name);
                                                        }}
                                                        className="py-2 px-4 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                                    >
                                                        Update
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
                        )}

                    </div>
                </div>
                <ToastContainer/>
            </div>

            {/* Modal for Updating Person */}
            {selectedPerson && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                        <h2 className="text-2xl font-semibold mb-4">Update Person</h2>
                        <label className="block text-sm font-medium text-gray-700">New Name</label>
                        <input
                            type="text"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
                        />
                        <div className="mt-4 flex justify-end space-x-2">
                            <button
                                onClick={() => setSelectedPerson(null)}
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
            )}
        </div>
    );
}

export default RetrieveAllPersons;
