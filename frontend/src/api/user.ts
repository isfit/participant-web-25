import { ROLES } from '../config/roles';
import axiosInstance from './axios';

const api_url: string = import.meta.env.VITE_API_URL;

export const register = async (
  fullName: string,
  email: string,
  password: string,
) => {
  const data = JSON.stringify({
    fullName: fullName,
    email: email,
    password: password,
    role: ROLES.USER,
  });
  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${api_url}/auth/register`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };

  try {
    await axiosInstance.request(config);
    return { success: true };
  } catch (error: any) {
    const message =
    error.response?.data?.errors?.[0]?.msg ?? 'Network error. Please try again later.';
    return { success: false, message };
  }
};
