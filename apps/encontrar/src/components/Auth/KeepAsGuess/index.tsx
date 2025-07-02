import { TextField } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { GoogleLogin } from '@react-oauth/google';
import { CredentialResponse as GoogleCredentialResponse } from '@react-oauth/google';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import React, { useState } from 'react';
import { Control, FieldErrors, FieldValues, Path, useForm } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import FacebookLogin from '@greatsumini/react-facebook-login';

import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';

import { useAuth } from 'hooks/useAuth';
import { toastProps } from 'shared/components/Toast/ToastContainer';
import { showToast } from 'shared/hooks/showToast';
import styles from 'styles/home/auth.module.css';
import { validationSchema } from 'utils/validationSchema';
import { VerifyEmail } from '../VerifyEmail';
import { AuthService } from 'lib/login';

type CredentialResponse = {
  credential?: string;
} & GoogleCredentialResponse;

type FormValues = {
  nome: string;
  email: string;
  password: string;
  confirmPassword?: string;
};

const INITIALSTATE = { firstName: '', email: '', password: '', confirmPassword: '' };

// IMPORTS (iguais aos seus)

export const AuthPage: React.FC = () => {
  const { t } = useTranslation('auth');
  const common = useTranslation('common');
  const [isSignup, setIsSignup] = useState<boolean>(false); // Começa com login
  const router = useRouter();
  const { login, loginGoogle, signup, loginFacebook } = useAuth();
  const authService = new AuthService();
  const [showAuth, setShowAuth] = useState(false);
  const [pendingSignupData, setPendingSignupData] = useState<FormValues | null>(null);
  const [email, setEmail] = useState('');
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(isSignup ? validationSchema.signup : validationSchema.login),
    mode: 'all',
  });

  const handleFormSubmit = async () => {
    const data = getValues();
    setEmail(data.email);
    if (isSignup) {
      // Armazena os dados e envia o código de verificação
      setPendingSignupData(data);
      try {
        await authService.sendCode({ email: data.email });
        setShowAuth(true);
      } catch (error) {
        toast.error(common.t('AUTHENTICATION_EMAIL_INVALID.title'), {
          position: 'top-right',
          autoClose: 3000,
        });
      }
    } else {
      // Processo de login direto
      try {
        const result = await toast.promise(
          login({ email: data.email, password: data.password }),
          {
            pending: common.t('AUTHENTICATION_PENDING.title'),
          },
          {
            position: 'top-right',
            autoClose: 1000,
          },
        );

        if (result) {
          toast.success(common.t('AUTHENTICATION_SUCCESS.title'), {
            position: 'top-right',
            autoClose: 1000,
          });
          void router.push('/');
        } else {
          toast.error(common.t('AUTHENTICATION_INVALID.title'), {
            position: 'top-right',
            autoClose: 3000,
          });
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const onVerifyCodeSuccess = async () => {
    if (!pendingSignupData) return;

    try {
      const result = await toast.promise(
        signup({
          firstName: pendingSignupData.nome!,
          email: pendingSignupData.email,
          password: pendingSignupData.password,
        }),
        {
          pending: common.t('AUTHENTICATION_PENDING.title'),
        },
        {
          position: 'top-right',
          autoClose: 1000,
        },
      );

      if (result) {
        toast.success(common.t('AUTHENTICATION_SUCCESS.title'), {
          position: 'top-right',
          autoClose: 1000,
        });
        setShowAuth(false);
        setPendingSignupData(null);
        void router.push('/');
      } else {
        toast.error(common.t('AUTHENTICATION_EMAIL_INVALID.title'), {
          position: 'top-right',
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error('Erro no signup:', error);
    }
  };

  const handleGoogleLogin = (credentialResponse: CredentialResponse): void => {
    if (!credentialResponse.credential) {
      console.error('Credential is undefined!');
      return;
    }

    try {
      loginGoogle(credentialResponse.credential);
      void router.push('/');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const authenticate = (response) => {
    console.log(response);
    // Api call to server so we can validate the token
  };

  return (
    <>
      <div className={styles.authPage} id="verify-email">
        <div className={styles.authContainer}>
          <div className={styles.top}>
            <button className={!isSignup ? styles.active : ''} onClick={() => setIsSignup(false)}>
              {t('sign_in')}
            </button>
            <button className={isSignup ? styles.active : ''} onClick={() => setIsSignup(true)}>
              {t('sign_up')}
            </button>
          </div>

          <ToastContainer {...toastProps} />

          <div className={styles.main}>
            <form className={styles.authForm} onSubmit={(event) => void handleSubmit(handleFormSubmit)(event)}>
              {isSignup && (
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
                {!isSignup && <button>{t('forgot_password')}</button>}
              </div>

              <ControlledTextField
                name="password"
                placeholder={t('password_placeholder')}
                className={styles.field}
                type="password"
                control={control}
                errors={errors}
              />

              {isSignup && (
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

              <button type="submit" className={styles.btn}>
                {isSignup ? t('create_account') : t('login')}
              </button>

              <span className={styles.divisor}>{t('or')}</span>

              <GoogleLogin onSuccess={handleGoogleLogin} onError={() => console.error(t('google_login_error'))} />

              {/* Facebook Login Button */}
              <FacebookLogin
                appId="1081193060565835"
                onSuccess={(response) => {
                  // Save Facebook user details
                  loginFacebook(response);
                  // Optionally redirect or show a toast
                  console.log('Login Success!', response);
                }}
                onFail={(error) => {
                  console.error('Login Failed!', error);
                }}
                onProfileSuccess={(profile) => {
                  console.log('Get Profile Success!', profile);
                }}
                style={{
                  backgroundColor: '#4267b2',
                  color: '#fff',
                  fontSize: '16px',
                  padding: '12px 24px',
                  border: 'none',
                  borderRadius: '4px',
                  width: '100%',
                  marginTop: 8,
                }}
              >
                Login Com Facebook
              </FacebookLogin>
            </form>
          </div>
        </div>
      </div>

      <VerifyEmail
        showAuthPainel={showAuth}
        closeAuth={() => setShowAuth(false)}
        email={email}
        onVerified={onVerifyCodeSuccess}
      />
    </>
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
