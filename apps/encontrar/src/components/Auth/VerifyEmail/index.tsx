import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import React, { useEffect, useState } from 'react';
// import { FaFacebook, FaShoppingCart, FaTimes, FaUser } from 'react-icons/fa';
import { FaArrowRight, FaTimes } from 'react-icons/fa';

import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import { toastProps } from 'shared/components/Toast/ToastContainer';

import styles from 'styles/home/auth.module.css';
import { AuthService } from 'lib/login';
import { validationSchema } from 'utils/validationSchema';
import { Control, Controller, FieldErrors, FieldValues, Path, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

type AuthProps = {
  showAuthPainel?: boolean;
  closeModal?: () => void;
  closeAuth?: () => void;
  onVerified: () => void;
  email: string;
  isSignIn?: boolean;
};

type FormValues = {
  code: string;
};

const INITIALSTATE_VERIFY = { code: '' };

export const VerifyEmail: React.FC<AuthProps> = ({ showAuthPainel, closeAuth, email, onVerified }) => {
  const { t } = useTranslation('auth');
  const common = useTranslation('common');
  const [formData, setFormData] = useState(INITIALSTATE_VERIFY);
  const router = useRouter();
  const authService = new AuthService();

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema.verifyCode),
    mode: 'all',
  });

  const handleFormSubmit = async () => {
    const data = getValues();

    try {
      const request = await authService.verifyCode({
        email: email,
        code: data.code,
      });

      if (!request) {
        alert('código inválido ou email inexistente');
        return;
      }

      onVerified();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={`${styles.auth} ${showAuthPainel ? styles.active : ''}`}>
      <div className={styles.authContainer}>
        <div className={styles.main}>
          <div className={styles.top}>
            <button className={styles.btnClose} onClick={closeAuth}>
              <FaTimes />
            </button>
          </div>
          <div className={styles.authInfo}>
            <h4>{t('verify_email')}</h4>
            <p>{t('verify_email_description')}</p>
          </div>
          <form
            className={styles.authForm}
            onSubmit={(event) => void handleSubmit(handleFormSubmit)(event)}
            autoComplete="off"
            noValidate
          >
            <div className={styles.row}>
              <label htmlFor="code">{t('verification_code')}</label>
              {/* <button>{t('resend_code')}</button> */}
            </div>
            <ControlledTextField
              name="code"
              placeholder={t('verification_code_placeholder')}
              className={styles.field}
              type="text"
              control={control}
              errors={errors}
            />

            <button className={styles.btn}>
              <p className="btn__center" style={{ display: 'flex' }}>
                {t('send_code')}
                <i>
                  <FaArrowRight size={12} fill="white" />
                </i>
              </p>
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
