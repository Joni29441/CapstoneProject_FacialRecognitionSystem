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
        <div className="min-h-screen flex bg-gray-100">
            <div className="flex-grow py-10 px-8 ml-64">
                <div className="max-w-full">
                    <h3 className="text-4xl font-bold text-gray-800">Remove a Student to Course</h3>
                    <p className="text-lg pt-5 pb-5 text-gray-600">Select a course and remove a student</p>
                    <div className="mb-6">
                        <label className="block text-lg font-medium text-gray-700 mb-2">Select Collection</label>
                        <select
                            value={selectedCollectionUuid}
                            onChange={(e) => setSelectedCollectionUuid(e.target.value)}
                            className="w-full font-semibold px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none
                            focus:ring-blue-500 focus:border-blue-500">
                            <option value="" disabled>Select a collection</option>
                            {collections.map((collection, index) => (
                                <option key={index} value={collection.uuid}>
                                    {collection.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <h2>{collectionInfo.name}</h2>
                        {collectionInfo.length > 0 && (
                            <div>
                                <table className="min-w-full bg-white text-left table-auto border-collapse shadow-lg">
                                    <thead className="bg-gray-200">
                                    <tr>
                                        <th className="py-3 px-4 border-b font-semibold text-gray-600">#</th>
                                        <th className="py-3 px-4 border-b font-semibold text-gray-600">Name</th>
                                        <th className="py-3 px-4 border-b font-semibold text-gray-600">UUID</th>
                                        <th className="py-3 px-4 border-b font-semibold text-gray-600">Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {collectionInfo.map((person, index) => (
                                        <tr key={index} className="odd:bg-white even:bg-gray-50 hover:bg-gray-100">
                                            <td className="py-3 px-4 border-b">{index + 1}</td>
                                            <td className="py-3 px-4 border-b">{person.name}</td>
                                            <td className="py-3 px-4 border-b">{person.uuid}</td>
                                            <td>
                                                <button
                                                    className="bg-red-600 rounded-lg text-white px-4 py-2 shadow-lg hover:bg-red-700 transition-colors"
                                                    onClick={() => handleDelete(person.uuid)}
                                                >
                                                    Remove From Course
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                                <h1 className="text-left font-semibold p-1">Number of
                                    Students: {collectionInfo.length}</h1>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </div>
    )
}

export default RemoveStudentFromCollection;