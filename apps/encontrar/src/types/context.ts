export type AuthContextType = {
  isClient: boolean;
  isAuthenticated: boolean;
  user: DecodedPayload | null;
  loginGoogle: (idToken: string) => void;
  // login: (data: { username: string; password: string }) => Promise<boolean>;
  logout: () => void;
};

export type DecodedPayload = {
  name: string;
  email: string;
  picture: string;
  exp?: number;
  iat?: number;
  [key: string]: string | number | boolean | undefined;
};
