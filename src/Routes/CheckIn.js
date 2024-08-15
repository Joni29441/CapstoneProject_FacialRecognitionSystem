import React from 'react';

const CheckIn = () => {

    return (
        <div>
            <h1 className="text-3xl font-semibold mb-6 text-center">Attendance Check-In</h1>
            <iframe
                src="https://attendance.luxand.cloud/?token=db7be1e059fa4bf6c439c7e2ebd31e80"
                style={{ width: '100%', height: '900px', border: 'none' }}
                allow="camera"
                title="Attendance Check-In"
            ></iframe>
        </div>
    );
};
export default CheckIn;
