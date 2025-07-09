import axios from "axios";
import type { ProfileFormData } from "../components/NewProfileForm";

const API = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: true
})

export const loginUser = async (email: string, password: string) => {
    const response = await API.post('/auth/login', {email, password});
    return response.data;
};

export const createProfile = async (data: ProfileFormData) => {
    const response = await API.post('/users/newprofile', {...data});
    return response.data;
}