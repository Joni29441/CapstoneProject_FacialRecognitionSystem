// src/Services/ApiService.js
import axios from 'axios';

const request = async (method, headers, url, payload, params) => {


    try {
        const options = {
            method: method,
            headers: headers,
            url: url,
            data: payload,
            params: params,
        };

        const token = localStorage.getItem('authToken');
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await axios(options);

        console.log('Request options:', options); // Log the request options
        console.log('Response:', response); // Log the full response

        if (response.status >= 200 && response.status < 300) {
            return {
                ok: true,
                ...response.data // Ensure this spreads the correct fields
            };
        } else {
            return {
                ok: false,
                ...response.data
            };
        }
    } catch (error) {
        console.log('Request error:', error); // Log the error
        throw error;
    }
};

export default request;
