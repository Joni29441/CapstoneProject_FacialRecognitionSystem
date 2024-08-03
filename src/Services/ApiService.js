import axios from "axios";

const request = async (method, header, url, payload, params) => {
    try {
        const options = {
            method: method,
            headers:header,
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
        throw error;
    }
};

export default request;