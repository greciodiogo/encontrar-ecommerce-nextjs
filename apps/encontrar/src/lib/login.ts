import { ApiService } from 'services/apiService';
import { SignInRequestDTO, SignInResponseDTO, RegisterUserDTO, SignUpRequestDTO } from 'types/user';
import { buildQueryString } from 'utils/buildQueryString';

import { StorageService } from './storage';

export class AuthService {
  auth = new StorageService();

  async login(credentials: SignInRequestDTO): Promise<string> {
    const response = (await ApiService.post('/auth/login', credentials)) as { data: SignInResponseDTO };
    return response;
  }

  async signup(credentials: SignUpRequestDTO): Promise<string> {
    const response = (await ApiService.post('/auth/register', credentials)) as { data: SignInResponseDTO };
    return response;
  }

  async fetchUsers(queryString: string) {
    const response = await ApiService.get(`/users?${queryString}`);

    return response.data;
  }

  async getUsers(params: URLSearchParams) {
    const queryString = buildQueryString(params);

    return await this.fetchUsers(queryString);
  }

  async registerUser(formData: RegisterUserDTO): Promise<boolean> {
    await ApiService.post(`/users`, formData);

    return true;
  }
}
