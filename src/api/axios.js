import axios from "axios";
const BASE_URL = "https://localhost:8000";

export default axios.create({
    baseURL: BASE_URL
});

// will be used to attach the jwt tokens to it with interceptors
export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
});