import React, { useEffect, useState } from "react";
import useToastify from "../../Hooks/useToastify";
import { ToastContainer } from "react-toastify";
import { listAllPersons, ListCollections } from "../../Services/Services";
import {BaseURL, HttpHeaders, HttpMethods} from "../../Services/Constants";
import request from "../../Services/ApiService";

export function AddStudentToCollection() {
    const [studentResponse, setStudentResponse] = useState([]);
    const [collectionResponse, setCollectionResponse] = useState([]);
    const [selectedCollectionUuid, setSelectedCollectionUuid] = useState("");
    const { success, error } = useToastify();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const students = await listAllPersons();
                setStudentResponse(students);


                const collections = await ListCollections();
                setCollectionResponse(collections);
            } catch (e) {
                console.error("Error fetching data", e);
                error("Failed to load data. Please try again");
            }
        };
        fetchData();
    }, []);

    const handleSubmit = async (personUuid) => {

        if (!selectedCollectionUuid || !personUuid) {
            error("Please select a course and a student");
            return;
        }

        const formData = new FormData();
        formData.append("person_uuid", personUuid);

        try {
            const url = `${BaseURL.AddPersonToCollection}/${selectedCollectionUuid}/person`;

            const response = await request(HttpMethods.post, HttpHeaders.LuxandHeader, url, formData);

            if (response && response.status === "success") {
                success(`Student added to the course successfully!`);
            } else {
                error(`Failed to add student to course: ${response?.message || 'Unknown error'}`);
            }
        } catch (err) {
            console.error("Error adding student to course", err);
            error("Failed to add student to the collection");
        }
    };



    return (
        <div className="min-h-screen ml-52 bg-gradient-to-br from-gray-100 to-gray-200 py-10 flex items-center justify-center">
            <div className="max-w-5xl w-full bg-white shadow-xl rounded-lg p-8">
                <h3 className="text-5xl font-bold text-center text-blue-800 mb-6">Enroll a Student to Course</h3>
                <p className="text-lg text-center text-gray-600 mb-8">Select a course and enroll a student below.</p>
                <div className="mb-10">
                    <label className="block text-lg font-semibold text-gray-700 mb-3">Select Collection</label>
                    <select
                        value={selectedCollectionUuid}
                        onChange={(e) => setSelectedCollectionUuid(e.target.value)}
                        className="w-full font-medium px-4 py-3 bg-gray-50 border border-gray-300
                        rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500
                        transition ease-in-out">
                        <option value="" disabled>Select a collection</option>
                        {collectionResponse.map((collection, index) => (
                            <option key={index} value={collection.uuid}>
                                {collection.name}
                            </option>
                        ))}
                    </select>
                </div>
                {studentResponse.length > 0 ? (
                    <div className="overflow-hidden border border-gray-200 rounded-lg shadow-lg">
                        <table className="min-w-full text-left bg-white table-auto">
                            <thead className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
                            <tr>
                                <th className="px-4 py-3 text-center font-semibold">#</th>
                                <th className="px-4 py-3 font-semibold">Name</th>
                                <th className="px-4 py-3 font-semibold">Student ID</th>
                                <th className="px-4 py-3 font-semibold text-center">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {studentResponse.map((person, index) => (
                                <tr
                                    key={person.uuid}
                                    className="odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition duration-150">
                                    <td className="px-4 py-3 text-center">{index + 1}</td>
                                    <td className="px-4 py-3">{person.name}</td>
                                    <td className="px-4 py-3">{person.uuid}</td>
                                    <td className="px-4 py-3 text-center">
                                        <button
                                            className="bg-green-600 text-white px-6 py-2 rounded-full shadow-lg hover:bg-green-500 transition duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                                            onClick={() => handleSubmit(person.uuid)}
                                            disabled={!selectedCollectionUuid || !person.uuid}
                                        >
                                            Add to Collection
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center py-10">
                        <p className="text-lg text-gray-600">No students found. Please select a collection first.</p>
                    </div>
                )}
                <ToastContainer />
            </div>
        </div>
    );

}
