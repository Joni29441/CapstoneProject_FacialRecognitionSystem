import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

export const PDFComponent = () => {
    const targetRef = useRef(); // Create a reference to the content

    const handlePrint = useReactToPrint({
        content: () => targetRef.current,
        documentTitle: 'page',
    });

    return (
        <div>
            <button
                onClick={handlePrint}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 mb-4"
            >
                Download PDF
            </button>
            <div ref={targetRef} className="p-6 bg-white shadow-md rounded-lg">
                <h2 className="text-2xl font-semibold text-gray-800">Content to be generated to PDF</h2>
                <p className="mt-4 text-gray-600">
                    This is the content that will be included in the generated PDF.
                    You can include any text, images, or other components you want to appear in the PDF.
                </p>
            </div>
        </div>
    );
};
