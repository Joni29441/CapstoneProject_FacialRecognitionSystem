import axios from "axios";

const request = async (method, header, url, payload, params) => {
    const token = localStorage.getItem('authToken');

    console.log("Retrieved token:", token); // Debug: Log the token

    // Dynamically add the Authorization header if a token exists
    if (token) {
        header = {
            ...header, // Spread the existing headers
            'Authorization': `Bearer ${token}`, // Add or overwrite the Authorization header
        };
    }

    try {
        const options = {
            method: method,
            headers: header,
            url: url,
            data: payload,
            params: params,
        };

        console.log("Request Headers:", options.headers); // Debug: Check the headers

        const response = await axios(options);

        if (response.data) {
            return response.data.data || response.data;
        } else {
            return response;
        }
    } catch (error) {
        console.error("API request error:", error);
        throw error;
    }
};

export default request;
