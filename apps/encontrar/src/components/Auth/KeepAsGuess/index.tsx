import { TextField } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { GoogleLogin } from '@react-oauth/google';
import { CredentialResponse as GoogleCredentialResponse } from '@react-oauth/google';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import React, { useState } from 'react';
import { Control, FieldErrors, FieldValues, Path, useForm } from 'react-hook-form';
import { Controller } from 'react-hook-form';

import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';

import { useAuth } from 'hooks/useAuth';
import { toastProps } from 'shared/components/Toast/ToastContainer';
import { showToast } from 'shared/hooks/showToast';
import styles from 'styles/home/auth.module.css';
import { validationSchema } from 'utils/validationSchema';

type CredentialResponse = {
  credential?: string;
} & GoogleCredentialResponse;

const INITIALSTATE = { nome: '', email: '', password: '', confirmPassword: '' };

export const AuthPage: React.FC = () => {
  const { t } = useTranslation('auth');
  const common = useTranslation('common');
  const [isSignIn, setIsSignIn] = useState<boolean>(true);
  const router = useRouter();
  const { login, loginGoogle } = useAuth();

  const handleSignInClick = () => {
    setIsSignIn((state) => !state);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema.login),
    mode: 'all', // Validação ocorre ao sair do campo
  });

  const onHandleSubmit = async (data: { email: string; password: string }): Promise<void> => {
    try {
      const isCredentializedUser = await toast.promise(
        login({
          email: data.email,
          password: data.password,
        }),
        {
          pending: common.t('AUTHENTICATION_PENDING.title'),
        },
        {
          position: 'top-right',
          hideProgressBar: false,
          autoClose: 1000,
        },
      );

      if (isCredentializedUser) {
        const success_str: string = common.t('AUTHENTICATION_SUCCESS.title');
        toast.success(success_str, {
          position: 'top-right',
          autoClose: 1000,
        });
      } else {
        const error_str: string = common.t('AUTHENTICATION_INVALID.title');
        toast.error(error_str, {
          position: 'top-right',
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleFormSubmit = async (data: { email: string; password: string }) => {
    try {
      await onHandleSubmit(data); // Chama a função assíncrona diretamente
    } catch (err) {
      console.error('Erro ao processar o formulário:', err);
    }
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
          <form className={styles.authForm} onSubmit={(event) => void handleSubmit(handleFormSubmit)(event)}>
            {!isSignIn && (
              <>
                <label htmlFor="nome">{t('name')}</label>
                <ControlledTextField
                  name="nome"
                  placeholder={t('name')}
                  className={styles.field}
                  type="text"
                  control={control}
                  errors={errors}
                />
              </>
            )}
            <label htmlFor="email">{t('email')}</label>
            <ControlledTextField
              name="email"
              placeholder={t('email')}
              className={styles.field}
              type="email"
              control={control}
              errors={errors}
            />
            <div className={styles.row}>
              <label htmlFor="password">{t('password')}</label>
              {isSignIn && <button>{t('forgot_password')}</button>}
            </div>
            <ControlledTextField
              name="password"
              placeholder={t('password_placeholder')}
              className={styles.field}
              type="password"
              control={control}
              errors={errors}
            />
            {!isSignIn && (
              <>
                <label htmlFor="confirmPassword">{t('confirm_password')}</label>
                <ControlledTextField
                  name="confirmPassword"
                  placeholder={t('confirm_password')}
                  className={styles.field}
                  type="password"
                  control={control}
                  errors={errors}
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

type ControlledTextFieldProps<T extends FieldValues> = {
  name: Path<T>; // Garante que `name` seja uma chave válida de `T`
  placeholder: string;
  type?: string;
  control: Control<T>; // `T` é inferido do formulário
  errors: FieldErrors<T>;
  className?: string;
};

export const ControlledTextField = <T extends FieldValues>({
  name,
  type = 'text',
  placeholder,
  control,
  errors,
  className,
  ...props
}: ControlledTextFieldProps<T>) => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => (
      <input {...field} id={name} name={name} type={type} placeholder={placeholder} className={className} {...props} />
    )}
  />
);
