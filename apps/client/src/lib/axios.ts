import axios from 'axios';
import { cookies } from 'next/headers';
export const axiosAuthClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: { "Content-Type": "application/json" },
});

axiosAuthClient.interceptors.request.use(
    async (config) => {
        const cookieStore = await cookies()
        const token = cookieStore.get('token');
        // If token is present, add it to request's Authorization Header
        if (token) {
            if (config.headers) config.headers.Authorization = `Bearer ${token.value}`;
        }
        return config;
    },
    (error) => {
        // Handle request errors here
        return Promise.reject(error);
    }
);

axiosAuthClient.interceptors.response.use(
    (response) => {
        // Can be modified response
        return response;
    },
    (error) => {
        // Handle response errors here
        return Promise.reject(error);
    }
);
