import axios, { AxiosInstance } from "axios";

export const useSecuredAxios = (): AxiosInstance => {
    const INSTANCE_NAME = import.meta.env.VITE_RAYNET_INSTANCE_NAME; 
    const USER_EMAIL = import.meta.env.VITE_RAYNET_USER_EMAIL;
    const API_KEY = import.meta.env.VITE_RAYNET_API_KEY;

    const axiosInstance = axios.create({
        baseURL: `https://app.raynet.cz/api/v2`,
        headers: {
        "X-Instance-Name": INSTANCE_NAME,
        "Authorization": `Basic ${btoa(`${USER_EMAIL}:${API_KEY}`)}`,
        "Content-Type": "application/json",
        "Accept": "application/json",
        },
    });

    axiosInstance.interceptors.response.use(
        (response) => response,
        (error) => {
        if (error.response?.status === 401) {
            console.error("Chyba autentizace: Zkontroluj API klíč nebo Instance Name.");
        }
        return Promise.reject(error);
        }
    );

  return axiosInstance;
};
