import axios, { AxiosInstance } from 'axios';

const API_URL: string = process.env.REACT_APP_API_URL ?? 'http://localhost:3381/api';

export const ApiService: AxiosInstance = axios.create({
  baseURL: API_URL, // Tipado explicitamente como string
  timeout: 10000, // Duração do timeout
  headers: {
    'Content-Type': 'application/json', // Tipo de conteúdo
    Accept: 'application/json', // Tipo aceito
  },
});
