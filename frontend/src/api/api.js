import axios from "axios";

console.log("BACKEND URL:", import.meta.env.VITE_BACKEND_URL);

export const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true,
});