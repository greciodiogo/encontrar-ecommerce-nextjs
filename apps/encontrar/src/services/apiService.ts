import axios, { AxiosError, AxiosResponse } from 'axios';

import { formatErrors } from 'utils/formatErrors';

export const BASE_URL = process.env.NEXT_PUBLIC_API_PATH;

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Permite que os cookies sejam enviados e armazenados
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Don't redirect for /users/me, /auth/login, /auth/send-verification-code, or /auth/register endpoints
      const shouldNotRedirect = ['/users/me', '/auth/login', '/auth/send-verification-code', '/auth/register'].some(
        (endpoint) => error.config?.url?.includes(endpoint),
      );

      if (!shouldNotRedirect && typeof window !== 'undefined') {
        localStorage.removeItem('accessToken');
        // Redirect to login page
        window.location.href = '/auth';
      }
    }
    return Promise.reject(error);
  },
);

// Ajuste o ApiService para aceitar tipos genéricos
export const ApiService = {
  get: <T = unknown>(url: string, params = {}): Promise<AxiosResponse<T>> => api.get(url, { params }),
  post: <T = unknown>(url: string, data = {}): Promise<AxiosResponse<T>> => api.post(url, data),
  put: <T = unknown>(url: string, data = {}): Promise<AxiosResponse<T>> => api.put(url, data),
  delete: <T = unknown>(url: string, params = {}): Promise<AxiosResponse<T>> => api.delete(url, { params }),
};
