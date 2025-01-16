import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use((config) => {
    // console.log('Request Config:', config);  // Log the config
    const token = localStorage.getItem('token');
    // console.log('Token:', token);  // Log token to ensure it is available
    if(token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)
export default axiosInstance;