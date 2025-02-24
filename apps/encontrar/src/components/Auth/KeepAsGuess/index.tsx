import { GoogleLogin } from '@react-oauth/google';
import { CredentialResponse as GoogleCredentialResponse } from '@react-oauth/google';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import { useAuth } from 'hooks/useAuth';
import styles from 'styles/home/auth.module.css';

type CredentialResponse = {
  credential?: string; // Garantimos que o tipo seja string no uso
  // select_by?: string; // Algumas respostas podem incluir isso
  // clientId?: string; // ID do cliente, se for incluído na resposta
} & GoogleCredentialResponse;

const INITIALSTATE = { nome: '', email: '', password: '', confirmPassword: '' };

export const AuthPage: React.FC = () => {
  const url = '/assets_ecommerce';
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

  const handleClickKeepAsGuess = () => {
    void router.push('/checkout');
  };

  const handleGoogleLogin = (credentialResponse: CredentialResponse): void => {
    if (!credentialResponse.credential) {
      console.error('Credential is undefined!');
      return;
    }

    const tokenId: string = credentialResponse.credential;

    // Envolvemos a chamada assíncrona em uma função
    try {
      loginGoogle(tokenId); // Função de login
      if (amIinCartRoute) {
        void router.push('/checkout');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className={styles.authPage}>
      <div className={styles.authContainer}>
        <div className={styles.top}>
          <button className={isSignIn ? styles.active : ''} onClick={handleSignInClick}>
            Sign In
          </button>
          <button className={!isSignIn ? styles.active : ''} onClick={handleSignInClick}>
            Sign Up
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
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => console.error('Erro ao logar com Google')}
            ></GoogleLogin>
            <button className={`${styles.btn} ${styles.outlinedBtn}`} onClick={handleClickKeepAsGuess}>
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
