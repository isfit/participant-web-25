import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { AuthTokens } from '../types/types';

const axiosInstance = axios.create({
    baseURL: '/api',
});

axiosInstance.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem('authTokens');
        if (token) {
            const authTokens: AuthTokens = JSON.parse(token);
            const decodedToken = jwtDecode<{ exp: number }>(authTokens.accessToken);
            if (decodedToken.exp * 1000 < Date.now()) {
                // Refresh token logic
                const response = await axios.post<AuthTokens>('/api/refresh', {
                    refreshToken: authTokens.refreshToken,
                });
                const tokens = response.data;
                localStorage.setItem('authTokens', JSON.stringify(tokens));
                config.headers['Authorization'] = `Bearer ${tokens.accessToken}`;
            } else {
                config.headers['Authorization'] = `Bearer ${authTokens.accessToken}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;