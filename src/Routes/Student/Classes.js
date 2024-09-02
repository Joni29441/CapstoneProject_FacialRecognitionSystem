import React, { useEffect, useState } from "react";
import { ListCollections } from "../../Services/Services";

function Classes() {
    const [response, setResponse] = useState([]);

    // Hardcoded schedule data based on class name
    const scheduleData = {
        "Distributed Systems": "Monday, 11:00 AM - 13:00 PM",
        "Software Engineering ": "Tuesday, 10:00 AM - 12:00 AM",
        "Discrete Structures": "Thursday, 10:00 AM - 12:00 AM",
        "Computer Networks": "Friday, 10:00 AM - 11:00 AM",
    };

    useEffect(() => {
        const fetchResData = async () => {
            try {
                const res = await ListCollections();
                setResponse(res.filter(item => item.name === "Computer Networks" || item.name === "Software Engineering " || item.name === "Distributed Systems"|| item.name === "Discrete Structures"));
                console.log(response);
            } catch (e) {
                console.error("Something Went Wrong", e);
            }
        };
        fetchResData();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-8">
            <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8">
                <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">Class Schedule</h2>
                <table className="min-w-full bg-white border border-gray-300 shadow-sm rounded-lg">
                    <thead className="bg-blue-600 text-white">
                    <tr>
                        <th className="py-3 px-6 text-left font-semibold">Class Name</th>
                        <th className="py-3 px-6 text-left font-semibold">Schedule</th>
                        <th className="py-3 px-6 text-left font-semibold">UUID</th>
                    </tr>
                    </thead>
                    <tbody className="text-gray-700">
                    {response.map((item, index) => (
                        <tr key={index} className="hover:bg-gray-100">
                            <td className="py-4 px-6 border-b">{item.name}</td>
                            <td className="py-4 px-6 border-b">
                                {scheduleData[item.name] || "Schedule Not Available"}
                            </td>
                            <td className="py-4 px-6 border-b">{item.uuid}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Classes;
