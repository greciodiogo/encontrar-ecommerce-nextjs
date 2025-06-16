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
  const [user, setUser] = useState<DecodedPayload | null>(null); // const authService = new AuthService();
  const [isClient, setIsClient] = useState(false);
  // const [username, setUsername] = useState('Guest');
  const authService = new AuthService();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
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
      }
    };

    fetchUser();
  }, []);

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
    setIsAuthenticated(true); // Marca o usuário como autenticado
    // setUsername(token.name.split(' ')[0]); // Atualiza o nome do usuário

    // await Router.push('/dashboard'); // Aguarda a navegação antes de continuar
  };

  const login = async (data: { email: string; password: string }): Promise<boolean> => {
    const token = await authService.login({
      email: data.email,
      password: data.password,
    });

    // setCookie(null, 'accessToken', JSON.stringify(token), {
    //   maxAge: 60 * 60 * 1, // 1 hora
    // });

    setUser(token);
    setIsAuthenticated(true);

    await Router.push('/products'); // Aguarde a navegação antes de retornar

    return true;
  };

  const signup = async (data: { firstName: string; email: string; password: string }): Promise<boolean> => {
    const token = await authService.signup({
      firstName: data.firstName,
      lastName: '',
      email: data.email,
      password: data.password,
    });

    // setCookie(null, 'accessToken', JSON.stringify(token), {
    //   maxAge: 60 * 60 * 1, // 1 hora
    // });

    setUser(token);
    setIsAuthenticated(true);

    await Router.push('/products'); // Aguarde a navegação antes de retornar

    return true;
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, isClient, isAuthenticated, selectedPrice, setSelectedPrice, login, signup, loginGoogle, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
