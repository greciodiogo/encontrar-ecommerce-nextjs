import { parseCookies, setCookie } from 'nookies';
import { createContext, ReactNode, useState, useEffect } from 'react';

import { AuthContextType, DecodedPayload } from 'types/context';

type TokenProps = DecodedPayload | null;

type CookiesProps = {
  accessToken?: string;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState('CASH');
  const [user, setUser] = useState<DecodedPayload | null>(null); // const authService = new AuthService();
  const [isClient, setIsClient] = useState(false);
  // const [username, setUsername] = useState('Guest');

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const updateUserFromCookies = () => {
      const cookies: CookiesProps = parseCookies();
      const token = cookies.accessToken;

      if (token) {
        try {
          const data = JSON.parse(token) as TokenProps;
          setIsAuthenticated(true);
          setUser(data);
          // setUsername(data.name.split(' ')[0]); // Atualiza o nome
        } catch (error) {
          console.error('Token inválido:', error);
        }
      } else {
        setIsAuthenticated(false);
        setUser(null);
        // setUsername('Guest');
      }
    };

    updateUserFromCookies();

    // Reexecuta quando os cookies mudam
    const interval = setInterval(updateUserFromCookies, 1000); // Verifica os cookies a cada 1s

    return () => clearInterval(interval); // Limpa ao desmontar
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

  const logout = () => {
    localStorage.removeItem('accessToken');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, isClient, isAuthenticated, selectedPrice, setSelectedPrice, loginGoogle, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
