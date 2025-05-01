import Constants from 'expo-constants';
import Axios from "axios";

const api = Axios.create({
    baseURL: process.env.EXPO_PUBLIC_BACKEND_URL
});

export default api;