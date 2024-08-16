import axios from "axios";

const request = async (method, header, url, payload, params) => {
    const token = localStorage.getItem('authToken');


    if (token) {
        header = {
            ...header,
            'Authorization': `Bearer ${token}`,
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
