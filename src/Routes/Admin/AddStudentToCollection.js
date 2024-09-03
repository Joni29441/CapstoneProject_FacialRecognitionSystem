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
        <div className="min-h-screen flex bg-gray-100">
            <div className="flex-grow py-10 px-8 ml-64">
                <div className="max-w-full">
                    <h3 className="text-4xl font-bold text-gray-800">Enroll a Student to Course</h3>
                    <p className="text-lg pt-5 pb-5 text-gray-600">Select a course and enroll a student</p>

                    <div className="mb-6">
                        <label className="block text-lg font-medium text-gray-700 mb-2">Select Collection</label>
                        <select
                            value={selectedCollectionUuid}
                            onChange={(e) => setSelectedCollectionUuid(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="" disabled>Select a collection</option>
                            {collectionResponse.map((collection, index) => (
                                <option key={index} value={collection.uuid}>
                                    {collection.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {studentResponse.length > 0 && (
                        <table className="rounded-sm bg-white border shadow-md w-full">
                            <thead className="bg-blue-700 text-white">
                            <tr>
                                <th className="px-3 py-2">#</th>
                                <th>Name</th>
                                <th>Student ID</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {studentResponse.map((person, index) => (
                                <tr key={person.uuid} className="odd:bg-gray-50 even:bg-gray-100 text-center">
                                    <td className="px-7 py-3">{index + 1}</td>
                                    <td className="px-7 py-3">{person.name}</td>
                                    <td className="px-7 py-3">{person.uuid}</td>
                                    <td>
                                        <button
                                            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-500"
                                            onClick={() => handleSubmit(person.uuid)}
                                            disabled={!selectedCollectionUuid || ! person.uuid}
                                        >
                                            Add to Collection
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}
