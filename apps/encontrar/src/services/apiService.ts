import axios, { AxiosError, AxiosResponse } from 'axios';

import { formatErrors } from 'utils/formatErrors';
import { getToken } from 'utils/getToken';

export const BASE_URL = 'https://api.encontrarshopping.com';

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Permite que os cookies sejam enviados e armazenados
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

api.interceptors.request.use(
  async (config) => {
    const token = await getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    if (error instanceof AxiosError || error instanceof Error) {
      formatErrors(error);
      return Promise.reject(error);
    }
    return Promise.reject(new Error('Erro desconhecido na requisição.'));
  },
);

// Ajuste o ApiService para aceitar tipos genéricos
export const ApiService = {
  get: <T = unknown>(url: string, params = {}): Promise<AxiosResponse<T>> => api.get(url, { params }),
  post: <T = unknown>(url: string, data = {}): Promise<AxiosResponse<T>> => api.post(url, data),
  put: <T = unknown>(url: string, data = {}): Promise<AxiosResponse<T>> => api.put(url, data),
  delete: <T = unknown>(url: string, params = {}): Promise<AxiosResponse<T>> => api.delete(url, { params }),
};
