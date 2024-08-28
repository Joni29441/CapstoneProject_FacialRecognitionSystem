import React, { useEffect, useState } from 'react';
import { listAllPersons } from "../Services/Services";
import request from "../Services/ApiService";
import { BaseURL, HttpHeaders, HttpMethods } from "../Services/Constants";

const ShowDisplay = ({ collectionUuid }) => {
    const [persons, setPersons] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await listAllPersons();
                setPersons(response);
            } catch (e) {
                console.error("Something went wrong while fetching persons", e);
            }
        }
        fetchData();
    }, []);

    const handleSubmit = async (personUuid) => {
        console.log("Person UUID:", personUuid); // Debug: Check what personUuid is being passed
        console.log("Collection UUID:", collectionUuid); // Debug: Check what collectionUuid is being passed

        if (!personUuid || !collectionUuid) {
            console.error("Missing UUIDs: ", { personUuid, collectionUuid });
            return;
        }

        const url = `${BaseURL.addPersonToCollection}/${collectionUuid}/person`;
        const data = { person_uuid: personUuid };

        try {
            const response = await request(HttpMethods.post, HttpHeaders.LuxandHeader, url, data);
            console.log("API Response:", response);

            if (response.status === 'success') {
                console.log('Person added to collection successfully!');
            } else {
                console.error('Failed to add person to collection:', response.message);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    return (
        <div>
            <table className="border-4">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>UUID</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {persons.map((person, index) => (
                    <tr key={index}>
                        <td>{person.name}</td>
                        <td>{person.uuid}</td>
                        <td>
                            <button
                                className="bg-blue-700 p-2 text-white"
                                onClick={() => handleSubmit(person.uuid)} // Passing person.uuid to handleSubmit
                            >
                                Add
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ShowDisplay;
