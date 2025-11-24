import axios from 'axios';

const API = axios.create({
    baseURL: (import.meta.env.VITE_API_URL || "http://localhost:3000") + "/api",
    headers: {
        'Content-Type': 'application/json'
    },
    // withCredentials: true, // Uncomment if you’re using cookies
});

// Add token to Authorization header if it exists
API.interceptors.request.use(
    (req) => {
        const token = localStorage.getItem('token');
        if (token) {
            req.headers.Authorization = `Bearer ${token}`;
        }
        return req;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default API;
