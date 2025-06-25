import Router from 'next/router';
import { parseCookies, setCookie } from 'nookies';
import { createContext, ReactNode, useState, useEffect } from 'react';

import { AuthService } from 'lib/login';
import { AuthContextType, DecodedPayload } from 'types/context';
import { PaymentMethodList } from 'types/product';

type TokenProps = DecodedPayload | null;

type CookiesProps = {
  accessToken?: string;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState<PaymentMethodList | null>(null);
  const [user, setUser] = useState<DecodedPayload | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const authService = new AuthService();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const fetchUser = async () => {
    if (isLoading) {
      return; // Prevent multiple simultaneous calls
    }

    setIsLoading(true);
    try {
      const raw = await authService.getLoggedUser();

      const data: DecodedPayload = {
        id: raw.id,
        email: raw.email,
        name: `${raw.firstName ?? ''} ${raw.lastName ?? ''}`.trim(),
        role: raw.role,
        registered: raw.registered,
      };
      setUser(data);
      setIsAuthenticated(true);
    } catch (error) {
      console.warn('Usuário não autenticado:', error);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Call fetchUser once on mount
  useEffect(() => {
    fetchUser();
  }, []);

  const refreshUser = async () => {
    await fetchUser();
  };

  const isDecodedPayload = (payload: unknown): payload is DecodedPayload => {
    return (
      typeof payload === 'object' &&
      payload !== null &&
      'name' in payload &&
      'email' in payload &&
      'picture' in payload &&
      typeof (payload as DecodedPayload).name === 'string' &&
      typeof (payload as DecodedPayload).email === 'string' &&
      typeof (payload as DecodedPayload).picture === 'string' &&
      (typeof (payload as DecodedPayload).exp === 'number' || (payload as DecodedPayload).exp === undefined) &&
      (typeof (payload as DecodedPayload).iat === 'number' || (payload as DecodedPayload).iat === undefined)
    );
  };

  const loginGoogle = (idToken: string) => {
    const base64Url = idToken.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');

    // Decodifica o JWT com suporte para UTF-8
    const decodedString = decodeURIComponent(
      atob(base64)
        .split('')
        .map((ch) => `%${ch.charCodeAt(0).toString(16).padStart(2, '0')}`)
        .join(''),
    );

    const decodedPayload: unknown = JSON.parse(decodedString);

    if (!isDecodedPayload(decodedPayload)) {
      throw new Error('Token inválido ou inesperado.');
    }

    const token = {
      ...decodedPayload,
    };

    setCookie(null, 'accessToken', JSON.stringify(token), {
      maxAge: 60 * 60 * 1, // 1 hora
    });

    setUser(token);
    setIsAuthenticated(true);
  };

  const login = async (data: { email: string; password: string }): Promise<boolean> => {
    try {
      const response = await authService.login({
        email: data.email,
        password: data.password,
      });

      // The server sets the token as an HTTP-only cookie automatically
      // We just need to fetch the user details to update the state
      const userData = await authService.getLoggedUser();
      const userInfo: DecodedPayload = {
        id: userData.id,
        email: userData.email,
        name: `${userData.firstName ?? ''} ${userData.lastName ?? ''}`.trim(),
        role: userData.role,
        registered: userData.registered,
      };

      setUser(userInfo);
      setIsAuthenticated(true);

      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const signup = async (data: { firstName: string; email: string; password: string }): Promise<boolean> => {
    try {
      const response = await authService.signup({
        firstName: data.firstName,
        lastName: '',
        email: data.email,
        password: data.password,
      });

      // The server sets the token as an HTTP-only cookie automatically
      // We just need to fetch the user details to update the state
      const userData = await authService.getLoggedUser();
      const userInfo: DecodedPayload = {
        id: userData.id,
        email: userData.email,
        name: `${userData.firstName ?? ''} ${userData.lastName ?? ''}`.trim(),
        role: userData.role,
        registered: userData.registered,
      };

      setUser(userInfo);
      setIsAuthenticated(true);

      return true;
    } catch (error) {
      console.error('Signup error:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      // Call the logout endpoint to clear the server-side session
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    }

    // Clear local state
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isClient,
        isAuthenticated,
        selectedPrice,
        setSelectedPrice,
        login,
        signup,
        loginGoogle,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
