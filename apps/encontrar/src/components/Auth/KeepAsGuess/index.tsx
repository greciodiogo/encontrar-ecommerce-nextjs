import { GoogleLogin } from '@react-oauth/google';
import { CredentialResponse as GoogleCredentialResponse } from '@react-oauth/google';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';

import { useAuth } from 'hooks/useAuth';
import { toastProps } from 'shared/components/Toast/ToastContainer';
import { showToast } from 'shared/hooks/showToast';
import styles from 'styles/home/auth.module.css';

type CredentialResponse = {
  credential?: string;
} & GoogleCredentialResponse;

const INITIALSTATE = { nome: '', email: '', password: '', confirmPassword: '' };

export const AuthPage: React.FC = () => {
  const { t } = useTranslation('auth');
  const common = useTranslation('common');
  const [formData, setFormData] = useState(INITIALSTATE);
  const [isSignIn, setIsSignIn] = useState<boolean>(true);
  const router = useRouter();
  const { loginGoogle } = useAuth();

  const handleSumit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    showToast({
      title: common.t('UNVAILABLE_PAYMENT_METHOD.title'),
      message: common.t('UNVAILABLE_PAYMENT_METHOD.message'),
    });
    if (typeof window !== 'undefined') {
      localStorage.setItem('profile', JSON.stringify(formData));
    }
    setFormData(INITIALSTATE);
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

    try {
      loginGoogle(tokenId);
      void router.push('/');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className={styles.authPage}>
      <div className={styles.authContainer}>
        <div className={styles.top}>
          <button className={isSignIn ? styles.active : ''} onClick={handleSignInClick}>
            {t('sign_in')}
          </button>
          <button className={!isSignIn ? styles.active : ''} onClick={handleSignInClick}>
            {t('sign_up')}
          </button>
        </div>
        <ToastContainer {...toastProps} />
        <div className={styles.main}>
          <form className={styles.authForm} onSubmit={handleSumit} autoComplete="off" noValidate>
            {!isSignIn && (
              <>
                <label htmlFor="nome">{t('name')}</label>
                <input
                  className={styles.field}
                  type="text"
                  placeholder={t('name')}
                  name="nome"
                  value={formData.nome}
                  onChange={(event) => setFormData({ ...formData, nome: event.target.value })}
                />
              </>
            )}
            <label htmlFor="email">{t('email')}</label>
            <input
              className={styles.field}
              type="email"
              placeholder={t('email')}
              name="email"
              value={formData.email}
              onChange={(event) => setFormData({ ...formData, email: event.target.value })}
            />
            <div className={styles.row}>
              <label htmlFor="password">{t('password')}</label>
              {isSignIn && <button>{t('forgot_password')}</button>}
            </div>
            <input
              className={styles.field}
              type="password"
              placeholder={t('password_placeholder')}
              name="password"
              value={formData.password}
              onChange={(event) => setFormData({ ...formData, password: event.target.value })}
            />
            {!isSignIn && (
              <>
                <label htmlFor="confirmPassword">{t('confirm_password')}</label>
                <input
                  className={styles.field}
                  type="password"
                  placeholder={t('confirm_password')}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={(event) => setFormData({ ...formData, confirmPassword: event.target.value })}
                />
              </>
            )}
            <button className={styles.btn}>{isSignIn ? t('login') : t('create_account')}</button>
            <span className={styles.divisor}>{t('or')}</span>
            <GoogleLogin onSuccess={handleGoogleLogin} onError={() => console.error(t('google_login_error'))} />
            <button className={`${styles.btn} ${styles.outlinedBtn}`}>
              <i>
                <img src={`/assets_ecommerce/svg/Apple.png`} alt="star" />
              </i>
              {t('login_with_apple')}
              <span></span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
