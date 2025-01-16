import axiosInstance from './axiosInstance';

export const login = async (data) => axiosInstance.post('/auth/login', data);
export const register = async (data) => axiosInstance.post('/auth/register', data);