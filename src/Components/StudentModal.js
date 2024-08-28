import React, { useState, useEffect, useRef } from 'react';
import { FaTimes } from 'react-icons/fa';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import request from '../Services/ApiService';
import { BaseURL, HttpHeaders, HttpMethods } from '../Services/Constants';
import { FaRegFilePdf } from "react-icons/fa6";

function StudentModal({ isOpen, onClose, collectionId }) {
    const [collectionInfo, setCollectionInfo] = useState({ persons: [], name: '' });
    const pdfRef = useRef();

    useEffect(() => {
        const fetchCollectionInfo = async () => {
            if (isOpen && collectionId) {
                try {
                    const response = await request(
                        HttpMethods.get,
                        HttpHeaders.LuxandHeader,
                        `${BaseURL.getCollectionInfo}/${collectionId}`
                    );
                    setCollectionInfo(response);
                } catch (error) {
                    console.error('Failed to fetch collection info:', error);
                }
            }
        };

        fetchCollectionInfo();
    }, [isOpen, collectionId]);

    const handleDownloadPDF = async () => {
        const element = pdfRef.current;
        const canvas = await html2canvas(element, { scale: 2 });
        const imgData = canvas.toDataURL('image/png');

        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = 190;
        const pageHeight = 280;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 10;

        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }

        pdf.save('ClassInfo.pdf');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-xl w-full">
                <div className="flex justify-between items-center border-b px-6 py-4 bg-blue-600 rounded-t-lg">
                    <h2 className="text-xl font-semibold text-white">{collectionInfo.name || 'Class Information'}</h2>
                    <button onClick={onClose}>
                        <FaTimes className="text-white hover:text-gray-200"/>
                    </button>
                </div>
                <div className="p-6  max-h-fit" ref={pdfRef}>
                    <h2 className="text-xl font-semibold text-center pb-5 text-Black">{collectionInfo.name}</h2>
                    {collectionInfo.persons.length > 0 ? (
                        <div>
                            <table className="min-w-full bg-white text-left table-auto border-collapse shadow-lg">
                                <thead className="bg-gray-200">
                                <tr>
                                    <th className="py-3 px-4 border-b font-semibold text-gray-600">#</th>
                                    <th className="py-3 px-4 border-b font-semibold text-gray-600">Name</th>
                                    <th className="py-3 px-4 border-b font-semibold text-gray-600">UUID</th>
                                </tr>
                                </thead>
                                <tbody>
                                {collectionInfo.persons.map((person, index) => (
                                    <tr key={index} className="odd:bg-white even:bg-gray-50 hover:bg-gray-100">
                                        <td className="py-3 px-4 border-b">{index + 1}</td>
                                        <td className="py-3 px-4 border-b">{person.name}</td>
                                        <td className="py-3 px-4 border-b">{person.uuid}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            <h1 className="text-left font-semibold p-1">Number of
                                Students: {collectionInfo.persons.length}</h1>
                        </div>
                    ) : (
                        <div className="text-center py-2">
                            <p className="font-bold text-gray-600">No students enrolled in this course.</p>
                        </div>
                    )}
                </div>
                <div className="flex justify-center p-3 border-t bg-gray-100">
                    <button
                        onClick={handleDownloadPDF}
                        className="flex items-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700
                        focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out transform hover:scale-105"
                    >
                        <FaRegFilePdf className="text-xl"/>
                        <span>Download PDF</span>
                    </button>
                </div>

            </div>
        </div>
    );
}

export default StudentModal;
