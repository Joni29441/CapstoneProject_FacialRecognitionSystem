import React, {useEffect, useState} from "react";
import {ListCollections} from "../../Services/Services";
import useToastify from "../../Hooks/useToastify";
import {ToastContainer} from "react-toastify";
import request from "../../Services/ApiService";
import {BaseURL, HttpHeaders, HttpMethods} from "../../Services/Constants";


function RemoveStudentFromCollection() {
    const [collections, setCollections] = useState([]);
    const [collectionInfo, setCollectionInfo] = useState([]);
    const [selectedCollectionUuid, setSelectedCollectionUuid] = useState("");
    const {success, error} = useToastify();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await ListCollections();
                setCollections(res);
            } catch (e) {
                error("Something Went Wrong");
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        const getdata = async () => {
            try {
                if (selectedCollectionUuid) {

                    const response = await request(
                        HttpMethods.get,
                        HttpHeaders.LuxandHeader,
                        `${BaseURL.getCollectionInfo}/${selectedCollectionUuid}`,
                    );
                    setCollectionInfo(response.persons);
                }

            } catch (e) {
                error("Something Went Wrong");
            }
        }
        getdata();
    }, [selectedCollectionUuid]);

    const handleDelete = async (uuid) => {
        try {
            const newResponse = await request(HttpMethods.delete, HttpHeaders.LuxandHeader, `${BaseURL.getCollectionInfo}/${selectedCollectionUuid}/person/${uuid}`)
            if (newResponse) {
                success("Remove Successfully")
                setCollectionInfo(prevPersons =>
                    prevPersons.filter((person) => person.uuid !== uuid));
            } else {
                error("Failed to Remove");
            }
        } catch (e) {
            console.error(e)
            error("Something Went Wrong");
        }
    }


    return (
        <div className="min-h-screen ml-48 bg-gradient-to-br from-blue-50 to-gray-100 py-10 flex items-center justify-center">
            <div className="max-w-5xl w-full bg-white shadow-2xl rounded-lg p-10">
                <h3 className="text-5xl font-bold text-center text-blue-800 mb-6">Remove a Student from a Course</h3>
                <p className="text-lg text-center text-gray-600 mb-10">
                    Select a course and remove a student below.
                </p>

                {/* Select Collection */}
                <div className="mb-8">
                    <label className="block text-lg font-semibold text-gray-700 mb-3">Select Collection</label>
                    <select
                        value={selectedCollectionUuid}
                        onChange={(e) => setSelectedCollectionUuid(e.target.value)}
                        className="w-full font-medium px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition ease-in-out"
                    >
                        <option value="" disabled>Select a collection</option>
                        {collections.map((collection, index) => (
                            <option key={index} value={collection.uuid}>
                                {collection.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Students Table */}
                <div>
                    <h2 className="text-3xl font-semibold text-blue-700 mb-6">{collectionInfo.name || "Students List"}</h2>
                    {collectionInfo.length > 0 ? (
                        <div className="overflow-hidden bg-white border-2 border-gray-200 rounded-lg shadow-lg">
                            <table className="min-w-full bg-white text-left table-auto border-collapse">
                                <thead className="bg-gradient-to-r from-blue-600 to-blue-800">
                                <tr>
                                    <th className="py-3 px-4 text-white font-semibold">#</th>
                                    <th className="py-3 px-4 text-white font-semibold">Name</th>
                                    <th className="py-3 px-4 text-white font-semibold">UUID</th>
                                    <th className="py-3 px-4 text-white font-semibold">Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {collectionInfo.map((person, index) => (
                                    <tr
                                        key={index}
                                        className="odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition duration-150"
                                    >
                                        <td className="py-3 px-4 border-b">{index + 1}</td>
                                        <td className="py-3 px-4 border-b">{person.name}</td>
                                        <td className="py-3 px-4 border-b">{person.uuid}</td>
                                        <td className="py-3 px-4 border-b text-center">
                                            <button
                                                className="px-5 py-2 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 transition duration-150"
                                                onClick={() => handleDelete(person.uuid)}
                                            >
                                                Remove
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>

                            <div className="bg-gray-100 py-4 px-6 rounded-b-lg text-gray-800 font-medium">
                                <h4 className="text-lg">Number of Students: {collectionInfo.length}</h4>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-6 bg-white border-2 border-gray-200 rounded-lg shadow-md">
                            <p className="text-lg font-semibold text-gray-600">No students found for this collection.</p>
                        </div>
                    )}
                </div>

                <ToastContainer />
            </div>
        </div>
    );

}

export default RemoveStudentFromCollection;