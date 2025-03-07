import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { ToastContainer } from 'react-toastify';

import { toastProps } from 'shared/components/Toast/ToastContainer';
import { UNVAILABLE_PAYMENT_METHOD } from 'shared/constants';
import { showToast } from 'shared/hooks/showToast';
import styles from 'styles/home/auth.module.css';

import { useAuth } from './../../../hooks/useAuth';

type AuthProps = {
  showAuthPainel?: boolean;
  closeAuth: () => void;
  isSignIn?: boolean;
};

const INITIALSTATE = { email: '' };

export const Auth: React.FC<AuthProps> = ({ showAuthPainel, closeAuth }) => {
  const { t } = useTranslation('auth');
  const [formData, setFormData] = useState(INITIALSTATE);
  const router = useRouter();

  const { selectedPrice } = useAuth();

  const paymentMethods = ['fasmapay', 'multicaixa', 'CASH'];
  const availableMethods = paymentMethods.filter((method) => method !== selectedPrice);

  const handleSumit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (typeof window !== 'undefined') {
      localStorage.setItem('profile', JSON.stringify(formData));
    }
    showToast({ ...UNVAILABLE_PAYMENT_METHOD });
    setFormData(INITIALSTATE);
  };

  const handleClickKeepAsGuess = () => {
    void router.push('/checkout');
  };

  return (
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
              {selectedPrice === 'CASH' ? t('pay_in') : t('pay_with')} {selectedPrice}
            </h4>
            <p>{selectedPrice === 'CASH' && t('cash_payment_description')}</p>
          </div>
          <ToastContainer {...toastProps} />
          <form className={styles.authForm} onSubmit={handleSumit} autoComplete="off" noValidate>
            <label htmlFor="email">{t('email_address')}</label>
            <input
              className={styles.field}
              type="email"
              placeholder={t('email_placeholder')}
              name="email"
              value={formData.email}
              onChange={(event) => setFormData({ ...formData, email: event.target.value })}
            />
            <button className={styles.btn}>{t('next')}</button>

            <span className={styles.divisor}>{t('or')}</span>
            <button className={`${styles.btn} ${styles.outlinedBtn}`}>
              <i></i>
              {t('pay_with_other_methods', { methods: availableMethods.join(` ${t('or')} `) })}
              <span></span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
