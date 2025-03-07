import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import React, { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';

import styles from 'styles/home/auth.module.css';

type AuthProps = {
  showAuthPainel?: boolean;
  closeModal?: () => void;
  closeauth?: () => void;
  isSignIn?: boolean;
};

const INITIALSTATE = { nome: '', email: '', password: '', confirmPassword: '' };

export const RecouverPassword: React.FC<AuthProps> = () => {
  const { t } = useTranslation('auth');
  const [formData, setFormData] = useState(INITIALSTATE);
  const router = useRouter();

  const handleSumit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (typeof window !== 'undefined') {
      localStorage.setItem('profile', JSON.stringify(formData));
    }
    setFormData(INITIALSTATE);
    void router.push('/checkoutPage');
  };

  return (
    <div className={`${styles.auth} ${styles.active}`}>
      <div className={styles.container}>
        <div className={styles.main}>
          <div className={styles.authInfo}>
            <h4>{t('recouverPassword.reset_password')}</h4>
            <p>{t('recouverPassword.reset_password_description')}</p>
          </div>
          <form className={styles.authForm} onSubmit={handleSumit} autoComplete="off" noValidate>
            <label htmlFor="password">{t('recouverPassword.password')}</label>
            <input
              className={styles.field}
              type="password"
              placeholder={t('recouverPassword.password_placeholder')}
              name="password"
              value={formData.password}
              onChange={(event) => setFormData({ ...formData, password: event.target.value })}
            />

            <label htmlFor="confirmPassword">{t('recouverPassword.confirm_password')}</label>
            <input
              className={styles.field}
              type="password"
              placeholder={t('recouverPassword.password_placeholder')}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={(event) => setFormData({ ...formData, confirmPassword: event.target.value })}
            />

            <button className={styles.btn}>
              <p className="btn__center">
                {t('recouverPassword.send_code')}
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
