import { ApiService } from 'services/apiService';
import {
  SignInRequestDTO,
  SignInResponseDTO,
  RegisterUserDTO,
  SignUpRequestDTO,
  ApiResponse,
  SendCodeRequestDTO,
  VerifyCodeDTO,
} from 'types/user';
import { buildQueryString } from 'utils/buildQueryString';

import { StorageService } from './storage';
import { LoggedUserDto } from 'types/context';

export class AuthService {
  auth = new StorageService();

  async login(credentials: SignInRequestDTO): Promise<SignInResponseDTO> {
    const response = (await ApiService.post('/auth/login', credentials)) as { data: SignInResponseDTO };
    return response;
  }

  async signup(credentials: SignUpRequestDTO): Promise<string> {
    const response = (await ApiService.post('/auth/register', credentials)) as { data: SignInResponseDTO };
    return response;
  }

  async sendCode(credentials: SendCodeRequestDTO): Promise<string> {
    const response = (await ApiService.post('/auth/send-verification-code', credentials)) as {
      data: SignInResponseDTO;
    };
    return response;
  }
  async verifyCode(credentials: VerifyCodeDTO): Promise<string> {
    const response = (await ApiService.post('/auth/verify-code', credentials)) as { data: SignInResponseDTO };
    return response;
  }

  async fetchUsers(queryString: string) {
    const response = await ApiService.get(`/users?${queryString}`);

    return response.data;
  }

  async getLoggedUser(): Promise<LoggedUserDto> {
    const response = (await ApiService.get(`/users/me`, { withCredentials: true })) as { data: LoggedUserDto };
    return response.data;
  }

  async logout(): Promise<LoggedUserDto> {
    const response = (await ApiService.post(`/auth/logout`, { withCredentials: true })) as { data: LoggedUserDto };
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
