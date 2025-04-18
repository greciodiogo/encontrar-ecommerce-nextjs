import axios, { AxiosInstance } from 'axios';

const API_URL: string = process.env.NEXT_PUBLIC_API_PATH ?? 'https://encontrarshopping-api.up.railway.app';

export const ApiService: AxiosInstance = axios.create({
  baseURL: API_URL, // Tipado explicitamente como string
  timeout: 10000, // Duração do timeout
  headers: {
    'Content-Type': 'application/json', // Tipo de conteúdo
    Accept: 'application/json', // Tipo aceito
  },
});
