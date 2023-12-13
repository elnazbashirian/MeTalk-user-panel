// axios.js
import axios from 'axios';
import router from "@/router";
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
instance.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (error.response.status === 401) {
        console.log("s4e1f65s1ef6es1f56")

        router.push("login").catch(()=>{});
    }
    return Promise.reject(error);
});
export default instance;
