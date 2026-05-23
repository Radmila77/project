import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim() || '/api';

const api = axios.create({
    baseURL: apiBaseUrl,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

export default api;
