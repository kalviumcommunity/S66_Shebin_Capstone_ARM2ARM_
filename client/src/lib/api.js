import axios from "axios";

const TOKEN_KEY = "arm2arm_token";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

export const getAuthToken = () => localStorage.getItem(TOKEN_KEY);

export const setAuthToken = (token) => {
    if (token) {
        localStorage.setItem(TOKEN_KEY, token);
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        localStorage.removeItem(TOKEN_KEY);
        delete api.defaults.headers.common["Authorization"];
    }
};

export const clearAuthToken = () => setAuthToken(null);

const storedToken = getAuthToken();
if (storedToken) {
    api.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
}

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            clearAuthToken();
        }
        return Promise.reject(error);
    }
);

export default api;