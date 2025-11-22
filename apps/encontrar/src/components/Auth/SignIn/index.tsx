import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { ToastContainer } from 'react-toastify';
import { GoogleLogin } from '@react-oauth/google';
import { CredentialResponse as GoogleCredentialResponse } from '@react-oauth/google';

import FacebookLogin from '@greatsumini/react-facebook-login';
import { validationSchema } from 'utils/validationSchema';
import { VerifyEmail } from '../VerifyEmail';
import { AuthService } from 'lib/login';
import { toast } from 'react-toastify';

import { toastProps } from 'shared/components/Toast/ToastContainer';
import { showToast } from 'shared/hooks/showToast';
import styles from 'styles/home/auth.module.css';

import { useAuth } from './../../../hooks/useAuth';
import { Control, Controller, FieldErrors, FieldValues, Path, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

type AuthProps = {
  showAuthPainel?: boolean;
  closeAuth: () => void;
  isSignIn?: boolean;
  redirectToCheckout?: boolean;
};

type CredentialResponse = {
  credential?: string;
} & GoogleCredentialResponse;

type FormValues = {
  nome?: string;
  email: string;
  password: string;
  confirmPassword?: string;
};

const INITIALSTATE = { email: '' };

export const Auth: React.FC<AuthProps> = ({ showAuthPainel, closeAuth, redirectToCheckout = false }) => {
  const { t } = useTranslation('auth');
  const [isSignup, setIsSignup] = useState<boolean>(false); // Começa com login
  const common = useTranslation('common');
  const authService = new AuthService();
  const [showAuth, setShowAuth] = useState(false);
  const [formData, setFormData] = useState(INITIALSTATE);
  const [pendingSignupData, setPendingSignupData] = useState<FormValues | null>(null);

  const router = useRouter();
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

  const { login, loginGoogle, loginFacebook, signup, selectedPrice } = useAuth();

  const paymentMethods = ['multicaixa', 'CASH'];
  const availableMethods = paymentMethods.filter((method) => method !== selectedPrice?.name);

  const handleSumit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (typeof window !== 'undefined') {
      localStorage.setItem('profile', JSON.stringify(formData));
    }
    showToast({
      title: String(common.t('UNVAILABLE_PAYMENT_METHOD.title')),
      message: String(common.t('UNVAILABLE_PAYMENT_METHOD.message')),
    });
    setFormData(INITIALSTATE);
  };

  const handleClickKeepAsGuess = () => {
    void router.push('/checkout');
  };

  const handleFormSubmit = async () => {
    const data = getValues();
    setEmail(data.email);
    if (isSignup) {
      // Armazena os dados e envia o código de verificação
      setPendingSignupData(data);
      try {
        await toast.promise(
          authService.sendCode({ email: data.email }),
          {
            pending: String(common.t('AUTHENTICATION_PENDING.title')),
            success: String(common.t('AUTHENTICATION_CODE_SENT.title')),
            error: {
              render({ data: error }) {
                const err = error as any;
                console.log('sendCode error:', err?.response?.data, err?.message, err);
                const errorMessage = err?.response?.data?.message || err?.message || '';
                if (
                  errorMessage.includes('already exists') ||
                  errorMessage.includes('já existe') ||
                  errorMessage.includes('user exists') ||
                  errorMessage.includes('Usuário já existe') ||
                  errorMessage.includes('conflict on email')
                ) {
                  return 'Já existe um usuário com esse email';
                }
                return String(common.t('AUTHENTICATION_EMAIL_INVALID.title'));
              },
            },
          },
          {
            position: 'top-right',
            autoClose: 3000,
          },
        );
        setShowAuth(true);
      } catch (error) {
        // No need for additional toast here, handled by toast.promise
      }
    } else {
      // Processo de login direto
      try {
        const result = await toast.promise(
          login({ email: data.email, password: data.password }),
          {
            pending: String(common.t('AUTHENTICATION_PENDING.title')),
          },
          {
            position: 'top-right',
            autoClose: 1000,
          },
        );

        if (result) {
          toast.success(String(common.t('AUTHENTICATION_SUCCESS.title')), {
            position: 'top-right',
            autoClose: 1000,
          });
          const redirectPath = redirectToCheckout ? '/checkout' : '/';
          void router.push(redirectPath);
        } else {
          toast.error(String(common.t('AUTHENTICATION_INVALID.title')), {
            position: 'top-right',
            autoClose: 3000,
          });
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
  const handleGoogleLogin = (credentialResponse: CredentialResponse): void => {
    if (!credentialResponse.credential) {
      console.error('Credential is undefined!');
      return;
    }

    try {
      loginGoogle(credentialResponse.credential);
      const redirectPath = redirectToCheckout ? '/checkout' : '/';
      void router.push(redirectPath);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const authenticate = (response: any) => {
    console.log(response);
    // Api call to server so we can validate the token
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
          pending: String(common.t('AUTHENTICATION_PENDING.title')),
        },
        {
          position: 'top-right',
          autoClose: 1000,
        },
      );

      if (result) {
        toast.success(String(common.t('AUTHENTICATION_SUCCESS.title')), {
          position: 'top-right',
          autoClose: 1000,
        });
        setShowAuth(false);
        setPendingSignupData(null);
        const redirectPath = redirectToCheckout ? '/checkout' : '/';
        void router.push(redirectPath);
      } else {
        toast.error(String(common.t('AUTHENTICATION_INVALID.title')), {
          position: 'top-right',
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error('Erro no signup:', error);
    }
  };

  return (
    <>
      <div className={`${styles.auth} ${showAuthPainel ? styles.active : ''}`}>
        <div className={styles.authContainer}>
          <div className={styles.top}>
            <button className={!isSignup ? styles.active : ''} onClick={() => setIsSignup(false)}>
              {t('sign_in')}
            </button>
            <button className={isSignup ? styles.active : ''} onClick={() => setIsSignup(true)}>
              {t('sign_up')}
            </button>
            <button className={styles.btnClose} onClick={closeAuth}>
              <FaTimes />
            </button>
          </div>

          <div className={styles.main}>
            <ToastContainer {...toastProps} />
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

            {!isSignup && (
              <div className={styles.guestSection}>
                <span className={styles.divider}></span>
                <button className={`${styles.btn} ${styles.guestBtn}`} onClick={handleClickKeepAsGuess}>
                  {t('continue_as_guest')}
                </button>
              </div>
            )}
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
