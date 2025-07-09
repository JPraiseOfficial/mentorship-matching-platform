import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: true
})

export const loginUser = async (email: string, password: string) => {
    const response = await API.post('/auth/login', {email, password})
    return response.data
};