import { GoogleLogin } from '@react-oauth/google';
import { CredentialResponse as GoogleCredentialResponse } from '@react-oauth/google';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

import { useAuth } from 'hooks/useAuth';
import styles from 'styles/home/auth.module.css';

type AuthProps = {
  showAuthPainel?: boolean;
  closeAuth?: () => void;
  isSignIn?: boolean;
};

type CredentialResponse = {
  credential: string; // Garantimos que o tipo seja string no uso
  // select_by?: string; // Algumas respostas podem incluir isso
  // clientId?: string; // ID do cliente, se for incluído na resposta
} & GoogleCredentialResponse;

const INITIALSTATE = { nome: '', email: '', password: '', confirmPassword: '' };

export const Auth: React.FC<AuthProps> = ({ showAuthPainel, closeAuth }) => {
  const url = 'assets_ecommerce';
  const [formData, setFormData] = useState(INITIALSTATE);
  const [isSignIn, setIsSignIn] = useState<boolean>(true);
  const router = useRouter();
  const { loginGoogle } = useAuth();

  const amIinCartRoute = router.pathname.startsWith('/cart');

  const handleSumit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (typeof window !== 'undefined') {
      localStorage.setItem('profile', JSON.stringify(formData));
    }
    setFormData(INITIALSTATE);
    // void router.push('/checkoutPage');
  };

  const handleSignInClick = () => {
    setIsSignIn((state) => !state);
  };

  const handleGoogleLogin = (credentialResponse: CredentialResponse): void => {
    if (!credentialResponse.credential) {
      console.error('Credential is undefined!');
      return;
    }

    const tokenId: string = credentialResponse.credential;

    // Envolvemos a chamada assíncrona em uma função
    void (async () => {
      try {
        await loginGoogle(tokenId); // Função de login
        closeAuth();
        if (amIinCartRoute) {
          void router.push('/checkout');
        }
      } catch (error) {
        console.error('Login failed:', error);
      }
    })();
  };

  return (
    <div className={`${styles.auth} ${showAuthPainel ? styles.active : ''}`}>
      <div className={styles.container}>
        <div className={styles.top}>
          <button className={isSignIn ? styles.active : ''} onClick={handleSignInClick}>
            Sign In
          </button>
          <button className={!isSignIn ? styles.active : ''} onClick={handleSignInClick}>
            Sign Up
          </button>
          <button className={styles.btnClose} onClick={closeAuth}>
            <FaTimes />
          </button>
        </div>
        <div className={styles.main}>
          <form className={styles.authForm} onSubmit={handleSumit} autoComplete="off" noValidate>
            {!isSignIn && (
              <>
                <label htmlFor="email">Nome</label>
                <input
                  className={styles.field}
                  type="text"
                  placeholder="Nome"
                  name="nome"
                  value={formData.nome}
                  onChange={(event) => setFormData({ ...formData, nome: event.target.value })}
                />
              </>
            )}
            <label htmlFor="email">Email Address</label>
            <input
              className={styles.field}
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={(event) => setFormData({ ...formData, email: event.target.value })}
            />
            <div className={styles.row}>
              <label htmlFor="password">Password</label>
              {isSignIn && <button>Forget Password</button>}
            </div>
            <input
              className={styles.field}
              type="password"
              placeholder="8+ characters"
              name="password"
              value={formData.password}
              onChange={(event) => setFormData({ ...formData, password: event.target.value })}
            />
            {!isSignIn && (
              <>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  className={styles.field}
                  type="password"
                  placeholder="confirm password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={(event) => setFormData({ ...formData, confirmPassword: event.target.value })}
                />
              </>
            )}
            <button className={styles.btn}>{isSignIn ? 'Login' : 'Criar Conta'}</button>
            <span className={styles.divisor}>ou</span>
            <GoogleLogin onSuccess={handleGoogleLogin} onError={() => console.error('Erro ao logar com Google')}>
              <button className={`${styles.btn} ${styles.outlinedBtn}`}>
                <i>
                  <img src={`${url}/svg/Google.png`} alt="star" />
                </i>
                Login with Google
                <span></span>
              </button>
            </GoogleLogin>
            <button className={`${styles.btn} ${styles.outlinedBtn}`}>
              <i>
                <img src={`${url}/svg/Apple.png`} alt="star" />
              </i>
              Login with Apple
              <span></span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
