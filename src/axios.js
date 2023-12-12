// axios.js
import axios from 'axios';

const domain = 'https://www.api.metalk.online';

const instance = axios.create({
    domain,
    baseURL: domain,
    headers: {
        'accept-language': 'fa-IR',
    },
});

instance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default instance;
