import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { ToastContainer } from 'react-toastify';
import { GoogleLogin } from '@react-oauth/google';
import { CredentialResponse as GoogleCredentialResponse } from '@react-oauth/google';

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
};

type CredentialResponse = {
  credential?: string;
} & GoogleCredentialResponse;

type FormValues = {
  nome: string;
  email: string;
  password: string;
  confirmPassword?: string;
};

const INITIALSTATE = { email: '' };

export const Auth: React.FC<AuthProps> = ({ showAuthPainel, closeAuth }) => {
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

  const { login, loginGoogle, signup, selectedPrice } = useAuth();

  const paymentMethods = ['fasmapay', 'multicaixa', 'CASH'];
  const availableMethods = paymentMethods.filter((method) => method !== selectedPrice);

  const handleSumit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (typeof window !== 'undefined') {
      localStorage.setItem('profile', JSON.stringify(formData));
    }
    showToast({
      title: common.t('UNVAILABLE_PAYMENT_METHOD.title'),
      message: common.t('UNVAILABLE_PAYMENT_METHOD.message'),
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
        await authService.sendCode({ email: data.email });
        setShowAuth(true);
      } catch (error) {
        toast.error(common.t('AUTHENTICATION_INVALID.title'), {
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
        toast.error(common.t('AUTHENTICATION_INVALID.title'), {
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
          <div className={styles.main}>
            <div className={styles.top}>
              <button className={`${styles.btn} ${styles.outlinedBtn}`} onClick={handleClickKeepAsGuess}>
                {t('continue_as_guest')}
                <span></span>
              </button>
              <button className={styles.btnClose} onClick={closeAuth}>
                <FaTimes />
              </button>
            </div>
            <div className={styles.authInfo}>
              <h4>
                {selectedPrice?.name === 'CASH' ? t('pay_in') : t('pay_with')} {selectedPrice?.name}
              </h4>
              <p>{selectedPrice?.name === 'CASH' && t('cash_payment_description')}</p>
            </div>
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

              <button className={`${styles.btn} ${styles.outlinedBtn}`}>
                <i>
                  <img src={`/assets_ecommerce/svg/Apple.png`} alt="apple" />
                </i>
                {t('login_with_apple')}
                <span></span>
              </button>
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
