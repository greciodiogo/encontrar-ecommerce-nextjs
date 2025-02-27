import { AxiosError } from 'axios';

export const formatErrors = (error: AxiosError | Error): void => {
  if ('response' in error && error.response) {
    console.error('API Error:', error.response.data);
  } else {
    console.error('Erro desconhecido:', error.message);
  }
};
