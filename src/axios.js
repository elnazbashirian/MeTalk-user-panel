// axios.js
import axios from 'axios';
import router from './router'; // Import the Vue Router instance

const domain = 'http://api.metalk.online';

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
            return config;
        } else {
            // If no access token is found, redirect to the login page
            router.push({ path: '/login' });
            // You can also throw an error here or handle it according to your needs
            return Promise.reject('No access token found');
        }
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default instance;
