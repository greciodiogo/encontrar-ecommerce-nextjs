export type Perfil = {
  name: string;
};

export type Loja = {
  nome: string;
};

export type Direccao = {
  designacao: string;
};

export type SignInRequestDTO = {
  email: string;
  password: string;
};

export type GetUsersParams = Record<string, string | number | boolean>;

export type GetUserDTO = {
  name?: string;
  username?: string;
  telefone?: string;
  email?: string;
  perfil?: Array<Perfil>; // Um array de objetos do tipo Perfil
  is_actived?: string; // Opcional
  loja?: Loja; // Opcional
  direccao?: Direccao; // Opcional
  created_at: string;
  updated_at: string;
};

export type Token = {
  token: string;
};

export type DataResponse = {
  token: Token;
};

export type GetUserResponse = {
  data: GetUserDTO;
};

export type ApiResponse = {
  data: DataResponse;
};

export type SignInResponseDTO = ApiResponse;

export type RegisterUserDTO = {
  name?: string;
  telefone?: string;
  email?: string;
  role_id?: string;
  is_actived?: boolean;
  loja_id?: number; // Um array de objetos do tipo Perfil
  username?: string;
  password?: string;
  password_confirmation?: string;
  direccao_id?: number; // Opcional
};
